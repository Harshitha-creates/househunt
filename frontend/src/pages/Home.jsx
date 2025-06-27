import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        <svg className="w-20 h-20 text-blue-600 mb-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4M4 11h16" />
        </svg>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">Welcome to HouseHunt</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Find your perfect home or manage your properties with ease. <br />
          HouseHunt connects tenants and owners for a seamless rental and buying experience.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Link
            to="/search"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow transition text-center"
          >
            Search Properties
          </Link>
          <Link
            to="/login"
            className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg shadow transition text-center"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow transition text-center"
          >
            Register
          </Link>
        </div>
      </div>
      <footer className="mt-10 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} HouseHunt. All rights reserved.
      </footer>
    </div>
  );
}