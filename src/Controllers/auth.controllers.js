const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Owner = require("../Models/owner.model");
const Employee = require("../Models/employee.model");

const Catching = require('../Helpers/Catching');
const AppError = require('../Helpers/AppError');

const register = Catching(async (req,res,next) => {


    const {body: info} = req;

    const findOwner = await Owner.findOne({user_name: info.user_name});

    if(findOwner) {
      next(new AppError('User Name Has Exist !', 409));
      return;
    }
    
    const hash = bcrypt.hashSync(info.password, bcrypt.genSaltSync(10));

    await Owner.create({
      owner_name: info.owner_name,
      owner_phone: info.owner_phone,
      owner_email: info.owner_email,
      owner_address: info.owner_address,
      owner_store: info.owner_store,
      user_name: info.user_name,
      password: hash
    })
    
    return res.status(200).json({
      status: 'success',
      message: 'Register Successfully !'
    });
});

const login = Catching(async (req,res,next) => {

    const {body: info} = req;

    const findOwner = await Owner.findOne({user_name: info.user_name});

    if(findOwner) {

      const isValidPassword = bcrypt.compareSync(info.password, findOwner.password);
      if(isValidPassword) {
        const accessToken = jwt.sign(
          {
            user_name: findOwner.user_name,
            role: 'owner',
          },
          process.env.JWT_Key,
          { expiresIn: 3 * 30 * 24 * 60 * 60 }
        );
        return res.status(200)
        .cookie(
          'accessToken',
          accessToken,
          {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
          }
        )
        .json({
          status: 'success',
          message: 'Login Successfully !'
        });
      }

      next(new AppError('Wrong User Name or Password !', 401));
      return;

    }
    const findEmployee = await Employee.findOne({user_name: info.user_name});

    if(findEmployee) {

      const isValidPassword = bcrypt.compareSync(info.password, findEmployee.password);

      if(isValidPassword) {
        const accessToken = jwt.sign(
          {
            user_name: findEmployee.user_name,
            role: 'employee',
          },
          process.env.JWT_Key,
          { expiresIn: 3 * 30 * 24 * 60 * 60 }
        );

        return res.status(200)
        .cookie(
          'accessToken',
          accessToken,
          {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true
          }
        )
        .json({
          status: 'success',
          message: 'Login Successfully !'
        });
      }

      next(new AppError('Wrong User Name or Password !', 401));
      return;

    }

    next(new AppError('Wrong User Name or Password !', 401));
    return;

});

const deleteToken = Catching(async(req,res,next) => {  
  return res
  .status(200)
  .cookie(
    'accessToken',
    '',
    {
    expires: new Date(0),
    httpOnly: true
    })
    .json('Logout Successfully!');
});

module.exports = {
  register,
  login,
  deleteToken
}