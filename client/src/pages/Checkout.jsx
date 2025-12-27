import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { CreditCard, Smartphone, ArrowLeft, CheckCircle, Shield, Lock } from 'lucide-react';

const Checkout = () => {
    const { productId } = useParams();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // Demo product price
    const totalPrice = 2999; // PKR

    const paymentMethods = [
        { id: 'stripe', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
        { id: 'jazzcash', name: 'JazzCash', icon: Smartphone, description: 'Pay with JazzCash Mobile Wallet', color: 'text-red-600' },
        { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone, description: 'Pay with EasyPaisa Mobile Wallet', color: 'text-green-600' },
    ];

    const handlePayment = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: `/checkout/${productId}` } } });
            return;
        }

        setIsProcessing(true);

        try {
            let endpoint = '';
            let payload = { amount: totalPrice, orderId: Date.now().toString() };

            switch (paymentMethod) {
                case 'jazzcash':
                    endpoint = '/api/payment/jazzcash/initiate';
                    payload.phone = phone;
                    break;
                case 'easypaisa':
                    endpoint = '/api/payment/easypaisa/initiate';
                    payload.phone = phone;
                    break;
                default:
                    endpoint = '/api/payment/stripe/create-intent';
            }

            const { data } = await axios.post(`http://localhost:5000${endpoint}`, payload);

            // Create order
            await axios.post('http://localhost:5000/api/orders', {
                product: productId,
                paymentMethod,
                totalPrice
            });

            // Simulate success for demo
            setTimeout(() => {
                setOrderComplete(true);
                setIsProcessing(false);
            }, 2000);

        } catch (error) {
            console.error('Payment error:', error);
            setIsProcessing(false);
            alert('Payment failed. Please try again.');
        }
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-bold font-serif text-slate-900 mb-4">Payment Successful!</h1>
                    <p className="text-slate-600 mb-8">
                        Thank you for your order. You will receive a confirmation email shortly.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 mb-8 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Methods */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                            <h2 className="text-2xl font-bold font-serif text-slate-900 mb-6">Select Payment Method</h2>

                            <div className="space-y-4 mb-8">
                                {paymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === method.id
                                                ? 'border-emerald-500 bg-emerald-50'
                                                : 'border-slate-100 hover:border-slate-200'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? 'bg-emerald-600' : 'bg-slate-100'
                                            }`}>
                                            <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-white' : method.color || 'text-slate-600'
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">{method.name}</p>
                                            <p className="text-sm text-slate-500">{method.description}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === method.id ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                                            }`}>
                                            {paymentMethod === method.id && (
                                                <CheckCircle className="w-full h-full text-white" />
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Phone Number for Mobile Wallets */}
                            {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                                <div className="mb-8">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="03XX-XXXXXXX"
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                            )}

                            {/* Card Details for Stripe */}
                            {paymentMethod === 'stripe' && (
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing || ((paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && !phone)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/25 transition-all"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        Pay PKR {totalPrice.toLocaleString()}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-28">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>PKR {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600">Free</span>
                                </div>
                                <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900">
                                    <span>Total</span>
                                    <span>PKR {totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-xl">
                                <Shield className="w-5 h-5 text-emerald-600" />
                                <span>Your payment is secure and encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
