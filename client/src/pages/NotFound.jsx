import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

/**
 * 404 Not Found Page
 * Displayed when users navigate to a non-existent route
 * Provides helpful navigation options to get back on track
 */
const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <h1 className="text-[180px] font-bold text-slate-100 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Search className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                            <p className="text-xl font-bold text-slate-900">Page not found</p>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold font-serif text-slate-900 mb-4">
                    Oops! You've wandered off the trail
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                    Don't worry, let's get you back on track to explore sustainable products.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/25"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500 mb-4">You might be looking for:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                            Browse Products
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link to="/about" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                            Our Mission
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link to="/contact" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
