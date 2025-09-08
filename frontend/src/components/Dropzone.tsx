

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











import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  label: string;
  onDrop: (files: File[]) => void;
  acceptedFiles: string;
  preview?: string | null;
}

const Dropzone: React.FC<DropzoneProps> = ({ label, onDrop, acceptedFiles, preview }) => {
  const onDropHandler = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropHandler,
    accept: { 'image/*': [acceptedFiles] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative"
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt={label} className="max-h-40 mx-auto object-cover rounded" />
      ) : (
        <>
          <svg className="mx-auto h-12 w-12 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-600">{label}</p>
          <p className="text-sm text-gray-500">Click here to Upload/Capture</p>
          {isDragActive && <p className="text-sm text-gray-500">Drop the file here...</p>}
        </>
      )}
    </div>
  );
};

export default Dropzone;