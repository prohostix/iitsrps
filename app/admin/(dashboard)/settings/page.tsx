import { getSiteData } from '@/lib/data';
import { updateSettingsAction, addBranchAction, deleteBranchAction } from '@/lib/actions';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Save, BarChart, Globe, Trash2, Plus } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function SettingsPage() {
    const data = await getSiteData();
    const contact = data.contact || {
        phone: '',
        email: '',
        address: '',
        socials: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        }
    };

    const stats = data.stats || {
        yearsOfExperience: '15+',
        studentsCount: '50K+',
        partnersCount: '800+',
        satisfactionRate: '100%'
    };

    const branches = data.branches || [];

    return (
        <div className="max-w-4xl pb-20">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Site Settings</h1>

            <div className="space-y-12">
                {/* General Settings Form */}
                <form action={updateSettingsAction} className="space-y-8">
                    {/* Contact Information */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Phone className="text-brand-blue" size={20} />
                            Contact Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    defaultValue={contact.phone}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={contact.email}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Main Office Address</label>
                                <textarea
                                    name="address"
                                    defaultValue={contact.address}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Marketing Statistics */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <BarChart className="text-brand-blue" size={20} />
                            Marketing Statistics
                        </h2>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
                                <input
                                    type="text"
                                    name="yearsOfExperience"
                                    defaultValue={stats.yearsOfExperience}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="15+"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Students Count</label>
                                <input
                                    type="text"
                                    name="studentsCount"
                                    defaultValue={stats.studentsCount}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="50K+"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Partners Count</label>
                                <input
                                    type="text"
                                    name="partnersCount"
                                    defaultValue={stats.partnersCount}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="800+"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Satisfaction Rate</label>
                                <input
                                    type="text"
                                    name="satisfactionRate"
                                    defaultValue={stats.satisfactionRate}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="100%"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Facebook className="text-brand-blue" size={20} />
                            Social Media Links
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                                        <Facebook size={16} /> Facebook
                                    </label>
                                    <input
                                        type="url"
                                        name="facebook"
                                        defaultValue={contact.socials?.facebook}
                                        placeholder="https://facebook.com/..."
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                                        <Twitter size={16} /> Twitter / X
                                    </label>
                                    <input
                                        type="url"
                                        name="twitter"
                                        defaultValue={contact.socials?.twitter}
                                        placeholder="https://twitter.com/..."
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                                        <Instagram size={16} /> Instagram
                                    </label>
                                    <input
                                        type="url"
                                        name="instagram"
                                        defaultValue={contact.socials?.instagram}
                                        placeholder="https://instagram.com/..."
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                                        <Instagram size={16} /> Instagram Access Token
                                    </label>
                                    <input
                                        type="password"
                                        name="instagramAccessToken"
                                        defaultValue={contact.socials?.instagramAccessToken}
                                        placeholder="EAAC..."
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                                        <Linkedin size={16} /> LinkedIn
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        defaultValue={contact.socials?.linkedin}
                                        placeholder="https://linkedin.com/..."
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-brand-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                        >
                            <Save size={20} />
                            Save General Settings
                        </button>
                    </div>
                </form>

                {/* Office Branches Management (Separate Forms) */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <MapPin className="text-brand-blue" size={20} />
                        Office Branches
                    </h2>

                    {/* Existing Branches List */}
                    <div className="space-y-4 mb-10">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Current Branches ({branches.length})</h3>
                        <div className="grid gap-4">
                            {branches.map((branch) => (
                                <div key={branch.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-slate-100 bg-slate-50 gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-900">{branch.name}</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold uppercase">{branch.type}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 line-clamp-1">{branch.address}</p>
                                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400 font-medium">
                                            <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-blue" /> {branch.phone}</span>
                                            {branch.website && <span className="flex items-center gap-1.5"><Globe size={12} className="text-brand-blue" /> {branch.website}</span>}
                                        </div>
                                    </div>
                                    <form action={deleteBranchAction}>
                                        <input type="hidden" name="id" value={branch.id} />
                                        <button
                                            type="submit"
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete Branch"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </form>
                                </div>
                            ))}
                            {branches.length === 0 && (
                                <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
                                    <MapPin className="mx-auto mb-2 opacity-20" size={32} />
                                    <p className="text-sm italic">No branches added yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add New Branch Form */}
                    <div className="pt-8 border-t border-slate-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-brand-blue" />
                            Add New Branch
                        </h3>
                        <form action={addBranchAction} className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Branch Name</label>
                                <input name="name" type="text" placeholder="e.g. Noida Office" required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Branch Type</label>
                                <select name="type" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white appearance-none">
                                    <option value="Regional Office">Regional Office</option>
                                    <option value="Head Office">Head Office</option>
                                    <option value="International Office">International Office</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Full Address</label>
                                <textarea name="address" rows={2} placeholder="Complete office address..." required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Phone Number</label>
                                <input name="phone" type="text" placeholder="+91 ..." required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Website (Optional)</label>
                                <input name="website" type="text" placeholder="www.example.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                            </div>
                            <div className="md:col-span-2 flex justify-end pt-2">
                                <button type="submit" className="bg-brand-blue text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-900 transition-all text-sm shadow-md active:scale-95 flex items-center gap-2">
                                    <Plus size={18} />
                                    Add Branch Office
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
