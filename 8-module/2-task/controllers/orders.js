const Order = require('../models/Order');
const mapOrder = require('../mappers/order');

module.exports.checkout = async function checkout(ctx, next) {
  const {product, phone, address} = ctx.request.body;
  const user = ctx.user.id;
  const order = await new Order({
    user,
    product,
    phone,
    address,
  });
  await order.save();

  ctx.body = {order: order._id};
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
  const user = ctx.user.id;
  const allOrders = await Order.find( {user} ).populate('product');
  allOrders.forEach( (el) => mapOrder(el) );

  ctx.body = {
    orders: allOrders,
  };
};
