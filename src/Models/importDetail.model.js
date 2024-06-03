const mongoose = require('mongoose');
const importDetailSchema = new mongoose.Schema({
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
  import: {
    type: mongoose.Schema.ObjectId,
    ref: 'Import',
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
importDetailSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const ImportDetail = mongoose.model('ImportDetail',importDetailSchema);
module.exports = ImportDetail;