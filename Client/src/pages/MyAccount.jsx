import React from 'react'
import Header from '../Components/Header'

const MyAccount = () => {
  return (
    <div className='bg-[#F9FAFB] min-h-screen'>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">My Account</h2>

        <div className="bg-white shadow rounded p-6 space-y-4 max-w-xl">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium text-lg">User</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium text-lg">user@example.com</p>
          </div>
          <div>
            <p className="text-gray-600">Joined On</p>
            <p className="font-medium text-lg">28 June 2025</p>
          </div>

          <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
