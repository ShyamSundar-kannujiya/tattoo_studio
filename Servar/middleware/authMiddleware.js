import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* Protect Route */
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies.token || req.headers.authorization?.startsWith("Bearer")) {
      token = req.cookies.token || req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    console.log("TOKEN:", token);
    console.log("DECODED:", decoded);
    console.log("USER:", req.user);
    
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

/* Admin Only */
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (req.user.role?.toLowerCase() !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};
export default protect;
