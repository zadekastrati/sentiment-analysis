const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract the token
  console.log("Received Token:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    console.log("Decoded Token:", decoded); // Debug log the payload

    if (!decoded.userId) {
      return res.status(400).json({ error: 'User ID missing in token payload.' });
    }

    req.userId =decoded.userId;
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.log("Invalid Token:", token, err.message); // Debug log for invalid token
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
