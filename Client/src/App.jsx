import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ROUTES from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState();

  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(API_ROUTES.userDetails.url, {
      method: API_ROUTES.userDetails.method,
      credentials: 'include',
    });
    const dataAPI = await dataResponse.json();   
    if (!dataResponse.ok) {
      console.error("Failed to fetch user details:", dataAPI);
      return;
    }
    if (dataAPI.success) {
      dispatch(setUserDetails(dataAPI.data));
    } 
  }, [dispatch]);

    const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(API_ROUTES.countCartItems.url,{
      method : API_ROUTES.countCartItems.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [
    fetchUserDetails,
    cartProductCount
  ]); 

  return (
    <BrowserRouter>
      <Context.Provider value={{ 
        fetchUserDetails,
        fetchUserAddToCart,
        cartProductCount,
       }}>
        <ToastContainer
          position='top-left'
        />
        <AppRoutes />
      </Context.Provider>
    </BrowserRouter>
  );
};

export default App;