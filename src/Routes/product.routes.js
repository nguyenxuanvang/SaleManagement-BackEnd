const express = require("express");
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {createProduct, getProducts} = require('../Controllers/product.controllers');
const productRouter = express.Router();
productRouter
  .route('/')
  .get(
    AuthenticateJWT,
    getProducts
  )
  .post(
    AuthenticateJWT,
    createProduct
  );
  
module.exports = productRouter;