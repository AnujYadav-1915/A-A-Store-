import { useEffect, useState } from "react";
// import axios from "axios";

export default function UserDetails() {
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/user-details", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setUser(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching user details:", err);
//       });
//   }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-[#111111]">Your Profile</h1>

        {!user ? (
          <p className="text-gray-500">Loading user details...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">Name</label>
              <p className="text-lg font-medium text-gray-800">{user.name}</p>
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Email</label>
              <p className="text-lg font-medium text-gray-800">{user.email}</p>
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Role</label>
              <p className="text-lg font-medium text-gray-800 capitalize">{user.role}</p>
            </div>

            <div className="pt-4">
              <button
                disabled
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-60"
              >
                Edit (Coming Soon)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
