import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API_ROUTES from "../../common";
import { toast } from "react-toastify";
import Context from '../../context/index';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

      const dataResponse = await fetch(API_ROUTES.signIn.url, {
            method: API_ROUTES.signIn.method,
            credentials: "include",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(data)
          });

          const response = await dataResponse.json();

          if (dataResponse.ok) {
            // console.log("Login successful:", response);
            toast.success(response.message);
            navigate("/");
            fetchUserDetails();
            fetchUserAddToCart();
          } else {
            console.error("Login failed:", response);
            toast.error(response.message || "Login failed. Please try again.");
          }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-[#111111] mb-6">Login to NakliZon</h2>
        
        <form className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {
                showPassword ? (
                  <FaEyeSlash className="text-xl" />
                ) : (
                  <FaEye className="text-xl" />
                )
            }
          </span>
          </div>


          <button>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline block text-right">
            Forgot password?
          </Link>
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
