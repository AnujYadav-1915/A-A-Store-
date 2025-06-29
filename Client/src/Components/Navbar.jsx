import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { IoIosSearch, IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import API_ROUTES from "../common";
import { setUserDetails } from '../store/userSlice';
import { toast } from "react-toastify";
import { useState } from "react";
import Context from "../context";


const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartProductCount } = useContext(Context)

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  const user = useSelector((state) => state?.user?.user);
  // console.log("User details from Redux store from navbar :", user?._id);

  const handleLogout = async () => {
    const fetchData = await fetch(API_ROUTES.logout.url, {
      method: API_ROUTES.logout.method,
      credentials: "include"
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null)); // Clear user details in Redux store
      navigate("/login");
    }
    else {
      toast.error(data.message || "Logout failed. Please try again.");
    }
  };
  return (
    <nav className="w-full border-b border-gray-200 bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="w-48">
            <Link to="/" className="flex items-center gap-1 py-3 hover:shadow-md transition-all duration-200">
              <PiShoppingCartDuotone className="text-3xl text-gray-600" />
              <h1 className="text-3xl font-bold">
                Nakli{" "}
                <span className="font-thin bg-[#F3A820] text-white rounded-r-md pl-1 pr-2 -ml-2">
                  Zon
                </span>
              </h1>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:flex w-[30%] bg-zinc-200 shadow-inner rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full p-2 bg-gray-50 outline-none text-sm"
              value={search}
              onChange={handleSearch}
            />
            <button className="p-2 bg-[#F3A820] hover:bg-yellow-500 transition-colors">
              <IoIosSearch className="text-2xl text-white" />
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">

            {/* Profile Menu */}
            {
              user?._id && (
                <div className="relative top-1">
                  <button
                    onClick={() => setMenuDisplay((prev) => !prev)}
                    className="text-3xl text-gray-600"
                    aria-label="User menu"
                  >
                    <FaRegUserCircle />
                  </button>
                  {menuDisplay && (
                    <div className="absolute w-48 bg-gray-600 text-white rounded shadow-lg z-20">
                      <nav className="flex flex-col">
                        <Link to="/account" className="p-2 hover:bg-blue-700">My Account</Link>
                        { user?.role == "admin" ? (
                          <Link to="/Admin-panel" className="p-2 hover:bg-blue-700">Admin Panel</Link>
                        ): (
                          <Link to="/User-panel" className="p-2 hover:bg-blue-700">User Panel</Link>
                        )}
                        <Link to="/orders" className="p-2 hover:bg-blue-700">My Orders</Link>
                        <Link to="/wishlist" className="p-2 hover:bg-blue-700">My Wishlist</Link>
                      </nav>
                    </div>
                  )}
                </div>
              )
            }


            {/* Cart */}
            {
              user?._id && (
                <Link to="/view-cart" className="relative">
                    <IoCartOutline className="text-3xl text-gray-600" />
                    <span className="absolute -top-2 -right-2 bg-gray-600 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                      {cartProductCount || 0}
                    </span>
                  </Link>                
              )
            }

            {/* Login/Logout */}
            {user?._id ? (<button
              onClick={handleLogout}
              className="flex items-center px-4 py-1 text-white bg-gray-600 rounded-full hover:bg-slate-500 transition">
              <IoIosLogOut className="mr-2" />
              Logout
            </button>) :
            (<Link to="/login" className="flex items-center px-4 py-1 text-white bg-gray-600 rounded-full hover:bg-slate-500 transition">
              <IoIosLogIn className="mr-2" />
              Login
            </Link>)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;