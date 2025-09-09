


import express from 'express';
import upload from '../config/multer';
import { OcrController } from '../controllers/ocrController';
import { OcrService } from '../services/ocrService';
import { OcrRepository } from '../repositories/ocrRepository';

const router = express.Router();
const ocrRepository = new OcrRepository();
const ocrService = new OcrService(ocrRepository);
const ocrController = new OcrController(ocrService);

router.post(
  '/ocr',
  upload.fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }]),
  ocrController.processOcr
);

export default router;
