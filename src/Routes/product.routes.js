const express = require("express");
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {createProduct, getProducts, updateProduct, deleteProduct, upload} = require('../Controllers/product.controllers');
const productRouter = express.Router();
productRouter
  .route('/')
  .get(
    AuthenticateJWT,
    getProducts
  )
  .post(
    AuthenticateJWT,
    upload.single('image'),
    createProduct
  )
  .patch(
    AuthenticateJWT,
    upload.single('image'),
    updateProduct
  )
  .delete(
    AuthenticateJWT,
    deleteProduct
  )
  
module.exports = productRouter;