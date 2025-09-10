



import { OcrResult } from '../types';

const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
const dobRegex = /\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/;


const NOISE: RegExp[] = [
  /government of india/i, /uidai/i, /gov\.in/i, /www/i, /help/i,
  /आधार|भारत सरकार|भारतीय विशिष्ट पहचान प्राधिकरण/i,
  /unique identifica|identification authority/i,
  /QR Code/i, /VID/i, /AADHAAR/i,
  /^address[:：]?\s*$/i, /^पता[:：]?\s*$/i,
  /\d{4}\s?\d{4}\s?\d{4}/,
  /\d{2}[\/\-]\d{2}[\/\-]\d{4}/,
  /male|female|other|dob|जन्म|1947|1800|customer|toll\s*free/i,
  /\bset\b/i,        
  /\bfem\b/i,       
  /\bwe\b/i,         
  /\bnear\b/i 
];
const isNoise = (s: string) => NOISE.some(r => r.test(s));




export const parseAadhaarFront = (text: string): Partial<OcrResult> => {
  const data: Partial<OcrResult> = {};
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

 
  const aadhaarMatch = text.match(aadhaarRegex);
  data.aadhaarNumber = aadhaarMatch?.[0].replace(/\s+/g, '') || 'Not found';


  const dobMatch = text.match(dobRegex);
  data.dob = dobMatch?.[1] || 'Not found';

 
  let name = '';
  if (data.dob !== 'Not found') {
    const dobLineIndex = lines.findIndex(l => l.includes(data.dob!));
    if (dobLineIndex > 0) {
     
      const candidate = lines[dobLineIndex - 1];
      if (!isNoise(candidate)) {
        name = candidate.replace(/[^a-zA-Z\s]/g, '').trim(); // remove stray symbols
      }
    }
  }

 
  if (!name) {
    name = lines.find(
      l => /^[A-Za-z]{2,}\s+[A-Za-z]{2,}/.test(l) && !isNoise(l)
    ) || '';
  }

  data.name = name || 'Not found';
  return data;
};








export const parseAadhaarBack = (text: string): Partial<OcrResult> => {
  const data: Partial<OcrResult> = {};
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  const addressLines: string[] = [];
  const addrIdx = lines.findIndex(l => /address[:：]?\s*$/i.test(l));
  let idx = addrIdx >= 0 ? addrIdx + 1 : 0;

  while (idx < lines.length && addressLines.length < 7) {
    const l = lines[idx++];
    const isAddressLike = /[a-zA-Z]/.test(l) && (/\d/.test(l) || /,/.test(l) || l.length > 10);
    if (!isNoise(l) && isAddressLike) {
      const cleaned = l.replace(/[^a-zA-Z0-9,\-\s]/g, '').trim();
      if (cleaned.length > 4) addressLines.push(cleaned);
    }
  }

  
  if (addressLines.length < 2) {
    const tail = lines.slice(Math.floor(lines.length * 0.6));
    tail.forEach(l => {
      const cleaned = l.replace(/[^a-zA-Z0-9,\-\s]/g, '').trim();
      if (cleaned.length > 4 && !isNoise(cleaned)) addressLines.push(cleaned);
    });
  }

  if (addressLines.length) {
    data.address = addressLines.join(', ');
  }

const pins = Array.from((data.address ?? text).matchAll(/\b\d{6}\b/g)).map(m => m[0]);

 if (pins.length) {
 
   const uniquePins = [...new Set(pins)];
   const finalPin = uniquePins[uniquePins.length - 1];

   if (data.address && !data.address.includes(finalPin)) {
     data.address = data.address + ', ' + finalPin;
   }else {
     data.address = data.address || finalPin;
   }
  }
  if (data.address) {
   data.address = cleanAadhaarAddress(data.address);
  }

  return data;
};





function cleanAadhaarAddress(rawText: string): string {
  if (!rawText) return "";

  let cleaned = rawText
    .replace(/\s+/g, " ")         
    .replace(/,+/g, ",")          
    .replace(/\s*,\s*/g, ", ")    
    .trim();

  const junkWords = [
    "fra", "Foret", "fame", "fez", "we",
    "AEFI", "SET", "Fem"
  ];
  cleaned = cleaned
    .split(" ")
    .filter(word => !junkWords.includes(word))
    .join(" ");


  const replacements: Record<string, string> = {
    "Hy": "H",
    "Fem": "",
    "Salimpur": "Salimpur",
    "Phulwari": "Phulwari Sharif"
  };

  Object.entries(replacements).forEach(([wrong, right]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, "gi");
    cleaned = cleaned.replace(regex, right);
  });


  return cleaned.replace(/\s+/g, " ").trim();
}







