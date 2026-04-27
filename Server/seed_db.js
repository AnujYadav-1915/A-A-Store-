require('dotenv').config();
const mongoose = require('mongoose');
const productModel = require('./models/productModel');

const products = [
    {
        productName: "iPhone 15 Pro",
        brandName: "Apple",
        category: "mobiles",
        productImage: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop"],
        description: "The latest iPhone 15 Pro with Titanium design and A17 Pro chip.",
        price: 129900,
        sellingPrice: 119900,
        stock: 10
    },
    {
        productName: "MacBook Air M3",
        brandName: "Apple",
        category: "laptops",
        productImage: ["https://images.unsplash.com/photo-1517336714460-4c9889a79956?q=80&w=1000&auto=format&fit=crop"],
        description: "Ultra-slim MacBook Air with the powerful M3 chip.",
        price: 114900,
        sellingPrice: 104900,
        stock: 10
    },
    {
        productName: "Premium Wireless Headphones",
        brandName: "Sony",
        category: "earphones",
        productImage: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"],
        description: "Industry-leading noise canceling headphones with crystal clear sound.",
        price: 29900,
        sellingPrice: 24900,
        stock: 10
    },
    {
        productName: "Smart Watch Series 9",
        brandName: "Apple",
        category: "watches",
        productImage: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"],
        description: "Advanced health tracking and faster performance.",
        price: 41900,
        sellingPrice: 38900,
        stock: 10
    },
    {
        productName: "Modern Minimalist Camera",
        brandName: "Fujifilm",
        category: "camera",
        productImage: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"],
        description: "Classic design with modern photography tech.",
        price: 89900,
        sellingPrice: 84900,
        stock: 10
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");
        
        // Clear existing products if any (optional, but good for fresh start)
        // await productModel.deleteMany({});
        
        await productModel.insertMany(products);
        console.log("Successfully seeded 5 premium products!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
