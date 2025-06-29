import React, { useState } from 'react'
import API_ROUTES from '../common';
import { toast } from 'react-toastify';

function ChangeUserRole({
    name,
    email,
    role,
    userId,
    callFunc
}) {
    const [data, setData] = useState({
        userId: userId || "",
        name:  name || "",
        email: email || "",
        role: role || ""
    });

    const updateUserData = async () => {
        const fetchRespons = await fetch(API_ROUTES.updateUser.url, {
            method: API_ROUTES.updateUser.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                name: data.name,
                email: data.email,
                role: data.role
            })
        });
        const responseData = await fetchRespons.json();
        if (responseData.success) {
            toast.success(responseData.message);
            callFunc();
        } else {
            toast.error("Failed to update user role");
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // console.log("Form data:", data);
    }

  return (
    <div className="p-4 bg-[#F9FAFB] h-[45vh] ">
      <h2 className="text-2xl font-semibold mb-4">Change User Role</h2>

      <form className="bg-white rounded-xl shadow-md p-6">
        <div>
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name :</label>
          <input
            type="text"
            placeholder={data.name}
            name="name"
            onChange={handleChange}
            value={data.name}
            className="my-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">User Email :</label>
          <input
            type="email"
            id="userEmail"
            name="email"
            onChange={handleChange}
            value={data.email}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter user email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">New Role :</label>
          <select
            name="role"
            id="userRole"
            onChange={handleChange}
            value={data.role}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option defaultValue="admin" disabled >Select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="button"
          onClick={updateUserData}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ChangeUserRole