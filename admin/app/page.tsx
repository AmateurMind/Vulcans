"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus, Trash2, Edit2, X } from "lucide-react";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function Home() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "events";

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your website content</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-border overflow-x-auto">
          {["events", "team"].map((t) => (
            <button
              key={t}
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set("tab", t);
                window.history.pushState({}, "", url);
              }}
              className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${tab === t
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {t === "events" ? "Events Manager" : "Team Manager"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === "events" ? <EventsManager /> : <TeamManager />}
        </div>
      </div>
    </main>
  );
}

function EventsManager() {
  const events = useQuery(api.events.list) ?? [];
  const createEvent = useMutation(api.events.create);
  const updateEvent = useMutation(api.events.update);
  const removeEvent = useMutation(api.events.remove);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

  const [loading, setLoading] = useState(false);
  const [editingEventId, setEditingEventId] = useState<Id<"events"> | null>(null);
  const [formData, setFormData] = useState<{ title: string; slug: string; description: string; date: string; status: "upcoming" | "past" }>({
    title: "",
    slug: "",
    description: "",
    date: "",
    status: "upcoming",
  });
  const [files, setFiles] = useState<File[]>([]);

  const resetForm = () => {
    setFormData({ title: "", slug: "", description: "", date: "", status: "upcoming" });
    setEditingEventId(null);
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.date) return;
    setLoading(true);
    try {
      const imageIds: Id<"_storage">[] = [];
      for (const file of files) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = (await result.json()) as { storageId: Id<"_storage"> };
        imageIds.push(storageId);
      }
      
      const payload: any = { ...formData };
      if (imageIds.length) {
        payload.imageId = imageIds[0];
        payload.imageIds = imageIds;
      }

      if (editingEventId) {
        await updateEvent({ id: editingEventId, ...payload });
      } else {
        await createEvent(payload);
      }
      
      resetForm();
    } catch (error) {
      console.error(error);
      alert(editingEventId ? "Failed to update event" : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Form */}
      <div className="md:col-span-1 border border-border rounded-xl p-5 bg-background shadow-sm self-start">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{editingEventId ? "Edit Event" : "Add New Event"}</h3>
          {editingEventId && (
            <button type="button" onClick={resetForm} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <X className="w-3 h-3" /> Cancel
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Title</label>
            <input
              type="text"
              required
              value={formData.title || ""}
              onChange={e => {
                const title = e.target.value;
                setFormData({
                  ...formData,
                  title,
                  slug: formData.slug ? formData.slug : slugify(title),
                });
              }}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Slug (URL ID)</label>
            <input
              type="text"
              required
              value={formData.slug || ""}
              onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })}
              placeholder="robotics-workshop-2026"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">Detail page URL: /events/{formData.slug || "your-slug"}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Date</label>
            <input type="date" required value={formData.date || ""} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Description (Optional)</label>
            <textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none min-h-[80px]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
            <select value={formData.status || "upcoming"} onChange={e => setFormData({ ...formData, status: e.target.value as "upcoming" | "past" })} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none">
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Images (Optional, up to 3)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e => setFiles(Array.from(e.target.files || []).slice(0, 3))}
              className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <p className="text-xs text-muted-foreground mt-1">{files.length ? `${files.length} image(s) selected` : "No images selected"}</p>
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : editingEventId ? <><Edit2 className="w-4 h-4" /> Update Event</> : <><Plus className="w-4 h-4" /> Add Event</>}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="md:col-span-2 flex flex-col gap-3">
        {events === undefined ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-xl text-muted-foreground">No events found.</div>
        ) : (
          events.map((event: any) => (
            <div key={event._id} className={`flex items-center justify-between p-4 border rounded-xl transition-colors bg-background shadow-sm ${editingEventId === event._id ? "border-primary" : "border-border hover:border-primary/50"}`}>
              <div className="flex flex-col gap-1 flex-1 cursor-pointer" onClick={() => {
                setEditingEventId(event._id);
                setFormData({
                  title: event.title || "",
                  slug: event.slug || "",
                  description: event.description || "",
                  date: event.date || "",
                  status: event.status || "upcoming",
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}>
                <span className="font-semibold text-foreground">{event.title}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${event.status === "upcoming" ? "bg-primary/10 text-primary border-primary/30" : "bg-muted/50 text-muted-foreground border-border"}`}>
                    {event.status === "upcoming" ? "Upcoming" : "Past"}
                  </span>
                  <span className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <span className="text-xs text-muted-foreground">Slug: /events/{event.slug ?? event._id}</span>
                <span className="text-xs text-muted-foreground">
                  Images: {event.imageIds?.length ?? (event.imageId ? 1 : 0)}
                </span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => {
                  setEditingEventId(event._id);
                  setFormData({
                    title: event.title || "",
                    slug: event.slug || "",
                    description: event.description || "",
                    date: event.date || "",
                    status: event.status || "upcoming",
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => { if (confirm("Delete this event?")) removeEvent({ id: event._id }) }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SeedMembersButton({ seedMembers, clearAll }: { seedMembers: any; clearAll: any }) {
  const [seeding, setSeeding] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleSeed = async () => {
    if (!confirm("Import all 28 team members?")) return;
    setSeeding(true);
    try {
      const res = await seedMembers();
      alert(`Imported ${res.filter((r: any) => r.status === "created").length} new members`);
    } catch (error) {
      console.error(error);
      alert("Failed to seed members. Make sure you're signed in.");
    } finally {
      setSeeding(false);
    }
  };

  const handleClear = async () => {
    if (!confirm("Remove ALL team members? This cannot be undone!")) return;
    setClearing(true);
    try {
      const count = await clearAll();
      alert(`Removed ${count} team members`);
    } catch (error) {
      console.error(error);
      alert("Failed to clear members");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleSeed}
        disabled={seeding}
        className="w-full py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Import All Team Members (28)</>}
      </button>

      <button
        onClick={handleClear}
        disabled={clearing}
        className="w-full py-2 bg-red-600/80 text-white rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
      >
        {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Clear All Members</>}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Import adds all 28 members with LinkedIn profiles
      </p>
    </div>
  );
}

function TeamManager() {
  const members = useQuery(api.teamMembers.list) ?? [];
  const createMember = useMutation(api.teamMembers.create);
  const removeMember = useMutation(api.teamMembers.remove);
  const seedMembers = useMutation(api.seedTeamMembers.seedTeamMembers);
  const clearAll = useMutation(api.teamMembers.clearAll);
  // Re-use event's generateUploadUrl for simplicity since it just calls ctx.storage.generateUploadUrl()
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", department: "" });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;
    setLoading(true);
    try {
      let imageId = undefined;
      if (file) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        imageId = storageId;
      }
      await createMember({ ...formData, imageId });
      setFormData({ name: "", role: "", department: "" });
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add team member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Form */}
      <div className="md:col-span-1 border border-border rounded-xl p-5 bg-background shadow-sm self-start">
        <h3 className="font-semibold text-lg mb-4">Add Team Member</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Role (e.g. Captain)</label>
            <input type="text" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Department / Year</label>
            <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-transparent text-sm focus:border-primary outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Profile Photo (Optional)</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Add Member</>}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <SeedMembersButton seedMembers={seedMembers} clearAll={clearAll} />
        </div>
      </div>

      {/* List */}
      <div className="md:col-span-2 flex flex-col gap-3">
        {members === undefined ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : members.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-xl text-muted-foreground">No team members found.</div>
        ) : (
          members.map((member: any) => (
            <div key={member._id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/50 transition-colors bg-background shadow-sm">
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{member.name}</span>
                <span className="text-sm text-muted-foreground">{member.role} {member.department ? ` - ${member.department}` : ""}</span>
                {member.email && <span className="text-xs text-muted-foreground">{member.email}</span>}
                {member.linkedIn && (
                  <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                    LinkedIn Profile
                  </a>
                )}
              </div>
              <button onClick={() => { if (confirm("Remove this member?")) removeMember({ id: member._id }) }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
