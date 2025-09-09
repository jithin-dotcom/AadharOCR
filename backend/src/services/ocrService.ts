
import Tesseract from 'tesseract.js';
import { OcrResult } from '../types';
import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
import { IOcrService } from './IOcrService';
import { IOcrRepository } from '../repositories/IOcrRepository';
import cloudinary from '../config/cloudinary';

export class OcrService implements IOcrService {
  constructor(private ocrRepository: IOcrRepository) {}

  async processAndSaveOcr(frontFile: Express.Multer.File, backFile: Express.Multer.File): Promise<OcrResult> {
    try {
      const frontUpload = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'aadhaar/front' }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
        stream.end(frontFile.buffer);
      });

      const backUpload = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'aadhaar/back' }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
        stream.end(backFile.buffer);
      });

      
      const frontResult = await Tesseract.recognize(frontUpload.secure_url, 'eng');
      const backResult = await Tesseract.recognize(backUpload.secure_url, 'eng');

      console.log('Raw front text:', frontResult.data.text);
      console.log('Raw back text:', backResult.data.text);

      
      const frontData = parseAadhaarFront(frontResult.data.text);
      const backData = parseAadhaarBack(backResult.data.text);

      
      const ocrData: OcrResult = {
        aadhaarNumber: frontData.aadhaarNumber,
        name: frontData.name,
        dob: frontData.dob,
        address: backData.address,
        frontImagePath: frontUpload.secure_url,
        backImagePath: backUpload.secure_url,
      };

     
      const savedResult = await this.ocrRepository.save(ocrData);
      return savedResult;
    } catch (err: any) {
      throw new Error('OCR, upload, or saving failed: ' + err.message);
    }
  }
}
