const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  birthday: {
    type: Date
  },
  note: {
    type: String
  },
  owner:{
    type: mongoose.Schema.ObjectId,
    ref: 'Owner',
    required: true
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: 'Role',
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
employeeSchema.pre('save', function (next) {
  if(!this.$isNew) {
    this.updatedAt = Date.now();
  }
  next();
});
const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee;