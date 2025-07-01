import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-5 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <ul className="p-4 space-y-3">
        <li><Link to="/" className="hover:text-yellow-400">📊 Dashboard</Link></li>
        <li><Link to="/products" className="hover:text-yellow-400">📦 Products</Link></li>
        <li><Link to="/add-product" className="hover:text-yellow-400">➕ Add Product</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
