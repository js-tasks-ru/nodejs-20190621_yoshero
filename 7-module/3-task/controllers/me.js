module.exports.me = async function me(ctx, next) {
  ctx.body = {
    email: ctx.user.user.email,
    displayName: ctx.user.user.displayName,
  };
};
