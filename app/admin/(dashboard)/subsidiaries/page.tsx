import { getSubsidiaries } from '@/lib/data';
import { addSubsidiaryAction, deleteSubsidiaryAction } from '@/lib/actions';
import { Trash2, Plus, Globe, FileText } from 'lucide-react';
import ImageInput from '../components/ImageInput';

export default async function SubsidiariesAdminPage() {
    const subsidiaries = await getSubsidiaries();

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Subsidiaries</h1>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Current Subsidiaries</h2>

                    {subsidiaries.length === 0 ? (
                        <p className="text-slate-500 italic">No subsidiaries added yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {subsidiaries.map((sub: any) => (
                                <div key={sub._id} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            {sub.logo && (
                                                <div className="w-10 h-10 rounded border bg-white flex items-center justify-center overflow-hidden p-1">
                                                    <img src={sub.logo} alt={sub.name} className="max-w-full max-h-full object-contain" />
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800">{sub.name}</span>
                                                <span className="text-xs text-slate-400 font-mono">slug: {sub.slug}</span>
                                            </div>
                                        </div>
                                        <form action={deleteSubsidiaryAction}>
                                            <input type="hidden" name="id" value={sub._id.toString()} />
                                            <button className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </form>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-2 mb-2">{sub.description}</p>
                                    {sub.website && (
                                        <div className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                            <Globe size={12} />
                                            <a href={sub.website} target="_blank" rel="noopener noreferrer">{sub.website}</a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Add New Subsidiary</h2>
                    <form action={addSubsidiaryAction} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                            <input
                                name="name"
                                placeholder="e.g. IITS Media"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <ImageInput
                            name="logo"
                            label="Company Logo"
                            description="Upload or paste company logo URL"
                        />

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                placeholder="Briefly describe the subsidiary..."
                                required
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Website URL (Optional)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Globe size={16} />
                                </span>
                                <input
                                    name="website"
                                    type="url"
                                    placeholder="https://example.com"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                            <input
                                name="order"
                                type="number"
                                defaultValue={0}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                        >
                            <Plus size={18} />
                            Add Subsidiary
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
