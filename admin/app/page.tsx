"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";

export default function Home() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "events";

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Admin Dashboard</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Manage your website content</p>
        </div>
      </div>

      <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-[var(--border)] overflow-x-auto">
          {["events", "team"].map((t) => (
            <button
              key={t}
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set("tab", t);
                window.history.pushState({}, "", url);
              }}
              className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${tab === t
                ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
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
  const removeEvent = useMutation(api.events.remove);
  const generateUploadUrl = useMutation(api.events.generateUploadUrl);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", date: "" });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
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
      await createEvent({ ...formData, imageId });
      setFormData({ title: "", description: "", date: "" });
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Form */}
      <div className="md:col-span-1 border border-[var(--border)] rounded-xl p-5 bg-[var(--background)] shadow-sm self-start">
        <h3 className="font-semibold text-lg mb-4">Add New Event</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:border-[var(--primary)] outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Date</label>
            <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:border-[var(--primary)] outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Description (Optional)</label>
            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:border-[var(--primary)] outline-none min-h-[80px]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Image (Optional)</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)]/10 file:text-[var(--primary)] hover:file:bg-[var(--primary)]/20" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Add Event</>}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="md:col-span-2 flex flex-col gap-3">
        {events === undefined ? (
          <div className="flex items-center justify-center py-10 text-[var(--muted-foreground)]"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-[var(--border)] rounded-xl text-[var(--muted-foreground)]">No events found.</div>
        ) : (
          events.map(event => (
            <div key={event._id} className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 transition-colors bg-[var(--background)] shadow-sm">
              <div className="flex flex-col">
                <span className="font-semibold text-[var(--foreground)]">{event.title}</span>
                <span className="text-sm text-[var(--muted-foreground)]">{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <button onClick={() => { if (confirm("Delete this event?")) removeEvent({ id: event._id }) }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TeamManager() {
  const members = useQuery(api.teamMembers.list) ?? [];
  const createMember = useMutation(api.teamMembers.create);
  const removeMember = useMutation(api.teamMembers.remove);
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
      <div className="md:col-span-1 border border-[var(--border)] rounded-xl p-5 bg-[var(--background)] shadow-sm self-start">
        <h3 className="font-semibold text-lg mb-4">Add Team Member</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:border-[var(--primary)] outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Role (e.g. Captain)</label>
            <input type="text" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:border-[var(--primary)] outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Department / Year</label>
            <input type="text" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-transparent text-sm focus:border-[var(--primary)] outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Profile Photo (Optional)</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)]/10 file:text-[var(--primary)] hover:file:bg-[var(--primary)]/20" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Add Member</>}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="md:col-span-2 flex flex-col gap-3">
        {members === undefined ? (
          <div className="flex items-center justify-center py-10 text-[var(--muted-foreground)]"><Loader2 className="w-6 h-6 animate-spin" /></div>
        ) : members.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-[var(--border)] rounded-xl text-[var(--muted-foreground)]">No team members found.</div>
        ) : (
          members.map(member => (
            <div key={member._id} className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl hover:border-[var(--primary)]/50 transition-colors bg-[var(--background)] shadow-sm">
              <div className="flex flex-col">
                <span className="font-semibold text-[var(--foreground)]">{member.name}</span>
                <span className="text-sm text-[var(--muted-foreground)]">{member.role} {member.department ? `· ${member.department}` : ''}</span>
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
