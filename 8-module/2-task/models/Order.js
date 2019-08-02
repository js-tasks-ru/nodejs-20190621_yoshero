const mongoose = require('mongoose');
const connection = require('../libs/connection');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate:
        {
          validator: (v)=> /\+?\d{6,14}/.test(v),
          message: 'invalid',
        },
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = connection.model('Order', orderSchema);
