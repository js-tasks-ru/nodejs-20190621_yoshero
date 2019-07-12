const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

});

const categorySchema = new mongoose.Schema({
  subcategories: [subCategorySchema],
  title: {
    type: String,
    required: true,
  },
});

subCategorySchema.set('toObject', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

categorySchema.set('toObject', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = connection.model('Category', categorySchema);

/*
Модель категории (`models/Category.js`) должна иметь следующий набор полей:

- `title`, в этом поле будет находиться название категории, например, "Детские товары" или
"Компьютерная техника".
    - строковое
    - обязательное
- `subcategories`, массив подкатегорий. Каждая подкатегория имеет слеюуще поле:
    - `title`, в этом поле будет находиться название подкатегории.
        - строковое
        - обязательное
 */
