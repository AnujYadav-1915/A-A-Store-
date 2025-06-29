import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/Notfound';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Signup from '../pages/auth/SignUp';
import UserPannel from '../pages/UserPannel';
import AdminPannel from '../pages/AdminPannel';
import UserDetails from '../pages/UserDetails';
import AllUsers from '../pages/All-User';
import AllProducts from '../pages/All-Product';
import CategoryProduct from '../Components/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import ViewCart from '../Components/ViewCart';
import MyAccount from '../pages/MyAccount';
import MyOrders from '../pages/MyOrders';
import MyWishlist from '../pages/MyWishlist';
import SearchPage from '../pages/SearchPage';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path='/user-panel/*' element={<UserPannel />} />
      <Route path='/admin-panel/*' element={<AdminPannel />} />

      <Route path="/user-details" element={<UserDetails />} />

      {/* Nested routes for user panel */}
      <Route path="/user-panel/orders" element={<UserPannel />} />
      <Route path="/user-panel/profile" element={<UserPannel />} />
      <Route path="/user-panel/wishlist" element={<UserPannel />} />

      {/* Nested routes for admin panel */}
      <Route path="/admin-panel/all-users" element={<AllUsers />} />
      <Route path="/admin-panel/all-products" element={<AllProducts />} />
      <Route path="/admin-panel/orders" element={<AdminPannel />} />

      <Route path="/product-category/:category" element={<CategoryProduct />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path='/view-cart' element={<ViewCart />} />

      <Route path="/account" element={<MyAccount />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/wishlist" element={<MyWishlist />} />
      <Route path="/search" element={<SearchPage />} />

      {/* Success and Cancel routes */}
      <Route path="/success" element={<Success />} />
      <Route path="/see-order" element={<OrderPage />} />
      <Route path="/cancel" element={<Cancel />} />

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />


    </Routes>
  );
};

export default AppRoutes;
