const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
    {
        name: 'Organic Cotton T-Shirt',
        description: 'A premium, eco-friendly t-shirt made from 100% organic cotton sourced from sustainable farms.',
        category: 'Clothing',
        materials: ['Organic Cotton'],
        sustainabilityRating: 9,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stages: [
            {
                stageName: 'Cotton Farming',
                description: 'Harvesting organic cotton without harmful pesticides.',
                location: { type: 'Point', coordinates: [76.7794, 30.7333] }, // Chandigarh, India (approx)
                address: 'Green Fields Farm, Punjab, India',
                date: new Date('2023-01-15')
            },
            {
                stageName: 'Spinning & Weaving',
                description: 'Processing raw cotton into fabric using renewable energy.',
                location: { type: 'Point', coordinates: [72.5714, 23.0225] }, // Ahmedabad, India
                address: 'EcoTextile Mill, Ahmedabad, India',
                date: new Date('2023-02-10')
            },
            {
                stageName: 'Distribution Center',
                description: 'Final packaging and shipping to retailers.',
                location: { type: 'Point', coordinates: [-0.1278, 51.5074] }, // London, UK
                address: 'EcoLogistics Hub, London, UK',
                date: new Date('2023-03-05')
            }
        ]
    },
    {
        name: 'Recycled Aluminum Water Bottle',
        description: 'Durable water bottle made from 100% recycled aluminum.',
        category: 'Accessories',
        materials: ['Recycled Aluminum', 'Bamboo'],
        sustainabilityRating: 8,
        images: ['https://images.unsplash.com/photo-1602143407151-0111d191c2c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        stages: [
            {
                stageName: 'Material Recovery',
                description: 'Collecting and sorting aluminum waste.',
                location: { type: 'Point', coordinates: [13.4050, 52.5200] }, // Berlin, Germany
                address: 'RecycleOne Facility, Berlin, Germany',
                date: new Date('2023-04-01')
            },
            {
                stageName: 'Manufacturing',
                description: 'Molding bottles and attaching bamboo caps.',
                location: { type: 'Point', coordinates: [2.3522, 48.8566] }, // Paris, France
                address: 'GreenMfg Plant, Paris, France',
                date: new Date('2023-04-20')
            }
        ]
    }
];

const importData = async () => {
    try {
        await Product.deleteMany();

        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
