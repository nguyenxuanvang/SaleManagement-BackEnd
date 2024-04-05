const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const authRouter = require('./src/Routes/auth.routes');
const app = express();
app.use(parser.json());
app.use(cors());
app.use('/auth',authRouter);
app.get('/',(req,res,next) => {
  return res.json('hello');
})
module.exports = app;