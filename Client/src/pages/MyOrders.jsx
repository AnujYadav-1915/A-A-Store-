import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../components/Footer';
import API_ROUTES from '../common';
import displayINRCurrency from '../helper/displayCurrency';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchOrderDetails = async()=>{
    setLoading(true)
    const response = await fetch(API_ROUTES.getOrder.url,{
      method : API_ROUTES.getOrder.method,
      credentials : 'include'
    })

    const responseData = await response.json()

    setOrders(responseData.data)
    console.log("order list",responseData)
    setLoading(false)
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <div
                key={order._id || i}
                className="bg-white rounded shadow p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Order ID: #{order._id}
                  </span>
                  <span className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {order.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center border p-2 rounded"
                    >
                      <img
                        src={item.productImage[0]}
                        alt={item.productName}
                        className="h-20 w-20 object-contain bg-gray-100 rounded"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-lg font-medium">
                          {item.productName}
                        </h3>
                        <p className="text-gray-500 capitalize text-sm">
                          Category: {item.category}
                        </p>
                        <p className="text-sm text-gray-700">
                          Quantity: {item.quantity}
                        </p>
                        <div className="flex gap-2 items-center text-sm">
                          <span className="text-red-600 font-bold">
                            {displayINRCurrency(item.sellingPrice)}
                          </span>
                          <span className="line-through text-gray-400">
                            {displayINRCurrency(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end font-semibold mt-2">
                  Total:{' '}
                  <span className="text-red-600 ml-2">
                    {displayINRCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
