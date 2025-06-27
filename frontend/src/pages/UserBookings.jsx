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

  if (loading) return <div className="p-4">Loading bookings...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded p-4 shadow bg-white"
            >
              <p><strong>Property ID:</strong> {booking.propertyId?._id || booking.propertyId}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
