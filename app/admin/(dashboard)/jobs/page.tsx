import { getJobs } from '@/lib/data';
import { createJobAction, deleteJobAction, updateJobStatusAction } from '@/lib/actions';
import { Briefcase, MapPin, Trash2, Plus, Power, PowerOff } from 'lucide-react';

export default async function JobsPage() {
    const jobs = await getJobs();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Job Openings</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Add Job Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Post New Job
                        </h2>
                        <form action={createJobAction} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                                <input name="title" required className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Senior Teacher" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                                <input name="department" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Science" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                    <input name="location" required className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Delhi" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                    <select name="type" className="w-full px-3 py-2 border rounded-lg">
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea name="description" required rows={4} className="w-full px-3 py-2 border rounded-lg" placeholder="Job details..." />
                            </div>
                            <button type="submit" className="w-full py-2 bg-brand-blue text-white rounded-lg font-medium hover:bg-blue-900">
                                Post Job
                            </button>
                        </form>
                    </div>
                </div>

                {/* Job List */}
                <div className="lg:col-span-2 space-y-4">
                    {jobs.length === 0 ? (
                        <div className="text-center p-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <Briefcase className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                            <p className="text-slate-500">No active job openings.</p>
                        </div>
                    ) : (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        jobs.map((job: any) => (
                            <div key={job._id} className="bg-white p-6 rounded-xl border border-slate-200 group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                            <span className="px-2 py-0.5 bg-blue-50 text-brand-blue rounded-full text-xs font-medium">{job.type}</span>
                                            {job.department && <span className="text-xs border px-2 py-0.5 rounded text-slate-400">{job.department}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <form action={updateJobStatusAction}>
                                            <input type="hidden" name="id" value={job._id?.toString() || ''} />
                                            <input type="hidden" name="status" value={job.status === 'active' ? 'closed' : 'active'} />
                                            <button
                                                type="submit"
                                                className={`p-2 rounded-lg transition-colors ${job.status === 'active'
                                                    ? 'text-green-500 hover:bg-green-50'
                                                    : 'text-slate-400 hover:bg-slate-50'
                                                    }`}
                                                title={job.status === 'active' ? 'Close Job' : 'Activate Job'}
                                            >
                                                {job.status === 'active' ? <Power size={18} /> : <PowerOff size={18} />}
                                            </button>
                                        </form>
                                        <form action={deleteJobAction}>
                                            <input type="hidden" name="id" value={job._id?.toString() || ''} />
                                            <button
                                                type="submit"
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={(e) => !confirm('Delete this job?') && e.preventDefault()}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <p className="mt-3 text-slate-600 text-sm line-clamp-2">{job.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
