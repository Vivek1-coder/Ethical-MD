import jwt from "jsonwebtoken";
import User from "../models/User.Model.js";

export const isAuthorised = async (req, res, next) => {
  try {
    const { auth } = req.signedCookies;
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: "No authentication Token found. Please Login",
      });
    }

    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    const { user, email } = decoded;
    const userfound = await User.findOne({ email, username: user });
    if (!userfound) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is invalid or expired. Please log in again.",
      });
    }

    req.user = userfound.id; // Store user ID in request object
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Authentication failed. Please Login.",
    });
  }
};

// export { isAuthorised };
