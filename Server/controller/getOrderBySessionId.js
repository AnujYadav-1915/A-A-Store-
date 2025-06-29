const orderModel = require('../models/orderModel')

const getOrderBySessionId = async (req, res) => {
  try {
    const sessionId = req.query.session_id
    const order = await orderModel.findOne({ 'paymentDetails.session_id': sessionId })

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    res.json({
      success: true,
      data: order,
    })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message || err })
  }
}

module.exports = getOrderBySessionId
