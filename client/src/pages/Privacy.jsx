import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Users, Database, Mail } from 'lucide-react';

/**
 * Privacy Policy Page
 * Important for legal compliance and user trust
 * Explains how user data is collected, used, and protected
 */
const Privacy = () => {
    const lastUpdated = 'December 30, 2024';

    const sections = [
        {
            icon: Database,
            title: 'Information We Collect',
            content: `We collect information you provide directly to us, such as when you create an account, 
      make a purchase, or contact us. This may include your name, email address, phone number, 
      company information, and payment details. We also automatically collect certain information 
      when you use our platform, including your IP address, browser type, and usage patterns.`
        },
        {
            icon: Eye,
            title: 'How We Use Your Information',
            content: `We use the information we collect to provide, maintain, and improve our services, 
      process transactions, send you technical notices and support messages, and respond to your 
      inquiries. We may also use your information to send promotional communications (you can 
      opt out at any time) and to monitor and analyze trends, usage, and activities.`
        },
        {
            icon: Users,
            title: 'Information Sharing',
            content: `We do not sell, trade, or otherwise transfer your personal information to third parties 
      without your consent, except as described in this policy. We may share your information with 
      service providers who assist us in operating our platform, conducting our business, or serving 
      our users. We may also disclose information when required by law or to protect our rights.`
        },
        {
            icon: Lock,
            title: 'Data Security',
            content: `We take reasonable measures to help protect your personal information from loss, theft, 
      misuse, unauthorized access, disclosure, alteration, and destruction. We use industry-standard 
      encryption (SSL/TLS) for data transmission and secure our databases with appropriate access controls. 
      However, no method of transmission over the Internet is 100% secure.`
        },
        {
            icon: Shield,
            title: 'Your Rights',
            content: `You have the right to access, correct, or delete your personal information at any time. 
      You can update your account information through your profile settings or by contacting us. 
      You may also request a copy of all personal data we hold about you. To exercise these rights, 
      please contact us at privacy@ecotrack.io.`
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            {/* Header */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-3 text-emerald-600 mb-4">
                        <Shield className="w-6 h-6" />
                        <span className="font-semibold">Legal</span>
                    </div>
                    <h1 className="text-4xl font-bold font-serif text-slate-900 mb-4">Privacy Policy</h1>
                    <p className="text-slate-600">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                        At EcoTrack, we take your privacy seriously. This Privacy Policy explains how we collect,
                        use, disclose, and safeguard your information when you use our supply chain transparency
                        platform. Please read this policy carefully.
                    </p>

                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <section.icon className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                                        <p className="text-slate-600 leading-relaxed">{section.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-12 bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-emerald-600" />
                            <h3 className="text-lg font-bold text-slate-900">Questions About This Policy?</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <a
                            href="mailto:privacy@ecotrack.io"
                            className="text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                            privacy@ecotrack.io
                        </a>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-6">
                        <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Terms of Service
                        </Link>
                        <Link to="/contact" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
