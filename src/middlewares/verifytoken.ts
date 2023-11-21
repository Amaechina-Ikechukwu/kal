import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
export const VerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorizationHeader.split("Bearer ")[1];

  try {
    const secretKey = process.env.KALLUM; // Replace with your actual secret key
    if (!secretKey) {
      throw new Error("Secret key is missing or undefined");
    }

    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

    if (!decodedToken || !decodedToken.uid) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Adding the UID to the request object for future use in the route handlers
    (req as any).uid = decodedToken.uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
