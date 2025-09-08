

// import { useState } from 'react';
// import Dropzone from './components/Dropzone';
// import OcrResult from './components/OcrResult';
// import axios from 'axios';

// function App() {
//   const [frontImage, setFrontImage] = useState<File | null>(null);
//   const [backImage, setBackImage] = useState<File | null>(null);
//   const [ocrData, setOcrData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleParseAadhaar = async () => {
//     if (!frontImage || !backImage) {
//       setError('Please upload both front and back images');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     const formData = new FormData();
//     formData.append('front', frontImage);
//     formData.append('back', backImage);

//     try {
//       const response = await axios.post('http://localhost:7000/api/ocr', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setOcrData(response.data);
//     } catch (err) {
//       setError('Failed to parse Aadhaar. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-1/2 space-y-6">
//           <h1 className="text-2xl font-bold text-center mb-4">Aadhaar OCR</h1>
//           <Dropzone
//             label="Aadhaar Front"
//             onDrop={(files) => setFrontImage(files[0])}
//             acceptedFiles=".jpg,.jpeg,.png"
//           />
//           <Dropzone
//             label="Aadhaar Back"
//             onDrop={(files) => setBackImage(files[0])}
//             acceptedFiles=".jpg,.jpeg,.png"
//           />
//           <button
//             onClick={handleParseAadhaar}
//             disabled={loading || !frontImage || !backImage}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
//           >
//             {loading ? 'Processing...' : 'Parse Aadhaar'}
//           </button>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//         </div>
//         <div className="w-full md:w-1/2 space-y-4">
//           <div className="bg-gray-200 p-4 rounded-lg h-32 flex items-center justify-center">
//             <p className="text-gray-500">API Response</p>
//           </div>
//           {ocrData && <OcrResult data={ocrData} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;









import { useState } from 'react';
import Dropzone from './components/Dropzone';
import OcrResult from './components/OcrResult';
import type{ IOcrData } from './interface/IOcrData';
import axios from 'axios';

function App() {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<IOcrData|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (files: File[], type: 'front' | 'back') => {
    const file = files[0];
    if (file) {
      if (type === 'front') {
        setFrontImage(file);
        setFrontPreview(URL.createObjectURL(file));
      } else {
        setBackImage(file);
        setBackPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleParseAadhaar = async () => {
    if (!frontImage || !backImage) {
      setError('Please upload both front and back images');
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('front', frontImage);
    formData.append('back', backImage);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ocr `, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOcrData(response.data);
    } catch (err) {
      console.log(err);
      setError('Failed to parse Aadhaar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-2xl font-bold text-center mb-4">Aadhaar OCR</h1>
          <Dropzone
            label="Aadhaar Front"
            onDrop={(files) => handleDrop(files, 'front')}
            acceptedFiles=".jpg,.jpeg,.png"
            preview={frontPreview}
          />
          <Dropzone
            label="Aadhaar Back"
            onDrop={(files) => handleDrop(files, 'back')}
            acceptedFiles=".jpg,.jpeg,.png"
            preview={backPreview}
          />
          <button
            onClick={handleParseAadhaar}
            disabled={loading || !frontImage || !backImage}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Processing...' : 'Parse Aadhaar'}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-gray-200 p-4 rounded-lg h-32 flex items-center justify-center">
            <p className="text-gray-500">Upload Front and Back of Aadhaar for Parsing</p>
          </div>
          {ocrData && <OcrResult data={ocrData} />}
        </div>
      </div>
    </div>
  );
}

export default App;