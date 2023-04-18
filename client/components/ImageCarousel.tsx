import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CheckButton from "./CheckButton";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  imageList: object[]
  totalRecords: any
  carouselImage: any
  onClose: () => void;
  onSelectImage: (value: string, checked: boolean) => void,
  checkedImage: string[],
  setCheckedImage: string[],
  orgID: string | string[] | undefined,
}

const ImageCarousel = ({
  imageList,
  totalRecords,
  carouselImage,
  onClose,
  onSelectImage,
  checkedImage,
  orgID,
}: Props) => {
  const ci = carouselImage as never
  const index = imageList.indexOf(ci);
  const [imageCarousel, setImageCarousel] = useState({ total: 0, page: 0, data: [] });

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?orgID=${orgID}&page=0&size=${totalRecords}`);
      setImageCarousel(response.data)
    }
    fetchImages()

  }, [totalRecords, orgID]);

  const onSelectImageCarousel = (value: string, checked: boolean) => {
    const base = imageCarousel.data;
    const selectedImageDetails = base.filter(obj => obj.uuid === value)[0];
    onSelectImage(value, checked, selectedImageDetails);
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
                {imageCarousel.data.map((img:{signedUrl: string, uuid: string, subjectTypeName: string, createdDateTime: string}, index) => (
                  <div key={index}>
                    <img src={img.signedUrl} className="carousel-image" />
                    <div className="checkbox">
                      <CheckButton name={img.subjectTypeName} id={img.uuid} onSelectImageCarousel={onSelectImageCarousel} flag="carousel" onSelectImage={function (): void {
                        throw new Error("Function not implemented.");
                      }} checkedImage={checkedImage} />
                    </div>
                    <div className="name-size">
                      <p>Subject Type: {img.subjectTypeName}</p>
                      <p>Date: {img.createdDateTime}</p>
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