module.exports = function mustBeAuthenticated(ctx, next) {
  if (!ctx.user) ctx.throw(401, 'Пользователь не залогинен');
  ctx.body.email = ctx.user.user.email;
  ctx.body.displayName = ctx.user.user.displayName;
  return next();
};
