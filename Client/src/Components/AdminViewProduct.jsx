import React from 'react';
const AdminViewProduct = ({ productData }) => {
    // console.log("productData in AdminViewProduct", productData);
  return (
    <div className="text-sm text-gray-700">
      <p><strong>Product Name:</strong> {productData.productName}</p>
      <p><strong>Brand Name:</strong> {productData.brandName}</p>
      <p><strong>Category:</strong> {productData.category}</p>
      <p><strong>Price:</strong> ₹{productData.price}</p>
      <p><strong>Selling Price:</strong> ₹{productData.sellingPrice}</p>
      <p><strong>Stock:</strong> {productData.stock}</p>
      <p><strong>Description:</strong> {productData.description}</p>
      {productData.productImage && (
        <div className="mt-4">
          <strong>Images:</strong>
          <div className="flex gap-2 mt-2">
            {productData.productImage.map((img, i) => (
              <img key={i} src={img} alt={`product-${i}`} className="w-20 h-20 border rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewProduct;