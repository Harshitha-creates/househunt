import { useEffect, useState } from "react";
import axios from "axios";
import "../output.css";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    propType: "",
    adType: "",
    address: "",
    contact: "",
    amount: "",
    images: "",
    additionalInfo: "",
  });
  const [message, setMessage] = useState("");

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/owner/get-owner-properties");
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/owner/add-property", {
        ...form,
        amount: Number(form.amount),
        images: form.images ? form.images.split(",").map((img) => img.trim()) : [],
      });
      setMessage("Property added!");
      setForm({
        propType: "",
        adType: "",
        address: "",
        contact: "",
        amount: "",
        images: "",
        additionalInfo: "",
      });
      fetchProperties();
    } catch (err) {
      setMessage("Error adding property.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/owner/delete-property/${id}`);
      setMessage("Property deleted.");
      fetchProperties();
    } catch (err) {
      setMessage("Error deleting property.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-800 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4M4 11h16" /></svg>
          Manage Properties
        </h1>
        {message && (
          <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-200">
            {message}
          </div>
        )}
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-blue-50 p-6 rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Property Type"
            value={form.propType}
            onChange={(e) => setForm({ ...form, propType: e.target.value })}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Ad Type"
            value={form.adType}
            onChange={(e) => setForm({ ...form, adType: e.target.value })}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Images (comma separated URLs)"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
          />
          <input
            type="text"
            placeholder="Additional Info"
            value={form.additionalInfo}
            onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Property
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="border border-blue-100 rounded-lg p-6 shadow-sm bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow"
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
              <button
                onClick={() => handleDelete(prop._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
