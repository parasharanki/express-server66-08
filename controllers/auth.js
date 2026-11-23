import jwt from "jsonwebtoken";
import Auth from "../model/auth.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
  try {
    let { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    const newUser = new Auth({ name, email, password });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered succesfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function loginUser(req, res) {
  const { email, password } = req.body;
  const userExists = await Auth.findOne({ email });
  if (!userExists)
    return res.status(404).json({ message: "invalid user credentials" });

  const passwordMatches = await bcrypt.compare(password, userExists.password);
  if (!passwordMatches)
    return res.status(404).json({ message: "invalid user credentials" });

  const auth_token = jwt.sign(userExists.email, process.env.JWT_SECRET);

  res
    .cookie("token", auth_token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 3600000,
    })
    .status(200)
    .json({ message: "login succesfully" });
}
