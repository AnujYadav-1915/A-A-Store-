import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className="flex justify-center">
        <Link to="/" className="flex items-center gap-2 mb-4 p-2 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-lg shadow-orange-500/30">
            <span className="text-white font-extrabold text-xl tracking-tighter">A&A</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            A&A <span className="font-light text-orange-500">Store</span>
          </h1>
        </Link>
    </div>
  )
}

export default Logo