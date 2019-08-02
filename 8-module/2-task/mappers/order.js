const mapProduct = require( './product' );

module.exports = function mapOrder({_id, user, product, phone, address}) {
  return {
    id: _id,
    user,
    product: mapProduct(product),
    phone,
    address,
  };
};

