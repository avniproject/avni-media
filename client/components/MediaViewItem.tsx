import {getImage, getImageName, imageType} from '@/model/ImageType';
import CheckButton from '@/components/CheckButton';

interface Props {
    image: imageType,
    setCarouselImage: (value: (((prevState: ({ uuid: string; signedUrl: string; signedThumbnailUrl: string; subjectTypeName: string } | null)) => ({ uuid: string; signedUrl: string; signedThumbnailUrl: string; subjectTypeName: string } | null)) | { uuid: string; signedUrl: string; signedThumbnailUrl: string; subjectTypeName: string } | null)) => void,
    minLevelName: string,
    onSelectImage: (value: string, checked: boolean) => void,
    checkedImage: string[],
}

const MediaViewItem = ({image, setCarouselImage, minLevelName, onSelectImage, checkedImage}: Props) => {
    return (
        <div key={`${image.uuid}-${Math.random()}`}>
            <div className="relative">
                <div className="relative w-full h-50 rounded-lg overflow-hidden">
                    <button>
                        <img
                            src={getImage(image, true)}
                            alt={image?.subjectTypeName}
                            onClick={() => setCarouselImage(image)}
                            className="thumb"
                        />
                    </button>
                </div>
                <CheckButton
                    imageDescription={[getImageName(image, minLevelName)]}
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