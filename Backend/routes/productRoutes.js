const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');
const Order = require('../models/Order');

// ----------------------
// PRODUCT ROUTES
// ----------------------

// GET /products - Fetch all products (optionally by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /products/:id - Fetch product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Server error. Failed to fetch product.' });
  }
});

// POST /products - Add a new product
router.post('/', async (req, res) => {
  const { name, price, category, image, description, images } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      image,
      images: images || [], // Store additional images if provided
      description,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});


// DELETE /products/:id - Delete a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


// PUT /products/:id - Update an existing product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Red Bidy');
  console.log(req.body);
  const { name, price, category, image, description } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, category, image, description },
      { new: true, runValidators: true } // return the updated doc and validate inputs
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});


module.exports = router;
