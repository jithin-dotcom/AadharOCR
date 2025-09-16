


import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiErrors";
import { ERROR_CODES, ERROR_MESSAGES } from "../constants/errorMessages";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

 
  if ((err as any).code === "LIMIT_FILE_SIZE") {
    return res.status(ERROR_CODES.BAD_REQUEST).json({ error: ERROR_MESSAGES.FILE_TOO_LARGE });
  }

 
  res.status(ERROR_CODES.SERVER_ERROR).json({ error: ERROR_MESSAGES.SERVER_ERROR });
};

export default errorHandler;
