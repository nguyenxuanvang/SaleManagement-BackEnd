const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const Catching = require('../Helpers/Catching');
const AppError = require('../Helpers/AppError');
const Product = require('../Models/product.model');
const Category = require('../Models/category.model');

const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'./src/images/');
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split('.');
    const fileName = file.fieldname + '-' + Date.now() + '.' + arr[arr.length-1];
    req.fileName = fileName;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

const createProduct = Catching(async (req,res,next) => {
  const {body} = req;
  const info = JSON.parse(body.product);
  let image_url = 'default.png';
  if(req.file) {
    image_url = req.fileName;
  }
  const product = await Product.create({
    product_name: info.tenHang,
    sale_price: info.giaBan,
    cost_price: info.giaVon,
    quantity: info.tonKho,
    unit: info.donViTinh,
    image_url,
    category: info.nhomHang,
    owner: req.user._id
  })
  const result = await Product.findOne({_id: product._id}).populate('category');
  return res.status(200).json({
    status: 'success',
    data: result,
    message: 'Create Product Successfully!'
  })
});

const getProducts = Catching(async(req,res,next)=>{
  let {search,categoryId,page} = req.query;
  if(!page) {
    page = 1;
  }
  const limit = 5;
  const skip = (Number(page) - 1) * limit;
  const queryObj = {owner: req.user._id, product_name: new RegExp(search, 'i')};
  if(categoryId) {
    queryObj.category = categoryId;
  }
  let findProducts = await Product
  .find(queryObj)
  .populate('category')
  .skip(skip)
  .limit(limit);
  return res.status(200).json({
    status: 'success',
    data: findProducts
  })
});

const updateProduct = Catching(async (req,res,next)=>{
  const info = JSON.parse(req.body.product);
  const {
    cost_price,
    product_name,
    sale_price,
    category,
    quantity, 
    unit,
    _id,
    image_url
  } = info;
  const product = await Product.findOne({_id});
  product.product_name = product_name;
  product.cost_price = cost_price;
  product.sale_price = sale_price;
  product.category = category;
  product.quantity = quantity;
  product.unit = unit;
  if(req.fileName) {
    if(image_url !== 'default.png') {
      const listImage = fs.readdirSync(path.join(__dirname, '../images'));
      const findImage = listImage.find(item => item === image_url);
      fs.unlinkSync(path.join(__dirname,`../images/${findImage}`));
      product.image_url = req.fileName;
    } else {
      product.image_url = req.fileName;
    }
  }
  await product.save();
  
  return res.status(200).json({
    status: 'success',
    data: product,
    message: 'Update Product Successfully!'
  })
});

const deleteProduct = Catching(async(req,res,next)=>{
  const {maHang: _id} = req.body;
  const deleteProduct = await Product.findOne({_id});
  if(!deleteProduct) {
    next(new AppError('Product Has Not Exist !', 404));
      return;
  }
  await Product.deleteOne({_id});
  if(deleteProduct.image_url !== 'default.png') {
    const listImage = fs.readdirSync(path.join(__dirname, '../images'));
    const findImage = listImage.find(item => item === deleteProduct.image_url);
    fs.unlinkSync(path.join(__dirname,`../images/${findImage}`));
  }
  return res.status(200).json({
    status: 'success',
    data: deleteProduct,
    message: 'Delete Product Successfully!'
  });
})
module.exports = {
  createProduct,
  getProducts,
  upload,
  updateProduct,
  deleteProduct
}