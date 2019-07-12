const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  subcategories: [subCategorySchema],
});

subCategorySchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});

categorySchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});

module.exports = connection.model('Category', categorySchema);
