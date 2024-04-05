const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
  role_name: {
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
roleSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const Role = mongoose.model('Role',roleSchema);
module.exports = Role;