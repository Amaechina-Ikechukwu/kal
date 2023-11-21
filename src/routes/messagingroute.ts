import { Router, Request, Response, NextFunction } from "express";

import { checkRequestBodyParams } from "../middlewares/authmiddleware";
import { VerifyToken } from "../middlewares/verifytoken";

import SendMessageToSchoolGroup from "../controllers/groups/messaging/school/sendmessage";
import SeenMessageToSchoolGroup from "../controllers/groups/messaging/school/seenby";
class CustomUserProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.message = "CustomUserProfileError";
  }
}

const messagingRouter = Router();
//
messagingRouter.post(
  "/message/sendtoschoolgroup",
  checkRequestBodyParams(["message"]),
  VerifyToken,
  async (req: Request, res: Response) => {
    try {
      const uid = (req as any).uid;
      const { message } = req.body;
      const result = await SendMessageToSchoolGroup(uid, message);

      res.status(200).json({ message: result });
    } catch (err: any) {
      if (err instanceof CustomUserProfileError) {
        return res.status(400).json({ error: err.message });
      } else if (err instanceof Error) {
        // Handle other specific errors as needed
        return res.status(500).json({ error: err });
      }

      return res.json({ error: err });
    }
  }
);
messagingRouter.post(
  "/message/seenschoolgroupmessage",
  checkRequestBodyParams(["messageId"]),
  VerifyToken,
  async (req: Request, res: Response) => {
    try {
      const uid = (req as any).uid;
      const { messageId, reader } = req.body;
      const result = await SeenMessageToSchoolGroup(messageId, uid);

      res.status(200).json({ message: result });
    } catch (err: any) {
      if (err instanceof CustomUserProfileError) {
        return res.status(400).json({ error: err.message });
      } else if (err instanceof Error) {
        // Handle other specific errors as needed
        return res.status(500).json({ error: err });
      }

      return res.json({ error: err });
    }
  }
);

export default messagingRouter;
