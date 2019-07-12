const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();
  const categoriesToObject = categories.map((el)=>{
    const oneCat = el.toObject();
    oneCat.subcategories = el.subcategories.map((el)=>el.toObject());
    return oneCat;
  } );
  ctx.body = {categories: categoriesToObject};
};
