import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4M4 11h16" />
        </svg>
        <Link to="/" className="font-extrabold text-2xl text-blue-700 tracking-tight hover:text-blue-900 transition">
          HouseHunt
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/search" className="text-blue-700 hover:text-blue-900 font-medium transition">Search</Link>
        {user && user.userType === "owner" && (
          <>
            <Link to="/properties" className="text-blue-700 hover:text-blue-900 font-medium transition">My Properties</Link>
            <Link to="/owner-bookings" className="text-blue-700 hover:text-blue-900 font-medium transition">Bookings</Link>
          </>
        )}
        {user && user.userType === "tenant" && (
          <>
            <Link to="/my-bookings" className="text-blue-700 hover:text-blue-900 font-medium transition">My Bookings</Link>
          </>
        )}
        {user ? (
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow transition ml-2"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-blue-700 hover:text-blue-900 font-medium transition">Login</Link>
            <Link to="/register" className="text-blue-700 hover:text-blue-900 font-medium transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}