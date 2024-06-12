const {validationResult } = require('express-validator');
const AppError = require('../Helpers/AppError');
const Catching = require('../Helpers/Catching');
const Import = require('../Models/import.model');
const ImportDetail = require('../Models/importDetail.model');
const Product = require('../Models/product.model');

const importProduct = Catching(async (req,res,next) => {
  const {cart,totalQuantity,totalPrice} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new AppError('Data Input Invalid', 400, errors.array()));
    return;
  }
  const newImport = await Import.create({
    total_quantity: totalQuantity,
    total_price: totalPrice,
    owner: req.user._id
  })
  cart.forEach(async(item) => {
    await ImportDetail.create({
      import: newImport._id,
      product: item._id,
      quantity: item.quantity,
      price: item.quantity*item.cost_price
    })
    const findProduct = await Product.findById(item._id);
    findProduct.quantity += item.quantity;
    await findProduct.save();
  })
  return res.status(200).json({
    status: 'success',
    message: 'Import Products Successfully !'
  })
});
module.exports = {
  importProduct
}