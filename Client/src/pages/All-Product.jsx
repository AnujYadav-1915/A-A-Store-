import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UploadProducts from "../Components/UploadProducts";
import { MdDriveFolderUpload } from "react-icons/md";
import API_ROUTES from "../common";
import TbodyProduct from "../Components/TbodyProduct";
import AdminViewProduct from "../Components/AdminViewProduct";
import AdminEditProduct from "../Components/AdminEditProduct";
import AdminDeleteProduct from "../Components/AdminDeleteProduct";
import Back from "../Components/BackButton";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [uploadProductModal, setUploadProductModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view' | 'edit' | 'delete'

  const fetchProducts = async () => {
    const response = await fetch(API_ROUTES.allProducts.url, {
      method: API_ROUTES.allProducts.method,
      credentials: 'include',
    });

    const responseData = await response.json();

    if (responseData.success) {
      setProducts(responseData?.data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    uploadProductModal,
  ]);

  const openModal = (product, type) => {
    setSelectedProduct(product);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-screen">
      <div className="mb-6 flex justify-between items-center flex-col">
        <div className="mb-4 md:mb-0 flex md:flex-row  justify-between w-full gap-2">
          <h2 className="text-2xl font-semibold mb-4">All Products</h2>
          <span className="">
            <Back/>

          </span>
        </div>

        <Link
          onClick={() => setUploadProductModal(true)}
          className="text-white p-2 rounded text-lg font-medium flex items-center bg-blue-800 hover:bg-blue-950 transition duration-300 shadow-md"
        >
          <MdDriveFolderUpload className="inline-block mr-1" />
          Upload New Product
        </Link>

      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-left border">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">View</th>
              <th className="py-2 px-4 border-b">Edit</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <TbodyProduct
                key={product._id+ index}
                product={product}
                openModal={openModal}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {uploadProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Upload New Product</h3>
            <UploadProducts setUploadProductModal={setUploadProductModal} />
            <button
              onClick={() => setUploadProductModal(false)}
              // fetchdata={fetchProducts}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Centralized Modal Rendering */}
      {modalType && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            {modalType === "view" && (
              <>
                <h3 className="text-xl font-semibold mb-4">View Product</h3>
                <AdminViewProduct productData={selectedProduct} fetchdata={fetchProducts} />
              </>
            )}
            {modalType === "edit" && (
              <>
                <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                <AdminEditProduct
                  productData={selectedProduct}
                  fetchdata={fetchProducts}
                  setEditProductModal={closeModal}
                />
              </>
            )}
            {modalType === "delete" && (
              <>
                <h3 className="text-xl font-semibold mb-4">Delete Product</h3>
                <AdminDeleteProduct
                  productData={selectedProduct}
                  fetchdata={fetchProducts}
                  setDeleteProductModal={closeModal}
                />
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
