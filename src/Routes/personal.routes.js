const express = require("express");
const AuthenticateJWT = require('../Middlewares/Authenticate');
const personalRouter = express.Router();
personalRouter
  .route('/')
  .get(
    AuthenticateJWT,
    (req,res,next)=>{return res.status(200).json(req.user)}
  );
module.exports = personalRouter;