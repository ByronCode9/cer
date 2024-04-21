// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../schemas/user-schema"); // Assuming you have a User model

module.exports = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Extract userId from the decoded token
    const userId = decodedToken.userId;

    // Check if userId exists in the User table
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Attach the userId to the request object
    req.userId = userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
