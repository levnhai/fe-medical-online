// skeleton.js
import React from 'react';

const PatientRecordSkeleton = () => {
  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 mb-10 sm:mb-16 md:mb-20">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 bg-gray-200 animate-pulse h-10 w-1/2"></h1>

      {[...Array(3)].map((_, index) => (
        <div key={index} className="border rounded-3xl border-cyan-400 overflow-hidden mb-6 sm:mb-8">
          <ul className="p-4 sm:p-6 md:p-8">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="flex items-center gap-2 sm:gap-3 mb-4">
                <span className="bg-gray-200 animate-pulse h-6 w-6 rounded-full"></span>
                <span className="bg-gray-200 animate-pulse h-4 w-1/4"></span>
                <span className="bg-gray-200 animate-pulse h-4 w-1/2"></span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap sm:flex-nowrap justify-end bg-zinc-200 px-2 sm:px-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-10 w-24"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientRecordSkeleton;