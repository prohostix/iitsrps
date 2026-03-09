import { getSiteData } from '@/lib/data';
import { removeGalleryImageAction } from '@/lib/actions';
import Image from 'next/image';
import GalleryUploadForm from './GalleryUploadForm';
import InstagramSyncButton from './InstagramSyncButton';

export default async function GalleryPage() {
    const data = await getSiteData();

    return (
        <div>
            <div className="flex justify-between items-start mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Manage Photo Gallery</h1>
                <InstagramSyncButton />
            </div>

            {/* Add New Image */}
            <GalleryUploadForm />

            {/* Existing Gallery */}
            <h2 className="text-xl font-bold text-slate-800 mb-6">Current Gallery ({data.gallery?.length || 0})</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.gallery?.map((img) => (
                    <div key={img.id} className="group relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                            <Image
                                src={img.url}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-slate-900 truncate pr-2" title={img.alt}>{img.alt}</h3>
                            </div>
                            <p className="text-xs text-slate-400 truncate mb-4">{img.url}</p>

                            <form action={removeGalleryImageAction}>
                                <input type="hidden" name="id" value={img.id || ''} />
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                >
                                    Remove Photo
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {(!data.gallery || data.gallery.length === 0) && (
                    <div className="col-span-3 text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                        No photos in the gallery yet. Add some above!
                    </div>
                )}
            </div>
        </div>
    );
}
