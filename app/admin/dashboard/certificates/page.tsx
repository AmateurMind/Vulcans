'use client'

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, Trash2, Award, FileText, X, ExternalLink } from "lucide-react";

export default function CertificatesPage() {
    const certs = useQuery(api.certificates.list);
    const createCert = useMutation(api.certificates.create);
    const removeCert = useMutation(api.certificates.remove);
    const generateUploadUrl = useMutation(api.certificates.generateUploadUrl);

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [recipient, setRecipient] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [certFile, setCertFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setTitle(""); setRecipient(""); setYear(new Date().getFullYear().toString());
        setCertFile(null); setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            let fileId: Id<"_storage"> | undefined;
            if (certFile) {
                const uploadUrl = await generateUploadUrl();
                const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": certFile.type }, body: certFile });
                const { storageId } = await res.json();
                fileId = storageId;
            }
            await createCert({ title, recipientName: recipient, year, fileId });
            resetForm();
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Certificates</h1>
                    <p className="text-neutral-500 text-sm">{certs?.length ?? 0} certificates issued</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-600 hover:bg-yellow-500 font-semibold text-sm transition-all shadow-lg shadow-yellow-500/20 text-black"
                >
                    <Plus className="w-4 h-4" /> Issue Certificate
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass rounded-2xl p-7 w-full max-w-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold">Issue Certificate</h2>
                            <button onClick={resetForm} className="p-1.5 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {[
                                { label: "Certificate Title", value: title, setter: setTitle, placeholder: "Best Robotics Engineer Award" },
                                { label: "Recipient Name", value: recipient, setter: setRecipient, placeholder: "Arjun Mehta" },
                                { label: "Year", value: year, setter: setYear, placeholder: "2024" },
                            ].map(f => (
                                <div key={f.label}>
                                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                                    <input
                                        type="text"
                                        required
                                        value={f.value}
                                        onChange={e => f.setter(e.target.value)}
                                        placeholder={f.placeholder}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-500/40 text-sm transition-all"
                                    />
                                </div>
                            ))}

                            {/* File Upload */}
                            <div>
                                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Certificate File (PDF/Image, optional)</label>
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="w-full h-20 border border-dashed border-white/15 rounded-xl flex items-center justify-center gap-2 text-neutral-500 hover:text-yellow-400 hover:border-yellow-500/30 transition-all text-sm"
                                >
                                    <FileText className="w-5 h-5" />
                                    {certFile ? certFile.name : "Click to upload PDF or image"}
                                </button>
                                <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden" onChange={e => setCertFile(e.target.files?.[0] ?? null)} />
                            </div>

                            <button type="submit" disabled={uploading} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 disabled:opacity-60 font-bold text-black transition-all mt-1">
                                {uploading ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <><Award className="w-4 h-4" />Issue Certificate</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Certs List */}
            <div className="flex flex-col gap-3">
                {certs === undefined && <p className="text-neutral-500 text-sm">Loading...</p>}
                {certs?.length === 0 && (
                    <div className="glass rounded-2xl p-12 text-center text-neutral-500">
                        <Award className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p>No certificates yet. Click &ldquo;Issue Certificate&rdquo; to get started.</p>
                    </div>
                )}
                {certs?.map(cert => (
                    <CertRow key={cert._id} cert={cert} onRemove={() => removeCert({ id: cert._id })} />
                ))}
            </div>
        </div>
    );
}

function CertRow({ cert, onRemove }: { cert: { _id: Id<"certificates">; title: string; recipientName: string; year: string; fileId?: Id<"_storage"> }; onRemove: () => void }) {
    const fileUrl = useQuery(api.certificates.getFileUrl, cert.fileId ? { fileId: cert.fileId } : "skip");

    return (
        <div className="glass rounded-xl px-5 py-4 flex items-center gap-4 hover:border-white/15 transition-all">
            <div className="p-2 rounded-lg bg-yellow-500/10 shrink-0">
                <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">{cert.title}</p>
                <p className="text-neutral-500 text-xs">{cert.recipientName} · {cert.year}</p>
            </div>
            {fileUrl && (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all shrink-0">
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
            <button onClick={onRemove} className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
