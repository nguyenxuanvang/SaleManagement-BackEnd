const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
  owner_name: {
    type: String,
    required: true
  },
  owner_phone: {
    type: String,
    required: true,
  },
  owner_email: {
    type: String,
    required: true
  },
  owner_address: {
    type: String,
    required: true,
  },
  owner_store: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
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
ownerSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const Owner = mongoose.model('Owner',ownerSchema);
module.exports = Owner;