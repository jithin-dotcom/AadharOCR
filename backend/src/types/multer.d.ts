
// import { File } from "multer";

// declare global {
//   namespace Express {
//     interface Request {
//       files?: {
//         front?: File[];
//         back?: File[];
//       };
//     }
//   }
// }





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
