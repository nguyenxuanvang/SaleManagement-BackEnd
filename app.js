const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const authRouter = require('./src/Routes/auth.routes');
const personalRouter = require('./src/Routes/personal.routes');
const categoryRouter = require('./src/Routes/category.routes');
const productRouter = require('./src/Routes/product.routes');
const employeeRouter = require('./src/Routes/employee.routes');
const AppError = require('./src/Helpers/AppError');

const app = express();
app.use(parser.json());

//const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    callback(null, true)
    // if(whitelist.includes(origin))
    //   return callback(null, true)

    //   callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors(corsOptions));
app.use(express.static('src/images'));
app.use('/auth',authRouter);
app.use('/personal',personalRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);
app.use('/employee',employeeRouter);
app.get('/',(req,res,next) => {
  return res.json('hello');
});
app.all('*',(req,res,next) => {
  next(new AppError('Url Not Found!!!', 404));
});

app.use((error,req,res,next) => {
  if(!error.status) {
      console.log(error);
  }
  res
      .status(error.statusCode || 500)
      .json({
          status: error.status || 'error',
          message: error.message,
          error: error.error
      })
});
module.exports = app;