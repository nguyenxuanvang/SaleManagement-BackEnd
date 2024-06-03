const mongoose = require('mongoose');
const importSchema = new mongoose.Schema({
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
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Owner',
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
importSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const Import = mongoose.model('Import',importSchema);
module.exports = Import;