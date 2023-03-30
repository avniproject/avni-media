import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CheckButton from "./CheckButton";

interface Props {
  imageList: any
  carouselImage: any
  onClose: () => void;
  pagination: (startValue: number, endValue: number) => void;
  onSelectImage: (value: string, checked: boolean) => void,
  checkedImage: string[],
  setCheckedImage: string[],
  carouselx: (val: string) => void;
}

const ImageCarousel = ({
  imageList,
  carouselImage,
  onClose,
  onSelectImage,
  checkedImage

}: Props) => {
  const index = imageList.indexOf(carouselImage);

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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex  w-full h-full">
              <Carousel selectedItem={index} showArrows={true} showThumbs={false} width={500} showIndicators={false} dynamicHeight={false} useKeyboardArrows={true}>
                {imageList.map((img) => (
                  <div key={img.id}>
                    <img src={img.path} className="carousel-image" />
                    <div className="checkbox">
                      <CheckButton name={img.name} id={img.id} onSelectImageCarousel={onSelectImageCarousel} flag="carousel" onSelectImage={function (): void {
                        throw new Error("Function not implemented.");
                      }} checkedImage={checkedImage} />
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