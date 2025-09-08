

// import Tesseract from 'tesseract.js';
// import { parseAadhaar } from '../utils/parser';
// import { OcrResult } from '../types';

// const performOcr = async (frontPath: string, backPath: string): Promise<OcrResult> => {
//   try {
//     const frontText = await Tesseract.recognize(frontPath, 'eng+mal');
//     const backText = await Tesseract.recognize(backPath, 'eng+mal');
//     const parsedData = parseAadhaar(frontText.data.text + '\n' + backText.data.text);
//     return parsedData;
//   } catch (err: any) {
//     throw new Error('OCR failed: ' + err.message);
//   }
// };

// export { performOcr };










// import Tesseract from 'tesseract.js';
// import { OcrResult } from '../types';
// import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
// import { IOcrService } from './IOcrService';

// export const performOcr = async (frontPath: string, backPath: string): Promise<OcrResult> => {
//   try {
   
//     const frontText = await Tesseract.recognize(frontPath, 'eng+mal');
//     const backText = await Tesseract.recognize(backPath, 'eng+mal');
//     const frontData = parseAadhaarFront(frontText.data.text);
//     const backData = parseAadhaarBack(backText.data.text);
//     console.log("frontData : ",frontData);
//     console.log("backData : ",backData);
    
//     return {
//       aadhaarNumber: frontData.aadhaarNumber,
//       name: frontData.name,
//       dob: frontData.dob,
//       address: backData.address,
//     };
//   } catch (err: any) {
//     throw new Error('OCR failed: ' + err.message);
//   }
// };

// // export { performOcr };










// import Tesseract from 'tesseract.js';
// import { OcrResult } from '../types';
// import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
// import { IOcrService } from './IOcrService';

// export class OcrService implements IOcrService {
//   async performOcr(frontPath: string, backPath: string): Promise<OcrResult> {
//     try {
//       const frontResult = await Tesseract.recognize(frontPath, 'eng+mal');
//       const backResult = await Tesseract.recognize(backPath, 'eng+mal');
//       const frontData = parseAadhaarFront(frontResult.data.text);
//       const backData = parseAadhaarBack(backResult.data.text);
    
      
//       return {
//         aadhaarNumber: frontData.aadhaarNumber,
//         name: frontData.name,
//         dob: frontData.dob,
//         address: backData.address,
//         frontImagePath: frontPath,
//         backImagePath: backPath,
//       };
//     } catch (err: any) {
//       throw new Error('OCR failed: ' + err.message);
//     }
//   }
// }








// import Tesseract from 'tesseract.js';
// import { OcrResult } from '../types';
// import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
// import { IOcrService } from './IOcrService';
// import { IOcrRepository } from '../repositories/IOcrRepository';

// export class OcrService implements IOcrService {
//   constructor(private ocrRepository: IOcrRepository) {}

//   async processAndSaveOcr(frontPath: string, backPath: string): Promise<OcrResult> {
//     try {
//       const frontResult = await Tesseract.recognize(frontPath, 'eng+mal');
//       const backResult = await Tesseract.recognize(backPath, 'eng+mal');
//       const frontData = parseAadhaarFront(frontResult.data.text);
//       const backData = parseAadhaarBack(backResult.data.text);
      
//       const ocrData: OcrResult = {
//         aadhaarNumber: frontData.aadhaarNumber,
//         name: frontData.name,
//         dob: frontData.dob,
//         address: backData.address,
//         frontImagePath: frontPath,
//         backImagePath: backPath,
//       };

//       const savedResult = await this.ocrRepository.save(ocrData);
//       return savedResult;
//     } catch (err: any) {
//       throw new Error('OCR or saving failed: ' + err.message);
//     }
//   }
// }







// import Tesseract from 'tesseract.js';
// import { OcrResult } from '../types';
// import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
// import { IOcrService } from './IOcrService';
// import { IOcrRepository } from '../repositories/IOcrRepository';
// import cloudinary from '../config/cloudinary';

// export class OcrService implements IOcrService {
//   constructor(private ocrRepository: IOcrRepository) {}

//   async processAndSaveOcr(frontPath: string, backPath: string): Promise<OcrResult> {
//     try {
      
//       const frontUpload = await cloudinary.uploader.upload(frontPath, { folder: 'aadhaar/front' });
//       const backUpload = await cloudinary.uploader.upload(backPath, { folder: 'aadhaar/back' });

//       const frontResult = await Tesseract.recognize(frontPath, 'eng+mal');
//       const backResult = await Tesseract.recognize(backPath, 'eng+mal');
//       const frontData = parseAadhaarFront(frontResult.data.text);
//       const backData = parseAadhaarBack(backResult.data.text);
      
//       const ocrData: OcrResult = {
//         aadhaarNumber: frontData.aadhaarNumber,
//         name: frontData.name,
//         dob: frontData.dob,
//         address: backData.address,
//         frontImagePath: frontUpload.secure_url, 
//         backImagePath: backUpload.secure_url,   
//       };

//       const savedResult = await this.ocrRepository.save(ocrData);
//       return savedResult;
//     } catch (err: any) {
//       throw new Error('OCR, upload, or saving failed: ' + err.message);
//     }
//   }
// }










// import Tesseract from 'tesseract.js';
// import { OcrResult } from '../types';
// import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
// import { IOcrService } from './IOcrService';
// import { IOcrRepository } from '../repositories/IOcrRepository';
// import cloudinary from '../config/cloudinary';

// export class OcrService implements IOcrService {
//   constructor(private ocrRepository: IOcrRepository) {}

//   async processAndSaveOcr(frontPath: string, backPath: string): Promise<OcrResult> {
//     try {
//       const frontUpload = await cloudinary.uploader.upload(frontPath, { folder: 'aadhaar/front' });
//       const backUpload = await cloudinary.uploader.upload(backPath, { folder: 'aadhaar/back' });

//       const frontResult = await Tesseract.recognize(frontPath, 'eng+mal');
//       const backResult = await Tesseract.recognize(backPath, 'eng+mal');
//       const frontData = parseAadhaarFront(frontResult.data.text);
//       const backData = parseAadhaarBack(backResult.data.text);
      
//       const ocrData: OcrResult = {
//         aadhaarNumber: frontData.aadhaarNumber,
//         name: frontData.name,
//         dob: frontData.dob,
//         address: backData.address,
//         frontImagePath: frontUpload.secure_url,
//         backImagePath: backUpload.secure_url,
//       };

//       const savedResult = await this.ocrRepository.save(ocrData);
//       return savedResult;
//     } catch (err: any) {
//       throw new Error('OCR, upload, or saving failed: ' + err.message);
//     }
//   }
// }








import Tesseract from 'tesseract.js';
import { OcrResult } from '../types';
import { parseAadhaarFront, parseAadhaarBack } from '../utils/parser';
import { IOcrService } from './IOcrService';
import { IOcrRepository } from '../repositories/IOcrRepository';
import cloudinary from '../config/cloudinary';

export class OcrService implements IOcrService {
  constructor(private ocrRepository: IOcrRepository) {}

  async processAndSaveOcr(frontPath: string, backPath: string): Promise<OcrResult> {
    try {
      const frontUpload = await cloudinary.uploader.upload(frontPath, { folder: 'aadhaar/front' });
      const backUpload = await cloudinary.uploader.upload(backPath, { folder: 'aadhaar/back' });

      // Use only English language for OCR
      const frontResult = await Tesseract.recognize(frontPath, 'eng');
      const backResult = await Tesseract.recognize(backPath, 'eng');
      
      console.log('Raw front text:', frontResult.data.text); // Debug log to verify output
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