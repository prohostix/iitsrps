"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Link, FileImage, Loader2 } from "lucide-react";

interface ImageInputProps {
    name: string;
    label: string;
    defaultValue?: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
    className?: string;
}

type UploadMethod = 'file' | 'url';

export default function ImageInput({
    name,
    label,
    defaultValue = '',
    required = false,
    placeholder = "https://example.com/image.jpg",
    description,
    className = ""
}: ImageInputProps) {
    const [uploadMethod, setUploadMethod] = useState<UploadMethod>('url');
    const [imageUrl, setImageUrl] = useState(defaultValue || '');
    const [preview, setPreview] = useState<string>(defaultValue || '');
    const [uploading, setUploading] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    async function handleFileUpload(file: File) {
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
            setImageUrl(url);
            setPreview(url);
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Failed to upload image");
        } finally {
            setUploading(false);
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    }

    function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
        const url = e.target.value;
        setImageUrl(url);
        setPreview(url || '');
    }

    function handleMethodChange(method: UploadMethod) {
        setUploadMethod(method);
        if (method === 'url' && !imageUrl) {
            setPreview('');
        }
    }

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            
            {!mounted ? (
                // Show a simple loading state during hydration
                <div className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-500">
                    Loading...
                </div>
            ) : (
                <>
                    {/* Upload Method Toggle */}
                    <div className="flex gap-2 mb-3">
                <button
                    type="button"
                    onClick={() => handleMethodChange('url')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        uploadMethod === 'url'
                            ? 'bg-brand-blue text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    <Link className="w-3 h-3" />
                    URL
                </button>
                <button
                    type="button"
                    onClick={() => handleMethodChange('file')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        uploadMethod === 'file'
                            ? 'bg-brand-blue text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    <FileImage className="w-3 h-3" />
                    Upload
                </button>
            </div>

            {/* Hidden input for form submission */}
            <input
                type="hidden"
                name={name}
                value={imageUrl || ''}
                required={required}
            />

            {uploadMethod === 'url' ? (
                <div className="space-y-3">
                    <input
                        type="url"
                        value={imageUrl || ''}
                        onChange={handleUrlChange}
                        placeholder={placeholder}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {preview && preview.trim() !== '' && (
                        <div className="relative h-32 w-full rounded-lg overflow-hidden border border-slate-200">
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                                unoptimized
                                onError={() => setPreview('')}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="relative group cursor-pointer border-2 border-dashed border-slate-300 rounded-lg hover:border-brand-blue transition-colors h-32 bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {uploading ? (
                            <div className="text-center">
                                <Loader2 className="w-6 h-6 text-brand-blue mx-auto mb-2 animate-spin" />
                                <p className="text-xs text-slate-500">Uploading...</p>
                            </div>
                        ) : preview && preview.trim() !== '' ? (
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
                                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                                <p className="text-xs text-slate-500 font-medium">Click to upload</p>
                                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        )}
                    </div>
                    {imageUrl && (
                        <p className="text-xs text-slate-500 truncate">Current: {imageUrl}</p>
                    )}
                </div>
            )}

            {description && (
                <p className="text-xs text-slate-500 mt-1">{description}</p>
            )}
                </>
            )}
        </div>
    );
}