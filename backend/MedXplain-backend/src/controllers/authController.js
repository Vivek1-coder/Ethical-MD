import bcrypt from "bcryptjs";
import User from "../models/User.Model.js";
import jwt from "jsonwebtoken";
export const signupUser = async (req, res) => {
  // console.log(req);
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username: name, email, password: hashed });

    const registeredUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (err) {
    console.error("Signup error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const loginUser = async (req, res) => {
  console.log("helloboi");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Wrong password" });
      return;
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      "broisgay"
    );
    res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email, token });

    return;
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
    return;
  }
};
