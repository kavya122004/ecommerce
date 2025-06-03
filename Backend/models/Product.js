const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // main image
  images: [{ type: String }],               // multiple images
  sizes: [{ type: String }],                // available sizes
  description: { type: String },
  specifications: { type: Map, of: String },// key-value specification
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
