import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    ingredientName: "",
    stock: "",
    unit: "",
    threshold: "",
  });
  const [message, setMessage] = useState("");

  // Fetch Inventory
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/task/Inventory");
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add Item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/task/Inventory", {
        ...formData,
        stock: parseInt(formData.stock),
        threshold: parseInt(formData.threshold),
      });
      setInventory([...inventory, response.data]);
      setMessage("Item added successfully!");
      setFormData({ ingredientName: "", stock: "", unit: "", threshold: "" });
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Error adding item. Try again.");
    }
  };

  // Handle Delete Item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/task/Inventory/${id}`);
      setInventory(inventory.filter((item) => item._id !== id));
      setMessage("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("Error deleting item.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Inventory Management</h1>

      {/* Inventory List */}
      <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Inventory</h2>
        {inventory.length > 0 ? (
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">Ingredient</th>
                <th className="px-4 py-2 border border-gray-300">Stock</th>
                <th className="px-4 py-2 border border-gray-300">Unit</th>
                <th className="px-4 py-2 border border-gray-300">Threshold</th>
                <th className="px-4 py-2 border border-gray-300">Last Updated</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id} className="border border-gray-300">
                  <td className="px-4 py-2">{item.ingredientName}</td>
                  <td className="px-4 py-2">{item.stock}</td>
                  <td className="px-4 py-2">{item.unit}</td>
                  <td className="px-4 py-2">{item.threshold}</td>
                  <td className="px-4 py-2">{new Date(item.lastUpdated).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No inventory items available.</p>
        )}
      </div>

      {/* Add Item Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <form onSubmit={handleAddItem} className="grid gap-4">
          <input
            type="text"
            name="ingredientName"
            placeholder="Ingredient Name"
            value={formData.ingredientName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
            min="0"
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit (e.g., kg, l)"
            value={formData.unit}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="number"
            name="threshold"
            placeholder="Threshold"
            value={formData.threshold}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
            min="0"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Feedback Message */}
      {message && (
        <p className="text-center text-green-600 mt-4">{message}</p>
      )}
    </div>
  );
};

export default InventoryManagement;
