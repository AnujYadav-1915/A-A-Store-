const razorpayInstance = require('../config/razorpay');
const userModel = require('../models/userModel');
const crypto = require("crypto");

const paymentController = async(request,response)=>{
    try {
        const { cartItems } = request.body;
        const user = await userModel.findOne({ _id : request.userId });

        // Calculate total amount in paise (1 INR = 100 paise)
        const totalAmount = cartItems.reduce((acc, item) => {
            return acc + (item.productId.sellingPrice * item.quantity);
        }, 0) * 100;

        const options = {
            amount: totalAmount, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${new Date().getTime()}`,
            notes: {
                userId: request.userId,
                email: user.email
            }
        };

        const order = await razorpayInstance.orders.create(options);

        if(!order){
            return response.status(500).send("Some error occurred while creating order");
        }

        response.json({
            success: true,
            order: order
        });

    } catch (error) {
        response.json({
            message : error?.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = paymentController;
