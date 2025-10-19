// frontend/src/pages/Signup.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(firstName, lastName, email, phone, password);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="className=backdrop-blur-md m-2 bg-white/10 border border-white/20  py-2  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="mb-4">
              <label className="block text-white mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-red-500 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-red-500 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-red-500 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-red-500 text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-red-500 text-white"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full border-[1px] border-red-500 text-white py-2 rounded hover:bg-red-500 transition-colors flex items-center   justify-center gap-2 cursor-pointer"
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
