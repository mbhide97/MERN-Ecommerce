const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Found",
      });
    }

    const verifyToken = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );

    req.user = verifyToken;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = protect;