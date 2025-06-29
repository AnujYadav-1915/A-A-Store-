import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import displayINRCurrency from '../helper/displayCurrency';
import { Link } from 'react-router-dom';
import fetchCategoryWiseProduct from '../helper/FetchCategoryWiseProduct';

function CategoryProduct() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


      useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setLoading(false)

            setProducts(categoryProduct?.data)
        }
        fetchData();
    }, [category])

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6 capitalize">Category: {category}</h1>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded shadow hover:shadow-lg transition">
                <img src={product.productImage[0]} alt={product.productName} className="w-full h-48 object-contain p-4" />
                <div className="p-4">
                  <h2 className="font-medium text-lg">{product.productName}</h2>
                  <p className="text-slate-400 capitalize">{product.category}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-red-600 font-semibold">{displayINRCurrency(product.sellingPrice)}</p>
                    <p className="line-through text-slate-500">{displayINRCurrency(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryProduct;