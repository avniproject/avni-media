import CheckButton from "./CheckButton"
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';

export default function ImageList() {
  const [imageList, setImageList] = useState([]);


  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setImageList(data);
      } catch (error) {
        console.error(error);
       
        // TODO: Add error message to UI
      }
    }
    fetchImages();
  }, []);
  const [showPerpage, setShowPerpage] = useState(10);
  const [pagination, setPagination] = useState({
    start_index: 0,
    end_index: 10
  });

  const pagechange = (startValue: number, endValue: number) => {
    setPagination({ start_index: startValue, end_index: endValue })
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="-mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {imageList.slice(pagination.start_index, pagination.end_index).map((image) => (
            <div key={image.id}>
              <div className="relative">
                <div className="relative w-full h-50 rounded-lg overflow-hidden">
                  <img
                    src={image.path}
                    alt={image.name}
                    className="w-100 h-200 object-center object-cover"
                  />
                </div>
                <CheckButton />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination showperpage={showPerpage} pagechange={pagechange} total={imageList.length} />
    </div>
  )
}
