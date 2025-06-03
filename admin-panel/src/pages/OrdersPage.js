// src/pages/OrdersPage.js
import { useOrder } from '../OrderContext'; // assuming you have one
import { useNavigate } from 'react-router-dom';
import './OrdersPage.css'; // for styling

const OrdersPage = () => {
  const { orders } = useOrder();
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return <div className="orders-page">No orders found.</div>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="order-card"
            onClick={() => navigate(`/product/${order.product.name.toLowerCase()}`)}
          >
            <img src={order.product.image} alt={order.product.name} />
            <div className="order-info">
              <h3>{order.product.name}</h3>
              <p>₹{order.product.price}</p>
              <p><strong>Delivered to:</strong> {order.address.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
