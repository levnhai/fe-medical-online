import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Giả định các component này đã được cài đặt với Tailwind
import Header from '../components/header';
import Search from '~/components/search';
import Button from '~/components/Button';

function AppointmentFacilitySkeleton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Tạo một mảng để hiển thị 4 item skeleton (2x2)
  const skeletonItems = Array(4).fill(null);

  return (
    <div className="w-full"> 
        {/* Grid layout 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skeletonItems.map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="flex flex-col md:flex-row">
                {/* Skeleton for image */}
                <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-300"></div>
                
                {/* Skeleton for content */}
                <div className="p-4 w-full md:w-2/3">
                  {/* Skeleton for title */}
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  
                  {/* Skeleton for address */}
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
                  
                  {/* Skeleton for buttons */}
                  <div className="flex space-x-3">
                    <div className="h-9 bg-gray-300 rounded w-24"></div>
                    <div className="h-9 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default AppointmentFacilitySkeleton;