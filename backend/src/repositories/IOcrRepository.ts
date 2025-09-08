


import { OcrResult } from '../types';

export interface IOcrRepository {
  save(result: OcrResult): Promise<OcrResult>;
}