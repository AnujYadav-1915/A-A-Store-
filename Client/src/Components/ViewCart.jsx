import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import API_ROUTES from "../common";
import displayINRCurrency from "../helper/displayCurrency";
import Context from "../context";
import { loadStripe } from "@stripe/stripe-js";
export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchUserAddToCart } = useContext(Context)


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
    const response = await fetch(API_ROUTES.updateCartItem.url, {
      method: API_ROUTES.updateCartItem.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, quantity: newQty }
),
    });

    const responseData = await response.json();
    if (!responseData.success) {
        console.error("Error updating quantity:", responseData.message);
        await fetchCart(); // refresh cart
      }
  };

  const removeItem = async (id) => {
    try {
      await fetch(API_ROUTES.deleteCartItem.url, {
        method: API_ROUTES.deleteCartItem.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
     fetchCart();
      fetchUserAddToCart();
  }, [
    cartItems
  ]);

  const handlePayment = async () => {
     const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

      const response = await fetch(API_ROUTES.payment.url, {
        method: API_ROUTES.payment.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartItems }),
      });

      const responseData = await response.json();
      // console.log("Payment Response Data:", ResponseData);
      if(responseData?.id) {
        stripePromise.redirectToCheckout({ sessionId: responseData.id });
      }
  }

  // Total calculations
  const totalMRP = cartItems.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
  const totalSelling = cartItems.reduce((acc, item) => acc + (item.productId.sellingPrice * item.quantity), 0);
  const totalDiscount = totalMRP - totalSelling;

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">My Cart</h1>

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row gap-4 bg-white shadow p-4 rounded"
                >
                  <img
                    src={item.productId.productImage[0]}
                    alt={item.productId.productName}
                    className="w-full md:w-32 h-32 transparent-white object-contain bg-gray-100 rounded"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <h2 className="font-semibold text-lg">{item.productId.productName}</h2>
                    <p className="text-sm text-gray-500 capitalize">
                      {item.productId.category}
                    </p>

                    <div className="flex gap-2 items-center mt-2">
                      <span className="text-red-600 font-bold">
                        {displayINRCurrency(item.productId.sellingPrice * item.quantity)}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        {displayINRCurrency(item.productId.price * item.quantity)}
                      </span>
                      <span className="text-green-600 text-sm">
                        ({Math.round(
                          ((item.productId.price - item.productId.sellingPrice) /
                            item.productId.price) *
                            100
                        )}
                        % off)
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="h-8 w-24 mt-2 bg-gray-600 hover:bg-gray-700 text-white  py-1 px-3 rounded"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="bg-white shadow p-4 rounded w-full lg:max-w-sm">
              <h2 className="text-xl font-semibold mb-4">Price Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>{displayINRCurrency(totalMRP)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selling Price</span>
                  <span>{displayINRCurrency(totalSelling)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- {displayINRCurrency(totalDiscount)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{displayINRCurrency(totalSelling)}</span>
                </div>
              </div>

              <button onClick={handlePayment} className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
