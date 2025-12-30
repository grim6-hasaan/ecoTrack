import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Leaf } from 'lucide-react';

/**
 * ProductCard Component
 * 
 * Displays a product in a visually appealing card format
 * Used in the home page product grid
 * 
 * Features:
 * - Hover animations and scale effects
 * - Category badge
 * - Sustainability rating indicator
 * - Supply chain stage count
 * 
 * @param {Object} product - The product data to display
 * @param {string} product._id - Product ID for linking
 * @param {string} product.name - Product name
 * @param {string} product.description - Product description
 * @param {string} product.category - Product category
 * @param {string[]} product.images - Array of image URLs
 * @param {number} product.sustainabilityRating - Eco score (1-10)
 * @param {Object[]} product.stages - Supply chain stages array
 */
const ProductCard = ({ product }) => {
    // Guard against missing data
    if (!product) return null;

    return (
        <Link
            to={`/product/${product._id}`}
            className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100 
                 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100"
        >
            {/* Product Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy" // Lazy load for better performance
                />

                {/* Category Badge - Top Left */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold 
                          bg-white/90 backdrop-blur text-slate-800 shadow-sm border border-white/20">
                        {product.category}
                    </span>
                </div>

                {/* Sustainability Rating Badge - Bottom Right */}
                <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-1.5 bg-emerald-700/90 backdrop-blur text-white 
                          px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        <Leaf className="h-3 w-3" />
                        <span>{product.sustainabilityRating}/10</span>
                    </div>
                </div>
            </div>

            {/* Card Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Product Name */}
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2 leading-tight 
                       group-hover:text-emerald-700 transition-colors">
                    {product.name}
                </h3>

                {/* Product Description - Truncated to 2 lines */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                    {/* Supply Chain Stages Count */}
                    <div className="flex items-center text-slate-400 text-xs font-medium">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                        <span>{product.stages?.length || 0} Stops</span>
                    </div>

                    {/* Call to Action */}
                    <span className="flex items-center text-emerald-700 text-sm font-bold 
                          group-hover:translate-x-1 transition-transform">
                        Track Journey <ArrowRight className="h-4 w-4 ml-1.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
