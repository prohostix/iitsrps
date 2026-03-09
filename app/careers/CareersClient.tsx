"use client";

import { useState } from "react";
import { Briefcase, MapPin, Clock } from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";

interface Job {
    _id: string;
    title: string;
    department?: string;
    location: string;
    type: string;
    description: string;
}

interface CareersClientProps {
    jobs: Job[];
}

export default function CareersClient({ jobs }: CareersClientProps) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    return (
        <div className="pt-20 pb-16">
            {/* Hero Section - Clean & Professional */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 mb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">Work With Us</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            Join Our Team
                        </h1>
                        <p className="text-brand-grey text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Be part of a team dedicated to transforming education and empowering lives.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Job Listings */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                            <Briefcase className="w-6 h-6 text-brand-blue" /> Open Positions
                        </h2>

                        {jobs.map((job) => (
                            <div key={job._id} className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-blue">{job.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm mt-2">
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedJob(job)}
                                        className="w-full sm:w-auto px-4 py-2 text-sm bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                                <p className="text-slate-600 text-sm">
                                    {job.description}
                                </p>
                            </div>
                        ))}

                        {jobs.length === 0 && (
                            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-600 mb-2">No Open Positions</h3>
                                <p className="text-slate-500">
                                    We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-100">
                            <h3 className="text-lg font-bold text-brand-blue mb-4">Why Work With Us?</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-brand-blue rounded-full mt-2 shrink-0"></span>
                                    <span>Competitive salary and benefits</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-brand-blue rounded-full mt-2 shrink-0"></span>
                                    <span>Professional development opportunities</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-brand-blue rounded-full mt-2 shrink-0"></span>
                                    <span>Flexible working arrangements</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-brand-blue rounded-full mt-2 shrink-0"></span>
                                    <span>Collaborative work environment</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-100">
                            <h3 className="text-lg font-bold text-brand-blue mb-4">Application Process</h3>
                            <div className="space-y-4 text-sm text-slate-600">
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                                    <span>Submit your application with resume</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                                    <span>Initial screening and review</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                                    <span>Interview with hiring team</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                                    <span>Final decision and offer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Application Modal */}
            {selectedJob && (
                <JobApplicationForm
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
}