import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

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
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken.uid) {
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
