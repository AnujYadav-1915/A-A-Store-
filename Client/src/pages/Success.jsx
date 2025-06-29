import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import API_ROUTES from "../common"; // or set your API base URL here

const Success = () => {
  const [orderId, setOrderId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Extract session_id from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      fetch(`${API_ROUTES.verifySession.url}?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrderId(data.orderId);
          } else {
            console.error("Order not found:", data.message);
          }
        })
        .catch((err) => {
          console.error("Error verifying session:", err);
        });
    }
  }, [location.search]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white shadow-md rounded p-8 max-w-md w-full text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Payment Successful</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully!
          </p>
          <div className="flex flex-col justify-center items-center space-y-4">
            <Link
              to="/"
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
            >
              Continue Shopping
            </Link>
            {orderId && (
              <Link
                to={`/see-order/${orderId}`}
                className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
              >
                See Order
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
