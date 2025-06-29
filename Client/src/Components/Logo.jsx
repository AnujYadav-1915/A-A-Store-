import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div>
        <Link to="/" className="text-2xl font-bold mb-4 shadow rounded-md p-2 bg-white">
            <span>Nakli</span>
            <span className="text-[#F3A820] font-thin -ml-1"> Zon</span>
        </Link>
    </div>
  )
}

export default Logo