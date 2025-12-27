import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowDown } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products', {
                    params: { keyword: searchTerm }
                });
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white pt-32 pb-40 px-4 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative max-w-7xl mx-auto text-center z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur">
                        Transparency Matters
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight mb-8 leading-tight">
                        Trace the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Journey</span><br />
                        Behind Every Product
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                        Empowering consumers with real-time supply chain data. From raw materials to your doorstep, know the story of what you buy.
                    </p>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-white rounded-full p-2 shadow-2xl">
                            <div className="pl-4 text-slate-400">
                                <Search className="h-6 w-6" />
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-lg"
                                placeholder="Search products, materials, or origins..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
                <div className="flex justify-between items-end mb-8 px-2">
                    <div>
                        <h2 className="text-3xl font-bold font-serif text-slate-900">Featured Collections</h2>
                        <p className="text-slate-500 mt-2">Explore verifiably sustainable goods.</p>
                    </div>
                    <button className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-sm">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span>Filters</span>
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-[400px] bg-white rounded-2xl shadow-sm"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, idx) => (
                            <div key={product._id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}

                        {products.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                                <Search className="h-12 w-12 mb-4 opacity-20" />
                                <p>No products found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
