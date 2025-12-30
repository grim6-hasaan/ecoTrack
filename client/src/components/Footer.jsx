import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

/**
 * Footer Component
 * 
 * Global footer displayed on all pages
 * Contains:
 * - Brand information
 * - Quick navigation links
 * - Support links
 * - Contact information
 * - Social media links
 * - Payment methods
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 text-white">
            {/* Scroll to Top Button */}
            <div className="flex justify-center -mt-6 relative z-10">
                <button
                    onClick={scrollToTop}
                    className="p-3 bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg transition-colors"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-emerald-600 p-2 rounded-xl">
                                <Leaf className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-serif font-bold text-2xl text-white">EcoTrack</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Empowering consumers with transparent supply chain data.
                            Know the story behind every product you buy.
                        </p>

                        {/* Social Media Links */}
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, label: 'Facebook', href: '#' },
                                { icon: Twitter, label: 'Twitter', href: '#' },
                                { icon: Instagram, label: 'Instagram', href: '#' },
                                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Discover Products', to: '/' },
                                { label: 'Our Mission', to: '/about' },
                                { label: 'Contact Us', to: '/contact' },
                                { label: 'Business Portal', to: '/dashboard' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-slate-400 hover:text-emerald-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Support</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Help Center', to: '/contact' },
                                { label: 'Privacy Policy', to: '/privacy' },
                                { label: 'Terms of Service', to: '/terms' },
                                { label: 'FAQ', to: '/contact' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-slate-400 hover:text-emerald-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-400">
                                    123 Green Street, Suite 400<br />
                                    San Francisco, CA 94102
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-emerald-500" />
                                <a
                                    href="mailto:hello@ecotrack.io"
                                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                                >
                                    hello@ecotrack.io
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-emerald-500" />
                                <a
                                    href="tel:+15551234567"
                                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                                >
                                    +1 (555) 123-4567
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-slate-500 text-sm">
                            © {currentYear} EcoTrack. All rights reserved.
                        </p>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-slate-500">Accepted Payments:</span>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium text-slate-400">
                                    Visa
                                </span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium text-slate-400">
                                    Mastercard
                                </span>
                                <span className="px-2 py-1 bg-red-900/50 rounded text-xs font-medium text-red-300">
                                    JazzCash
                                </span>
                                <span className="px-2 py-1 bg-green-900/50 rounded text-xs font-medium text-green-300">
                                    EasyPaisa
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
