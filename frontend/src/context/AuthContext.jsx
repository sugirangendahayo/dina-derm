import React, { useState, useEffect } from "react";
import axios from "axios";

// Create the context
const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token or fetch user info
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Fetch user details if needed
      setUser({ token }); // Placeholder; fetch role etc.
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    setUser({ token: res.data.token });
  };

  const signup = async (email, password) => {
    await axios.post("/api/auth/signup", { email, password });
    // Auto-login after signup if desired
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
