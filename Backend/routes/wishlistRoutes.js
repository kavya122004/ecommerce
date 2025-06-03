const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// POST /wishlist - Add a product to the wishlist
router.post('/', async (req, res) => {
  const { email, product } = req.body;

  if (!email || !product) {
    return res.status(400).json({ error: 'Email and product are required' });
  }

  try {
    // Check if product already exists in user's wishlist
    const exists = await Wishlist.findOne({ email, 'product._id': product._id });
    if (exists) {
      return res.status(409).json({ error: 'Product already in wishlist' });
    }

    const newEntry = new Wishlist({ email, product });
    await newEntry.save();
    res.status(201).json({ message: 'Product added to wishlist' });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// GET /wishlist?email=... - Fetch wishlist items for a user
router.get('/', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const items = await Wishlist.find({ email });
    res.json(items.map(item => item.product));
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// routes/wishlist.js
router.delete('/', async (req, res) => {
  const { email, productId } = req.query;

  if (!email || !productId) {
    return res.status(400).json({ error: 'Email and product ID are required' });
  }

  try {
    const result = await Wishlist.findOneAndDelete({
      email,
      'product._id': productId
    });

    if (!result) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.error('Error removing from wishlist:', err);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});



module.exports = router;
