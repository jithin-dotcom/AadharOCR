

// import { OcrResult } from '../types';

// const parseAadhaar = (text: string): OcrResult => {
//   const aadhaarRegex = /\d{4}\s\d{4}\s\d{4}/g;
//   const nameRegex = /Name\s*:\s*(.+)/i;
//   const dobRegex = /DOB\s*:\s*(\d{2}\/\d{2}\/\d{4})/i;
//   const addressRegex = /Address\s*:\s*(.+)/i;

//   return {
//     aadhaarNumber: text.match(aadhaarRegex)?.[0] || 'Not found',
//     name: text.match(nameRegex)?.[1] || 'Not found',
//     dob: text.match(dobRegex)?.[1] || 'Not found',
//     address: text.match(addressRegex)?.[1] || 'Not found'
//   };
// };

// export { parseAadhaar };








// import { OcrResult } from '../types';


// const aadhaarRegex = /\d{4}\s\d{4}\s\d{4}/;
// const dobRegex = /\d{2}[\/\-]\d{2}[\/\-]\d{4}/;


// export const parseAadhaarFront = (text: string): Partial<OcrResult> => {
//   const aadhaarNumber = text.match(aadhaarRegex)?.[0] || 'Not found';
//   const dob = text.match(dobRegex)?.[0] || 'Not found';

//   // Name = pick a line with 2 words (English) that is not DOB/number
//   const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
//   let name = 'Not found';
//   for (const line of lines) {
//     if (
//       /^[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+$/.test(line) && // looks like a name
//       !line.includes('Male') &&
//       !line.includes('Female')
//     ) {
//       name = line;
//       break;
//     }
//   }

//   return { aadhaarNumber, dob, name };
// };

// export const parseAadhaarBack = (text: string): Partial<OcrResult> => {
//   let address = 'Not found';
//   const match = text.match(/Address[:\s]+([\s\S]+)/i);
//   if (match) {
//     address = match[1].replace(/\s+/g, ' ').trim();
//   }
//   return { address };
// };










// import { OcrResult } from '../types';

// const aadhaarRegex = /\d{4}\s\d{4}\s\d{4}/;
// const dobRegex = /\d{2}[\/\-]\d{2}[\/\-]\d{4}/;

// export const parseAadhaarFront = (text: string): Partial<OcrResult> => {
//   const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
//   const aadhaarNumber = text.match(aadhaarRegex)?.[0] || 'Not found';
//   const dob = text.match(dobRegex)?.[0] || 'Not found';
//   let name = 'Not found';

//   // Improved name detection logic
//   for (const line of lines) {
//     // Check for a line that looks like a name (2 or more words, mixed case, avoiding numbers or dates)
//     const words = line.split(/\s+/).filter(word => word.length > 1 && !/\d/.test(word));
//     if (words.length >= 2 && !dobRegex.test(line) && !aadhaarRegex.test(line)) {
//       name = words.join(' ');
//       break;
//     }
//   }

//   // Fallback: If name is still not found, try to pick a line before DOB or Aadhaar number
//   if (name === 'Not found' && lines.length > 1) {
//     const dobIndex = lines.findIndex(line => dobRegex.test(line));
//     const aadhaarIndex = lines.findIndex(line => aadhaarRegex.test(line));
//     const targetIndex = Math.min(dobIndex, aadhaarIndex) > 0 ? Math.min(dobIndex, aadhaarIndex) - 1 : -1;
//     if (targetIndex >= 0) {
//       const potentialName = lines[targetIndex].split(/\s+/).filter(word => word.length > 1).join(' ');
//       if (potentialName && !/\d/.test(potentialName)) {
//         name = potentialName;
//       }
//     }
//   }

//   return { aadhaarNumber, dob, name };
// };

// export const parseAadhaarBack = (text: string): Partial<OcrResult> => {
//   let address = 'Not found';
//   const match = text.match(/Address[:\s]+([\s\S]+)/i);
//   if (match) {
//     address = match[1].replace(/\s+/g, ' ').trim();
//   }
//   return { address };
// };












// import { OcrResult } from '../types';

// const aadhaarRegex = /\d{4}\s\d{4}\s\d{4}/;
// const dobRegex = /\bDOB:?\s*(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b|\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/;

// export const parseAadhaarFront = (text: string): Partial<OcrResult> => {
//   const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
//   let aadhaarNumber = 'Not found';
//   let dob = 'Not found';
//   let name = 'Not found';

//   // Process each line with Aadhaar-specific logic
//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i].toLowerCase().replace(/[^a-zA-Z0-9\s\/\-:]/g, ' ').trim();

//     // Extract Aadhaar Number (typically at the bottom)
//     const aadhaarMatch = line.match(aadhaarRegex);
//     if (aadhaarMatch && i > lines.length / 2 && !aadhaarNumber.includes(aadhaarMatch[0])) {
//       aadhaarNumber = aadhaarMatch[0];
//     }

//     // Extract DOB (look for date format, especially after "DOB:" or standalone)
//     const dobMatch = line.match(dobRegex);
//     if (dobMatch && (dobMatch[1] || dobMatch[2])) {
//       dob = (dobMatch[1] || dobMatch[2]).trim();
//     }

