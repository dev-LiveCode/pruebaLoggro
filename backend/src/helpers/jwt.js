import jwt from "jsonwebtoken";
import { env } from "../env.js";

export const authToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "Unauthorized, access denied" });

  jwt.verify(token, env().JWTSECRET, (err, user) => {
    if (err)
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    // req.user = user;
    console.log(user);
    next();
  });
};

export const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      env().JWTSECRET ?? "secretKey",
      { expiresIn: env().EXPIRATION },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
