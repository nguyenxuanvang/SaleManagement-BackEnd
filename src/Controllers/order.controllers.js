const {validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const Catching = require('../Helpers/Catching');
const AppError = require('../Helpers/AppError');
const Product = require('../Models/product.model');
const Order = require('../Models/order.model');
const OrderDetail = require('../Models/orderDetail.model');
const getOrders = Catching(async(req,res,next) => {
  let {search,filter,page} = req.query;
  if(!page) {
    page = 1;
  }
  const limit = 5;
  const skip = (Number(page) - 1) * limit;
  const queryObj = {owner: req.user._id};
  if(search) {
    const date = new Date(search);
    date.setHours(date.getHours()-7);
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate()+1);
    queryObj.createdAt = {
      $gte: date,
      $lte: newDate
    }
  }
  const orders = await Order
  .find(queryObj)
  .sort({createdAt: (filter!=='Oldest') ? -1 : 1})
  .skip(skip)
  .limit(limit);
  return res.status(200).json({
    status: 'success',
    data: orders
  })
});
const getOrderDetails = Catching(async(req,res,next) => {
  const {id} = req.params;
  const orderDetails = await OrderDetail.find({
    order: id
  });
  return res.status(200).json({
    status: 'success',
    data: orderDetails
  })
});
const deleteOrder = Catching(async(req,res,next)=>{
  const {id,page} = req.body;
  const limit = 5;
  const skip = (Number(page) - 1) * limit;
  const orderDetails = await OrderDetail.find({
    order: id
  });
  orderDetails.forEach(async(item)=>{
    await fs.promises.unlink(path.join(__dirname,`../order-images/${item.image_url}`));
  });
  await OrderDetail.deleteMany({
    order: id
  });
  await Order.deleteOne({
    _id: id
  });
  const orders = await Order.find({
    owner: req.user._id
  }).sort({createdAt: -1}).skip(skip).limit(limit);
  return res.status(200).json({
    status: 'success',
    data: orders,
    message: 'Delete Order Successfully !'
  })
})
module.exports = {
  getOrders,
  getOrderDetails,
  deleteOrder
}