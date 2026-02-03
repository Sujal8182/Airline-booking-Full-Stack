const jws = require("jsonwebtoken");
const User = require("../model/userModel");
const dotenv = require("dotenv");
dotenv.config();

exports.isAuth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jws.verify(token, process.env.JWS_CODE);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.user_id = decoded.id
    if (!req.user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
