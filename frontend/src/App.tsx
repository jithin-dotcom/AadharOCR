

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









// import { useState } from 'react';
// import Dropzone from './components/Dropzone';
// import OcrResult from './components/OcrResult';
// import type{ IOcrData } from './interface/IOcrData';
// import axios from 'axios';

// function App() {
//   const [frontImage, setFrontImage] = useState<File | null>(null);
//   const [backImage, setBackImage] = useState<File | null>(null);
//   const [frontPreview, setFrontPreview] = useState<string | null>(null);
//   const [backPreview, setBackPreview] = useState<string | null>(null);
//   const [ocrData, setOcrData] = useState<IOcrData|null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleDrop = (files: File[], type: 'front' | 'back') => {
//     const file = files[0];
//     if (file) {
//       if (type === 'front') {
//         setFrontImage(file);
//         setFrontPreview(URL.createObjectURL(file));
//       } else {
//         setBackImage(file);
//         setBackPreview(URL.createObjectURL(file));
//       }
//     }
//   };

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
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ocr `, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setOcrData(response.data);
//     } catch (err) {
//       console.log(err);
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
//             onDrop={(files) => handleDrop(files, 'front')}
//             acceptedFiles=".jpg,.jpeg,.png"
//             preview={frontPreview}
//           />
//           <Dropzone
//             label="Aadhaar Back"
//             onDrop={(files) => handleDrop(files, 'back')}
//             acceptedFiles=".jpg,.jpeg,.png"
//             preview={backPreview}
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
//             <p className="text-gray-500">Upload Front and Back of Aadhaar for Parsing</p>
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
import type { IOcrData } from './interface/IOcrData';
import axios from 'axios';
import { X, FileImage, Loader2, Upload, AlertCircle, CheckCircle } from 'lucide-react';


const Toast = ({ message, type, onClose }: { message: string; type: 'error' | 'success'; onClose: () => void }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
      type === 'error' ? 'bg-red-500' : 'bg-green-500'
    }`}>
      {type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
};

function App() {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<IOcrData | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const [dragStates, setDragStates] = useState({ front: false, back: false });

  const showToast = (message: string, type: 'error' | 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast('Please upload only JPEG, PNG, or WebP images', 'error');
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size should be less than 10MB', 'error');
      return false;
    }
    
    return true;
  };

  const handleDrop = (files: File[], type: 'front' | 'back') => {
    const file = files[0];
    if (file && validateFile(file)) {
      if (type === 'front') {
        setFrontImage(file);
        setFrontPreview(URL.createObjectURL(file));
      } else {
        setBackImage(file);
        setBackPreview(URL.createObjectURL(file));
      }
      showToast(`${type === 'front' ? 'Front' : 'Back'} image uploaded successfully!`, 'success');
    }
    setDragStates(prev => ({ ...prev, [type]: false }));
  };

  const handleRemoveImage = (type: 'front' | 'back') => {
    if (type === 'front') {
      setFrontImage(null);
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      setFrontPreview(null);
    } else {
      setBackImage(null);
      if (backPreview) URL.revokeObjectURL(backPreview);
      setBackPreview(null);
    }
  };

  const handleDragStateChange = (type: 'front' | 'back', isDragging: boolean) => {
    setDragStates(prev => ({ ...prev, [type]: isDragging }));
  };

  const handleParseAadhaar = async () => {
    if (!frontImage || !backImage) {
      showToast('Please upload both front and back images of your Aadhaar card', 'error');
      return;
    }

    setLoading(true);
    setOcrData(null);
    
    const formData = new FormData();
    formData.append('front', frontImage);
    formData.append('back', backImage);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ocr`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOcrData(response.data);
      showToast('Aadhaar parsed successfully!', 'success');
    } catch (err) {
      console.log(err);
      showToast('Failed to parse Aadhaar. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    handleRemoveImage('front');
    handleRemoveImage('back');
    setOcrData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="container mx-auto px-4 py-8">
       
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Aadhaar OCR Scanner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Extract information from your Aadhaar card instantly using advanced OCR technology
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
          
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Upload Aadhaar Images
                </h2>
                
                <div className="space-y-6">
                  <div
                    onDragEnter={() => handleDragStateChange('front', true)}
                    onDragLeave={() => handleDragStateChange('front', false)}
                  >
                    <Dropzone
                      label="Front Side"
                      onDrop={(files) => handleDrop(files, 'front')}
                      acceptedFiles=".jpg,.jpeg,.png,.webp"
                      preview={frontPreview}
                      onRemove={() => handleRemoveImage('front')}
                      isDragActive={dragStates.front}
                    />
                  </div>

                  <div
                    onDragEnter={() => handleDragStateChange('back', true)}
                    onDragLeave={() => handleDragStateChange('back', false)}
                  >
                    <Dropzone
                      label="Back Side"
                      onDrop={(files) => handleDrop(files, 'back')}
                      acceptedFiles=".jpg,.jpeg,.png,.webp"
                      preview={backPreview}
                      onRemove={() => handleRemoveImage('back')}
                      isDragActive={dragStates.back}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={handleParseAadhaar}
                    disabled={loading || !frontImage || !backImage}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileImage size={20} />
                        Extract Data
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetAll}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={20} />
                    Reset All
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {loading && (
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Loader2 size={32} className="text-blue-600 animate-spin" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Images</h3>
                    <p className="text-gray-600">Extracting information from your Aadhaar card...</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {!ocrData && !loading && (
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Upload size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Process</h3>
                    <p className="text-gray-600">Upload both sides of your Aadhaar card to get started</p>
                  </div>
                </div>
              )}

              {ocrData && <OcrResult data={ocrData} />}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Your data is processed securely and not stored on our servers</p>
        </div>
      </div>
    </div>
  );
}

export default App;