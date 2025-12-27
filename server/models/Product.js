const mongoose = require('mongoose');

const supplyChainStageSchema = mongoose.Schema({
    stageName: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    address: { type: String },
    date: { type: Date, default: Date.now },
});

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    materials: [String],
    images: [String],
    sustainabilityRating: { type: Number, required: true, min: 1, max: 10 },
    stages: [supplyChainStageSchema],
}, {
    timestamps: true,
});

// Index for geospatial queries if needed later
// productSchema.index({ 'stages.location': '2dsphere' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
