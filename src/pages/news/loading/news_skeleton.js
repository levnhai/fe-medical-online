import React from 'react';

const NewsSkeleton = () => {
  return (
    <div className="w-full overflow-x-hidden animate-pulse">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Skeleton */}         
          <div className="space-y-6 mb-8">                  
            <div className="hidden md:flex items-center gap-8">             
              <div className="h-6 bg-gray-200 rounded-md w-1/5 mt-[30px] mr-[30px]"></div>             
              <div className="h-6 bg-gray-200 rounded-md w-36 mt-[30px]"></div>             
              <div className="h-6 bg-gray-200 rounded-md w-32 mt-[30px]"></div>             
              <div className="h-6 bg-gray-200 rounded-md w-60 mt-[30px]"></div>           
            </div>         
          </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main News Article Skeleton */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            {/* Main image with exact dimensions 755x432 */}
            <div className="w-[755px] h-[432px] bg-gray-200 max-w-full"></div>
            <div className="p-4">
              <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
              <div className="space-y-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded-md w-full"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded-md w-48"></div>
            </div>

            {/* Sub Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>

          {/* Side Articles Skeleton */}
          <div className="space-y-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1/3 h-32 bg-gray-200 rounded-md"></div>
                <div className="w-2/3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service News Section Skeleton */}
        <div className="mt-12">
          <div className="h-8 bg-gray-200 rounded-md w-48 mb-6"></div>
          <div className="hidden md:grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-48 bg-gray-200 rounded-md"></div>
                <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="block md:hidden space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1/3 h-32 bg-gray-200 rounded-md"></div>
                <div className="w-2/3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical News Section Skeleton */}
        <div className="mt-12">
          <div className="h-8 bg-gray-200 rounded-md w-48 mb-6"></div>
          <div className="hidden md:grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-48 bg-gray-200 rounded-md"></div>
                <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Medical Knowledge Section Skeleton */}
        <div className="mt-12">
          <div className="h-8 bg-gray-200 rounded-md w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8">
              <div className="h-96 bg-gray-200 rounded-md"></div>
            </div>
            <div className="col-span-12 md:col-span-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1/3 h-32 bg-gray-200 rounded-md"></div>
                  <div className="w-2/3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSkeleton;