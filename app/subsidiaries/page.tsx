import { getSubsidiaries } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, ArrowRight } from 'lucide-react';

export default async function SubsidiariesPage() {
    const subsidiaries = await getSubsidiaries();

    return (
        <div className="pt-20 pb-16">
            {/* Hero Section - Clean & Professional */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 mb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">Our Network</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            Our Subsidiaries
                        </h1>
                        <p className="text-brand-grey text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Expanding horizons and delivering excellence through our specialized sister concerns and group companies.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6">
                {subsidiaries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 text-lg italic">No subsidiaries information available at the moment.</p>
                        <Link href="/contact" className="mt-4 inline-block text-brand-blue font-semibold hover:underline">
                            Contact us for more details
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 md:gap-12">
                        {subsidiaries.map((sub: any, index: number) => (
                            <div
                                key={sub._id}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-10 bg-white rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Logo Area */}
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <Link href={`/subsidiaries/${sub.slug}`} className="relative w-48 h-48 md:w-56 md:h-56 bg-slate-50 rounded-2xl p-6 flex items-center justify-center border border-slate-100 transition-colors duration-500 group-hover:bg-white">
                                        {sub.logo ? (
                                            <img
                                                src={sub.logo}
                                                alt={sub.name}
                                                className="max-w-full max-h-full object-contain transition-all duration-500 transform group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="text-slate-300 font-bold text-4xl">{sub.name[0]}</div>
                                        )}
                                    </Link>
                                </div>

                                {/* Content Area */}
                                <div className="w-full md:w-2/3">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-8 w-1 bg-brand-blue rounded-full"></div>
                                        <h2 className="text-3xl font-bold text-brand-blue">{sub.name}</h2>
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">
                                        {sub.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={`/subsidiaries/${sub.slug}`}
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-blue-900 transition-all hover:translate-x-1"
                                        >
                                            View Profile
                                            <ArrowRight size={18} />
                                        </Link>

                                        {sub.website && (
                                            <a
                                                href={sub.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-brand-blue text-brand-blue rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all"
                                            >
                                                Visit Website
                                                <Globe size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-20 bg-brand-blue rounded-3xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Looking to Work Together?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                        Our group companies work in synergy to provide comprehensive solutions. Contact us to learn about partnership opportunities.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-10 py-4 bg-white text-brand-blue hover:bg-blue-50 rounded-full font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                        Contact Our Group Office
                    </Link>
                </div>
            </div>
        </div>
    );
}
