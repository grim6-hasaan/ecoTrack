import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
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
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    Discover Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    Our Mission
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    Business Portal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
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
                                <a href="mailto:hello@ecotrack.io" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                    hello@ecotrack.io
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-emerald-500" />
                                <a href="tel:+15551234567" className="text-slate-400 hover:text-emerald-400 transition-colors">
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
                        <p className="text-slate-500 text-sm">
                            © {currentYear} EcoTrack. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <span className="text-slate-500">Accepted Payments:</span>
                            <div className="flex items-center gap-3 text-slate-400">
                                <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">Visa</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-xs font-medium">Mastercard</span>
                                <span className="px-2 py-1 bg-red-900/50 rounded text-xs font-medium text-red-300">JazzCash</span>
                                <span className="px-2 py-1 bg-green-900/50 rounded text-xs font-medium text-green-300">EasyPaisa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
