import connectDB from '@/lib/db';
import JobApplicationModel from '@/models/JobApplication';
import { updateApplicationStatusAction, deleteApplicationAction } from '@/lib/actions';
import { Clock, Mail, Phone, FileText, Eye, Trash2 } from 'lucide-react';

export default async function ApplicationsPage() {
    await connectDB();
    const applications = await JobApplicationModel.find().sort({ createdAt: -1 }).lean();

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Job Applications</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                {applications.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">No Applications Yet</h3>
                        <p className="text-slate-500">Job applications will appear here when candidates apply.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-slate-700">Applicant</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Position</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Experience</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Applied</th>
                                    <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app._id.toString()} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-4">
                                            <div>
                                                <div className="font-semibold text-slate-900">{app.applicantName}</div>
                                                <div className="text-sm text-slate-500 flex items-center gap-4 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {app.email}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {app.phone}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-slate-900">{app.jobTitle}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-slate-600">{app.experience}</span>
                                        </td>
                                        <td className="p-4">
                                            <form action={updateApplicationStatusAction} className="inline">
                                                <input type="hidden" name="id" value={app._id?.toString() || ''} />
                                                <select
                                                    name="status"
                                                    defaultValue={app.status}
                                                    onChange={(e) => e.target.form?.requestSubmit()}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                                            app.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                    'bg-purple-100 text-purple-800'
                                                        }`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="reviewed">Reviewed</option>
                                                    <option value="shortlisted">Shortlisted</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="hired">Hired</option>
                                                </select>
                                            </form>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-slate-500 text-sm">
                                                <Clock className="w-3 h-3" />
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <a
                                                    href={app.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-slate-500 bg-slate-50 rounded-lg md:bg-transparent md:text-slate-400 hover:text-brand-blue transition-colors"
                                                    title="View Resume"
                                                >
                                                    <Eye className="w-5 h-5 md:w-4 md:h-4" />
                                                </a>
                                                <form action={deleteApplicationAction} className="inline">
                                                    <input type="hidden" name="id" value={app._id?.toString() || ''} />
                                                    <button
                                                        type="submit"
                                                        className="p-2 text-red-500 bg-red-50 rounded-lg md:bg-transparent md:text-slate-400 hover:text-red-500 transition-colors"
                                                        title="Delete Application"
                                                        onClick={(e) => {
                                                            if (!confirm('Are you sure you want to delete this application?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="w-5 h-5 md:w-4 md:h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {applications.length > 0 && (
                <div className="mt-6 text-sm text-slate-500">
                    Total applications: {applications.length}
                </div>
            )}
        </div>
    );
}