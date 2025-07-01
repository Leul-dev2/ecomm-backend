import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
      alert("Error loading products.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not delete.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🛍 Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full table-auto bg-white rounded-md shadow overflow-hidden">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Discount</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-4 py-3">{product.title}</td>
                <td className="px-4 py-3">{product.brandName}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">
                  {product.discountPercent ? `${product.discountPercent}%` : "—"}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
