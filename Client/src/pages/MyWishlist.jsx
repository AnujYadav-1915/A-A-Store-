import React from 'react'
import Header from '../Components/Header'
import displayINRCurrency from '../helper/displayCurrency'

const MyWishlist = () => {
  const wishlist = [
    {
      _id: '123',
      name: 'Wireless Mouse',
      price: 999,
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: '456',
      name: 'Bluetooth Speaker',
      price: 1299,
      image: 'https://via.placeholder.com/150',
    },
  ]

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain bg-gray-100 p-2"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                <p className="text-red-600 font-semibold mb-2">
                  {displayINRCurrency(item.price)}
                </p>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          {wishlist.length === 0 && <p>Your wishlist is empty.</p>}
        </div>
      </div>
    </div>
  )
}

export default MyWishlist
