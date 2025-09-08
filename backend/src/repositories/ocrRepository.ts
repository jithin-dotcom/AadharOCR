

// import OcrResultModel from '../models/ocrResultModel';
// import { OcrResult } from '../types';

// class OcrRepository {
//   async save(result: OcrResult): Promise<OcrResult> {
//     const newResult = new OcrResultModel(result);
//     return await newResult.save();
//   }
// }

// export default new OcrRepository();






import OcrResultModel from '../models/ocrResultModel';
import { OcrResult } from '../types';
import { IOcrRepository } from './IOcrRepository';

export class OcrRepository implements IOcrRepository {
  async save(result: OcrResult): Promise<OcrResult> {
    const newResult = new OcrResultModel(result);
    return await newResult.save();
  }
}