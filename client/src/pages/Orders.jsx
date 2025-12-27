import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Calendar, CheckCircle, Clock, XCircle, Eye, ShoppingBag } from 'lucide-react';

const Orders = () => {
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/orders/myorders');
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'processing':
                return <Clock className="w-5 h-5 text-amber-500" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-slate-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-700';
            case 'processing':
                return 'bg-amber-100 text-amber-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-serif text-slate-900">My Orders</h1>
                    <p className="text-slate-500 mt-2">Track and manage your purchases</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
                        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h3>
                        <p className="text-slate-500 mb-8">Start exploring sustainable products and make your first purchase!</p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors"
                        >
                            <Package className="w-5 h-5" /> Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        {order.product?.images?.[0] && (
                                            <img
                                                src={order.product.images[0]}
                                                alt={order.product.name}
                                                className="w-16 h-16 rounded-xl object-cover"
                                            />
                                        )}
                                        <div>
                                            <h3 className="font-bold text-slate-900">{order.product?.name || 'Product'}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </span>
                                                <span>•</span>
                                                <span className="capitalize">{order.paymentMethod}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="capitalize">{order.status}</span>
                                        </span>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">PKR {order.totalPrice?.toLocaleString()}</p>
                                            <p className={`text-sm ${order.isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </p>
                                        </div>
                                        <Link
                                            to={`/product/${order.product?._id}`}
                                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
