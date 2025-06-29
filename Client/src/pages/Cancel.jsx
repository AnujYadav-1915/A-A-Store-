import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const Cancel = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      // Optional: log it, send to backend for analytics, etc.
      console.warn("Payment cancelled. Session ID:", sessionId);
    }
  }, [location.search]);

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white shadow-md rounded p-8 max-w-md w-full text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Payment Cancelled</h2>
          <p className="text-gray-600 mb-6">
            You cancelled the payment. No charges were made.
          </p>
          <Link
            to="/"
            className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cancel;
