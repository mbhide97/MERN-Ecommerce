 


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Token missing. Please login again.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "Token not provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRETE
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      msg: "Invalid token",
      error: error.message,
    });
  }
};

export default authMiddleware;
