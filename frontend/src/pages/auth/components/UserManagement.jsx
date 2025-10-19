/* eslint-disable no-unused-vars */
// frontend/src/components/UserManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    bio: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      bio: user.bio,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/users/${currentUser.id}`, formData);
      toast.success("User updated");
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        toast.success("User deleted");
        fetchUsers();
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal" open={showEditModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit User</h3>
          <div className="py-4">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              placeholder="First Name"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="Last Name"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="Phone"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="bio"
              value={formData.bio}
              placeholder="Bio"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              placeholder="Role"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserManagement;
