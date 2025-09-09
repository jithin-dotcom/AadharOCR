

// import { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// interface DropzoneProps {
//   label: string;
//   onDrop: (files: File[]) => void;
//   acceptedFiles: string;
// }

// const Dropzone: React.FC<DropzoneProps> = ({ label, onDrop, acceptedFiles }) => {
//   const onDropHandler = useCallback((acceptedFiles: File[]) => {
//     onDrop(acceptedFiles);
//   }, [onDrop]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: onDropHandler,
//     accept: { 'image/*': [acceptedFiles] },
//     maxFiles: 1,
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
//     >
//       <input {...getInputProps()} />
//       <svg className="mx-auto h-12 w-12 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
//         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//       </svg>
//       <p className="text-gray-600">{label}</p>
//       <p className="text-sm text-gray-500">Click here to Upload/Capture</p>
//       {isDragActive && <p className="text-sm text-gray-500">Drop the file here...</p>}
//     </div>
//   );
// };

// export default Dropzone;











// import { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

// interface DropzoneProps {
//   label: string;
//   onDrop: (files: File[]) => void;
//   acceptedFiles: string;
//   preview?: string | null;
// }

// const Dropzone: React.FC<DropzoneProps> = ({ label, onDrop, acceptedFiles, preview }) => {
//   const onDropHandler = useCallback((acceptedFiles: File[]) => {
//     onDrop(acceptedFiles);
//   }, [onDrop]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: onDropHandler,
//     accept: { 'image/*': [acceptedFiles] },
//     maxFiles: 1,
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative"
//     >
//       <input {...getInputProps()} />
//       {preview ? (
//         <img src={preview} alt={label} className="max-h-40 mx-auto object-cover rounded" />
//       ) : (
//         <>
//           <svg className="mx-auto h-12 w-12 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//           <p className="text-gray-600">{label}</p>
//           <p className="text-sm text-gray-500">Click here to Upload/Capture</p>
//           {isDragActive && <p className="text-sm text-gray-500">Drop the file here...</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default Dropzone;











import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, CheckCircle, Trash2 } from 'lucide-react';

interface DropzoneProps {
  label: string;
  onDrop: (files: File[]) => void;
  acceptedFiles: string;
  preview?: string | null;
  onRemove: () => void;
  isDragActive: boolean;
}

const Dropzone: React.FC<DropzoneProps> = ({ 
  label, 
  onDrop, 
  acceptedFiles, 
  preview, 
  onRemove, 
  isDragActive 
}) => {
  const onDropHandler = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive: dropzoneIsDragActive } = useDropzone({
    onDrop: onDropHandler,
    accept: { 'image/*': acceptedFiles.split(',') },
    maxFiles: 1,
  });

  const isActive = isDragActive || dropzoneIsDragActive;

 

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt={label} 
            className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 shadow-sm" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
            <button
              onClick={onRemove}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-200"
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
            <CheckCircle size={12} className="inline mr-1" />
            Uploaded
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isActive 
              ? 'border-blue-500 bg-blue-50 scale-105' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <input
            {...getInputProps()}
            accept=".jpg,.jpeg,.png,.webp"
          />
          
          <div className="flex flex-col items-center space-y-3">
            <div className={`p-3 rounded-full ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <FileImage size={32} className={isActive ? 'text-blue-600' : 'text-gray-600'} />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isActive ? 'Drop your image here' : 'Upload Aadhaar Image'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supports: JPG, JPEG, PNG, WebP
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <Upload size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Choose File</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;