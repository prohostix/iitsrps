import { getSiteData } from '@/lib/data';
import connectDB from '@/lib/db';
import JobApplicationModel from '@/models/JobApplication';
import EnquiryModel from '@/models/Enquiry';
import { Users, Mail, GraduationCap, Image as ImageIcon, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
    await connectDB();
    const data = await getSiteData();

    // Get additional stats
    const pendingApplications = await JobApplicationModel.countDocuments({ status: 'pending' });
    const newEnquiries = await EnquiryModel.countDocuments({ status: 'new' });

    // Get recent activity
    const recentApplications = await JobApplicationModel.find().sort({ createdAt: -1 }).limit(3).lean();
    const recentEnquiries = await EnquiryModel.find().sort({ createdAt: -1 }).limit(3).lean();

    const stats = [
        { label: 'Universities', value: data.universities.length, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Images Managed', value: data.gallery.length, icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Pending Apps', value: pendingApplications, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'New Enquiries', value: newEnquiries, icon: Mail, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back, Administrator. Here's what's happening today.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm">{stat.label}</h3>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Applications */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-slate-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-slate-400" /> Recent Applications
                        </h2>
                        <Link href="/admin/applications" className="text-brand-blue text-sm font-medium hover:underline flex items-center gap-1">
                            View All <ExternalLink size={14} />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentApplications.map((app: any) => (
                            <div key={app._id.toString()} className="p-4 hover:bg-slate-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-slate-900">{app.applicantName}</p>
                                        <p className="text-sm text-slate-500">{app.jobTitle}</p>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {recentApplications.length === 0 && (
                            <p className="p-8 text-center text-slate-400 text-sm">No applications yet</p>
                        )}
                    </div>
                </div>

                {/* Recent Enquiries */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-bold text-slate-900 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-slate-400" /> Recent Enquiries
                        </h2>
                        <Link href="/admin/enquiries" className="text-brand-blue text-sm font-medium hover:underline flex items-center gap-1">
                            View All <ExternalLink size={14} />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentEnquiries.map((enq: any) => (
                            <div key={enq._id.toString()} className="p-4 hover:bg-slate-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-slate-900 line-clamp-1">{enq.subject}</p>
                                        <p className="text-sm text-slate-500">{enq.name}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                        <Clock size={10} />
                                        {new Date(enq.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {recentEnquiries.length === 0 && (
                            <p className="p-8 text-center text-slate-400 text-sm">No enquiries yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
