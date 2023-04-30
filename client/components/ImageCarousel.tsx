import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CheckButton from "./CheckButton";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  imageList: object[];
  totalRecords: any;
  carouselImage: any;
  onClose: () => void;
  onSelectImage: (value: string, checked: boolean) => void;
  checkedImage: string[];
  setCheckedImage: string[];
}

const ImageCarousel = ({
  imageList,
  totalRecords,
  carouselImage,
  onClose,
  onSelectImage,
  checkedImage,
}: Props) => {
  const ci = carouselImage as never;
  const index = imageList.indexOf(ci);
  const [imageCarousel, setImageCarousel] = useState({
    total: 0,
    page: 0,
    data: [],
  });

  useEffect(() => {
    const fetchImages = async () => {
      const options = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("authToken"),
        },
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?page=0&size=10000`,
        options
      );
      setImageCarousel(response.data);
    };
    fetchImages();
  }, [totalRecords]);

  const onSelectImageCarousel = (value: string, checked: boolean) => {
    const base = imageCarousel.data;
    const selectedImageDetails = base.filter((obj) => obj.uuid === value)[0];
    onSelectImage(value, checked, selectedImageDetails);
  };

  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto ">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-0 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="inline-block  bg-red rounded-lg">
              <button className="absolute top-0 right-3 z-50" onClick={onClose}>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex  w-full h-full">
              <Carousel
                selectedItem={index}
                showArrows={true}
                showThumbs={false}
                width={500}
                showIndicators={false}
                dynamicHeight={false}
                useKeyboardArrows={true}
              >
                {imageCarousel.data.map(
                  (
                    img: {
                      signedUrl: string;
                      uuid: string;
                      subjectTypeName: string;
                      createdDateTime: string;
                    },
                    index
                  ) => (
                    <div key={index}>
                      <img src={img.signedUrl} className="carousel-image" />
                      <div className="checkbox">
                        <CheckButton
                          name={img.subjectTypeName}
                          id={img.uuid}
                          onSelectImageCarousel={onSelectImageCarousel}
                          flag="carousel"
                          onSelectImage={function (): void {
                            throw new Error("Function not implemented.");
                          }}
                          checkedImage={checkedImage}
                          imageDetail={undefined}
                        />
                      </div>
                      <div className="name-size">
                        <p>Subject Type: {img.subjectTypeName}</p>
                        <p>
                          Date:{" "}
                          {new Date(img.createdDateTime)
                            .toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .split("/")
                            .join("-")}
                        </p>
                        <a href={img.signedUrl}>
                          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <svg
                              className="fill-current w-4 h-4 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                            </svg>
                            <span>Download</span>
                          </button>
                        </a>{" "}
                      </div>
                    </div>
                  )
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
