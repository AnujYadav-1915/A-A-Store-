import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import API_ROUTES from "../common";
import displayINRCurrency from "../helper/displayCurrency";
import { FaStar, FaStarHalf } from "react-icons/fa";
import VerticalCardProduct from "../Components/VertiCard";
import addToCart from "../helper/addToCart";
import Context from "../context";

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchUserAddToCart, cartProductCount } = useContext(Context);

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    if (cartProductCount > 0) {
      navigate("/view-cart");
    }
  };

  const fetchProductDetails = async () => {
    const response = await fetch(API_ROUTES.getProductDetails.url, {
      method: API_ROUTES.getProductDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: params?.id }),
    });
    const dataResponse = await response.json();
    if (dataResponse.success) {
      setData(dataResponse?.data);
    } else {
      console.error("Failed to fetch product details:", dataResponse.message);
    }
  };
  useEffect(() => {
    fetchProductDetails();
    fetchUserAddToCart();
  }, [params.id]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={data.productImage[0]}
            alt={data.productName}
            className="w-full h-[300px] md:h-[400px] object-contain bg-white p-4 shadow rounded-lg"
          />

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {data?.productImage?.map((imgURL, index) => {
              return (
                <div className="h-20 w-20 bg-slate-200 rounded p-1" key={index}>
                  <img
                    src={imgURL}
                    className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
            {data?.brandName}
          </p>
          <h2 className="text-2xl lg:text-4xl font-medium">
            {data?.productName}
          </h2>
          <p className="capitalize text-slate-400">{data?.category}</p>

          <div className="text-red-600 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>

          <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
            <p className="text-red-600">
              {displayINRCurrency(data.sellingPrice)}
            </p>
            <p className="text-slate-400 line-through">
              {displayINRCurrency(data.price)}
            </p>
          </div>

          <div className="flex items-center gap-3 my-2">
            <button
              className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Buy
            </button>
            <button
              className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add To Cart
            </button>
          </div>

          <div>
            <p className="text-slate-600 font-medium my-1">Description : </p>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>

      <VerticalCardProduct
        category={data?.category}
        heading={`More ${data?.category} Products`}
      />
    </div>
  );
}
