import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link to="/" className="font-bold text-xl">HouseHunt</Link>
      <div className="flex gap-4 items-center">
        <Link to="/search" className="hover:underline">Search</Link>
        {user && user.userType === "owner" && (
          <>
            <Link to="/properties" className="hover:underline">My Properties</Link>
            <Link to="/owner-bookings" className="hover:underline">Bookings</Link>
          </>
        )}
        {user && user.userType === "tenant" && (
          <>
            <Link to="/my-bookings" className="hover:underline">My Bookings</Link>
          </>
        )}
        {user ? (
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}