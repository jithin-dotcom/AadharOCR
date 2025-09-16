


import { OcrResult, OcrResultDTO } from "../types";



export const mapOcrResultToDTO = (ocr: OcrResult): OcrResultDTO => {
  return {
    aadhaarNumber: ocr.aadhaarNumber,
    name: ocr.name,
    dob: ocr.dob,
    address: ocr.address,
    gender: ocr.gender,
    pincode: ocr.pincode, 
  };
};
