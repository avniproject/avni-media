import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {Carousel} from "react-responsive-carousel";
import CheckButton from "./CheckButton";
import {useState} from "react";
import axios from "axios";
import {fetchAuthHeaders} from '@/utils/helpers'
import {getImage, getImageDescription, getImageName, getMetadata, imageMetadata, imageType} from '../model/ImageType';
import {Button} from "@mui/material";
import Loading from '@/components/loading';

interface Props {
    imageList: imageType[];
    totalRecords: any;
    carouselImage: any;
    setCarouselImage: any;
    currentPage: any;
    showPerpage: any,
    onClose: () => void;
    onSelectImage: (value: string, checked: boolean) => void;
    checkedImage: string[];
    setCheckedImage: string[];
    dataBody: any;
    minLevelName: string;
}

const ImageCarousel = ({
                           imageList,
                           carouselImage,
                           onClose,
                           onSelectImage,
                           checkedImage,
                           minLevelName,
                           setCarouselImage
                       }: Props) => {
    const ci = carouselImage as never;
    const index = imageList.indexOf(ci);
    const [images, setImages] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    const onSelectImageCarousel = (value: string, checked: boolean) => {
        onSelectImage(value, checked,);
    };

    function buildSubjectDashboardURLForUUID(uuid: string) {
        return `${process.env.NEXT_PUBLIC_WEB}/#/app/subject?uuid=${uuid}`;
    }

    const redirectToSubjectDashboardURL = async (imgMetadata: imageMetadata) => {
        const options = {
            headers: fetchAuthHeaders(),
            params: imgMetadata
        };
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_WEB}/web/individual/byMetadata`,
            options
        );
        const newWindow = window.open(buildSubjectDashboardURLForUUID(response.data.uuid), '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
        return;
    };

    return (
        <>
            <div className="fixed  inset-0 overflow-y-auto  " style={{zIndex: 21}}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-0 text-center sm:block sm:p-0">
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gray-300 opacity-75"/>
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                  </span>
                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="inline-block  bg-red rounded-lg">
                            <button className="absolute top-0 right-1 z-50" onClick={onClose}>
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
                        <div className="flex w-full h-full" style={{position: "relative",width: "500px", height: "650px"}}>
                            {showLoader && <Loading />}
                            <Carousel
                                renderArrowPrev={(clickHandler, hasPrev) => {
                                    const customClickHandler = () => {
                                        setCarouselImage(imageList[index - 1]);
                                        clickHandler();
                                    }
                                    return (
                                        <div
                                            className={`${
                                                hasPrev ? "absolute" : "hidden"
                                            } top-40 bottom-80 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                                            onClick={customClickHandler}
                                        >
                                            <NavigateBeforeIcon className="w-9 h-9 text-black rounded-md border border-gray-300 bg-white"/>
                                        </div>
                                    );
                                }}
                                renderArrowNext={(clickHandler, hasNext) => {
                                    const customClickHandler = () => {
                                        setCarouselImage(imageList[index + 1]);
                                        clickHandler();
                                    }
                                    return (
                                        <div
                                            className={`${
                                                hasNext ? "absolute" : "hidden"
                                            } top-40 bottom-80 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                                            onClick={customClickHandler}
                                        >
                                            <NavigateNextIcon className="w-9 h-9 text-black rounded-md border border-gray-300 bg-white"/>
                                        </div>
                                    );
                                }}
                                selectedItem={index}
                                showArrows={true}
                                showThumbs={false}
                                width={500}
                                showIndicators={false}
                                dynamicHeight={false}
                                useKeyboardArrows={true}
                            >
                                {imageList.map(
                                    (
                                        img: imageType,
                                        index
                                    ) => (
                                        <div key={index}>
                                            <img src={getImage(img, ci !== img)} className="carousel-image"/>
                                            <div className="checkbox">
                                                <CheckButton
                                                    imageDescription={getImageDescription(img, minLevelName)}
                                                    unSignedUrl={img.url}
                                                    image_url={getImage(img)}
                                                    name={getImageName(img, minLevelName)}
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
                                                <Button
                                                    className="text-sm m-lt-3 float-right mb-md-5 mr-md-5"
                                                    style={{textTransform:"capitalize", fontSize: "1rem", paddingTop:"10px"}}
                                                    variant="text"
                                                    onClick={() => redirectToSubjectDashboardURL(getMetadata(img))}
                                                >
                                                    More Info
                                                </Button>
                                                <p className="text-sm float-left"
                                                   style={{ paddingLeft:"20px", paddingTop:"10px" }}
                                                >
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
