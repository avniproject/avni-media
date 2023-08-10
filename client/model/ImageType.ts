import VideoThumbnail from "../components/videoThumbnail";
import {isVideo} from "../utils/helpers";

export interface imageType {
    programEnrolment: string;
    signedUrl: string;
    signedThumbnailUrl: string;
    uuid: string;
    subjectTypeName: string;
    createdDateTime: string;
    encounterTypeName: string;
    programName: string;
    address: string;
    subjectFirstName: string;
    subjectLastName: string
    url: string
}

export const getImageName = function(image: imageType, minLevelName: string) {
    const lowestLevelAddress = getLowestLocation(image.address, minLevelName)
    return `${image.subjectFirstName ? image.subjectFirstName : ''}
              ${image.subjectLastName ? '_' + image.subjectLastName : ''}
              ${image.subjectTypeName ? '_' + image.subjectTypeName : ''}
              ${image.encounterTypeName ? '_' + image.encounterTypeName : ''}
              ${image.programEnrolment ? '_' + image.programEnrolment : ''}
              ${lowestLevelAddress ? '_' + lowestLevelAddress : ''}`;
}

const getLowestLocation = function (address: string, minLevelName: string) {
    return JSON.parse(address)[minLevelName];
}

export const getThumbnail = function(image: imageType) {
    return isVideo(image.url) ? VideoThumbnail : image.signedThumbnailUrl
}

export const getImage = function(image: imageType) {
    return isVideo(image.url) ? VideoThumbnail : image.signedUrl
}
