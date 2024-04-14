const express = require("express");
const AuthenticateJWT = require('../Middlewares/Authenticate');
const {getCategories,createCategory} = require('../Controllers/category.controllers');
const categoryRouter = express.Router();
categoryRouter
  .route('/')
  .get(
    AuthenticateJWT,
    getCategories
  )
  .post(
    AuthenticateJWT,
    createCategory
  )
module.exports = categoryRouter;