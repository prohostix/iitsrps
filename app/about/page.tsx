import { Users, Target } from "lucide-react";
import Image from "next/image";
import { getSiteData } from "@/lib/data";

export default async function AboutPage() {
    const data = await getSiteData();
    return (
        <div className="pt-20 pb-16">
            {/* Header */}
            {/* Hero Section - Clean & Professional */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">Who We Are</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            About {data.seo?.title?.split(' ')[0] || 'IITS'}
                        </h1>
                        <p className="text-brand-grey text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            A legacy of excellence in education, training, and career development. Building the future through integrated studies.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6 space-y-24">
                {/* Mission/Vision */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-brand-blue mb-6">Our Mission</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            To provide integrated training and studies that empower individuals with the skills needed
                            to succeed in a rapidly evolving global economy. We believe in education that is accessible,
                            practical, and transformative.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <Target className="w-8 h-8 text-brand-blue mb-4" />
                                <h3 className="font-bold text-brand-blue mb-2">Vision</h3>
                                <p className="text-sm text-slate-600">To be a global leader in ed-tech and vocational training.</p>
                            </div>
                            <div className="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <Users className="w-8 h-8 text-brand-grey mb-4" />
                                <h3 className="font-bold text-brand-blue mb-2">Values</h3>
                                <p className="text-sm text-slate-600">Excellence, Integrity, Innovation, and Student-Centricity.</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[400px] bg-slate-200 rounded-2xl overflow-hidden shadow-lg relative">
                        <Image
                            src={data.images.about.url}
                            alt={data.images.about.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </section>

                {/* Leadership */}
                <section>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Leadership</h2>
                        <p className="text-slate-600">
                            Guided by visionaries with over 15 years of experience in the education sector.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Dr. Abdul Aslam */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-brand-blue/20 overflow-hidden relative">
                                {data.images.directors?.dr_abdul_aslam ? (
                                    <Image src={data.images.directors.dr_abdul_aslam} alt="Dr. Abdul Aslam" fill className="object-cover" sizes="96px" />
                                ) : (
                                    <Users size={40} />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-brand-blue">Dr. Abdul Aslam</h3>
                            <p className="text-brand-blue font-semibold text-sm mb-1 uppercase tracking-wide">Managing Director</p>
                            <p className="text-slate-400 text-xs mb-4">BBA, LLB</p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                A progressive enthusiast in Education and Legal services with 16 years of experience supporting emigrants. Dr. Aslam is a data flow expert, Director of Brilliance Int’l Attestation, and Co-founder of Brilliance Document Clearance UAE. His expertise helps IITS register its growth globally, especially in West Asian countries.
                            </p>
                        </div>

                        {/* Dr. Basil Thomas */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-brand-blue/20 overflow-hidden relative">
                                {data.images.directors?.dr_basil_thomas ? (
                                    <Image src={data.images.directors.dr_basil_thomas} alt="Dr. Basil Thomas" fill className="object-cover" sizes="96px" />
                                ) : (
                                    <Users size={40} />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-brand-blue">Dr. Basil Thomas</h3>
                            <p className="text-brand-blue font-semibold text-sm mb-1 uppercase tracking-wide">GROUP CEO & DIRECTOR</p>
                            <p className="text-slate-400 text-xs mb-4">BA, LLB</p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                An accomplished lawyer with over 15 years of expertise in corporate law, business strategy, and international operations. Dr. Thomas holds a Doctorate in Business Management and leads prominent corporate law firms. He offers strategic counsel across industries including real estate, education, and socio-economic entrepreneurship.
                            </p>
                        </div>

                        {/* Adv. Shoukath Ali Pootheri */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-brand-blue/20 overflow-hidden relative">
                                {data.images.directors?.adv_shoukath_ali ? (
                                    <Image src={data.images.directors.adv_shoukath_ali} alt="Adv. Shoukath Ali Pootheri" fill className="object-cover" sizes="96px" />
                                ) : (
                                    <Users size={40} />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-brand-blue">Adv. Shoukath Ali Pootheri</h3>
                            <p className="text-brand-blue font-semibold text-sm mb-1 uppercase tracking-wide">Co-founder & Director</p>
                            <p className="text-slate-400 text-xs mb-4">MBA, LLB</p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                An advocate and educationalist with 14 years in the field. He is the Founder Director of TIMS Education, Kerala, transforming educationally backward areas. Adv. Shoukath Ali is instrumental in developing IITS as a premier educational institution in the field of Education Technology.
                            </p>
                        </div>

                        {/* Mr. Sumith Vijayan */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-brand-blue/20 overflow-hidden relative">
                                {data.images.directors?.mr_sumith_vijayan ? (
                                    <Image src={data.images.directors.mr_sumith_vijayan} alt="Mr. Sumith Vijayan" fill className="object-cover" sizes="96px" />
                                ) : (
                                    <Users size={40} />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-brand-blue">Mr. Sumith Vijayan</h3>
                            <p className="text-brand-blue font-semibold text-sm mb-1 uppercase tracking-wide">Co-founder & Director</p>
                            <p className="text-slate-400 text-xs mb-4">BA (Tourism & Travel Management)</p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Director of TRV Travels India Pvt Ltd and Founder of Capital Institute of Advanced Learning. An expert in embassy Attestation, MEA Services, and emigration procedures with 12 years of experience. Mr. Vijayan serves as the key figure in expanding the services of IITS abroad.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
