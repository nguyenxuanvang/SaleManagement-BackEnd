const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  total_quantity: {
    type: Number,
    required: true,
    min: 0
  },
  total_price: {
    type: Number,
    required: true,
    min: 0
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Owner'
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date
  }
});
orderSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const Order = mongoose.model('Order',orderSchema);
module.exports = Order;