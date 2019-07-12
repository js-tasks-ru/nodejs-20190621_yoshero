const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

mongoose.set('useNewUrlParser', true );
mongoose.set('debug', true);


// const subCategorySchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: 'Не введен title  подкатегории',
//   },
//
// });
//
// const categorySchema = new mongoose.Schema({
//   subcategories: [subCategorySchema],
//   title: {
//     type: String,
//     required: 'Не введен title категории',
//   },
// });


async function addCategory() {
  // await Product.set('toJSON', {
  //   transform: function(doc, ret, options) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //     delete ret.__v;
  //   },
  // })
  category = await Category.create({
    title: 'Category1',
    subcategories: [{
      title: 'Subcategory1',
    }],
  });

  product = await Product.create({
    title: 'Product1',
    description: 'Description1',
    price: 10,
    category: category.id,
    subcategory: category.subcategories[0].id,
    images: ['image1'],
  });
  console.log(product);
  console.log(category);
  // await Products.create({title: 'list', subcategories: [{title: 'dddddd'}]});
  return 'Done';
}


addCategory()
    .then(console.log);
