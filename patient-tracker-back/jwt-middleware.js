const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1]; // Extract the token


 if (token == null) {
   return res.status(401).json({ message: 'No token provided' });
 }


 jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
   if (err) {
     return res.status(403).json({ message: 'Invalid token' });
   }


   req.user = user; // Add the user payload to the request object
   next(); // Proceed to the next middleware
 });
};

module.exports = {verifyToken }