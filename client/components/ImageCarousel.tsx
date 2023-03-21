import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CheckButton from "./CheckButton";

interface Props {
  selectedImage: any
  image: any
  onClose: () => void;
}

const ImageCarousel = ({ image, selectedImage, onClose }: Props) => {
  const index = image.indexOf(selectedImage);
  const previousImage = image[(index + image.length - 1) % image.length];
  const nextImage = image[(index + 1) % image.length];

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto ">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-0 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="relative w-full h-82">
        
              <Carousel className='carousel' selectedItem={index} showArrows={true}>
                {image.map((img) => (
                  <div key={img.id}>
                    <img src={img.path} />
                    <div className="absolute top-300 left-60 bg-white ">
                      <CheckButton />
                    </div>
                  </div>
                 
                ))}
              </Carousel>
             
              <button className="absolute top-0 right-0 m-4" onClick={onClose}>Close</button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageCarousel;
