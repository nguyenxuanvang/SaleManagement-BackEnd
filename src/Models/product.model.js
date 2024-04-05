const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  sale_price: {
    type: Number,
    required: true,
    min: 0
  },
  cost_price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true
  },
  image_url: {
    type: String
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date
  }
});
productSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const Product = mongoose.model('Product',productSchema);
module.exports = Product;