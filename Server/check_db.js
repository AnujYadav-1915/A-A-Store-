require('dotenv').config();
const mongoose = require('mongoose');
const productModel = require('./models/productModel');

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await productModel.countDocuments();
        console.log(`Product Count: ${count}`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
