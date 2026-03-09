"use client";

import { useActionState, useEffect, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/lib/actions";

export default function ContactForm() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [state, action, isPending] = useActionState(async (prev: any, formData: FormData) => {
        const result = await submitEnquiry(formData);
        return result;
    }, null);

    const [formKey, setFormKey] = useState(0);

    // Reset form on success
    useEffect(() => {
        if (state?.success) {
            setFormKey(prev => prev + 1);
        }
    }, [state?.success]);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <h2 className="text-3xl font-bold text-brand-blue mb-6">Send us a Message</h2>
            {state?.success && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    Thank you! Your message has been sent successfully.
                </div>
            )}
            {state?.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    Something went wrong. Please try again.
                </div>
            )}
            <form key={formKey} action={action} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                        placeholder="Course Inquiry"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>Sending... <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                    )}
                </button>
            </form>
        </div>
    );
}
