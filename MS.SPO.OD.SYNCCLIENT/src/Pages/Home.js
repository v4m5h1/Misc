
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiUpload } from 'react-icons/fi'
import { RiGalleryView } from "react-icons/ri";


const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/downloadrequest');
  };

  return (
    <div className="flex-col items-center justify-center min-h-full">
      <div className="mt-10 mb-6 text-center">
        <h1 className="text-5xl font-semibold">Request Action to Perform</h1>
      </div>
      <div className="flex items-center justify-around w-full mt-20">

        <div className="flex items-center justify-around space-x-20">
          <div className="flex flex-col items-center justify-center" onClick={handleButtonClick} aria-label="Download Button">
            <div className="flex flex-col items-center justify-center w-40 h-40 p-10 text-white bg-blue-500 rounded-full cursor-pointer">
              <FiDownload color='#fff' size={30} />
              <span className="text-lg font-semibold">Download</span>
            </div>
            <span className="mt-2 text-lg">Download</span>
          </div>

          <div className="flex flex-col items-center justify-center" onClick={() => navigate('/uploadrequest')} aria-label="Upload Button">
            <div className="flex flex-col items-center justify-center w-40 h-40 p-10 text-white bg-gray-500 rounded-full cursor-pointer">
              <FiUpload color='#fff' size={30} />
              <span className="text-lg font-semibold">Upload</span>
            </div>
            <span className="mt-2 text-lg">Upload</span>
          </div>

          <div className="flex flex-col items-center justify-center" onClick={() => navigate('/allrequest')} aria-label="View Requests Button">
            <div className="flex flex-col items-center justify-center w-40 h-40 p-6 text-white bg-green-500 rounded-full cursor-pointer">
              <RiGalleryView color='#fff' size={30} />
              <span className="text-base font-semibold">View Requests</span>
            </div>
            <span className="mt-2 text-lg">View All Requests</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
