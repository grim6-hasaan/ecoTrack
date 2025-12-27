import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    Plus, Package, Trash2, Edit3, Eye, LogOut, BarChart3, Users, TrendingUp, Leaf,
    X, MapPin, Save, AlertCircle
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formError, setFormError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        materials: '',
        sustainabilityRating: 5,
        images: '',
        stages: [{ stageName: '', description: '', address: '', lat: '', lng: '' }]
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: '',
            materials: '',
            sustainabilityRating: 5,
            images: '',
            stages: [{ stageName: '', description: '', address: '', lat: '', lng: '' }]
        });
        setEditingProduct(null);
        setFormError('');
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                category: product.category,
                materials: product.materials.join(', '),
                sustainabilityRating: product.sustainabilityRating,
                images: product.images.join(', '),
                stages: product.stages.map(s => ({
                    stageName: s.stageName,
                    description: s.description,
                    address: s.address,
                    lat: s.location.coordinates[1],
                    lng: s.location.coordinates[0]
                }))
            });
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStageChange = (index, field, value) => {
        const newStages = [...formData.stages];
        newStages[index][field] = value;
        setFormData({ ...formData, stages: newStages });
    };

    const addStage = () => {
        setFormData({
            ...formData,
            stages: [...formData.stages, { stageName: '', description: '', address: '', lat: '', lng: '' }]
        });
    };

    const removeStage = (index) => {
        if (formData.stages.length > 1) {
            const newStages = formData.stages.filter((_, i) => i !== index);
            setFormData({ ...formData, stages: newStages });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setIsSaving(true);

        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                materials: formData.materials.split(',').map(m => m.trim()),
                sustainabilityRating: parseInt(formData.sustainabilityRating),
                images: formData.images.split(',').map(i => i.trim()),
                stages: formData.stages.map(s => ({
                    stageName: s.stageName,
                    description: s.description,
                    address: s.address,
                    location: {
                        type: 'Point',
                        coordinates: [parseFloat(s.lng), parseFloat(s.lat)]
                    }
                }))
            };

            if (editingProduct) {
                await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, payload);
            } else {
                await axios.post('http://localhost:5000/api/products', payload);
            }

            fetchProducts();
            handleCloseModal();
        } catch (error) {
            setFormError(error.response?.data?.message || 'Failed to save product');
        }
        setIsSaving(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const stats = [
        { icon: Package, label: 'Total Products', value: products.length, color: 'bg-emerald-100 text-emerald-600' },
        { icon: Users, label: 'Active Users', value: '2.4K', color: 'bg-blue-100 text-blue-600' },
        { icon: TrendingUp, label: 'Page Views', value: '12.5K', color: 'bg-purple-100 text-purple-600' },
        { icon: Leaf, label: 'Avg. Eco Score', value: products.length ? (products.reduce((a, p) => a + p.sustainabilityRating, 0) / products.length).toFixed(1) : '0', color: 'bg-teal-100 text-teal-600' },
    ];

    return (
        <div className="min-h-screen bg-slate-100 pt-20">
            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-5rem)] p-6">
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-slate-900">Business Portal</h2>
                        <p className="text-sm text-slate-500">{user?.company || 'Manage your products'}</p>
                    </div>

                    <nav className="space-y-2 flex-1">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium">
                            <Package className="w-5 h-5" />
                            Products
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                            <BarChart3 className="w-5 h-5" />
                            Analytics
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                            <Users className="w-5 h-5" />
                            Team
                        </a>
                    </nav>

                    <div className="pt-6 border-t border-slate-100">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 rounded-xl font-medium transition-colors">
                            <LogOut className="w-5 h-5" />
                            Exit Dashboard
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold font-serif text-slate-900">Product Dashboard</h1>
                            <p className="text-slate-500 mt-1">Manage your supply chain listings</p>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/25 transition-all hover:scale-105"
                        >
                            <Plus className="w-5 h-5" />
                            Add Product
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Your Products</h2>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto"></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="p-12 text-center">
                                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No products yet</h3>
                                <p className="text-slate-500 mb-6">Get started by adding your first product.</p>
                                <button
                                    onClick={() => handleOpenModal()}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 text-white font-medium rounded-lg"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Product
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Product</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Eco Score</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Stages</th>
                                            <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {products.map((product) => (
                                            <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-slate-900">{product.name}</p>
                                                            <p className="text-sm text-slate-500 truncate max-w-[200px]">{product.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                            <span className="text-emerald-700 font-bold text-sm">{product.sustainabilityRating}</span>
                                                        </div>
                                                        <span className="text-slate-500 text-sm">/10</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-900 font-medium">{product.stages.length}</span>
                                                    <span className="text-slate-500"> stops</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            to={`/product/${product._id}`}
                                                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleOpenModal(product)}
                                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit3 className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product._id)}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Add/Edit Product Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold font-serif text-slate-900">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {formError && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
                                <AlertCircle className="w-5 h-5" />
                                <p className="text-sm">{formError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                        placeholder="Organic Cotton T-Shirt"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                        placeholder="Clothing"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none"
                                    placeholder="Describe your product..."
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Materials (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="materials"
                                        value={formData.materials}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                        placeholder="Organic Cotton, Recycled Polyester"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Sustainability Rating (1-10)</label>
                                    <input
                                        type="number"
                                        name="sustainabilityRating"
                                        value={formData.sustainabilityRating}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Image URLs (comma-separated)</label>
                                <input
                                    type="text"
                                    name="images"
                                    value={formData.images}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                    placeholder="https://example.com/image1.jpg"
                                />
                            </div>

                            {/* Supply Chain Stages */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-slate-700">Supply Chain Stages</label>
                                    <button
                                        type="button"
                                        onClick={addStage}
                                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                                    >
                                        <Plus className="w-4 h-4" /> Add Stage
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.stages.map((stage, index) => (
                                        <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-emerald-600" /> Stage {index + 1}
                                                </span>
                                                {formData.stages.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeStage(index)}
                                                        className="text-red-500 hover:text-red-600"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    value={stage.stageName}
                                                    onChange={(e) => handleStageChange(index, 'stageName', e.target.value)}
                                                    placeholder="Stage Name (e.g., Cotton Farming)"
                                                    required
                                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={stage.address}
                                                    onChange={(e) => handleStageChange(index, 'address', e.target.value)}
                                                    placeholder="Address"
                                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={stage.description}
                                                    onChange={(e) => handleStageChange(index, 'description', e.target.value)}
                                                    placeholder="Description"
                                                    required
                                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 outline-none sm:col-span-2"
                                                />
                                                <input
                                                    type="number"
                                                    step="any"
                                                    value={stage.lat}
                                                    onChange={(e) => handleStageChange(index, 'lat', e.target.value)}
                                                    placeholder="Latitude"
                                                    required
                                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                                                />
                                                <input
                                                    type="number"
                                                    step="any"
                                                    value={stage.lng}
                                                    onChange={(e) => handleStageChange(index, 'lng', e.target.value)}
                                                    placeholder="Longitude"
                                                    required
                                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700 text-white font-medium rounded-xl hover:bg-emerald-800 transition-colors disabled:bg-emerald-400"
                                >
                                    {isSaving ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" /> {editingProduct ? 'Update' : 'Create'} Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
