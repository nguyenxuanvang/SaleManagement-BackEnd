const express = require("express");
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
    createEmployee
  )
  .patch(
    AuthenticateJWT,
    updateEmployee
  )
employeeRouter
  .route('/:id')
  .delete(
    AuthenticateJWT,
    deleteEmployee
  )
module.exports = employeeRouter;