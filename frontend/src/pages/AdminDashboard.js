import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

const updateOrderStatus = async (orderId, status) => {
  try {
    await axios.put(`http://localhost:8000/orders/${orderId}/status`, { status });
    fetchOrders(); // Refresh orders after update
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};


  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard - Orders</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.customer_name}</td>
              <td className="border p-2">${order.total_price.toFixed(2)}</td>
              <td className="border p-2">Completed</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
