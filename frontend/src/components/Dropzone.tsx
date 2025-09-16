

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

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
  preview, 
  onRemove, 
  isDragActive 
}) => {
  const [localPreview, setLocalPreview] = useState<string | null>(preview || null);

  const onDropHandler = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        toast.error("Invalid file type! Only JPG, JPEG, PNG, and WebP are allowed.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onDrop(acceptedFiles);
    }
  }, [onDrop]);

  const onDropRejectedHandler = () => {
    toast.error("Invalid file type! Only JPG, JPEG, PNG, and WebP are allowed.");
  };

  const { getRootProps, getInputProps, isDragActive: dropzoneIsDragActive } = useDropzone({
    onDrop: onDropHandler,
    onDropRejected: onDropRejectedHandler,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"]
    },
    maxFiles: 1,
  });

  const isActive = isDragActive || dropzoneIsDragActive;

 
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      
      {localPreview ? (
        <div className="relative group">
          <img 
            src={localPreview} 
            alt={label} 
            className="w-full max-h-84 object-cover rounded-xl border-2 border-gray-200 shadow-sm" 
          />

        
          <button
            onClick={() => {
              setLocalPreview(null);
              onRemove();
            }}
            type="button"
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white 
                       p-2 rounded-full shadow-lg transform scale-0 group-hover:scale-100 
                       opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Trash2 size={16} />
          </button>

         
          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 
                          rounded-full text-xs font-medium shadow-md flex items-center">
            <CheckCircle size={12} className="mr-1" />
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
          <input {...getInputProps()} />
          
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
