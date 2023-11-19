import { Request, Response, NextFunction } from "express";

export const checkRequestBodyParams = (paramsToCheck: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingParams: string[] = [];

    // Check if each parameter is present in req.body
    paramsToCheck.forEach((param) => {
      if (!(param in req.body)) {
        missingParams.push(param);
      }
    });

    if (missingParams.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing parameters: ${missingParams.join(", ")}` });
    }

    next();
  };
};
