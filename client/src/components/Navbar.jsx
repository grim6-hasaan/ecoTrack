import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Menu, X, User, LogOut, Settings, ShoppingBag } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-emerald-100 p-2 rounded-xl group-hover:bg-emerald-200 transition-colors">
                                <Leaf className="h-6 w-6 text-emerald-700" />
                            </div>
                            <span className="font-serif font-bold text-2xl text-slate-900 tracking-tight">
                                EcoTrack
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link to="/" className="text-slate-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                            Discover
                        </Link>
                        <Link to="/about" className="text-slate-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                            Our Mission
                        </Link>
                        <Link to="/contact" className="text-slate-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                            Contact
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                {user?.role === 'business' && (
                                    <Link
                                        to="/dashboard"
                                        className="text-slate-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-emerald-700">
                                                {user?.name?.charAt(0)?.toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 hidden lg:block">
                                            {user?.name?.split(' ')[0]}
                                        </span>
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-fade-in">
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <p className="font-semibold text-slate-900">{user?.name}</p>
                                                <p className="text-sm text-slate-500">{user?.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                                            >
                                                <Settings className="w-4 h-4" /> Settings
                                            </Link>
                                            <Link
                                                to="/orders"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                                            >
                                                <ShoppingBag className="w-4 h-4" /> My Orders
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-slate-600 hover:text-emerald-700 font-medium text-sm transition-colors px-4 py-2"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-700/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-500 hover:text-emerald-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl animate-fade-in-down">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                            Discover
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                            Our Mission
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                            Contact
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {user?.role === 'business' && (
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                    className="block w-full text-left px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-center mt-4 px-5 py-3 bg-emerald-700 text-white font-bold rounded-xl"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
