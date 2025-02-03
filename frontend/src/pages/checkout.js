import { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import axios from 'axios';

export default function Checkout() {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const handleScan = async (barcode) => {
    setScannedBarcode(barcode);
    try {
      const response = await axios.get(`http://localhost:8000/products?barcode=${barcode}`);
      setProduct(response.data);
    } catch (error) {
      alert('Product not found');
    }
  };

  const addToCart = () => {
    if (product) {
      setCart([...cart, { ...product, quantity }]);
      setProduct(null);
      setScannedBarcode('');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">POS Checkout</h2>
      <BarcodeScanner onScan={handleScan} />
      {product && (
        <div className="mt-4 p-4 border rounded shadow-md">
          <p><strong>Product:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="p-2 border rounded w-20"
          />
          <button onClick={addToCart} className="bg-green-500 text-white px-4 py-2 rounded ml-2">
            Add to Cart
          </button>
        </div>
      )}
      <h3 className="mt-5 text-lg font-bold">Cart</h3>
      <ul className="mt-2">
        {cart.map((item, index) => (
          <li key={index} className="border p-2 mb-2 rounded">
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
