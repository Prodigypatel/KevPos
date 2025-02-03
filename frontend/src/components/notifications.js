import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notifications() {
  const [newOrders, setNewOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(fetchNewOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchNewOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/orders?status=Pending');
      setNewOrders(response.data);
    } catch (error) {
      console.error('Error fetching new orders:', error);
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-lg font-bold mb-2">New Orders</h3>
      {newOrders.length > 0 ? (
        newOrders.map((order) => (
          <p key={order.id} className="p-2 bg-yellow-100 rounded">
            New order from {order.customer_name} - ${order.total_price.toFixed(2)}
          </p>
        ))
      ) : (
        <p>No new orders</p>
      )}
    </div>
  );
}
