'use client'

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, Trash2, Calendar, ImageIcon, X } from "lucide-react";

export default function EventsPage() {
    const events = useQuery(api.events.list);
    const createEvent = useMutation(api.events.create);
    const removeEvent = useMutation(api.events.remove);
    const generateUploadUrl = useMutation(api.events.generateUploadUrl);

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [imageFile, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setTitle(""); setDesc(""); setDate(""); setImage(null); setPreview(null);
        setShowForm(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imageId: Id<"_storage"> | undefined;
            if (imageFile) {
                const uploadUrl = await generateUploadUrl();
                const result = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": imageFile.type }, body: imageFile });
                const { storageId } = await result.json();
                imageId = storageId;
            }
            await createEvent({ title, description, date, imageId });
            resetForm();
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Events</h1>
                    <p className="text-[var(--muted-foreground)] text-sm">{events?.length ?? 0} events uploaded</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)] text-white font-semibold text-sm transition-all shadow-lg shadow-[0_0_15px_var(--primary-glow)]"
                >
                    <Plus className="w-4 h-4" /> Add Event
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass rounded-2xl p-7 w-full max-w-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold">New Event</h2>
                            <button onClick={resetForm} className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {[
                                { label: "Title", value: title, setter: setTitle, placeholder: "Robocon 2025 Kickoff" },
                                { label: "Description", value: description, setter: setDesc, placeholder: "Details about the event..." },
                                { label: "Date", value: date, setter: setDate, placeholder: "", type: "date" },
                            ].map(f => (
                                <div key={f.label}>
                                    <label className="block text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">{f.label}</label>
                                    <input
                                        type={f.type ?? "text"}
                                        required
                                        value={f.value}
                                        onChange={e => f.setter(e.target.value)}
                                        placeholder={f.placeholder}
                                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]/50 text-sm transition-all"
                                    />
                                </div>
                            ))}

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Image (optional)</label>
                                {preview
                                    ? <div className="relative rounded-xl overflow-hidden h-36">
                                        <img src={preview} className="w-full h-full object-cover" alt="preview" />
                                        <button type="button" onClick={() => { setImage(null); setPreview(null); }} className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white"><X className="w-3 h-3" /></button>
                                    </div>
                                    : <button type="button" onClick={() => fileRef.current?.click()} className="w-full h-28 border border-dashed border-[var(--border)] rounded-xl flex flex-col items-center justify-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all text-sm">
                                        <ImageIcon className="w-6 h-6" /> Click to upload image
                                    </button>
                                }
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </div>

                            <button type="submit" disabled={uploading} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)] disabled:opacity-60 font-bold text-white transition-all mt-1">
                                {uploading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus className="w-4 h-4" />Create Event</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Events List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {events === undefined && <p className="text-[var(--muted-foreground)] text-sm col-span-3">Loading...</p>}
                {events?.length === 0 && (
                    <div className="col-span-3 glass rounded-2xl p-12 text-center text-[var(--muted-foreground)]">
                        <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>No events yet. Click &ldquo;Add Event&rdquo; to get started.</p>
                    </div>
                )}
                {events?.map(ev => (
                    <EventCard key={ev._id} event={ev} onRemove={() => removeEvent({ id: ev._id })} />
                ))}
            </div>
        </div>
    );
}

function EventCard({ event, onRemove }: { event: { _id: Id<"events">; title: string; description: string; date: string; imageId?: Id<"_storage"> }; onRemove: () => void }) {
    const imageUrl = useQuery(api.events.getImageUrl, event.imageId ? { imageId: event.imageId } : "skip");

    return (
        <div className="glass rounded-2xl overflow-hidden group hover:border-[var(--primary)]/30 transition-all">
            <div className="h-40 bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary)]/20 flex items-center justify-center">
                {imageUrl ? <img src={imageUrl} className="w-full h-full object-cover" alt={event.title} /> : <Calendar className="w-10 h-10 text-[var(--primary)]/30" />}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-[var(--foreground)] mb-1 truncate">{event.title}</h3>
                <p className="text-[var(--muted-foreground)] text-xs mb-2">{event.date}</p>
                <p className="text-[var(--muted-foreground)] text-sm line-clamp-2">{event.description}</p>
                <button onClick={onRemove} className="mt-4 flex items-center gap-1.5 text-xs text-red-500/70 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
            </div>
        </div>
    );
}
