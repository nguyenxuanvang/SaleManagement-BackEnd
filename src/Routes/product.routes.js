const express = require("express");
const {body} = require('express-validator');
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
    [
      body('product.tenHang').notEmpty(),
      body('product.giaBan').notEmpty().isNumeric(),
      body('product.giaVon').notEmpty().isNumeric(),
      body('product.tonKho').notEmpty().isNumeric(),
      body('product.donViTinh').notEmpty(),
      body('product.nhomHang').notEmpty()
    ],
    createProduct
  )
  .patch(
    AuthenticateJWT,
    upload.single('image'),
    [
      body('product.product_name').notEmpty(),
      body('product.cost_price').notEmpty().isNumeric(),
      body('product.sale_price').notEmpty().isNumeric(),
      body('product.quantity').notEmpty().isNumeric(),
      body('product.unit').notEmpty(),
      body('product.category').notEmpty(),
      body('product._id').notEmpty(),
      body('product.image_url').notEmpty()
    ],
    updateProduct
  )
  .delete(
    AuthenticateJWT,
    deleteProduct
  )
  
module.exports = productRouter;