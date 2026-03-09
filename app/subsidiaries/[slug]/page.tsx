import { getSubsidiaryBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Globe, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

export default async function SubsidiaryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const subsidiary = await getSubsidiaryBySlug(slug);

    if (!subsidiary) {
        notFound();
    }

    return (
        <div className="pt-20 pb-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <Link
                        href="/subsidiaries"
                        className="inline-flex items-center gap-2 text-brand-blue font-semibold mb-8 hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={20} />
                        Back to Subsidiaries
                    </Link>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl p-8 flex items-center justify-center shadow-sm border border-brand-blue/5">
                            {subsidiary.logo ? (
                                <img
                                    src={subsidiary.logo}
                                    alt={subsidiary.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <div className="text-brand-blue font-bold text-5xl">{subsidiary.name[0]}</div>
                            )}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-bold text-brand-blue mb-4 tracking-tight">
                                {subsidiary.name}
                            </h1>
                            <p className="text-brand-grey text-xl font-medium max-w-2xl leading-relaxed italic">
                                "{subsidiary.description.split('.')[0]}."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-blue/5 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-brand-grey/5 blur-3xl rounded-full"></div>
            </section>

            <div className="container mx-auto px-4 md:px-6 mt-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                                <CheckCircle2 className="text-brand-blue" />
                                About The Company
                            </h2>
                            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                                {subsidiary.description.split('\n').map((paragraph: string, i: number) => (
                                    <p key={i} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        {/* Additional value propositions or features could go here */}
                        <section className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
                            <h3 className="text-xl font-bold text-brand-blue mb-6">Core Specializations</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Industry-leading expertise",
                                    "Innovative solutions",
                                    "Client-centric approach",
                                    "Sustainable growth focus"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100">
                                        <CheckCircle2 className="text-brand-blue w-5 h-5 flex-shrink-0" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 sticky top-28">
                            <h3 className="text-xl font-bold text-brand-blue mb-6">Connect With Us</h3>

                            <div className="space-y-6">
                                {subsidiary.website && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue flex-shrink-0">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Official Website</p>
                                            <a
                                                href={subsidiary.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-brand-blue font-semibold hover:underline break-all"
                                            >
                                                {subsidiary.website.replace(/^https?:\/\//, '')}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Headquarters</p>
                                        <p className="text-slate-600 font-medium">Part of IITS Group Network</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <p className="text-sm text-slate-500 mb-6 italic">
                                        For more information regarding {subsidiary.name}, please visit their official website or contact our group headquarters.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-blue-900 transition-all shadow-md hover:shadow-lg"
                                    >
                                        Inquire Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
