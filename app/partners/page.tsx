import { Handshake, CheckCircle, Globe, Award, Send, X } from "lucide-react";
import { submitPartnershipApplication } from "@/lib/actions";

interface PartnersPageProps {
    searchParams: { success?: string; error?: string };
}

export default async function PartnersPage({ searchParams }: PartnersPageProps) {
    const params = await searchParams;
    const success = params.success === 'true';
    const error = params.error === 'true';

    return (
        <div className="pt-20 pb-16">
            {success && (
                <div className="container mx-auto px-4 md:px-6 mb-8">
                    <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="font-semibold">Application submitted successfully! We will contact you soon.</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="container mx-auto px-4 md:px-6 mb-8">
                    <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center gap-3">
                        <X className="w-5 h-5 text-red-600" />
                        <p className="font-semibold">There was an error submitting your application. Please try again.</p>
                    </div>
                </div>
            )}
            {/* Hero Section - Clean & Professional */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 mb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">Collaborate</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            Partner With Us
                        </h1>
                        <p className="text-brand-grey text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Join our network of educational excellence. Collaborate with IITS to deliver world-class training.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6">
                {/* Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <Handshake className="w-10 h-10 text-brand-blue mb-4" />
                        <h3 className="text-xl font-bold text-brand-blue mb-2">Strategic Alliance</h3>
                        <p className="text-slate-600">
                            Benefit from our established brand and industry connections to grow your institution.
                        </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <Globe className="w-10 h-10 text-brand-grey mb-4" />
                        <h3 className="text-xl font-bold text-brand-blue mb-2">Global Reach</h3>
                        <p className="text-slate-600">
                            Access international markets and students through our online distance learning platforms.
                        </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <Award className="w-10 h-10 text-brand-blue mb-4" />
                        <h3 className="text-xl font-bold text-brand-blue mb-2">Quality Assurance</h3>
                        <p className="text-slate-600">
                            Our curriculum and training methods are certified and recognized for their excellence.
                        </p>
                    </div>
                </div>

                {/* Partnership Types */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-brand-blue text-center mb-12">Types of Partnership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-brand-blue">Franchise Partner</h3>
                                <p className="text-slate-600 mt-2">
                                    Run a certified IITS training center with our curriculum and support.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-brand-blue">University Collaboration</h3>
                                <p className="text-slate-600 mt-2">
                                    Universities looking to offer joint degree programs or certificate courses.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-brand-blue">Corporate Training</h3>
                                <p className="text-slate-600 mt-2">
                                    Companies seeking customized training solutions for their workforce.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-brand-blue">Technology Partner</h3>
                                <p className="text-slate-600 mt-2">
                                    Ed-tech providers providing platforms or tools to enhance learning.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-12">
                    <h2 className="text-3xl font-bold text-brand-blue mb-6 text-center">Become a Partner</h2>
                    <form action={submitPartnershipApplication} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="orgName" className="block text-sm font-medium text-slate-700 mb-2">Organization Name</label>
                                <input type="text" id="orgName" name="orgName" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="Institute Name" />
                            </div>
                            <div>
                                <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-700 mb-2">Contact Person</label>
                                <input type="text" id="contactPerson" name="contactPerson" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="Full Name" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="+91..." />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">Partnership Type</label>
                            <select id="type" name="type" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none text-slate-600 bg-white">
                                <option value="">Select Partnership Type</option>
                                <option value="Franchise Partner">Franchise Partner</option>
                                <option value="University Collaboration">University Collaboration</option>
                                <option value="Corporate Training">Corporate Training</option>
                                <option value="Technology Partner">Technology Partner</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Proposal / Message</label>
                            <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none resize-none" placeholder="Tell us about your organization and proposal..."></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
                        >
                            Submit Application <Send className="w-4 h-4" />
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
