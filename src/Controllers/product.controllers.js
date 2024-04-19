const Catching = require('../Helpers/Catching');
const Product = require('../Models/product.model');
const Category = require('../Models/category.model');

const createProduct = Catching(async (req,res,next) => {
  const {body: info} = req;
  const product = await Product.create({
    product_name: info.tenHang,
    sale_price: info.giaBan,
    cost_price: info.giaVon,
    quantity: info.tonKho,
    unit: info.donViTinh,
    image_url: info.anh,
    category: info.nhomHang,
    owner: req.user._id
  });
  return res.status(200).json({
    status: 'success',
    data: product,
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
})
module.exports = {
  createProduct,
  getProducts
}