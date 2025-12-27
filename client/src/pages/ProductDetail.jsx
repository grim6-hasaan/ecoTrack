import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SupplyChainMap from '../components/SupplyChainMap';
import { ArrowLeft, CheckCircle2, Calendar, MapPin, Globe, ShieldCheck, Leaf } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Product not found.</div>;

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-emerald-700 mb-8 font-medium transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Discovery
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Images & Key Stats */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/5 aspect-[4/3] relative group">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <h4 className="font-bold font-serif text-slate-900 mb-4 border-b border-slate-100 pb-2">Sustainability Impact</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-emerald-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-2xl">
                                        <Leaf className="h-5 w-5" />
                                        {product.sustainabilityRating}/10
                                    </div>
                                    <p className="text-emerald-600 text-xs font-medium uppercase mt-1">Eco Score</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold text-2xl">
                                        <Globe className="h-5 w-5 text-slate-400" />
                                        {product.stages.length}
                                    </div>
                                    <p className="text-slate-500 text-xs font-medium uppercase mt-1">Countries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content & Journey */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                                    {product.category}
                                </span>
                                {product.sustainabilityRating >= 8 && (
                                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                                        <ShieldCheck className="h-4 w-4" /> Verified Sustainable
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="mb-0">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                    Key Materials
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.materials.map(mat => (
                                        <span key={mat} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                                            {mat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Journey Map & Timeline */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold font-serif text-slate-900">Supply Chain Journey</h3>
                            </div>

                            <SupplyChainMap stages={product.stages} />

                            {/* Vertical Timeline */}
                            <div className="relative pl-8 pt-4 space-y-8 before:absolute before:left-3 before:top-6 before:bottom-0 before:w-0.5 before:bg-slate-200">
                                {product.stages.map((stage, index) => (
                                    <div key={index} className="relative group">
                                        <div className="absolute -left-8 top-1 bg-slate-50 p-1 rounded-full border border-slate-200 group-hover:border-emerald-500 transition-colors">
                                            <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-emerald-500' : 'bg-slate-300 group-hover:bg-emerald-400'}`}></div>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                                                <h4 className="font-bold text-lg text-slate-900">{stage.stageName}</h4>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-medium">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {new Date(stage.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 mb-4">{stage.description}</p>
                                            <div className="flex items-center text-sm text-slate-400">
                                                <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                                                {stage.address}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
