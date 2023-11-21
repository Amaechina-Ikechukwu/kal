import { Router, Request, Response, NextFunction } from "express";

import { checkRequestBodyParams } from "../middlewares/authmiddleware";
import { VerifyEmail } from "../controllers/authentication/verifyemail";
import { VerifyToken } from "../middlewares/verifytoken";
import { DeleteUser } from "../controllers/authentication/deleteuser";
import GetUserProfileInformation from "../controllers/profile/getuserprofileinformation";
import UpdateUserProfileInformation from "../controllers/profile/updateuserinformation";
import GetSameSchool from "../controllers/groups/getsameschool";
import GetSameFaculty from "../controllers/groups/getsamefaculty";
import GetSameDepartment from "../controllers/groups/getsamedepartment";
import GetSameLevel from "../controllers/groups/getsamelevel";
class CustomUserProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.message = "CustomUserProfileError";
  }
}

const profilerouter = Router();
//
profilerouter.get("/", VerifyToken, async (req: Request, res: Response) => {
  try {
    const uid = (req as any).uid;
    const result = await GetUserProfileInformation(uid);

    res.status(200).json({ userprofile: result });
  } catch (err: any) {
    if (err instanceof CustomUserProfileError) {
      return res.status(400).json({ error: err.message });
    } else if (err instanceof Error) {
      // Handle other specific errors as needed
      return res.status(500).json({ error: err });
    }

    return res.json({ error: err });
  }
});
profilerouter.get(
  "/connect",
  VerifyToken,
  async (req: Request, res: Response) => {
    try {
      const uid = (req as any).uid;
      const schoolmates = await GetSameSchool(uid);
      const facultymates = await GetSameFaculty(uid);
      const departmentmates = await GetSameDepartment(uid);
      const coursemates = await GetSameLevel(uid);
      const connect = {
        "Same University": schoolmates,
        "Same Faculty": facultymates,
        "Same Department": departmentmates,
        "Same CourseMates": coursemates,
      };

      res.status(200).json(connect);
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
profilerouter.post(
  "/update",
  checkRequestBodyParams(["school", "faculty", "department", "level"]),
  VerifyToken,
  async (req: Request, res: Response) => {
    try {
      const uid = (req as any).uid;
      const result = await UpdateUserProfileInformation(uid, req.body);

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
profilerouter.delete(
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
export default profilerouter;
