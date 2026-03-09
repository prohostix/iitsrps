import { getSiteData } from "@/lib/data";

export default async function PrivacyPolicyPage() {
    const data = await getSiteData();
    const contact = data.contact;
    return (
        <div className="pt-20 pb-16">
            {/* Hero Section */}
            <section className="relative py-20 bg-[#FFF8F0] border-b border-brand-blue/10 mb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className="text-brand-blue font-semibold tracking-wider uppercase mb-3 text-sm">Legal</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-brand-grey text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="prose prose-lg max-w-none">
                    <p className="text-slate-600 mb-8">
                        <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Information We Collect</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>We collect information you provide directly to us, such as when you:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Fill out contact forms or enquiry forms</li>
                                <li>Apply for partnership opportunities</li>
                                <li>Subscribe to our newsletters or communications</li>
                                <li>Contact us for support or information</li>
                            </ul>
                            <p>This information may include your name, email address, phone number, organization details, and any messages you send to us.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">How We Use Your Information</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Respond to your enquiries and provide customer support</li>
                                <li>Process partnership applications and communications</li>
                                <li>Send you information about our courses and services</li>
                                <li>Improve our website and services</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Information Sharing</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>With service providers who assist us in operating our website and conducting our business</li>
                                <li>When required by law or to protect our rights and safety</li>
                                <li>With your explicit consent for specific purposes</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Data Security</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Cookies</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Remember your preferences</li>
                                <li>Understand how you use our website</li>
                                <li>Provide secure access to admin areas</li>
                            </ul>
                            <p>You can control cookies through your browser settings.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Your Rights</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Contact Us</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                            <div className="bg-slate-50 p-6 rounded-lg">
                                <p><strong>Email:</strong> {contact.email}</p>
                                <p><strong>Phone:</strong> {contact.phone}</p>
                                <p><strong>Address:</strong> {contact.address}</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Changes to This Policy</h2>
                        <div className="space-y-4 text-slate-600">
                            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}