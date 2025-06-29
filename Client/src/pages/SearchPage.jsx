import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../components/Footer'
import API_ROUTES from '../common'
import displayINRCurrency from '../helper/displayCurrency'
import { Link } from 'react-router-dom'

const Search = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const queryParam = new URLSearchParams(location.search).get("q"); 

  const fetchSearchResults = async()=>{
        setLoading(true)
        const response = await fetch(API_ROUTES.searchProduct.url+location.search)
        const dataResponse = await response.json()
        setLoading(false)

        setResults(dataResponse.data)
    }

    useEffect(()=>{
        fetchSearchResults()
    },[location])

  return (
    <div className='bg-[#F9FAFB] min-h-screen '>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-semibold mb-4'>
          Search Results for: <span className='text-red-600'>{queryParam}</span>
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : results.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {results.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className='bg-white shadow rounded overflow-hidden hover:shadow-lg transition-all'
              >
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className='w-full h-48 object-contain bg-gray-100 p-2'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-medium text-ellipsis line-clamp-1'>
                    {product.productName}
                  </h3>
                  <p className='capitalize text-gray-500 text-sm mb-1'>
                    {product.category}
                  </p>
                  <div className='flex items-center gap-2'>
                    <span className='text-red-600 font-bold'>
                      {displayINRCurrency(product.sellingPrice)}
                    </span>
                    <span className='line-through text-gray-400 text-sm'>
                      {displayINRCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Search
