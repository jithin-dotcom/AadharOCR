

// import { Request, Response } from 'express';
// import { performOcr } from '../services/ocrService';
// import ocrRepository from '../repositories/ocrRepository';
// import fs from 'fs';
// import { OcrResult } from '../types';

// interface MulterRequest extends Request {
//   files: { front?: Express.Multer.File[], back?: Express.Multer.File[] };
// }

// const processOcr = async (req: MulterRequest, res: Response) => {
//   try {
//     const { front, back } = req.files;
//     if (!front?.[0] || !back?.[0]) throw new Error('Both images required');
//     const data: OcrResult = await performOcr(front[0].path, back[0].path);
//     await ocrRepository.save({ ...data, frontImagePath: front[0].path, backImagePath: back[0].path });
//     fs.unlinkSync(front[0].path);
//     fs.unlinkSync(back[0].path);
//     res.json(data);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export { processOcr };





// import { Request, Response } from "express";
// import { performOcr } from "../services/ocrService";
// import ocrRepository from "../repositories/ocrRepository";
// import fs from "fs";
// import { OcrResult } from "../types";

// const processOcr = async (req: Request, res: Response) => {
//   try {
//     // const { front, back } = req.files || {};
//     const { front, back } = (req.files as {
//       front?: Express.Multer.File[];
//       back?: Express.Multer.File[];
//     }) || {};
//     if (!front?.[0] || !back?.[0]) {
//       throw new Error("Both images required");
//     }

//     const data: OcrResult = await performOcr(front[0].path, back[0].path);

//     await ocrRepository.save({
//       ...data,
//       frontImagePath: front[0].path,
//       backImagePath: back[0].path,
//     });

//     fs.unlinkSync(front[0].path);
//     fs.unlinkSync(back[0].path);

//     res.json(data);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export { processOcr };






// // controllers/ocrController.ts
// import { Request, Response, NextFunction } from 'express';
// import { OcrResult } from '../types';
// import { IOcrService } from '../services/IOcrService';
// import { IOcrRepository } from '../repositories/IOcrRepository';

// export class OcrController {
//   constructor(
//     private ocrService: IOcrService,
//     private ocrRepository: IOcrRepository
//   ) {}

//   processOcr = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//       const frontFile = files['front'][0];
//       const backFile = files['back'][0];
//       const frontPath = frontFile.path;
//       const backPath = backFile.path;

//       const ocrData = await this.ocrService.performOcr(frontPath, backPath);
//       const result: OcrResult = {
//         ...ocrData,
//         frontImagePath: frontPath,
//         backImagePath: backPath,
//       };

//       const saved = await this.ocrRepository.save(result);
//       res.json(saved);
//     } catch (err) {
//       next(err);
//     }
//   };
// }





import { Request, Response, NextFunction } from 'express';
import { IOcrService } from '../services/IOcrService';

export class OcrController {
  constructor(private ocrService: IOcrService) {}

  processOcr = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const frontFile = files['front'][0];
      const backFile = files['back'][0];
      const frontPath = frontFile.path;
      const backPath = backFile.path;

      const savedResult = await this.ocrService.processAndSaveOcr(frontPath, backPath);
      res.json(savedResult);
    } catch (err) {
      next(err);
    }
  };
}