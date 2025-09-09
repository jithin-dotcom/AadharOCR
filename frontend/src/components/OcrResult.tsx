






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





// import type { IOcrResultProps } from "../interface/IOcrResultProps";

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
//       <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded overflow-x-auto">
//         <pre className="w-full max-w-full break-words whitespace-pre-wrap text-sm">
//           {JSON.stringify(data, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default OcrResult;










import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import type { IOcrResultProps } from "../interface/IOcrResultProps";

const OcrResult: React.FC<IOcrResultProps> = ({ data }) => {
  const [showJson, setShowJson] = useState(false);

  const fields = [
    { label: 'Aadhaar Number', value: data.aadhaarNumber, key: 'aadhaarNumber' },
    { label: 'Name', value: data.name, key: 'name' },
    { label: 'Date of Birth', value: data.dob, key: 'dob' },
    { label: 'Address', value: data.address, key: 'address' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <CheckCircle className="text-green-500" size={24} />
          Extracted Data
        </h2>
        <button
          onClick={() => setShowJson(!showJson)}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          type="button"
        >
          {showJson ? 'Hide' : 'Show'} JSON
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="group">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              {field.label}
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 group-hover:bg-gray-100 transition-colors">
              <p className="text-gray-800 font-medium">
                {field.value || 'Not available'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showJson && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg overflow-hidden">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Raw JSON Data</h3>
          <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default OcrResult;