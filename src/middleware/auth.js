import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  jwt.verify(req.header('token'), process.env.JWT_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: err });
    req.user = decoded;
    next();
  });
};