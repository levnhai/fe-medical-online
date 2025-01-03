import React from 'react';

const NewsLoadingSkeleton = () => {
  return (
    <div className="w-full max-w-[1180px] mx-auto">
      {/* News Title Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Card - Featured News (40%) */}
        <div className="lg:w-[40%]">
          <div className="w-full">
            {/* Image Skeleton */}
            <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              {/* Title */}
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
              
              {/* Subtitle */}
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
              
              {/* Meta Info */}
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
              
              {/* Excerpt */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Cards Grid (60%) */}
        <div className="lg:w-[60%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col">
                {/* Image Skeleton */}
                <div className="w-full h-40 bg-gray-200 animate-pulse rounded-lg mb-3"></div>
                
                {/* Content */}
                <div className="space-y-3">
                  {/* Category */}
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                  
                  {/* Title */}
                  <div className="h-5 bg-gray-200 animate-pulse rounded w-11/12"></div>
                  
                  {/* Excerpt */}
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-full"></div>
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4"></div>
                  </div>
                  
                  {/* Meta Info */}
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Button Skeleton */}
      <div className="flex justify-center mt-8">
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default NewsLoadingSkeleton;