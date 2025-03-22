import React from 'react';

const DoctorSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div 
            key={index} 
            className="bg-white p-6 mb-4 rounded-lg shadow-sm hover:shadow-md cursor-default animate-pulse w-full"
          >
            <div className="w-full">
              <div className="flex items-center gap-3 leading-10 mb-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="h-7 w-60 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-3 leading-10 mb-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="h-6 w-44 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-3 leading-10 mb-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="h-6 w-72 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-3 leading-10 mb-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="h-6 w-52 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-3 leading-10">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="h-6 w-56 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default DoctorSkeleton;