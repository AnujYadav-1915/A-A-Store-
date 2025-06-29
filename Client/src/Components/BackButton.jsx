import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Optional: install lucide-react for icons
import React from "react";

const Back = ({ to = -1, label = "Back" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(to); // -1 goes to previous page, or specify route (e.g., "/dashboard")
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200 font-medium text-sm"
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
};

export default Back;