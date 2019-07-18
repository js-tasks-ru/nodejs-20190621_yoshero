const uuid = require('uuid/v4');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
  const token = uuid();
  const body = ctx.request.body;
  const user = await User.create({
    email: body.email,
    displayName: body.displayName,
    password: body.password,
    verificationToken: token,
  });
  await user.setPassword(body.password);
  user.save();

  await sendMail({
    template: 'confirmation',
    locals: {token: token},
    to: body.email,
    subject: 'Подтвердите почту',
  });
  ctx.status = 200;
  ctx.body = {status: 'ok'};
};
module.exports.confirm = async (ctx, next) => {
  const token = ctx.request.body.verificationToken;
  const user = await User.findOne({verificationToken: token});
  if (user) {
    user.verificationToken = undefined;
    user.save();
    ctx.status = 200;

    ctx.body = {token: token};
  } else {
    ctx.status = 400;
    ctx.body = {error: 'Ссылка подтверждения недействительна или устарела'};
  }
};
