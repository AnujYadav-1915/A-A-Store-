require('dotenv').config();
const mongoose = require('mongoose');
const productModel = require('./models/productModel');

const products = [
    // MOBILES
    {
        productName: "iPhone 15 Pro Max",
        brandName: "Apple",
        category: "mobiles",
        productImage: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop"],
        description: "Titanium design, A17 Pro chip, and the best camera in an iPhone.",
        price: 159900,
        sellingPrice: 148900,
        stock: 15
    },
    {
        productName: "Samsung Galaxy S24 Ultra",
        brandName: "Samsung",
        category: "mobiles",
        productImage: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop"],
        description: "The ultimate AI phone with 200MP camera and built-in S Pen.",
        price: 139900,
        sellingPrice: 129900,
        stock: 12
    },
    {
        productName: "Google Pixel 8 Pro",
        brandName: "Google",
        category: "mobiles",
        productImage: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop"],
        description: "The most intelligent Pixel yet with advanced AI photography.",
        price: 106900,
        sellingPrice: 99900,
        stock: 8
    },

    // LAPTOPS
    {
        productName: "MacBook Air 15-inch M3",
        brandName: "Apple",
        category: "laptops",
        productImage: ["https://images.unsplash.com/photo-1517336714460-4c9889a79956?q=80&w=1000&auto=format&fit=crop"],
        description: "The world's best-selling laptop is now even better with the M3 chip.",
        price: 134900,
        sellingPrice: 124900,
        stock: 20
    },
    {
        productName: "Dell XPS 13 Plus",
        brandName: "Dell",
        category: "laptops",
        productImage: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop"],
        description: "Our most powerful 13-inch laptop with a stunning edge-to-edge display.",
        price: 154900,
        sellingPrice: 144900,
        stock: 10
    },
    {
        productName: "ASUS ROG Zephyrus G14",
        brandName: "ASUS",
        category: "laptops",
        productImage: ["https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop"],
        description: "The world's most powerful 14-inch gaming laptop.",
        price: 164900,
        sellingPrice: 149900,
        stock: 5
    },

    // EARPHONES
    {
        productName: "AirPods Pro (2nd Gen)",
        brandName: "Apple",
        category: "earphones",
        productImage: ["https://images.unsplash.com/photo-1588423770186-80f8563ad672?q=80&w=1000&auto=format&fit=crop"],
        description: "Magical audio experience with active noise cancellation.",
        price: 24900,
        sellingPrice: 21900,
        stock: 50
    },
    {
        productName: "Sony WH-1000XM5",
        brandName: "Sony",
        category: "earphones",
        productImage: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"],
        description: "Industry-leading noise cancellation with spectacular sound.",
        price: 34900,
        sellingPrice: 29900,
        stock: 30
    },
    {
        productName: "Bose QuietComfort Ultra",
        brandName: "Bose",
        category: "earphones",
        productImage: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"],
        description: "Breakthrough spatial audio and world-class noise cancellation.",
        price: 35900,
        sellingPrice: 31900,
        stock: 25
    },

    // WATCHES
    {
        productName: "Apple Watch Series 9",
        brandName: "Apple",
        category: "watches",
        productImage: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"],
        description: "Smarter, brighter, and more powerful with S9 SiP.",
        price: 44900,
        sellingPrice: 41900,
        stock: 40
    },
    {
        productName: "Samsung Galaxy Watch 6 Classic",
        brandName: "Samsung",
        category: "watches",
        productImage: ["https://images.unsplash.com/photo-1508685096489-77a46807e013?q=80&w=1000&auto=format&fit=crop"],
        description: "The return of the iconic rotating bezel for ultimate control.",
        price: 39900,
        sellingPrice: 34900,
        stock: 35
    },
    {
        productName: "Garmin Epix Pro (Gen 2)",
        brandName: "Garmin",
        category: "watches",
        productImage: ["https://images.unsplash.com/photo-1434493907317-a46b53b81882?q=80&w=1000&auto=format&fit=crop"],
        description: "Premium multisport GPS watch with AMOLED display.",
        price: 89900,
        sellingPrice: 84900,
        stock: 15
    },

    // CAMERA
    {
        productName: "Sony Alpha a7 IV",
        brandName: "Sony",
        category: "camera",
        productImage: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"],
        description: "The perfect hybrid camera for stills and video.",
        price: 242900,
        sellingPrice: 219900,
        stock: 10
    },
    {
        productName: "Fujifilm X100VI",
        brandName: "Fujifilm",
        category: "camera",
        productImage: ["https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1000&auto=format&fit=crop"],
        description: "Compact digital camera with high-resolution 40.2MP sensor.",
        price: 159900,
        sellingPrice: 149900,
        stock: 5
    },
    {
        productName: "Canon EOS R6 Mark II",
        brandName: "Canon",
        category: "camera",
        productImage: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop"],
        description: "Versatile mirrorless camera with blazing fast autofocus.",
        price: 229900,
        sellingPrice: 209900,
        stock: 8
    },

    // SPEAKERS
    {
        productName: "Sonos Era 300",
        brandName: "Sonos",
        category: "speakers",
        productImage: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop"],
        description: "The ultimate spatial audio experience for any room.",
        price: 49900,
        sellingPrice: 44900,
        stock: 20
    },
    {
        productName: "Marshall Stanmore III",
        brandName: "Marshall",
        category: "speakers",
        productImage: ["https://images.unsplash.com/photo-1589003077984-844133de2d41?q=80&w=1000&auto=format&fit=crop"],
        description: "Iconic design with high-fidelity Marshall sound.",
        price: 39900,
        sellingPrice: 36900,
        stock: 15
    },

    // TELEVISIONS
    {
        productName: "LG C3 65-inch OLED TV",
        brandName: "LG",
        category: "televisions",
        productImage: ["https://images.unsplash.com/photo-1593359674811-67cfceef06e1?q=80&w=1000&auto=format&fit=crop"],
        description: "Ultimate picture quality with infinite contrast and vivid color.",
        price: 259900,
        sellingPrice: 199900,
        stock: 10
    },
    {
        productName: "Sony Bravia XR A80L",
        brandName: "Sony",
        category: "televisions",
        productImage: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop"],
        description: "Stunning OLED picture with immersive acoustic sound.",
        price: 269900,
        sellingPrice: 219900,
        stock: 8
    },

    // MOUSE
    {
        productName: "Logitech MX Master 3S",
        brandName: "Logitech",
        category: "mouse",
        productImage: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop"],
        description: "High-performance productivity mouse with silent clicks.",
        price: 10995,
        sellingPrice: 9495,
        stock: 50
    },

    // PRINTERS
    {
        productName: "Epson EcoTank L3250",
        brandName: "Epson",
        category: "printers",
        productImage: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1000&auto=format&fit=crop"],
        description: "High-quality, low-cost printing with heat-free technology.",
        price: 17990,
        sellingPrice: 14990,
        stock: 20
    },

    // PROCESSOR
    {
        productName: "Intel Core i9-14900K",
        brandName: "Intel",
        category: "processor",
        productImage: ["https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000&auto=format&fit=crop"],
        description: "24-core flagship desktop processor for elite performance.",
        price: 64900,
        sellingPrice: 58900,
        stock: 15
    },

    // REFRIGERATOR
    {
        productName: "Samsung French Door Bespoke",
        brandName: "Samsung",
        category: "refrigerator",
        productImage: ["https://images.unsplash.com/photo-1571175432244-938069d6512e?q=80&w=1000&auto=format&fit=crop"],
        description: "Sleek Bespoke design with Beverage Center and Dual Ice Maker.",
        price: 249000,
        sellingPrice: 199000,
        stock: 5
    },

    // TRIMMERS
    {
        productName: "Philips OneBlade Pro 360",
        brandName: "Philips",
        category: "trimmers",
        productImage: ["https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1000&auto=format&fit=crop"],
        description: "Trim, edge, and shave any length of hair with one blade.",
        price: 6995,
        sellingPrice: 5495,
        stock: 100
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for elite seeding...");
        
        await productModel.deleteMany({});
        console.log("Cleared existing products.");
        
        await productModel.insertMany(products);
        console.log(`Successfully seeded ${products.length} premium products!`);
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
