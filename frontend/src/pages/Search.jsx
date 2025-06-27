import { useEffect, useState } from "react";
import axios from "axios";
import "../output.css"; // Ensure Tailwind CSS is imported
import { useAuth } from "../context/AuthContext";

export default function Search() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormId, setShowFormId] = useState(null);
  const [bookingMsg, setBookingMsg] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/general/get-all-properties");
        setProperties(res.data.properties || []);
      } catch (err) {
        console.error("Error fetching properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleBook = async (propertyId) => {
    try {
      await axios.post("http://localhost:5000/general/book-property", {
        propertyId,
        message: bookingMsg,
      });
      setMessage("Booking successful!");
      setShowFormId(null);
      setBookingMsg("");
    } catch (err) {
      setMessage("Booking failed.");
    }
  };

  if (loading) return <div className="p-4">Loading properties...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Available Properties</h1>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((prop) => (
          <div key={prop._id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-bold">{prop.propType}</h2>
            <p className="text-gray-600">Ad Type: {prop.adType}</p>
            {/* Booking UI for tenants */}
            {user && user.userType === "tenant" && (
              <>
                <button
                  onClick={() => setShowFormId(prop._id)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Book Property
                </button>
                {showFormId === prop._id && (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleBook(prop._id);
                    }}
                    className="mt-2 space-y-2"
                  >
                    <textarea
                      className="w-full border rounded p-2"
                      placeholder="Message to owner (optional)"
                      value={bookingMsg}
                      onChange={e => setBookingMsg(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      className="ml-2 px-4 py-2 rounded border"
                      onClick={() => setShowFormId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
