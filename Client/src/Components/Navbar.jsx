import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import API_ROUTES from "../common";
import { setUserDetails } from '../store/userSlice';
import { toast } from "react-toastify";
import Context from "../context";
import Logo from "./Logo";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartProductCount } = useContext(Context);
  const user = useSelector((state) => state?.user?.user);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleLogout = async () => {
    const fetchData = await fetch(API_ROUTES.logout.url, {
      method: API_ROUTES.logout.method,
      credentials: "include"
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/login");
    } else {
      toast.error(data.message || "Logout failed. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 premium-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-11 pl-12 pr-4 rounded-full bg-white/50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm"
                value={search}
                onChange={handleSearch}
              />
              <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {user?._id && (
              <div className="relative">
                <button
                  onClick={() => setMenuDisplay((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-white/50 transition-colors"
                >
                  <FaRegUserCircle className="text-2xl text-slate-700" />
                  <span className="hidden sm:block text-sm font-medium text-slate-700">Account</span>
                </button>
                {menuDisplay && (
                  <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-2xl border border-white/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 flex flex-col">
                      <Link to="/account" className="px-4 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-lg transition-colors">Profile</Link>
                      {user?.role === "admin" ? (
                        <Link to="/Admin-panel" className="px-4 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-lg transition-colors">Admin Dashboard</Link>
                      ) : (
                        <Link to="/User-panel" className="px-4 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-lg transition-colors">My Panel</Link>
                      )}
                      <Link to="/orders" className="px-4 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-lg transition-colors">Order History</Link>
                      <div className="h-px bg-white/30 my-1 mx-2" />
                      <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg text-left transition-colors">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Link to="/view-cart" className="relative p-2 rounded-full hover:bg-white/50 transition-colors group">
              <IoCartOutline className="text-2xl text-slate-700 group-hover:text-blue-600 transition-colors" />
              {user?._id && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white w-5 h-5 text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white ring-1 ring-blue-600/20">
                  {cartProductCount || 0}
                </span>
              )}
            </Link>

            {!user?._id && (
              <Link to="/login" className="px-6 py-2 bg-premium-gradient text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;