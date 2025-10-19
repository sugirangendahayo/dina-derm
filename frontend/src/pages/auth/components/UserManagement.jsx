// frontend/src/components/UserManagement.js (New, for admin/users)
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Forms for update role/bio, delete

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {/* List with edit/delete */}
    </div>
  );
};

export default UserManagement;
