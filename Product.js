const mongoose = require('mongoose');

// schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'field nama harus ada'],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 2500000,
  },
  stock: Number,
  status: { type: Boolean, default: true },
});

// model
const Product = new mongoose.model('Product', productSchema);

module.exports = Product;