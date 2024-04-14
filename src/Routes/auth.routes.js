const express = require("express");
const {register, login, deleteToken} = require("../Controllers/auth.controllers");
const AuthenticateJWT = require('../Middlewares/Authenticate');
const authRouter = express.Router();
authRouter
  .route('/register')
  .post(
    register
  );
authRouter
  .route('/login')
  .post(
    login
  )
authRouter
  .route('/logout')
  .post(
    AuthenticateJWT,
    deleteToken
  )
module.exports = authRouter;