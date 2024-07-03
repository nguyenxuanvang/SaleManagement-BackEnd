const express = require("express");
const {body} = require('express-validator');
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {getOrders,getOrderDetails,deleteOrder} = require('../Controllers/order.controllers');

const orderRouter = express.Router();
orderRouter
  .route('/')
  .get(
    AuthenticateJWT,
    getOrders
  )
  .delete(
    AuthenticateJWT,
    deleteOrder
  )
orderRouter
  .route('/:id')
  .get(
    AuthenticateJWT,
    getOrderDetails
  )
  
module.exports = orderRouter;