import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { SiteData } from "@/lib/data";

export function Footer({ data }: { data: SiteData }) {
    const contact = data.contact || {
        phone: '',
        email: '',
        address: '',
        socials: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        }
    };
    return (
        <footer className="bg-white text-slate-600 py-16 border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">IITS</h3>
                        <p className="text-sm leading-relaxed">
                            IITS Research & Policy Studies. Empowering individuals through quality education and skill development for a better tomorrow.
                        </p>
                        <div className="flex gap-4">
                            {contact.socials?.facebook && (
                                <Link href={contact.socials.facebook} target="_blank" className="hover:text-brand-blue transition-colors"><Facebook className="w-5 h-5" /></Link>
                            )}
                            {contact.socials?.twitter && (
                                <Link href={contact.socials.twitter} target="_blank" className="hover:text-brand-blue transition-colors"><Twitter className="w-5 h-5" /></Link>
                            )}
                            {contact.socials?.instagram && (
                                <Link href={contact.socials.instagram} target="_blank" className="hover:text-brand-blue transition-colors"><Instagram className="w-5 h-5" /></Link>
                            )}
                            {contact.socials?.linkedin && (
                                <Link href={contact.socials.linkedin} target="_blank" className="hover:text-brand-blue transition-colors"><Linkedin className="w-5 h-5" /></Link>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-brand-blue mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-brand-blue transition-colors">Services</Link></li>
                            <li><Link href="/partners" className="hover:text-brand-blue transition-colors">Partner With Us</Link></li>
                            <li><Link href="/careers" className="hover:text-brand-blue transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-brand-blue mb-6">Our Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/services" className="hover:text-brand-blue transition-colors">Distance Learning</Link></li>
                            <li><Link href="/services" className="hover:text-brand-blue transition-colors">Skill Enhancement</Link></li>
                            <li><Link href="/services" className="hover:text-brand-blue transition-colors">Career Counseling</Link></li>
                            <li><Link href="/services" className="hover:text-brand-blue transition-colors">Corporate Training</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-brand-blue mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-brand-blue shrink-0" />
                                <span>{contact.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                                <span>{contact.phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-brand-blue shrink-0" />
                                <span>{contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} IITS Research & Policy Studies. All rights reserved.</p>
                    <p>Designed with excellence for IITS.</p>
                </div>
            </div>
        </footer>
    );
}
