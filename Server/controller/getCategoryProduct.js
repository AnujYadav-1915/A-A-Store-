const productModel = require("../models/productModel");

async function getCategoryProduct(req, res) {
  try {
    const productCategory = await productModel.distinct("category");
    
    if (!productCategory) {
      return res.status(404).json({ success: false, message: "No productCategory found" });
    }

    const productByCategory = [];
    for (const category of productCategory) {
      const products = await productModel.find({ category });
        if(products){
            productByCategory.push(products );
        }
    }
    

    return res.status(200).json({ success: true, data: productByCategory });
  } catch (error) {
    console.error("Error fetching category productCategory:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
module.exports = getCategoryProduct;