import { useEffect, useState } from "react";
import API_ROUTES from "../common";
import { toast } from "react-toastify";
import ChangeUserRole from "../Components/ChangeUserRole";
import Back from "../Components/BackButton";
import DeleteUser from "../Components/DeleteUser";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [changeUserRoleModal, setChangeUserRoleModal] = useState(false);
  const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })
  // const [loading, setLoading] = useState(true);
  
    const fetchAllUsers = async() =>{
        const fetchData = await fetch(API_ROUTES.allUsers.url,{
            method : API_ROUTES.allUsers.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()        

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  if (allUsers.loading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">All Registered Users</h2>
        <Back />
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-left border">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button onClick={() => {
                    setUpdateUserDetails({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    userId: user._id 
                  });
                    setChangeUserRoleModal(true)
                  }}
                     className="text-blue-500 hover:underline">Edit</button>
                    <DeleteUser userId={user._id} callFunc={fetchAllUsers} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {changeUserRoleModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Change User Role :</h3>
              <ChangeUserRole 
                    onClose={()=>setChangeUserRoleModal(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails.userId}
                    callFunc={fetchAllUsers}
                />
              <button
                onClick={() => setChangeUserRoleModal(false)}
                className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
