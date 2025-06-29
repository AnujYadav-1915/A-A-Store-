import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import API_ROUTES from '../common'

const Success = () => {
  // const context = useContext(cartProductCount)
  const [orderId, setOrderId] = useState(null)
  const query = new URLSearchParams(useLocation().search)
  const sessionId = query.get("session_id")

  console.log("Session ID:", orderId);
  
  const fetchOrderId = async () => {
    try {
      const res = await fetch(`${API_ROUTES.getOrderBySessionId.url}?session_id=${sessionId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(data.data._id); 
      }
    } catch (err) {
      console.error("Failed to fetch order", err)
    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchOrderId()
    }
  }, [sessionId])

  return (
    <div className='bg-[#F9FAFB] min-h-screen flex flex-col'>
      <Header />
      <div className='flex flex-1 justify-center items-center px-4'>
        <div className='bg-white shadow-md rounded p-8 max-w-md w-full text-center'>
          <FaCheckCircle className='text-green-500 text-6xl mx-auto mb-4' />
          <h2 className='text-2xl font-semibold mb-2'>Payment Successful</h2>
          <p className='text-gray-600 mb-6'>Your order has been placed successfully!</p>
          <div className='flex flex-col justify-center items-center space-y-4'>
            <Link
              to="/"
              className='inline-block bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition'
            >
              Continue Shopping
            </Link>
            
              <Link
                to={'/see-order'}
                className='inline-block bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition'
              >
                See Order
              </Link>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Success
