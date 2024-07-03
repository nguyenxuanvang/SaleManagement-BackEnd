const {validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const Catching = require('../Helpers/Catching');
const AppError = require('../Helpers/AppError');
const Product = require('../Models/product.model');
const Order = require('../Models/order.model');
const OrderDetail = require('../Models/orderDetail.model');
const saleProducts = Catching(async(req,res,next) => {
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
    const findProduct = await Product.findById(item._id);
    findProduct.quantity -= item.quantityP;
    await findProduct.save();
    const order_image = 'order-image-'+Date.now()+'.png';
    await OrderDetail.create({
      quantity: item.quantityP,
      price: item.tongTien,
      order: newOrder._id,
      product: item._id,
      product_name: findProduct.product_name,
      image_url: order_image
    });
    await fs.copyFile(path.join(__dirname,`../images/${findProduct.image_url}`),path.join(__dirname,`../order-images/${order_image}`), (err) => {
      if (err) {
        next(new AppError('Error copying file', 400, err));
        return;
      }
    });
  })
  return res.status(200).json({
    status: 'success',
    message: 'Order Product Successfully !'
  })
})
module.exports = {
  saleProducts
}