//     // Extract Name (look for 2+ words before DOB, avoiding numbers)
//     if (name === 'Not found' && i < lines.length / 2) { // Prioritize upper half
//       const words = line.split(/\s+/).filter(word => word.length > 1 && !/\d/.test(word));
//       if (words.length >= 2) {
//         name = words.join(' ').trim();
//         if (name.split(/\s+/).length >= 2) {
//           break; // Stop at the first valid name
//         }
//       }
//     }
//   }

//   // Fallback for name and DOB if not found
//   if (name === 'Not found' && lines.length > 2) {
//     const dobIndex = lines.findIndex(line => dobRegex.test(line.toLowerCase().replace(/[^a-zA-Z0-9\s\/\-:]/g, ' ')));
//     if (dobIndex > 1) {
//       name = lines[dobIndex - 1].split(/\s+/).filter(word => word.length > 1 && !/\d/.test(word)).join(' ').trim();
//     }
//   }
//   if (dob === 'Not found' && lines.length > 1) {
//     const dobIndex = lines.findIndex(line => /\d{2}[\/\-]\d{2}[\/\-]\d{4}/.test(line));
//     if (dobIndex >= 0) {
//       dob = lines[dobIndex].match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/)?.[0] || dob;
//     }
//   }

//   // Clean up extracted fields
//   name = name === 'Not found' || name.match(/^\s*$/) ? 'Not found' : name;
//   aadhaarNumber = aadhaarNumber === 'Not found' || aadhaarNumber.match(/^\s*$/) ? 'Not found' : aadhaarNumber;
//   dob = dob === 'Not found' || dob.match(/^\s*$/) ? 'Not found' : dob;

//   return { aadhaarNumber, dob, name };
// };

// export const parseAadhaarBack = (text: string): Partial<OcrResult> => {
//   let address = 'Not found';
//   const match = text.match(/Address[:\s]+([\s\S]+)/i);
//   if (match) {
//     address = match[1].replace(/\s+/g, ' ').trim();
//   }
//   return { address };
// };






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
  /male|female|other|dob|जन्म|1947|1800|customer|toll\s*free/i
];
const isNoise = (s: string) => NOISE.some(r => r.test(s));

// export const parseAadhaarFront = (text: string): Partial<OcrResult> => {
//   const data: Partial<OcrResult> = {};
//   const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

 
//   const aadhaarMatch = text.match(aadhaarRegex);
//   data.aadhaarNumber = aadhaarMatch?.[0].replace(/\s+/g, '') || 'Not found';


//   const dobMatch = text.match(dobRegex);
//   data.dob = dobMatch?.[1] || 'Not found';

 
//   let name = '';
//   for (let i = 0; i < lines.length - 1; i++) {
//     const cur = lines[i];
//     const nxt = lines[i + 1];
//     const isNonLatin = /[^\x00-\x7F]/.test(cur); // Check for non-English characters
//     const latinName = /^[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?$/;
//     if (isNonLatin && latinName.test(nxt) && !isNoise(nxt)) {
//       name = nxt;
//       break;
//     }
//   }

 
//   if (!name) {
//     name = lines.find(
//       l =>
//         /^[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+/.test(l) &&
//         !isNoise(l)
//     ) || '';
//   }
//   data.name = name || 'Not found';

//   return data;
// };





export const parseAadhaarFront = (text: string): Partial<OcrResult> => {
  const data: Partial<OcrResult> = {};
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // Aadhaar number
  const aadhaarMatch = text.match(aadhaarRegex);
  data.aadhaarNumber = aadhaarMatch?.[0].replace(/\s+/g, '') || 'Not found';

  // DOB
  const dobMatch = text.match(dobRegex);
  data.dob = dobMatch?.[1] || 'Not found';

  // --- Name Extraction ---
  let name = '';
  if (data.dob !== 'Not found') {
    const dobLineIndex = lines.findIndex(l => l.includes(data.dob!));
    if (dobLineIndex > 0) {
      // Take the line just above DOB as name candidate
      const candidate = lines[dobLineIndex - 1];
      if (!isNoise(candidate)) {
        name = candidate.replace(/[^a-zA-Z\s]/g, '').trim(); // remove stray symbols
      }
    }
  }

  // fallback if still not found
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
  const addrIdx = lines.findIndex(l => /^address[:：]?\s*$/i.test(l));
  let idx = addrIdx >= 0 ? addrIdx + 1 : 0;
  while (idx < lines.length && addressLines.length < 7) {
    const l = lines[idx++];
    if (!isNoise(l) && l.length > 4) {
      addressLines.push(l.replace(/[,;]\s*$/, '')); // Clean ending punctuation
    }
  }

 
  if (addressLines.length < 2) {
    const tail = lines.slice(Math.floor(lines.length * 0.6));
    addressLines.push(...tail.filter(l => !isNoise(l) && l.length > 4));
  }

 
  if (addressLines.length) {
    data.address = addressLines.join(', ');
  }

 
  const pin = (data.address ?? text).match(/\b\d{6}\b/);
  if (pin?.[0]) {
    data.address = (data.address || '') + (data.address ? ', ' : '') + pin[0];
  }

  return data;
};