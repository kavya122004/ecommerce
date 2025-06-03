const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const orders = await Order.find({ email }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// POST /orders
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { email, product, addressDetails, paymentType } = req.body;


    if (!email || !product || !addressDetails) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = new Order({
      email,
      product,
      address: {
        name: addressDetails.name,
        phone: addressDetails.phone,
        address: addressDetails.address,
        state: addressDetails.state,
        pincode: addressDetails.pincode,
        type: addressDetails.type,
      },
      paymentType: paymentType, // ✅ Use this instead of addressDetails.paymentType
    });


    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Order placement failed:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
