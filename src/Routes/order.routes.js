const express = require("express");
const {body} = require('express-validator');
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {orderProducts} = require('../Controllers/order.controllers');

const orderRouter = express.Router();
orderRouter
  .route('/')
  .post(
    AuthenticateJWT,
    [
      body('totalQuantity').notEmpty().isInt({min:1}),
      body('totalPrice').notEmpty().isInt({min:1}),
    ],
    orderProducts
  )
  
module.exports = orderRouter;