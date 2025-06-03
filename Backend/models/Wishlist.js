const mongoose = require('mongoose');
const crypto = require('crypto');

const WishlistSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      default: () => crypto.randomBytes(8).toString('hex'),
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Wishlist', WishlistSchema);
