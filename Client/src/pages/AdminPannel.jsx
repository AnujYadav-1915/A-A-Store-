import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";

export default function AdminPanel() {
  const user = useSelector(state => state?.user?.user);
  return (
    <div className="min-h-screen p-4 bg-[#F9FAFB]">
      <div className="mb-6 flex flex-row  justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard :</h1>
        <Logo />
      </div>

      {user && (
        <div className="bg-gray-200 shadow-md rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, 
            <Link to={'/account'}  className="text-blue-700 ml-2 text-2xl uppercase">{user.name}</Link>
              <span className="text-gray-600 ml-2 text-sm">
                (<span className={`text-orange-600 capitalize`}>{user.role}</span>)
              </span>
          </h2>
          <p className="text-gray-600">Email: 
            <span className="underline ml-2">{user.email}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">Users</h3>
          <Link to="/admin-panel/all-users" className="text-gray-500 hover:text-gray-700 hover:underline">Manage all users</Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">Products</h3>
          <Link to="/admin-panel/all-products" className="text-gray-500 hover:text-gray-700 hover:underline">Add, update or remove products</Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-2">Orders</h3>
          <Link to="/admin-panel/orders" className="text-gray-500 hover:text-gray-700 hover:underline">View and manage all orders</Link>
        </div>
      </div>
    </div>
  );
}
