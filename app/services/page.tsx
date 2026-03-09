import { BookOpen, GraduationCap, Users, Globe, Award, Briefcase } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: BookOpen,
        title: "Online & Distance Learning",
        description: "Quality education accessible from anywhere. Comprehensive study materials and support for distance learners.",
        color: "text-brand-blue bg-slate-100",
    },
    {
        icon: GraduationCap,
        title: "B.Voc & Skills",
        description: "Vocational degree programs and skill development courses focused on employability and industry needs.",
        color: "text-brand-grey bg-slate-100",
    },
    {
        icon: Globe,
        title: "Open Schooling",
        description: "Flexible schooling options for students to complete their education at their own pace.",
        color: "text-brand-blue bg-slate-100",
    },
    {
        icon: Users,
        title: "Counseling & Guidance",
        description: "Expert guidance for career planning, academic choices, and personal development.",
        color: "text-brand-grey bg-slate-100",
    },
    {
        icon: Briefcase,
        title: "Tech Partners",
        description: "Collaborations with technology leaders to provide state-of-the-art technical training.",
        color: "text-brand-blue bg-slate-100",
    },
    {
        icon: Award,
        title: "Certification",
        description: "Globally recognized certifications to validate your skills and enhance your professional profile.",
        color: "text-brand-grey bg-slate-100",
    },
];

export default function ServicesPage() {
    return (
        <div className="pt-20 pb-16">
            {/* Hero Section - Clean & Professional */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 mb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">What We Offer</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            Our Services
                        </h1>
                        <p className="text-brand-grey text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Comprehensive educational solutions designing and transforming your ideas into reality.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div key={index} className="p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-blue mb-3">{service.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Call to Action */}
                <div className="mt-20 bg-brand-blue rounded-3xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                        Contact us today to learn more about how we can help you achieve your educational goals.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-brand-blue hover:bg-blue-50 rounded-full font-bold transition-all"
                    >
                        Contact Us Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
