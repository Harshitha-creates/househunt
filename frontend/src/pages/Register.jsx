import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "tenant",
  });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/search");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <div className="flex flex-col items-center mb-2">
          <svg
            className="w-14 h-14 text-green-600 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h2 className="text-3xl font-extrabold text-green-800">
            Create Account
          </h2>
        </div>
        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        >
          <option value="tenant">Tenant</option>
          <option value="owner">Owner</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Register
        </button>
        <div className="text-center text-gray-500 text-sm mt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
