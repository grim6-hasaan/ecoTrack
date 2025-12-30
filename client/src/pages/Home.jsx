import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Leaf, ArrowRight, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';

/**
 * Home Page - Main landing page of EcoTrack
 * Features:
 * - Hero section with search
 * - Category filtering
 * - Product grid with skeleton loading
 * - Empty state handling
 */
const Home = () => {
    // State management
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    /**
     * Fetches all products from the API
     * Includes error handling and loading state management
     */
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories from products
    const categories = useMemo(() => {
        const cats = [...new Set(products.map(p => p.category))];
        return cats.filter(Boolean).sort();
    }, [products]);

    // Filter products based on search, category, and rating
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Search filter
            const matchesSearch = !searchQuery ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory = !selectedCategory || product.category === selectedCategory;

            // Rating filter
            const matchesRating = product.sustainabilityRating >= minRating;

            return matchesSearch && matchesCategory && matchesRating;
        });
    }, [products, searchQuery, selectedCategory, minRating]);

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setMinRating(0);
    };

    // Check if any filters are active
    const hasActiveFilters = searchQuery || selectedCategory || minRating > 0;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 pt-32 pb-24 px-4 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-5xl mx-auto text-center z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-8">
                        <Leaf className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-semibold tracking-wider uppercase">
                            Supply Chain Transparency
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white mb-6 leading-tight">
                        Trace the Journey of
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                            Sustainable Products
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Discover where your products come from. See every step of the supply chain,
                        from raw materials to your doorstep.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-50 group-hover:opacity-75 blur transition-opacity"></div>
                            <div className="relative flex items-center bg-white rounded-xl shadow-2xl">
                                <Search className="absolute left-5 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search for eco-friendly products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-32 py-5 bg-transparent text-slate-900 placeholder-slate-400 rounded-xl focus:outline-none text-lg"
                                />
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`absolute right-4 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    <span className="text-sm font-medium hidden sm:inline">Filters</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
                        <div>
                            <p className="text-3xl font-bold text-white">{products.length}+</p>
                            <p className="text-slate-400 text-sm">Products Listed</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">{categories.length}</p>
                            <p className="text-slate-400 text-sm">Categories</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">100%</p>
                            <p className="text-slate-400 text-sm">Transparent</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Panel */}
            {showFilters && (
                <div className="bg-white border-b border-slate-200 shadow-sm animate-slide-down">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-wrap items-center gap-6">
                            {/* Category Filter */}
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Rating Filter */}
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Min Eco Score: {minRating}/10
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    value={minRating}
                                    onChange={(e) => setMinRating(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold font-serif text-slate-900">
                            {hasActiveFilters ? 'Filtered Products' : 'Featured Products'}
                        </h2>
                        <p className="text-slate-500 mt-2">
                            {loading ? 'Loading...' : `${filteredProducts.length} products found`}
                        </p>
                    </div>
                    {hasActiveFilters && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Filter className="w-4 h-4" />
                            <span>Filters applied</span>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && <ProductGridSkeleton count={6} />}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h3>
                        <p className="text-slate-500 mb-6">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="px-6 py-3 bg-emerald-700 text-white font-medium rounded-xl hover:bg-emerald-800 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                        <p className="text-slate-500 mb-6">
                            {hasActiveFilters
                                ? 'Try adjusting your filters or search query.'
                                : 'Check back later for new products.'}
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-emerald-700 text-white font-medium rounded-xl hover:bg-emerald-800 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product._id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-emerald-700 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
                        Are You a Business?
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join EcoTrack and showcase your commitment to transparency.
                        List your products and let consumers trace their journey.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
