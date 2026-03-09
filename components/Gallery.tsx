"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Instagram, ZoomIn, X } from "lucide-react";

interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    category?: string;
}

interface GalleryProps {
    images?: GalleryImage[];
}

export default function Gallery({ images = [] }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    // Fallback images if none provided
    const displayImages = images.length > 0 ? images : [
        { id: '1', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop', alt: 'Modern Classroom' },
        { id: '2', url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1528&auto=format&fit=crop', alt: 'Students studying' },
        { id: '3', url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop', alt: 'Library' },
        { id: '4', url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop', alt: 'University Building' },
        { id: '6', url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', alt: 'Group Study' }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Life at IITS
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Experience the vibrant community, modern facilities, and dynamic learning environment that defines our organisation.
                        </p>
                    </div>

                    <a
                        href="https://www.instagram.com/iitsedu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-300"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white">
                            <Instagram size={14} />
                        </div>
                        <span className="font-semibold text-slate-700 group-hover:text-brand-blue transition-colors">
                            Follow us on Instagram
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {displayImages.map((image) => (
                        <div
                            key={image.id}
                            onClick={() => setSelectedImage(image)}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Simple Hover Overlay (No text) */}
                            <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-brand-blue transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <ZoomIn size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for viewing image text */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/95 backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-brand-blue transition-colors p-2 z-[101]"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="md:flex-1 relative min-h-[300px] md:min-h-0 bg-slate-200">
                            <Image
                                src={selectedImage.url}
                                alt={selectedImage.alt}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="p-8 md:w-80 lg:w-96 flex flex-col justify-center bg-white">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Image Details</h3>
                            <div className="w-12 h-1 bg-brand-blue mb-6 rounded-full" />
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {selectedImage.alt}
                            </p>
                            {selectedImage.category && (
                                <div className="mt-8">
                                    <span className="text-[10px] px-3 py-1 bg-brand-blue/10 text-brand-blue font-bold uppercase rounded-full tracking-wider">
                                        {selectedImage.category}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
