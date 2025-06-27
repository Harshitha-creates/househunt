import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import "../output.css";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    const res = await axios.post("http://localhost:5000/auth/login", {
      username,
      password,
    });
    // Fetch userType from backend after login
    // Option 1: If backend returns userType in login response, use it directly:
    localStorage.setItem("user", JSON.stringify({ username: res.data.username, userType: res.data.userType }));
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    setUser({ username: res.data.username, userType: res.data.userType });
  };

  const register = async (formData) => {
    const res = await axios.post("http://localhost:5000/auth/signup", formData);
    // Fetch userType from backend after register
    localStorage.setItem("user", JSON.stringify({ username: res.data.username, userType: formData.userType }));
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    setUser({ username: res.data.username, userType: formData.userType });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
