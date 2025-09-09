

import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      files?: {
        front?: Multer.File[];
        back?: Multer.File[];
      };
    }
  }
}
