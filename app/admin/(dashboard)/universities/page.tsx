import { getSiteData } from '@/lib/data';
import { addUniversityAction, deleteUniversityAction } from '@/lib/actions';
import { Trash2, Plus } from 'lucide-react';
import ImageInput from '../components/ImageInput';

export default async function UniversitiesPage() {
    const data = await getSiteData();

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Universities</h1>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Current Universities</h2>

                    {data.universities.length === 0 ? (
                        <p className="text-slate-500 italic">No universities added yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {data.universities.map((uni) => (
                                <li key={uni.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="font-medium text-slate-800">{uni.name}</span>
                                    <form action={deleteUniversityAction}>
                                        <input type="hidden" name="id" value={uni.id || ''} />
                                        <button className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Add Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Add New University</h2>
                    <form action={addUniversityAction} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">University Name</label>
                            <input
                                name="name"
                                placeholder="e.g. Harvard University"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <ImageInput
                            name="logo"
                            label="University Logo (Optional)"
                            description="University logo image (200x200px recommended)"
                        />
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                        >
                            <Plus size={18} />
                            Add University
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
