import React from 'react';

const FacilitiesSkeleton = () => {
    return (
        <div className="p-4 mt-4">
            <div className="container mx-auto">
                <div className="list_hospital">
                    <div className="w-full">
                        <div className="w-full space-y-4">
                            {[1, 2, 3].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 p-4 rounded-lg flex space-x-4 shadow-sm"
                                >
                                    <div className="w-40 h-40 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-8 bg-gray-200 animate-pulse w-1/2 rounded-md"></div>
                                        <div className="h-5 bg-gray-200 animate-pulse w-3/4 rounded-md"></div>
                                        <div className="flex space-x-2 mt-4">
                                            <div className="w-28 h-10 bg-gray-200 animate-pulse rounded-md"></div>
                                            <div className="w-28 h-10 bg-gray-200 animate-pulse rounded-md"></div>
                                        </div>
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

export default FacilitiesSkeleton;