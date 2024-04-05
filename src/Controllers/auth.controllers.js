const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Owner = require("../Models/owner.model");
const Employee = require("../Models/employee.model");

const register = async (req,res) => {

  try {

    const {body: info} = req;

    const findOwner = await Owner.findOne({user_name: info.user_name});

    if(findOwner) {
      return res.status(409).json({
        status: 'fail',
        message: 'User Name Has Exist !'
      })
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

  } catch(e) {
    return res.status(500).json({
      status: 'error',
      message: e
    });
  }
}
const login = async (req,res) => {
  try {

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
        return res.status(200).json({
          status: 'success',
          accessToken,
          message: 'Login Successfully !'
        });
      }

      return res.status(401).json({
        status: 'fail',
        message: 'Wrong User Name or Password !'
      })

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

        return res.status(200).json({
          status: 'success',
          accessToken,
          message: 'Login Successfully !'
        });
      }

      return res.status(401).json({
        status: 'fail',
        message: 'Wrong User Name or Password !'
      })

    }
    return res.status(401).json({
      status: 'fail',
      message: 'Wrong User Name or Password !'
    })
  } catch(e) {
    return res.status(500).json({
      status: 'error',
      message: e
    });
  }
}
module.exports = {
  register,
  login
}