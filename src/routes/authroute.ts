import { Router, Request, Response, NextFunction } from "express";
import { validate } from "uuid";
import { User } from "../interfaces/userinterface";
import { CreateUser } from "../controllers/authentication/createuser";
import { CreateToken } from "../controllers/authentication/createtoken";
import { checkRequestBodyParams } from "../middlewares/authmiddleware";
import { VerifyEmail } from "../controllers/authentication/verifyemail";
import { VerifyToken } from "../middlewares/verifytoken";
import { DeleteUser } from "../controllers/authentication/deleteuser";
const router = Router();
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const userData = req.body as User;
    const result = await CreateUser(userData);
    const token = await CreateToken(result);
    res.status(200).json({ userToken: token });
  } catch (err: any) {
    throw new Error("Error with signing up user");
  }
});
router.post(
  "/verifyemail",
  checkRequestBodyParams(["redirectUri", "email"]),
  async (req: Request, res: Response) => {
    try {
      const { redirectUri, email } = req.body;
      const result = await VerifyEmail(redirectUri, email);

      res.status(200).json({ userToken: result });
    } catch (err: any) {
      console.log(err);
      throw new Error("Error with verifying email");
    }
  }
);
router.delete(
  "/deleteuser",
  VerifyToken,
  async (req: Request, res: Response) => {
    try {
      const uid = (req as any).uid;
      const result = await DeleteUser(uid);

      res.status(200).json({ message: result });
    } catch (err: any) {
      throw new Error("Error with deleting user");
    }
  }
);
export default router;
