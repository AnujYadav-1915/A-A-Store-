import { useState } from "react";
import { toast } from "react-toastify";
import API_ROUTES from "../common";

export default function DeleteUser({ userId, callFunc }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    toast.info("Deleting user...");

    try {
      const res = await fetch(`${API_ROUTES.deleteUser.url}/${userId}`, {
        method: API_ROUTES.deleteUser.method,
        credentials: "include",
      });

      const result = await res.json();
      setLoading(false);
      setShowModal(false);

      if (result.success) {
        toast.success("User deleted successfully.");
        if (callFunc) callFunc(); // Refresh users
      } else {
        toast.error(result.message || "Failed to delete user.");
      }
    } catch (error) {
      setLoading(false);
      setShowModal(false);
      toast.error("Something went wrong while deleting.");
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
