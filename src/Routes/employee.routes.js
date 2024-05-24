const express = require("express");
const {body} = require('express-validator');
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {getRoles,createEmployee,getEmployees,updateEmployee, deleteEmployee} = require('../Controllers/employee.controller');
const employeeRouter = express.Router();
employeeRouter
  .route('/role')
  .get(
    AuthenticateJWT,
    getRoles
  )
employeeRouter
  .route('/')
  .get(
    AuthenticateJWT,
    getEmployees
  )
  .post(
    AuthenticateJWT,
    [
      body('name').notEmpty(),
      body('user_name').notEmpty(),
      body('password').notEmpty(),
      body('role').notEmpty(),
      body('email').notEmpty(),
      body('status').notEmpty()
    ],
    createEmployee
  )
  .patch(
    AuthenticateJWT,
    [
      body('name').notEmpty(),
      body('user_name').notEmpty(),
      body('role').notEmpty(),
      body('email').notEmpty(),
      body('status').notEmpty()
    ],
    updateEmployee
  )
employeeRouter
  .route('/:id')
  .delete(
    AuthenticateJWT,
    deleteEmployee
  )
module.exports = employeeRouter;