import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
};

export default protect;
