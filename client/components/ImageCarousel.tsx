import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CheckButton from "./CheckButton";
import { useEffect, useState } from "react";

interface Props {

  imageList: any
  carouselImage: any
  onClose: () => void;
  pagination: {
    start_index: number;
    end_index: number;
  },
  onSelectImage: (value: string, checked: boolean) => void,
  checkedImage: string[],
  setCheckedImage: string[],
}

const ImageCarousel = ({
  imageList,
  pagination,
  carouselImage,
  onClose,
  onSelectImage,
  checkedImage

}: Props) => {
  const index = imageList.indexOf(carouselImage);
  const [imageCarousel, setImageCarousel] = useState<{ id: number, thumbsrc: string, path: string; name: string }[]>([]);
  useEffect(() => {
    const fetchTotalResponse = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TOTAL_RECORD}`);
        const total_record = await response.json();
        return total_record;
      } catch (error) {
        console.log(error);
      }
    };
    async function fetchImages() {
      const total_record = await fetchTotalResponse();

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?offset=${pagination.start_index}&limit=${total_record}`);
        if (!response.ok) {

          throw new Error(`HTTP error! Status: ${response.status}`);

        }
        const data = await response.json();

        setImageCarousel(data);

      } catch (error) {
        console.error(error);

      }
    }

    fetchImages();

  }, []);

  const onSelectImageCarousel = (value: string, checked: boolean) => {

    onSelectImage(value, checked)
  };
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto ">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-0 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true"></div>
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="inline-block  bg-red rounded-lg">
              <button className="absolute top-0 right-3 z-50" onClick={onClose}>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex  w-full h-full">
              <Carousel selectedItem={index} showArrows={true} showThumbs={false} width={500} showIndicators={false} dynamicHeight={false} useKeyboardArrows={true}>
                {imageCarousel.map((img) => (
                  <div key={img.id}>
                    <img src={img.thumbsrc} className="carousel-image" />
                    <div className="checkbox">
                      <CheckButton name={img.subjectName} id={img.id} onSelectImageCarousel={onSelectImageCarousel} flag="carousel" onSelectImage={function (): void {
                        throw new Error("Function not implemented.");
                      }} checkedImage={checkedImage} />
                    </div>
                    <div className="name-size">
                      <p  >Subject Type : type</p>
                      <p>Date: date</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageCarousel;