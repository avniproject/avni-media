import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CheckButton from "./CheckButton";

interface Props {
  selectedImage: any
  image: any
  onClose: () => void;
  pagination: (startValue: number, endValue: number) => void;

}

const ImageCarousel = ({ image, selectedImage, onClose, pagination }: Props) => {
  const index = image.indexOf(selectedImage);
  const previousImage = image[(index + image.length - 1) % image.length];
  const nextImage = image[(index + 1) % image.length];
  console.log("pagination", pagination)

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto ">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-0 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true"></div>
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
         
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="inline-block  bg-red rounded-lg">
          <button className="absolute top-0 right-3 z-50 bg-gray-700" onClick={onClose}>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            </div>
            <div className="relative w-full h-82">
              <Carousel className='carousel' selectedItem={index} showArrows={true}>
                {image.slice(pagination.start_index, pagination.end_index).map((img) => (
                  <div key={img.id}>
                    <img src={img.path} className="carousel-image" />
                    <div className="absolute top-300 left-10 bg-white z-10 ">
                      <CheckButton />
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
