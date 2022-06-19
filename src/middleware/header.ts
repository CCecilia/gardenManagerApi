export const jsonContent = (_req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};
