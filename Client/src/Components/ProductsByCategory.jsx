import React, {  useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import API_ROUTES from "../common";

const ProductsByCategory = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);


  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(API_ROUTES.categoryProducts.url);

    const dataResponse = await response.json();

    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
    
      <div
        className="flex gap-4 overflow-x-auto items-center justify-between overflow-scroll scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`.scroll-container::-webkit-scrollbar { display: none; }`}
        </style>

        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <div key={index} >
                <Link
                  to={"/product-category/" + product[0]?.category}
                  className="cursor-pointer "
                  
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center ">
                    <img
                      src={product[0].productImage[0]}
                      alt={product?.category}
                      className="w-full h-full object-scale-down hover:scale-125 transparent-white transition-transform duration-300 ease-in-out"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
                <h1 className="capitalize text-center">{product[0]?.category}</h1>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ProductsByCategory;
