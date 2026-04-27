import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_ROUTES from "../common";

const categoryIcons = {
  "mobiles": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop",
  "laptops": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop",
  "earphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop",
  "watches": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop",
  "camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop",
  "speakers": "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=200&auto=format&fit=crop",
  "televisions": "https://images.unsplash.com/photo-1593359674811-67cfceef06e1?q=80&w=200&auto=format&fit=crop",
  "mouse": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=200&auto=format&fit=crop",
  "printers": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=200&auto=format&fit=crop",
  "processor": "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=200&auto=format&fit=crop",
  "refrigerator": "https://images.unsplash.com/photo-1571175432244-938069d6512e?q=80&w=200&auto=format&fit=crop",
  "trimmers": "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=200&auto=format&fit=crop"
};

const ProductsByCategory = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(10).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.categoryProducts.url);
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden">
      <div className="flex gap-6 overflow-x-auto pb-4 scroll-container scrollbar-none items-start">
        {loading
          ? categoryLoading.map((_, index) => (
              <div key={"loading-"+index} className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-4 w-12 bg-slate-100 rounded animate-pulse" />
              </div>
            ))
          : categoryProduct.map((product, index) => {
              const categoryName = product[0]?.category;
              const iconUrl = categoryIcons[categoryName] || product[0]?.productImage[0];
              
              return (
                <Link
                  key={index}
                  to={"/product-category/" + categoryName}
                  className="flex flex-col items-center gap-2 group flex-shrink-0 cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-0.5 bg-white premium-shadow border-2 border-transparent group-hover:border-blue-500 transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                      <img
                        src={iconUrl}
                        alt={categoryName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=200&auto=format&fit=crop";
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                    {categoryName}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default ProductsByCategory;
