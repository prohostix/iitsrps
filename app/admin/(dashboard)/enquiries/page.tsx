import { getEnquiries } from '@/lib/data';
import { deleteEnquiryAction, updateEnquiryStatusAction } from '@/lib/actions';
import { Mail, Clock, Trash2, CheckCircle, Circle } from 'lucide-react';

export default async function EnquiriesPage() {
    const enquiries = await getEnquiries();

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Enquiries</h1>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                {enquiries.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No enquiries found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {enquiries.map((enquiry: any) => (
                            <div key={enquiry._id} className="p-6 hover:bg-slate-50 transition-colors group">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 leading-tight">{enquiry.subject}</h3>
                                        <div className="text-sm text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                            <span className="font-medium text-brand-blue">{enquiry.name}</span>
                                            <span className="hidden sm:inline text-slate-300">&bull;</span>
                                            <span>{enquiry.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 sm:shrink-0">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${enquiry.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                                            enquiry.status === 'read' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {enquiry.status || 'new'}
                                        </span>
                                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </span>
                                        <div className="flex items-center gap-1 ml-auto sm:ml-0">
                                            {enquiry.status !== 'replied' && (
                                                <form action={updateEnquiryStatusAction}>
                                                    <input type="hidden" name="id" value={enquiry._id?.toString() || ''} />
                                                    <input type="hidden" name="status" value={enquiry.status === 'new' ? 'read' : 'replied'} />
                                                    <button
                                                        type="submit"
                                                        className="p-2 text-slate-400 hover:text-brand-blue transition-colors"
                                                        title={enquiry.status === 'new' ? 'Mark as Read' : 'Mark as Replied'}
                                                    >
                                                        {enquiry.status === 'new' ? <Circle size={16} /> : <CheckCircle size={16} />}
                                                    </button>
                                                </form>
                                            )}
                                            <form action={deleteEnquiryAction}>
                                                <input type="hidden" name="id" value={enquiry._id?.toString() || ''} />
                                                <button
                                                    type="submit"
                                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Delete Enquiry"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm mt-3 bg-slate-50 p-4 rounded-lg">
                                    {enquiry.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
