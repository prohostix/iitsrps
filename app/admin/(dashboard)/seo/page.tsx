import { getSiteData } from '@/lib/data';
import { updateSEOAction } from '@/lib/actions';
import ImageInput from '../components/ImageInput';

export default async function SEOPage() {
    const data = await getSiteData();

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage SEO</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-2xl">
                <form action={updateSEOAction} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                        <input
                            name="title"
                            defaultValue={data.seo.title}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <p className="text-xs text-slate-500 mt-1">Found in the browser tab and search results.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
                        <textarea
                            name="description"
                            defaultValue={data.seo.description}
                            required
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                        <p className="text-xs text-slate-500 mt-1">A brief summary of the site content for search engines.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Keywords</label>
                        <input
                            name="keywords"
                            defaultValue={data.seo.keywords}
                            placeholder="education, training, ..."
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <p className="text-xs text-slate-500 mt-1">Comma separated list of keywords.</p>
                    </div>

                    <ImageInput
                        name="ogImage"
                        label="OG Image"
                        defaultValue={data.seo.ogImage}
                        description="Image displayed when sharing on social media (1200x630px recommended)"
                    />

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
                        >
                            Update SEO
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
