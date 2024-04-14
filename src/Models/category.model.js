const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true
  },
  owner:{
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


categorySchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const Category = mongoose.model('Category',categorySchema);
module.exports = Category;