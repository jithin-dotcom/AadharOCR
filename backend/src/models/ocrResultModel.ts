

// import mongoose, { Schema } from 'mongoose';
// import { OcrResult } from '../types';

// const ocrResultSchema: Schema = new Schema<OcrResult>({
//   aadhaarNumber: String,
//   name: String,
//   dob: String,
//   address: String,
//   frontImagePath: String,
//   backImagePath: String,
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model<OcrResult>('OcrResult', ocrResultSchema);





import mongoose, { Schema } from 'mongoose';
import { OcrResult } from '../types';

const ocrResultSchema: Schema = new Schema<OcrResult>({
  aadhaarNumber: String,
  name: String,
  dob: String,
  address: String,
  frontImagePath: String,
  backImagePath: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<OcrResult>('OcrResult', ocrResultSchema);