


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
    (req, res, next) => {
    console.log("Hit route before multer");
    next();
  },
  upload.fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }]),
    (req, res, next) => {
    console.log("Hit route after multer");
    next();
  },
  (req, res, next) => ocrController.processOcr(req, res, next)
);

export default router;



