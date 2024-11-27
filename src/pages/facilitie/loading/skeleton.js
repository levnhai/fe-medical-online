import React from 'react';

const Skeleton = () => {
    return (
        <div className="w-full mt-6">
            <div className="bg-gray-100 rounded-3xl p-4 shadow-sm h-[363px] w-[390px]">
                <div className="flex justify-center flex-col items-center h-full">
                    <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-lg mb-4"></div>
                    <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                    <div className="h-5 w-40 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;