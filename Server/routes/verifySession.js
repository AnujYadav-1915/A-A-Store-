const express = require("express");
const router = express.Router();

const stripe = require("../config/stripe");
const orderModel = require("../models/orderModel");

router.get("/verify-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const paymentIntent = session.payment_intent;

    const order = await orderModel.findOne({
      "paymentDetails.paymentId": paymentIntent,
    });

    if (order) {
      res.json({ success: true, orderId: order._id });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
