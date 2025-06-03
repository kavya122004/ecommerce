import React, { useState } from 'react';
import { useOrder } from '../OrderContext';
import { useAuth } from '../AuthContext';
import './BuyPage.css';

const BuyPage = () => {
  const { purchases, placeOrder } = useOrder();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    state: '',
    pincode: '',
    type: 'home',
    paymentType: 'cod',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const product = purchases[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = ['name', 'phone', 'address', 'state', 'pincode'];
    if (!user) return alert('Please log in to place an order');
    for (const field of requiredFields) {
      if (!formData[field]) return alert(`Please fill in ${field}`);
    }

    try {
      await placeOrder({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        state: formData.state,
        pincode: formData.pincode,
        type: formData.type,
        paymentType: formData.paymentType,
      });
      setOrderPlaced(true);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Order failed. Please try again.');
    }
  };

  if (!product) return <p>No product selected.</p>;

  return (
    <div className="buy-page-container">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-form">
        <div className="form-section">
          <h2>Shipping Details</h2>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleChange} />
          <div className="inline-fields">
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
            </select>
            <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
          </div>
          <div className="radio-group">
            <label><input type="radio" name="type" value="home" checked={formData.type === 'home'} onChange={handleChange} /> Home</label>
            <label><input type="radio" name="type" value="office" checked={formData.type === 'office'} onChange={handleChange} /> Office</label>
          </div>
        </div>

        <div className="form-section">
          <h2>Payment Method</h2>
          <div className="radio-group">
            <label><input type="radio" name="paymentType" value="cod" checked={formData.paymentType === 'cod'} onChange={handleChange} /> Cash on Delivery</label>
            <label><input type="radio" name="paymentType" value="upi" checked={formData.paymentType === 'upi'} onChange={handleChange} /> UPI</label>
          </div>
          <button className="place-order-btn" onClick={handleSubmit}>Place Order</button>
        </div>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Quantity: 1</p>
          </div>
        </div>
      </div>

      {orderPlaced && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Your order for <strong>{product.name}</strong> has been placed.</p>
            <button onClick={() => setOrderPlaced(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
