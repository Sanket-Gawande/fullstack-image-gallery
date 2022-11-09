import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default async function verifyToken(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    res.json({ error: true, message: "token not found!", token: false });
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    return;
  } catch (error) {
    res.json({ error: true, message: "Invalid request", token: "not-provided" });
    return;
  }
}
