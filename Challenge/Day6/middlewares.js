export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'Seenblee Site';
  next();
};