import { useEffect, useState } from "react";
import axios from "axios";
import "../output.css"; // Ensure Tailwind CSS is imported

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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage Properties</h1>
      {message && <p className="mb-2 text-blue-600">{message}</p>}
      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Property Type"
          value={form.propType}
          onChange={(e) => setForm({ ...form, propType: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Ad Type"
          value={form.adType}
          onChange={(e) => setForm({ ...form, adType: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Images (comma separated URLs)"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Additional Info"
          value={form.additionalInfo}
          onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Property
        </button>
      </form>
      <div className="space-y-4">
        {properties.map((prop) => (
          <div key={prop._id} className="border p-4 rounded shadow bg-white">
            <p><strong>Type:</strong> {prop.propType}</p>
            <p><strong>Ad:</strong> {prop.adType}</p>
            <button
              onClick={() => handleDelete(prop._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
