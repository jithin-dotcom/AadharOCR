






// import type{ IOcrResultProps } from "../interface/IOcrResultProps";


// const OcrResult: React.FC<IOcrResultProps> = ({ data }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-lg font-semibold mb-2">Parsed Data</h2>
//       <div className="space-y-2">
//         <div className="flex flex-col">
//           <label className="text-gray-600">Aadhaar Number</label>
//           <p className="border-b">{data.aadhaarNumber || 'N/A'}</p>
//         </div>
//         <div className="flex flex-col">
//           <label className="text-gray-600">Name</label>
//           <p className="border-b">{data.name || 'N/A'}</p>
//         </div>
//         <div className="flex flex-col">
//           <label className="text-gray-600">Date of Birth</label>
//           <p className="border-b">{data.dob || 'N/A'}</p>
//         </div>
//         <div className="flex flex-col">
//           <label className="text-gray-600">Address</label>
//           <p className="border-b">{data.address || 'N/A'}</p>
//         </div>

//       </div>
//       <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       </div>
//     </div>
//   );
// };

// export default OcrResult;





import type { IOcrResultProps } from "../interface/IOcrResultProps";

const OcrResult: React.FC<IOcrResultProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Parsed Data</h2>
      <div className="space-y-2">
        <div className="flex flex-col">
          <label className="text-gray-600">Aadhaar Number</label>
          <p className="border-b">{data.aadhaarNumber || 'N/A'}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Name</label>
          <p className="border-b">{data.name || 'N/A'}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Date of Birth</label>
          <p className="border-b">{data.dob || 'N/A'}</p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Address</label>
          <p className="border-b">{data.address || 'N/A'}</p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded overflow-x-auto">
        <pre className="w-full max-w-full break-words whitespace-pre-wrap text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default OcrResult;