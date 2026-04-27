import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import API_ROUTES from "../common";
import displayINRCurrency from "../helper/displayCurrency";
import Context from "../context";

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchUserAddToCart } = useContext(Context);

  const fetchCart = async () => {
    try {
      const res = await fetch(API_ROUTES.viewCart.url, {
        method: API_ROUTES.viewCart.method,
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setCartItems(data.data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;
    const response = await fetch(API_ROUTES.updateCartItem.url, {
      method: API_ROUTES.updateCartItem.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, quantity: newQty }),
    });
    const responseData = await response.json();
    if (!responseData.success) {
      console.error("Error updating quantity:", responseData.message);
    }
    await fetchCart();
  };

  const removeItem = async (id) => {
    try {
      await fetch(API_ROUTES.deleteCartItem.url, {
        method: API_ROUTES.deleteCartItem.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      fetchCart();
      fetchUserAddToCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchUserAddToCart();
  }, []);

  const handlePayment = async () => {
    const response = await fetch(API_ROUTES.payment.url, {
      method: API_ROUTES.payment.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cartItems }),
    });

    const responseData = await response.json();
    if (responseData.success && responseData.order) {
      const { id, amount, currency } = responseData.order;
      const loadRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "A&A Store",
        description: "Premium Order Purchase",
        order_id: id,
        handler: async function (response) {
          const verifyRes = await fetch(API_ROUTES.verifyPayment.url, {
            method: API_ROUTES.verifyPayment.method,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: cartItems,
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            window.location.href = "/success";
          } else {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#0f172a" }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      alert("Could not create Razorpay order.");
    }
  };

  const totalMRP = cartItems.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
  const totalSelling = cartItems.reduce((acc, item) => acc + (item.productId.sellingPrice * item.quantity), 0);
  const totalDiscount = totalMRP - totalSelling;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          
          <div className="flex-1 w-full space-y-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Bag</h1>
            
            {loading ? (
              <div className="h-64 flex items-center justify-center bg-white rounded-3xl premium-shadow">
                <p className="text-slate-400 animate-pulse">Refining your selections...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl premium-shadow space-y-4">
                <p className="text-slate-500 font-medium text-lg">Your bag is currently empty.</p>
                <button onClick={() => window.location.href = "/"} className="px-8 py-3 bg-premium-gradient text-white rounded-full font-bold premium-shadow hover:-translate-y-0.5 transition-all">Explore Collections</button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-3xl premium-shadow p-6 flex flex-col md:flex-row gap-6 border border-white hover:border-blue-100 transition-all group">
                    <div className="w-full md:w-40 h-40 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center relative">
                      <img src={item.productId.productImage[0]} alt={item.productId.productName} className="max-h-32 object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-bold text-slate-900 leading-snug">{item.productId.productName}</h2>
                          <button onClick={() => removeItem(item._id)} className="text-slate-400 hover:text-red-500 transition-colors">
                            Remove
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">{item.productId.category}</p>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-4 mt-6">
                        <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-1 px-3 border border-slate-100">
                          <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white transition-all">-</button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white transition-all">+</button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-black text-slate-900 tracking-tight">{displayINRCurrency(item.productId.sellingPrice * item.quantity)}</p>
                          <p className="text-sm text-slate-400 line-through">{displayINRCurrency(item.productId.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="w-full lg:w-[400px] sticky top-28">
              <div className="dark-glass rounded-3xl premium-shadow p-8 text-white">
                <h2 className="text-xl font-bold mb-8">Order Summary</h2>
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between text-slate-400">
                    <span>Retail Value</span>
                    <span>{displayINRCurrency(totalMRP)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Elite Discount</span>
                    <span>- {displayINRCurrency(totalDiscount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="uppercase text-[10px] tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Complimentary</span>
                  </div>
                  <div className="h-px bg-white/10 my-6" />
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Total Payable</p>
                      <p className="text-3xl font-black tracking-tight">{displayINRCurrency(totalSelling)}</p>
                    </div>
                  </div>
                </div>

                <button onClick={handlePayment} className="w-full mt-10 bg-white text-slate-900 py-4 rounded-2xl font-black text-lg premium-shadow hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                  Complete Purchase
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-[0.2em] mt-6">Secure encrypted transaction</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
