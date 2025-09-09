
// import { OcrResult } from "../types";

// export interface IOcrService {
//     performOcr(frontPath: string, backPath: string): Promise<OcrResult>;
// }





// // services/IOcrService.ts
// import { OcrResult } from '../types';

// export interface IOcrService {
//   performOcr(frontPath: string, backPath: string): Promise<OcrResult>;
// }





import { OcrResult } from '../types';

export interface IOcrService {
  // processAndSaveOcr(frontPath: string, backPath: string): Promise<OcrResult>;
   processAndSaveOcr(frontPath: Express.Multer.File, backPath: Express.Multer.File): Promise<OcrResult>;
}