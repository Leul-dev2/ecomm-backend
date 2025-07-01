import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const { id } = useParams(); // Product ID from route (edit mode)
  const navigate = useNavigate();

  const isEdit = !!id;

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    brandName: '',
    price: '',
    discountPercent: '',
  });

  // Load product data in edit mode
  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then(res => {
          const product = res.data;
          setFormData({
            title: product.title,
            brandName: product.brandName,
            price: product.price,
            discountPercent: product.discountPercent || '',
          });
          setImageUrl(product.image);
        })
        .catch(err => {
          console.error('Failed to load product', err);
          alert('Error loading product data');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!image) return alert('Choose an image first');
    const data = new FormData();
    data.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', data);
      setImageUrl(res.data.imageUrl);
      alert('Image uploaded!');
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalProduct = {
      ...formData,
      price: parseFloat(formData.price),
      discountPercent: parseInt(formData.discountPercent) || 0,
      priceAfterDiscount: formData.discountPercent
        ? parseFloat(formData.price * (1 - formData.discountPercent / 100)).toFixed(2)
        : null,
      image: imageUrl,
    };

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/products/${id}`, finalProduct);
        alert('Product updated!');
      } else {
        await axios.post('http://localhost:5000/api/products', finalProduct);
        alert('Product added!');
      }
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? '✏️ Edit Product' : '➕ Add New Product'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brandName"
          placeholder="Brand Name"
          className="w-full p-2 border rounded"
          value={formData.brandName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discountPercent"
          placeholder="Discount %"
          className="w-full p-2 border rounded"
          value={formData.discountPercent}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="button" onClick={handleUploadImage} className="bg-blue-600 text-white px-4 py-2 rounded">
            Upload Image
          </button>
          {imageUrl && <img src={imageUrl} alt="Preview" className="w-32 mt-2 rounded shadow" />}
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          {isEdit ? 'Update Product' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}
