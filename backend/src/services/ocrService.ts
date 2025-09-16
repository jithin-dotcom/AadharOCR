
import Tesseract from 'tesseract.js';
import { OcrResult, OcrResultDTO } from '../types';
import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
import { IOcrService } from './IOcrService';
import { IOcrRepository } from '../repositories/IOcrRepository';
import cloudinary from '../config/cloudinary';
import { ApiError } from '../utils/apiErrors';
import { mapOcrResultToDTO } from '../utils/DTOmapper';

export class OcrService implements IOcrService {
  constructor(private ocrRepository: IOcrRepository) {}

  async processAndSaveOcr(frontFile: Express.Multer.File, backFile: Express.Multer.File): Promise<OcrResultDTO> {
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


      const frontData = parseAadhaarFront(frontResult.data.text);
      const backData = parseAadhaarBack(backResult.data.text);

      if (
        frontData.aadhaarNumber &&
        backData.aadhaarNumber &&
        frontData.aadhaarNumber !== 'Not found' &&
        backData.aadhaarNumber !== 'Not found' &&
        frontData.aadhaarNumber !== backData.aadhaarNumber
      ) {
          throw new ApiError(400, "Aadhaar number on front and back side do not match");
        }

        if(frontData.aadhaarNumber === "Not found" || backData.aadhaarNumber === "Not found"){
           throw new ApiError(400, "Please provide a valid Aadhar card");
        }

       

        const ocrData: OcrResult = {
          aadhaarNumber: frontData.aadhaarNumber,
          name: frontData.name,
          dob: frontData.dob,
          gender: frontData.gender,
          pincode: backData.pincode,
          address: backData.address,
          frontImagePath: frontUpload.secure_url,
          backImagePath: backUpload.secure_url,
        };


        const savedResult = await this.ocrRepository.save(ocrData);
      
        return mapOcrResultToDTO(savedResult);

    } catch (err) {
        if (err instanceof ApiError) {
           throw err; 
        }
        throw new Error('OCR, upload, or saving failed: ');
    }
  }
}
