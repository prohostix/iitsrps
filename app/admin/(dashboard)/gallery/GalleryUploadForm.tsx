"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Loader2, ImagePlus, Link, FileImage } from "lucide-react";
import { addGalleryImageAction } from "@/lib/actions";

interface GalleryUploadFormProps {
    onUploadSuccess?: () => void;
}

type UploadMethod = 'file' | 'url';

export default function GalleryUploadForm({ onUploadSuccess }: GalleryUploadFormProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadMethod, setUploadMethod] = useState<UploadMethod>('file');
    const [imageUrl, setImageUrl] = useState('');
    const [alt, setAlt] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);

        try {
            const formData = new FormData(e.currentTarget);
            let finalUrl = '';

            if (uploadMethod === 'file') {
                const file = formData.get('file') as File;

                if (!file || file.size === 0) {
                    alert("Please select a file");
                    setUploading(false); // Fix potential hang
                    return;
                }

                // 1. Upload file using API
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
                finalUrl = url;
            } else {
                // Use provided URL
                finalUrl = imageUrl;
                if (!finalUrl) {
                    alert("Please provide an image URL");
                    setUploading(false);
                    return;
                }
            }

            // 2. Save metadata using Server Action
            const finalFormData = new FormData();
            finalFormData.append('url', finalUrl);
            finalFormData.append('alt', alt);

            await addGalleryImageAction(finalFormData);

            // Reset form
            setPreview(null);
            setImageUrl('');
            setAlt('');
            (e.target as HTMLFormElement).reset();
            if (onUploadSuccess) onUploadSuccess();

        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to add image");
        } finally {
            setUploading(false);
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
        const url = e.target.value;
        setImageUrl(url);
        if (url) {
            setPreview(url);
        } else {
            setPreview(null);
        }
    }

    function handleMethodChange(method: UploadMethod) {
        setUploadMethod(method);
        setPreview(null);
        setImageUrl('');
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ImagePlus className="text-brand-blue" />
                Add New Photo
            </h2>

            {/* Upload Method Toggle */}
            <div className="flex gap-2 mb-6">
                <button
                    type="button"
                    onClick={() => handleMethodChange('file')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${uploadMethod === 'file'
                        ? 'bg-brand-blue text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <FileImage className="w-4 h-4" />
                    Upload File
                </button>
                <button
                    type="button"
                    onClick={() => handleMethodChange('url')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${uploadMethod === 'url'
                        ? 'bg-brand-blue text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    <Link className="w-4 h-4" />
                    Use URL
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6 items-start">
                {/* Image Upload/URL Area */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        {uploadMethod === 'file' ? 'Photo Upload' : 'Image URL'}
                    </label>

                    {uploadMethod === 'file' ? (
                        <div key="upload-file" className="relative group cursor-pointer border-2 border-dashed border-slate-300 rounded-xl hover:border-brand-blue transition-colors h-48 bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                required
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            {preview ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div className="text-center p-4">
                                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                    <p className="text-xs text-slate-500 font-medium">Click to upload or drag and drop</p>
                                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div key="upload-url" className="space-y-3">
                            <input
                                type="url"
                                name="url"
                                value={imageUrl}
                                onChange={handleUrlChange}
                                required
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {preview && (
                                <div className="relative h-32 w-full rounded-lg overflow-hidden border border-slate-200">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                        onError={() => setPreview(null)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 grid gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Caption / Alt Text</label>
                        <input
                            name="alt"
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            required
                            placeholder="Students in library"
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {uploadMethod === 'file' ? 'Uploading...' : 'Adding...'}
                                </>
                            ) : (
                                'Add to Gallery'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
