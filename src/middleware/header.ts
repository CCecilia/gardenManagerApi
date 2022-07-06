export const jsonContent = (_req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/json');
  } catch (error) {
    console.error(error)
  }
  next();
};
