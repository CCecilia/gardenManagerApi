const jwt = require('jsonwebtoken');

export const verifyToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authData = req.headers?.authorization;
  if (!authData) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  const [_bearer, token] = authData.split('Bearer ');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};
