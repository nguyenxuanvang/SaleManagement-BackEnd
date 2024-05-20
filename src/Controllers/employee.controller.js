const bcrypt = require("bcrypt");
const {validationResult } = require('express-validator');
const AppError = require("../Helpers/AppError");
const Catching = require("../Helpers/Catching");
const Role = require ("../Models/role.model");
const Owner = require("../Models/owner.model");
const Employee = require("../Models/employee.model");
const getRoles = Catching(async (req,res,next) => {
  const roles = await Role.find({});
  return res.status(200).json({
    status: 'success',
    data: roles
  }) 
});
const getEmployees = Catching(async(req,res,next)=>{
  let {search,page} = req.query;
  if(!page) {
    page = 1;
  }
  const limit = 5;
  const skip = (Number(page) - 1) * limit;
  const queryObj = {
    owner: req.user._id,
    name: new RegExp(search, 'i')
  }
  const employees = await Employee.find(queryObj).populate('role').skip(skip).limit(limit);
  return res.status(200).json({
    status: 'success',
    data: employees
  })
})
const createEmployee = Catching(async(req,res,next) => {
  const {body: info} = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new AppError('Data Input Invalid', 400, errors.array()));
    return;
  }
  const findOwner = await Owner.findOne({user_name: info.user_name});
  if(findOwner) {
    next(new AppError('User Name Has Exist !', 400));
    return;
  }
  const findEmployee = await Employee.findOne({user_name: info.user_name});
  if(findEmployee) {
    next(new AppError('User Name Has Exist !', 400));
    return;
  }
  const findRole = await Role.findOne({role_name: info.role});
  const hash = bcrypt.hashSync(info.password, bcrypt.genSaltSync(10));
  await Employee.create({
    owner: req.user._id,
    user_name: info.user_name,
    password: hash,
    name: info.name,
    role: findRole._id,
    email: info.email,
    address: info.address || '',
    birthday: info.birthday || '',
    phone: info.phone || '',
    note: info.note || '',
    status: info.status
  });
  const result = await Employee.findOne({user_name: info.user_name}).populate('role');
  return res.status(200).json({
    status: 'success',
    message: 'Add Employee Successfully!',
    data: result
  })
})
const updateEmployee = Catching(async(req,res,next)=>{
  const {body: info} = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new AppError('Data Input Invalid', 400, errors.array()));
    return;
  }
  const findOwner = await Owner.findOne({user_name: info.user_name});
  if(findOwner) {
    next(new AppError('User Name Has Exist !', 400));
    return;
  }
  const findEmployee = await Employee.findOne({user_name: info.user_name, _id: {$ne: info._id}});
  if(findEmployee) {
    next(new AppError('User Name Has Exist !', 400));
    return;
  }
  const hash = bcrypt.hashSync(info.password, bcrypt.genSaltSync(10));
  const findRole = await Role.findOne({role_name: info.role});
  const updateEmployee = await Employee.findOne({_id: info._id}).populate('role');
    updateEmployee.user_name = info.user_name;
    updateEmployee.password = hash;
    updateEmployee.name = info.name;
    updateEmployee.role = findRole;
    updateEmployee.email = info.email;
    updateEmployee.address = info.address || '';
    updateEmployee.birthday = info.birthday || '';
    updateEmployee.phone = info.phone || '';
    updateEmployee.note = info.note || '';
    if(info.status !== undefined) {
      updateEmployee.status = info.status
    }
  await updateEmployee.save();
  return res.status(200).json({
    status: 'success',
    message: 'Update SuccessFully !',
    data: updateEmployee
  })
});
const deleteEmployee = Catching(async(req,res,next) => {
  const {id} = req.params;
  const findEmployee = await Employee.findById(id);
  if(!findEmployee) {
    next(new AppError("Employee Is Not Found!",404));
    return;
  }
  await Employee.deleteOne({_id:id});
  return res.status(200).json({
    status: 'success',
    message: 'Delete SuccessFully !'
  })
})
module.exports = {
  getRoles,
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
}