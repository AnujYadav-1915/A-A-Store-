const crypto = require('crypto');
const orderModel = require('../models/orderModel');
const addToCartModel = require('../models/addToCartModel');

const paymentVerification = async (request, response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, userEmail } = request.body;
        const userId = request.userId; // from authToken middleware

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is successful, Create order in DB
            
            const productDetails = cartItems.map((item) => {
                return {
                    productId: item.productId._id,
                    name: item.productId.productName,
                    price: item.productId.sellingPrice,
                    quantity: item.quantity,
                    image: item.productId.productImage
                };
            });

            const totalAmount = cartItems.reduce((acc, item) => acc + (item.productId.sellingPrice * item.quantity), 0);

            const orderDetails = {
                productDetails: productDetails,
                email: userEmail,
                userId: userId,
                paymentDetails: {
                    paymentId: razorpay_payment_id,
                    payment_method_type: ["razorpay"],
                    payment_status: "paid"
                },
                shipping_options: [], // Not mapped in Razorpay by default
                totalAmount: totalAmount
            };

            const order = new orderModel(orderDetails);
            const saveOrder = await order.save();

            if (saveOrder?._id) {
                await addToCartModel.deleteMany({ userId: userId });
            }
            
            response.json({
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Invalid signature sent!"
            });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        response.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

module.exports = paymentVerification;
