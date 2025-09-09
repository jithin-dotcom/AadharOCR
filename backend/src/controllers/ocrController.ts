

import { Request, Response, NextFunction } from 'express';
import { IOcrService } from '../services/IOcrService';
import { IOcrController } from './IOcrController';

export class OcrController implements IOcrController{
  constructor(private ocrService: IOcrService) {}

  async processOcr(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const frontFile = files['front']?.[0];
      const backFile = files['back']?.[0];

      if (!frontFile || !backFile) {
         res.status(400).json({ error: 'Both front and back images are required' });
         return;
      }
      const savedResult = await this.ocrService.processAndSaveOcr(frontFile, backFile);

      res.json(savedResult);
    } catch (err) {
      next(err);
    }
  };
}
