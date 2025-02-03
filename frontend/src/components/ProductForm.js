import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductForm({ productId }) {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    cost: '',
    barcode: '',
    category: '',
    supplier: '',
    size: '',
    units_per_case: '',
    case_cost: '',
    stock_quantity: '',
  });

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:8000/products/${productId}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productId) {
        await axios.put(`http://localhost:8000/products/${productId}`, product);
      } else {
        await axios.post('http://localhost:8000/products', product);
      }
      alert('Product saved successfully!');
    } catch (error) {
      alert('Error saving product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">{productId ? 'Edit' : 'Add'} Product</h2>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" className="block p-2 border rounded mb-2" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="block p-2 border rounded mb-2" required />
      <input type="number" name="cost" value={product.cost} onChange={handleChange} placeholder="Cost" className="block p-2 border rounded mb-2" required />
      <input type="text" name="barcode" value={product.barcode} onChange={handleChange} placeholder="Barcode" className="block p-2 border rounded mb-2" required />
      <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" className="block p-2 border rounded mb-2" />
      <input type="text" name="supplier" value={product.supplier} onChange={handleChange} placeholder="Supplier" className="block p-2 border rounded mb-2" />
      <input type="text" name="size" value={product.size} onChange={handleChange} placeholder="Size" className="block p-2 border rounded mb-2" />
      <input type="number" name="units_per_case" value={product.units_per_case} onChange={handleChange} placeholder="Units per Case" className="block p-2 border rounded mb-2" />
      <input type="number" name="case_cost" value={product.case_cost} onChange={handleChange} placeholder="Case Cost" className="block p-2 border rounded mb-2" readOnly />
      <input type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} placeholder="Stock Quantity" className="block p-2 border rounded mb-2" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Product</button>
    </form>
  );
}