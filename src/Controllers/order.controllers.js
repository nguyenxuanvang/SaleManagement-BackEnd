const {validationResult } = require('express-validator');
const Catching = require('../Helpers/Catching');
const AppError = require('../Helpers/AppError');
const Product = require('../Models/product.model');
const Order = require('../Models/order.model');
const OrderDetail = require('../Models/orderDetail.model');
const orderProducts = Catching(async(req,res,next) => {
  const {cart,totalQuantity,totalPrice,note} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new AppError('Data Input Invalid', 400, errors.array()));
    return;
  }
  const newOrder = await Order.create({
    total_quantity: totalQuantity,
    total_price: totalPrice,
    [(req.user.owner) ? 'employee' : 'owner']: req.user._id,
    note,
  })
  cart.forEach(async(item) => {
    await OrderDetail.create({
      quantity: item.quantityP,
      price: item.tongTien,
      order: newOrder._id,
      product: item._id
    });
    const findProduct = await Product.findById(item._id);
    findProduct.quantity -= item.quantityP;
    await findProduct.save();
  })
  return res.status(200).json({
    status: 'success',
    message: 'Order Product Successfully !'
  })
})
module.exports = {
  orderProducts
}