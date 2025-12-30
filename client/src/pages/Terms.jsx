import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertTriangle, Ban, Scale, Mail } from 'lucide-react';

/**
 * Terms of Service Page
 * Legal agreement between EcoTrack and its users
 * Defines rules and guidelines for using the platform
 */
const Terms = () => {
    const lastUpdated = 'December 30, 2024';

    const sections = [
        {
            icon: CheckCircle,
            title: 'Acceptance of Terms',
            content: `By accessing or using EcoTrack's platform, you agree to be bound by these Terms of Service 
      and all applicable laws and regulations. If you do not agree with any of these terms, you are 
      prohibited from using or accessing this platform. The materials contained on this platform are 
      protected by applicable copyright and trademark law.`
        },
        {
            icon: FileText,
            title: 'Use License',
            content: `Permission is granted to temporarily access the materials on EcoTrack's platform for 
      personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer 
      of title, and under this license you may not: modify or copy the materials; use the materials 
      for any commercial purpose; attempt to reverse engineer any software; or remove any copyright 
      or proprietary notations from the materials.`
        },
        {
            icon: Scale,
            title: 'User Accounts',
            content: `When you create an account with us, you must provide accurate, complete, and current 
      information. You are responsible for safeguarding your password and for all activities that 
      occur under your account. You agree to immediately notify us of any unauthorized use of your 
      account. Business accounts are subject to additional verification and compliance requirements.`
        },
        {
            icon: AlertTriangle,
            title: 'Disclaimer',
            content: `The materials on EcoTrack's platform are provided on an 'as is' basis. EcoTrack makes 
      no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
      including, without limitation, implied warranties or conditions of merchantability, fitness 
      for a particular purpose, or non-infringement of intellectual property or other violation of rights.`
        },
        {
            icon: Ban,
            title: 'Limitations',
            content: `In no event shall EcoTrack or its suppliers be liable for any damages (including, 
      without limitation, damages for loss of data or profit, or due to business interruption) 
      arising out of the use or inability to use materials on EcoTrack's platform, even if EcoTrack 
      or an authorized representative has been notified orally or in writing of the possibility of such damage.`
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            {/* Header */}
            <div className="bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-3 text-emerald-600 mb-4">
                        <FileText className="w-6 h-6" />
                        <span className="font-semibold">Legal</span>
                    </div>
                    <h1 className="text-4xl font-bold font-serif text-slate-900 mb-4">Terms of Service</h1>
                    <p className="text-slate-600">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                        Welcome to EcoTrack. These Terms of Service govern your use of our website and services.
                        By using our platform, you agree to comply with and be bound by these terms. Please review
                        them carefully before using our services.
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

                    {/* Governing Law */}
                    <div className="mt-12 bg-slate-100 rounded-2xl p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Governing Law</h3>
                        <p className="text-slate-600 leading-relaxed">
                            These terms and conditions are governed by and construed in accordance with the laws of
                            Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that
                            location. Any disputes arising from these terms will be resolved through binding arbitration.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-12 bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-emerald-600" />
                            <h3 className="text-lg font-bold text-slate-900">Questions About These Terms?</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <a
                            href="mailto:legal@ecotrack.io"
                            className="text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                            legal@ecotrack.io
                        </a>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-6">
                        <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Privacy Policy
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

export default Terms;
