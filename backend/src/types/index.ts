

export interface OcrResult {
  aadhaarNumber?: string;
  name?: string;
  dob?: string;
  gender?: string;
  address?: string;
  pincode?: string;
  frontImagePath?: string;
  backImagePath?: string;
  createdAt?: Date;
}