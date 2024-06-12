const express = require("express");
const {body} = require('express-validator');
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {importProduct} = require('../Controllers/import.controllers');
const importRouter = express.Router();
importRouter
  .route('/')
  .post(
    AuthenticateJWT,
    [
      body('totalQuantity').notEmpty().isInt({min:1}),
      body('totalPrice').notEmpty().isInt({min:1}),
    ],
    importProduct
  )
  
module.exports = importRouter;