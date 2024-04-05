const express = require('express');
const app = express();
app.get('/',(req,res,next) => {
  return res.json('hello');
})
module.exports = app;