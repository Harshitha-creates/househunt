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
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Bookings for Your Properties</h1>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded p-4 shadow bg-white">
              <p><strong>Tenant:</strong> {booking.username}</p>
              <p><strong>Property:</strong> {booking.propertyId?.propType} ({booking.propertyId?.address})</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
              {booking.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApprove(booking._id)}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(booking._id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
