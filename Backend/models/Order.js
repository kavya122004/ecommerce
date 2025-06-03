const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, default: uuidv4 }, // Unique order ID
  email: { type: String, required: true },
  product: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    // Add more fields if needed
  },
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    type: { type: String, enum: ['home', 'office'], default: 'home' },
  },
  paymentType: { type: String, enum: ['cod', 'upi'], default: 'cod' },
  quantity: { type: Number, default: 1 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
