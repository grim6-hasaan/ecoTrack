import React from 'react';
import { Globe, Leaf, Users, ShieldCheck, Target, Heart } from 'lucide-react';

const Mission = () => {
    const values = [
        {
            icon: Globe,
            title: 'Global Transparency',
            description: 'We believe every consumer deserves to know where their products come from and how they are made.'
        },
        {
            icon: Leaf,
            title: 'Sustainability First',
            description: 'Our platform prioritizes eco-friendly practices and helps businesses showcase their green initiatives.'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'We empower small businesses and conscious consumers to build a more ethical marketplace together.'
        },
        {
            icon: ShieldCheck,
            title: 'Verified Data',
            description: 'Every supply chain step is documented and verifiable, ensuring trust and accountability.'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-5xl mx-auto text-center z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-semibold tracking-wider uppercase mb-6">
                        Our Mission
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-8 leading-tight">
                        Building a More <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Transparent</span> World
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        EcoTrack is on a mission to revolutionize supply chain transparency. We connect conscious consumers
                        with ethical businesses, making it easier than ever to make informed purchasing decisions.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-4">Our Core Values</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        These principles guide everything we do at EcoTrack.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
                        >
                            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                                <value.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold font-serif text-slate-900 mb-3">{value.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story Section */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold mb-4">
                                <Heart className="w-5 h-5" /> Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                                From Idea to Impact
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    EcoTrack was born from a simple question: "Where does this product really come from?"
                                    As consumers became more conscious about sustainability, we realized there was no easy way
                                    to trace a product's journey from raw materials to the store shelf.
                                </p>
                                <p>
                                    Today, we partner with hundreds of businesses worldwide, helping them showcase their
                                    commitment to ethical sourcing and sustainable practices. Our platform has helped
                                    consumers make over 1 million informed purchasing decisions.
                                </p>
                                <p>
                                    We believe that transparency isn't just good for the planet—it's good for business.
                                    Companies that embrace openness build stronger relationships with their customers
                                    and contribute to a more sustainable future for everyone.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Nature and sustainability"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-emerald-600 text-white p-6 rounded-2xl shadow-xl">
                                <Target className="w-8 h-8 mb-2" />
                                <p className="text-2xl font-bold">1M+</p>
                                <p className="text-emerald-100 text-sm">Informed Decisions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-emerald-700 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
                        Ready to Join the Movement?
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                        Whether you're a business looking to showcase your supply chain or a consumer wanting to make better choices,
                        EcoTrack is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/dashboard" className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
                            Partner With Us
                        </a>
                        <a href="/" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl border-2 border-emerald-500 hover:bg-emerald-800 transition-colors">
                            Explore Products
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Mission;
