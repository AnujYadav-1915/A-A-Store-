const uploadProductPermission = require("../helper/Permission");
const productModel = require("../models/productModel");

async function deleteProductController(req, res) {
  try {
    if(!uploadProductPermission(req.userId)){
        throw new Error("Permission denied")
    }
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
module.exports = deleteProductController;