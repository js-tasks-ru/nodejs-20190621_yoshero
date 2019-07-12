const mongoose = require('mongoose');
const Product = require('../models/Product');


// продукты по подкатегории
module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const subcat = ctx.query.subcategory;
  if (!mongoose.Types.ObjectId.isValid(subcat)) {
    ctx.body = {products: []};
    ctx.status = 400;
  } else {
    const products = await Product.find({subcategory: subcat});
    const productsToObject = products.map((el)=>{
      const oneProduct = el.toObject();
      return oneProduct;
    } );
    ctx.body = {products: productsToObject};
  }
};

// продукт по
module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find();
  const productsToObject = products.map((el)=>{
    const oneProduct = el.toObject();
    return oneProduct;
  } );
  ctx.body = {products: productsToObject};
};

// продукт по id
module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.body = 'id - not ObjectId';
    ctx.status = 400;
  } else {
    const product = await Product.findById( ctx.params.id );
    if (!product) {
      ctx.body = 'нет товара с таким ID';
      ctx.status = 404;
    } else {
      ctx.body = {product: product.toObject()};
    }
  }
};

