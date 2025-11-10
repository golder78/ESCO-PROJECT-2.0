import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: null });
  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch admin stats
  useEffect(() => {
    api
      .get("/admin/stats", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, [token]);

  // Fetch products
  useEffect(() => {
    api
      .get("/products", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [token]);

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      if (newProduct.image) formData.append("image", newProduct.image);

      if (editing) {
        await api.put(`/products/${editing}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      // Refresh product list
      const res = await api.get("/products");
      setProducts(res.data);
      setNewProduct({ name: "", price: "", description: "", image: null });
      setEditing(null);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setEditing(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
    });
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-serif text-yellow-600 mb-6">Admin Dashboard</h1>

      {/* STATS SECTION */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-bold">Users</h2>
          <p>{stats.users}</p>
        </div>
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-bold">Orders</h2>
          <p>{stats.orders}</p>
        </div>
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-bold">Products</h2>
          <p>{stats.products}</p>
        </div>
      </div>

      {/* PRODUCT MANAGEMENT */}
      <h2 className="text-2xl font-serif text-yellow-600 mb-4">{editing ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-10 grid gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
        >
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* PRODUCT LIST */}
      <h2 className="text-2xl font-serif text-yellow-600 mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white shadow rounded p-4">
            {p.image && <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-2" />}
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="text-gray-600">{p.description}</p>
            <p className="text-yellow-700 font-semibold mt-2">Ksh {p.price}</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
