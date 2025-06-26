import jwt from "jsonwebtoken";
import User from "../models/User.Model.js";
async function verifyToken(token) {
  if (!token) {
    const err = new Error("No token provided");
    err.status = 401;
    throw err;
  }
  try {
    // throws if invalid or expired
    const ans = await jwt.verify(token, "broisgay");
    // console.log(ans);
    return ans;
  } catch (e) {
    const err = new Error("Invalid or expired token");
    err.status = 401;
    throw err;
  }
}
export const validateUser = async (req, res, next) => {
  const { cookie } = req.headers;
  // console.log(cookie);
  // console.log(request);

  if (!cookie) {
    res.status(401).json({ error: "No Cookie" });
    return;
  }
  // console.log(cookie);
  try {
    console.log("hello");
    req.decoded = await verifyToken(cookie);
    // console.log(req.decoded);
    // console.log(req.user);
    const { email } = req.decoded;

    const userfound = await User.findOne({ email: email });
    // console.log(email, userfound);
    if (!userfound) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is invalid or expired. Please log in again.",
      });
    }
    // console.log("hellow")
    console.log(userfound);
    req.user = userfound; // Store user ID in request object
    console.log(req.user);
    // console.log("hello2");
    next();
  } catch (err) {
    console.log(err);
    console.log("hello3");
    res.status(401).json({ error: "Token Expired" });
    return;
  }
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).json({ error: "Email and password are required" });
  //   return;
  // }
  // next();
};
