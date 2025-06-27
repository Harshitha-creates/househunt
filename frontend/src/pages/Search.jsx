import { useEffect, useState } from "react";
import axios from "axios";
import "../output.css";
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-700 text-xl font-semibold animate-pulse">Loading properties...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4M4 11h16" /></svg>
          Available Properties
        </h1>
        {message && (
          <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-200">
            {message}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="border border-blue-100 rounded-lg p-6 shadow-sm bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow flex flex-col"
            >
              <h2 className="text-xl font-bold text-blue-700 mb-2">{prop.propType}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Ad Type:</span> {prop.adType}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Address:</span> {prop.address}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Contact:</span> {prop.contact}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Amount:</span> ₹{prop.amount}
              </p>
              {prop.images && prop.images.length > 0 && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {prop.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Property"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
              {prop.additionalInfo && (
                <p className="text-gray-500 mt-2">{prop.additionalInfo}</p>
              )}
              {user && user.userType === "tenant" && (
                <>
                  <button
                    onClick={() => setShowFormId(prop._id)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
                  >
                    Book Property
                  </button>
                  {showFormId === prop._id && (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleBook(prop._id);
                      }}
                      className="mt-4 space-y-2"
                    >
                      <textarea
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Message to owner (optional)"
                        value={bookingMsg}
                        onChange={e => setBookingMsg(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
                        >
                          Confirm Booking
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded border"
                          onClick={() => setShowFormId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
