import {getImage, getImageDescription, getImageName, imageType} from '@/model/ImageType';
import CheckButton from '@/components/CheckButton';
import React from 'react';

interface Props {
    image: imageType,
    setCarouselImage: (value: (((prevState: ({ uuid: string; signedUrl: string; signedThumbnailUrl: string; subjectTypeName: string } | null)) => ({ uuid: string; signedUrl: string; signedThumbnailUrl: string; subjectTypeName: string } | null)) | { uuid: string; signedUrl: string; signedThumbnailUrl: string; subjectTypeName: string } | null)) => void,
    minLevelName: string,
    onSelectImage: (value: string, checked: boolean) => void,
    checkedImage: string[],
    onViewDetails?: (image: imageType) => void,
}

const MediaViewItem = ({image, setCarouselImage, minLevelName, onSelectImage, checkedImage, onViewDetails}: Props) => {
    return (
        <div key={`${image.uuid}-${Math.random()}`}>
            <div className="relative">
                <div className="relative w-full h-50 rounded-lg overflow-hidden"
                     style={{ padding:"2px"}}>
                    <button>
                        <img
                            src={getImage(image, true)}
                            alt={image?.subjectTypeName}
                            onClick={() => setCarouselImage(image)}
                            className="thumb"
                        />
                    </button>
                    {onViewDetails && (
                        <button 
                            onClick={() => onViewDetails(image)}
                            className="absolute bottom-2 right-2 bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded text-xs"
                        >
                            Details
                        </button>
                    )}
                </div>
                <CheckButton
                    imageDescription={getImageDescription(image, minLevelName)}
                    unSignedUrl={image.url}
                    name={getImageName(image, minLevelName)}
                    id={image.uuid}
                    onSelectImage={onSelectImage}
                    checkedImage={checkedImage}
                    imageDetail={image}
                    image_url={image.signedUrl}
                    flag="list"
                    onSelectImageCarousel={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>
        </div>
    );
}

export default MediaViewItem;