import { BookOpen, Clock, Users, Award } from "lucide-react";

export default function CoursesPage() {
    return (
        <div className="pt-20 pb-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 mb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">Education</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            Our Courses
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Comprehensive training programs designed to prepare you for success in today&apos;s competitive job market.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6">
                {/* Course Categories */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="p-8 bg-white rounded-xl shadow-lg border border-slate-100">
                        <BookOpen className="w-12 h-12 text-brand-blue mb-6" />
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">Technical Training</h3>
                        <p className="text-slate-600 mb-6">
                            Industry-relevant technical skills including programming, data analysis, and digital marketing.
                        </p>
                        <ul className="space-y-2 text-slate-600">
                            <li>• Web Development</li>
                            <li>• Data Science</li>
                            <li>• Digital Marketing</li>
                            <li>• Cloud Computing</li>
                        </ul>
                    </div>

                    <div className="p-8 bg-white rounded-xl shadow-lg border border-slate-100">
                        <Users className="w-12 h-12 text-brand-blue mb-6" />
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">Soft Skills</h3>
                        <p className="text-slate-600 mb-6">
                            Essential communication and leadership skills for professional success.
                        </p>
                        <ul className="space-y-2 text-slate-600">
                            <li>• Communication Skills</li>
                            <li>• Leadership Training</li>
                            <li>• Team Management</li>
                            <li>• Presentation Skills</li>
                        </ul>
                    </div>

                    <div className="p-8 bg-white rounded-xl shadow-lg border border-slate-100">
                        <Award className="w-12 h-12 text-brand-blue mb-6" />
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">Certification Programs</h3>
                        <p className="text-slate-600 mb-6">
                            Internationally recognized certifications to boost your career prospects.
                        </p>
                        <ul className="space-y-2 text-slate-600">
                            <li>• Project Management</li>
                            <li>• Quality Assurance</li>
                            <li>• Business Analysis</li>
                            <li>• IT Service Management</li>
                        </ul>
                    </div>
                </div>

                {/* Course Features */}
                <section className="bg-slate-50 rounded-2xl p-8 md:p-12 mb-20">
                    <h2 className="text-3xl font-bold text-brand-blue text-center mb-12">Why Choose Our Courses?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <Clock className="w-10 h-10 text-brand-blue mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-brand-blue mb-2">Flexible Schedule</h3>
                            <p className="text-slate-600">Learn at your own pace with flexible timing options</p>
                        </div>
                        <div className="text-center">
                            <Users className="w-10 h-10 text-brand-blue mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-brand-blue mb-2">Expert Instructors</h3>
                            <p className="text-slate-600">Learn from industry professionals with years of experience</p>
                        </div>
                        <div className="text-center">
                            <BookOpen className="w-10 h-10 text-brand-blue mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-brand-blue mb-2">Practical Learning</h3>
                            <p className="text-slate-600">Hands-on projects and real-world case studies</p>
                        </div>
                        <div className="text-center">
                            <Award className="w-10 h-10 text-brand-blue mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-brand-blue mb-2">Certification</h3>
                            <p className="text-slate-600">Receive recognized certificates upon completion</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-6">Ready to Start Learning?</h2>
                    <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of students who have transformed their careers with our comprehensive training programs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/contact" 
                            className="px-8 py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
                        >
                            Enroll Now
                        </a>
                        <a 
                            href="/contact" 
                            className="px-8 py-4 border-2 border-brand-blue text-brand-blue font-bold rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
                        >
                            Get More Info
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}