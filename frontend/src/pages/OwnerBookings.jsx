import { useEffect, useState } from "react";
import axios from "axios";
import "../output.css"; // Ensure Tailwind CSS is imported

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/owner/get-owner-bookings");
      setBookings(res.data.bookings || []);
    } catch (err) {
      setMessage("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/owner/approve-booking/${bookingId}`);
      setMessage("Booking approved!");
      fetchBookings(); // Refresh list
    } catch (err) {
      setMessage("Failed to approve booking");
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/owner/reject-booking/${bookingId}`);
      setMessage("Booking rejected!");
      fetchBookings(); // Refresh list
    } catch (err) {
      setMessage("Failed to reject booking");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
          Bookings for Your Properties
        </h1>
        {message && (
          <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-200">
            {message}
          </div>
        )}
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
                      Tenant: <span className="text-gray-800">{booking.username}</span>
                    </p>
                    <p className="text-gray-700">
                      Property: <span className="font-medium">{booking.propertyId?.propType}</span>
                      <span className="text-gray-500"> ({booking.propertyId?.address})</span>
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
                  {booking.status === "pending" && (
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => handleApprove(booking._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
