import React from 'react';
import { toast } from 'react-toastify';
import API_ROUTES from '../common';

const AdminDeleteProduct = ({ setDeleteProductModal, productData, fetchdata }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_ROUTES.deleteProduct.url}/${productData._id}`, {
        method: API_ROUTES.deleteProduct.method,
        credentials: 'include',
      });

      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        fetchdata();
        setDeleteProductModal(false);
      } else {
        toast.error(result.message || 'Failed to delete product.');
      }
    } catch (err) {
      toast.error('Error deleting product');
      console.error(err);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-4">Are you sure you want to delete this product?</p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Confirm Delete
      </button>
    </div>
  );
};

export default AdminDeleteProduct;