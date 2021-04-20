const jwt = require("jsonwebtoken");
const config = require("config");
import { Request, Response } from "express";
import { findUserbyId } from "../services/auth";
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";

export const auth = async (req: Request, res: Response, next: any) => {
  // Get token from header
  const token = req.header("Authorization");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const tokenToGetIdFrom = await jwt.verify(token, "mysecrettoken");
  const userId = tokenToGetIdFrom.user.id;

  // Validate user
  try {
    const user = await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.id = :id", { id: userId })
      .getOne();
    if (!user) {
      return res.status(401).json({ msg: "No user, authorization denied" });
    }
    const decode = await jwt.verify(token, "mysecrettoken", (error, decoded) => {
      // Verify token
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };
