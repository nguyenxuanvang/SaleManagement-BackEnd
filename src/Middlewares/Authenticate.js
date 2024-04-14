const jwt = require('jsonwebtoken');

const Catching = require('../Helpers/Catching');
const AppError = require('../Helpers/AppError');
const Employee = require('../Models/employee.model');
const Owner = require('../Models/owner.model');

const AuthenticateJWT = Catching(async(req,res,next) => {
  if(!req.headers.cookie) {
    return next(new AppError('Do not have permission!', 401));
  }
  const accessToken = req.headers.cookie.split('=')[1];
  let data;
  try {
    data = await jwt.verify(accessToken,process.env.JWT_Key);
  } catch(error) {
    next(new AppError('Token is not valid !',401,));
    return;
  }
  if(data.role === 'owner') {
    data = await Owner.findOne({user_name: data.user_name});
  } else {
    data = await Employee.findOne({user_name: data.user_name});
  }
  req.user = data;
  next();
})

module.exports = AuthenticateJWT;