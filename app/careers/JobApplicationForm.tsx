"use client";

import { useState } from "react";
import { X, Upload, Loader2, Send } from "lucide-react";
import { submitJobApplication } from "@/lib/actions";

interface JobApplicationFormProps {
    job: {
        _id: string;
        title: string;
        department?: string;
        location: string;
        type: string;
    };
    onClose: () => void;
}

export default function JobApplicationForm({ job, onClose }: JobApplicationFormProps) {
    const [uploading, setUploading] = useState(false);
    const [resumeUrl, setResumeUrl] = useState('');

    async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type (PDF, DOC, DOCX)
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a PDF, DOC, or DOCX file');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setUploading(true);
        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData,
            });

            if (!uploadRes.ok) {
                const error = await uploadRes.json();
                throw new Error(error.error || 'Upload failed');
            }

            const { url } = await uploadRes.json();
            setResumeUrl(url);
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to upload resume");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-brand-blue">Apply for Position</h2>
                        <p className="text-slate-600">{job.title} - {job.location}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form action={submitJobApplication} className="p-6 space-y-6">
                    {/* Hidden fields */}
                    <input type="hidden" name="jobId" value={job._id || ''} />
                    <input type="hidden" name="jobTitle" value={job.title || ''} />
                    <input type="hidden" name="resume" value={resumeUrl || ''} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                            <input
                                type="text"
                                name="applicantName"
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Resume/CV *</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-brand-blue transition-colors">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                                className="hidden"
                                id="resume-upload"
                                disabled={uploading}
                            />
                            <label
                                htmlFor="resume-upload"
                                className="cursor-pointer flex flex-col items-center"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-8 h-8 text-brand-blue mb-2 animate-spin" />
                                        <p className="text-sm text-slate-600">Uploading...</p>
                                    </>
                                ) : resumeUrl ? (
                                    <>
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <p className="text-sm text-green-600 font-medium">Resume uploaded successfully</p>
                                        <p className="text-xs text-slate-500 mt-1">Click to upload a different file</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                        <p className="text-sm text-slate-600 font-medium">Click to upload your resume</p>
                                        <p className="text-xs text-slate-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience *</label>
                        <select
                            name="experience"
                            required
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                        >
                            <option value="">Select experience level</option>
                            <option value="0-1">0-1 years (Fresh Graduate)</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-10">5-10 years</option>
                            <option value="10+">10+ years</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Cover Letter (Optional)</label>
                        <textarea
                            name="coverLetter"
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none resize-none"
                            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!resumeUrl || uploading}
                            className="flex-1 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}