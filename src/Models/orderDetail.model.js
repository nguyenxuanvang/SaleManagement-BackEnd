const mongoose = require('mongoose');
const orderDetailSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
    required: true
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
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
orderDetailSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const OrderDetail = mongoose.model('OrderDetail',orderDetailSchema);
module.exports = OrderDetail;