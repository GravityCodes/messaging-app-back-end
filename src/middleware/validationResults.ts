import type { Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    console.error(result.array());
    return res.status(400).json({ errors: result.array() });
  }
};
