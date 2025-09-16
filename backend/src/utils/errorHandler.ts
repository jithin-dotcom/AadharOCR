

// import { Request, Response, NextFunction } from 'express';

// const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);
//   res.status(500).json({ error: 'Server error' });
// };

// export default errorHandler;







import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiErrors";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

 
  if ((err as any).code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File size too large" });
  }

 
  res.status(500).json({ error: "Server error" });
};

export default errorHandler;
