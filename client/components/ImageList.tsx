import CheckButton from "./CheckButton";
import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import ImageCarousel from "./ImageCarousel";

export default function ImageList() {

  const [imageList, setImageList] = useState<{ id: number, thumbsrc: string, path: string; name: string }[]>([]);
  const [pagination, setPagination] = useState({
    start_index: 0,
    end_index: 10
  });

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?offset=${pagination.start_index}&limit=${pagination.end_index}`);
        if (!response.ok) {

          throw new Error(`HTTP error! Status: ${response.status}`);

        }
        const data = await response.json();     
        setImageList(data);

      } catch (error) {
        console.error(error);

      }
    }
    
    fetchImages();
   
  }, [pagination]);
 
  const [showPerpage] = useState(10);

  const [carouselImage, setCarouselImage] = useState<{ id: string, thumbsrc: string, name: string } | null>(null);

  const [checkedImage, setCheckedImage] = useState<string[]>([]);

  const onSelectImage = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedImage(prevCheckedImage => {
        const updatedCheckedImage = [...prevCheckedImage, value];
        return updatedCheckedImage;
      });
    } else {
      setCheckedImage(prevCheckedImage => prevCheckedImage.filter(item => item !== value));
    }
  };
  const pagechange = (startValue: number, endValue: number) => {
    setPagination({ start_index: startValue, end_index: endValue })
  };
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="-mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {imageList.map((image) => (
            <div key={image.id}>
              <div className="relative">
                <div className="relative w-full h-50 rounded-lg overflow-hidden">
                  <button>
                    <img
                      src={image.thumbsrc}
                      alt={image?.name}
                      onClick={() => setCarouselImage(image)}
                      className="thumb"
                    />
                  </button>
                </div>
                <CheckButton name={image.name} id={image.id} onSelectImage={onSelectImage} checkedImage={checkedImage} flag="list" onSelectImageCarousel={function (): void {
                  throw new Error("Function not implemented.");
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {carouselImage && (
        <ImageCarousel
          imageList={imageList}
          carouselImage={carouselImage}
          onClose={() => setCarouselImage(null)}
          onSelectImage={onSelectImage}
          pagination={pagination}
          checkedImage={checkedImage} img={[]} setCheckedImage={[]}/>
      )}
      <Pagination
        showperpage={showPerpage}
        pagechange={pagechange}
        pagination={pagination}
      />
    </div>
  )
}
