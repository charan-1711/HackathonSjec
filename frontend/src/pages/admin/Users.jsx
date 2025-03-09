import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import axios from "axios";

export default function Users() {
  // ✅ Get users from Outlet context
  const { usersData, fetchUserDetails } = useOutletContext();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Function to add a new user using API
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/user/addUser",
        {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role.toLocaleLowerCase(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      alert("User added successfully!");
      setIsModalOpen(false);
      setNewUser({ name: "", email: "", role: "" });

      fetchUserDetails();
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.msg || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          <FiUserPlus size={20} />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-3">
                  No users found.
                </td>
              </tr>
            ) : (
              usersData.map((user, index) => (
                <tr key={user._id} className="border-t hover:bg-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded mb-3"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <select
              className="w-full p-2 border rounded mb-3"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
