import { useEffect, useState } from "react";
import axios from "axios";
import "../output.css";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/general/get-my-bookings");
        setBookings(res.data.userBookings || res.data.bookings || []);
      } catch (err) {
        setError("Failed to fetch user bookings");
        console.error("Failed to fetch user bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-700 text-xl font-semibold animate-pulse">Loading bookings...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
          My Bookings
        </h1>
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            <p className="text-lg">No bookings found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-blue-100 rounded-lg p-6 shadow-sm bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <p className="font-semibold text-blue-700">
                      Property: <span className="text-gray-800">{booking.propertyId?.propType || booking.propertyId}</span>
                    </p>
                    <p className="text-gray-700">
                      Address: <span className="font-medium">{booking.propertyId?.address || "N/A"}</span>
                    </p>
                    <p>
                      Status:{" "}
                      <span
                        className={
                          booking.status === "approved"
                            ? "text-green-600 font-semibold"
                            : booking.status === "rejected"
                            ? "text-red-500 font-semibold"
                            : "text-yellow-600 font-semibold"
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Booked At: {new Date(booking.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
