import React from 'react';

/**
 * Loading Skeleton Component
 * Displays animated placeholder content while data is loading
 * Used to improve perceived performance and reduce layout shift
 */

// Base skeleton with shimmer animation
const SkeletonBase = ({ className = '' }) => (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);

// Product card skeleton for home page grid
export const ProductCardSkeleton = () => (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Image placeholder */}
        <SkeletonBase className="aspect-[4/3] rounded-none" />

        <div className="p-6 space-y-4">
            {/* Category badge */}
            <SkeletonBase className="h-6 w-20 rounded-full" />

            {/* Title */}
            <SkeletonBase className="h-6 w-3/4" />

            {/* Description lines */}
            <div className="space-y-2">
                <SkeletonBase className="h-4 w-full" />
                <SkeletonBase className="h-4 w-2/3" />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-2">
                <SkeletonBase className="h-5 w-24" />
                <SkeletonBase className="h-8 w-8 rounded-full" />
            </div>
        </div>
    </div>
);

// Grid of product card skeletons
export const ProductGridSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
        ))}
    </div>
);

// Product detail page skeleton
export const ProductDetailSkeleton = () => (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left - Image */}
                <div>
                    <SkeletonBase className="aspect-square rounded-3xl" />
                </div>

                {/* Right - Details */}
                <div className="space-y-6">
                    <SkeletonBase className="h-6 w-24 rounded-full" />
                    <SkeletonBase className="h-10 w-3/4" />
                    <div className="space-y-2">
                        <SkeletonBase className="h-4 w-full" />
                        <SkeletonBase className="h-4 w-full" />
                        <SkeletonBase className="h-4 w-2/3" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="text-center">
                                <SkeletonBase className="h-8 w-12 mx-auto mb-2" />
                                <SkeletonBase className="h-4 w-16 mx-auto" />
                            </div>
                        ))}
                    </div>

                    {/* Button */}
                    <SkeletonBase className="h-14 w-full rounded-xl" />
                </div>
            </div>

            {/* Map section */}
            <div className="mt-16">
                <SkeletonBase className="h-8 w-48 mb-6" />
                <SkeletonBase className="h-96 w-full rounded-2xl" />
            </div>
        </div>
    </div>
);

// Table row skeleton for dashboard
export const TableRowSkeleton = () => (
    <tr>
        <td className="px-6 py-4">
            <div className="flex items-center gap-4">
                <SkeletonBase className="w-12 h-12 rounded-lg" />
                <div className="space-y-2">
                    <SkeletonBase className="h-4 w-32" />
                    <SkeletonBase className="h-3 w-48" />
                </div>
            </div>
        </td>
        <td className="px-6 py-4">
            <SkeletonBase className="h-6 w-20 rounded-full" />
        </td>
        <td className="px-6 py-4">
            <SkeletonBase className="h-8 w-8 rounded-full" />
        </td>
        <td className="px-6 py-4">
            <SkeletonBase className="h-4 w-16" />
        </td>
        <td className="px-6 py-4">
            <div className="flex gap-2 justify-end">
                <SkeletonBase className="h-8 w-8 rounded-lg" />
                <SkeletonBase className="h-8 w-8 rounded-lg" />
                <SkeletonBase className="h-8 w-8 rounded-lg" />
            </div>
        </td>
    </tr>
);

// Dashboard table skeleton
export const DashboardTableSkeleton = ({ rows = 5 }) => (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
            <SkeletonBase className="h-6 w-32" />
        </div>
        <table className="w-full">
            <thead className="bg-slate-50">
                <tr>
                    {['Product', 'Category', 'Score', 'Stages', 'Actions'].map(h => (
                        <th key={h} className="text-left px-6 py-4">
                            <SkeletonBase className="h-4 w-16" />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: rows }).map((_, i) => (
                    <TableRowSkeleton key={i} />
                ))}
            </tbody>
        </table>
    </div>
);

export default SkeletonBase;
