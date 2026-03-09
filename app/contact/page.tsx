import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { getSiteData } from "@/lib/data";
import ContactForm from "./ContactForm";

export default async function ContactPage() {
    const data = await getSiteData();
    const contact = data.contact || {
        phone: '',
        email: '',
        address: ''
    };
    const branches = data.branches || [];

    // Group branches by type
    const headOffice = branches.find(b => b.type === 'Head Office');
    const regionalOffices = branches.filter(b => b.type === 'Regional Office');
    const internationalOffices = branches.filter(b => b.type === 'International Office');

    return (
        <div className="pt-20 pb-16">
            {/* Hero Section - Clean & Professional */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 mb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">Contact</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            Get In Touch
                        </h1>
                        <p className="text-brand-grey text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Have questions? We&apos;re here to help! Reach out to any of our global offices.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info & Branches */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Primary Contact Methods */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl">
                                <div className="bg-brand-blue p-3 rounded-full text-white">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-blue">Call Us</h3>
                                    <p className="text-slate-700 font-medium">{contact.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl">
                                <div className="bg-brand-blue p-3 rounded-full text-white">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-blue">Email Us</h3>
                                    <p className="text-slate-700 font-medium">{contact.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Head Office */}
                        {headOffice && (
                            <div>
                                <h2 className="text-2xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                                    <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
                                    Head Office
                                </h2>
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{headOffice.name}</h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex gap-3">
                                                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-1" />
                                                <p className="text-slate-600 leading-relaxed">{headOffice.address}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                                                <p className="text-slate-600 font-medium">{headOffice.phone}</p>
                                            </div>
                                            {headOffice.website && (
                                                <div className="flex items-center gap-3">
                                                    <Globe className="w-5 h-5 text-brand-blue shrink-0" />
                                                    <a href={`https://${headOffice.website}`} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-medium">
                                                        {headOffice.website}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Regional Offices */}
                        {regionalOffices.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                                    <div className="w-2 h-8 bg-brand-blue/60 rounded-full"></div>
                                    Regional Offices
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {regionalOffices.map((branch) => (
                                        <div key={branch.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                            <h3 className="text-lg font-bold text-slate-900 mb-4">{branch.name}</h3>
                                            <div className="space-y-4">
                                                <div className="flex gap-3">
                                                    <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-1" />
                                                    <p className="text-slate-600 text-sm leading-relaxed">{branch.address}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                                                    <p className="text-slate-600 text-sm font-medium">{branch.phone}</p>
                                                </div>
                                                {branch.website && (
                                                    <div className="flex items-center gap-3">
                                                        <Globe className="w-4 h-4 text-brand-blue shrink-0" />
                                                        <a href={`https://${branch.website}`} target="_blank" rel="noopener noreferrer" className="text-brand-blue text-sm hover:underline font-medium">
                                                            {branch.website}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* International Office */}
                        {internationalOffices.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                                    <div className="w-2 h-8 bg-brand-blue/40 rounded-full"></div>
                                    International Offices
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {internationalOffices.map((branch) => (
                                        <div key={branch.id} className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800 transition-colors group">
                                            <h3 className="text-lg font-bold text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">{branch.name}</h3>
                                            <div className="space-y-4">
                                                <div className="flex gap-3">
                                                    <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-1" />
                                                    <p className="text-slate-300 text-sm leading-relaxed">{branch.address}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                                                    <p className="text-slate-300 text-sm font-medium">{branch.phone}</p>
                                                </div>
                                                {branch.website && (
                                                    <div className="flex items-center gap-3">
                                                        <Globe className="w-4 h-4 text-brand-blue shrink-0" />
                                                        <a href={`https://${branch.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline font-medium">
                                                            {branch.website}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
