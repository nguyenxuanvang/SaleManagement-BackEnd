const {ObjectId} = require('mongodb');
const Category = require('../Models/category.model');

const Catching = require('../Helpers/Catching');
const AppError = require('../Helpers/AppError');

const getCategories = Catching(async (req,res,next) => {
  const categories = await Category.find({owner: req.user._id});
  return res.status(200).json({
    status: 'success',
    data: categories
  })
});

const createCategory = Catching(async(req,res,next) => {

  const {category_name} = req.body;

  const newCategory = await Category.create({
    category_name: category_name,
    owner: req.user._id
  });

  return res.status(200).json({
    status: 'success',
    data: newCategory,
    message: 'Create Category Successfully!'
  })
})

module.exports = {
  getCategories,
  createCategory
}