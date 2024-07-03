const express = require("express");
const {body} = require('express-validator');
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {saleProducts} = require('../Controllers/sale.controllers');

const saleRouter = express.Router();
saleRouter
  .route('/')
  .post(
    AuthenticateJWT,
    [
      body('totalQuantity').notEmpty().isInt({min:1}),
      body('totalPrice').notEmpty().isInt({min:1}),
    ],
    saleProducts
  )
  
module.exports = saleRouter;