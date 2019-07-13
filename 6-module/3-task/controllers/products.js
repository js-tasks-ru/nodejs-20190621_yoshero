const Product = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const query = ctx.query.query;
  const products = await Product.find({$text: {$search: query}});
  const productsToObject = products.map((el)=>{
    const oneProduct = el.toObject();
    return oneProduct;
  } );
  ctx.body = {products: productsToObject};
};
