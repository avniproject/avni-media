import PlayMediaThumbnail from "../components/playMediaThumbnail";
import FileThumbnail from "../components/fileThumbnail";
import {isAudioOrVideo, isImage} from "../utils/helpers";

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
    entityId: number;
}

export interface imageMetadata {
    subjectTypeName: string | null;
    programName: string | null;
    encounterTypeName: string | null;
    entityId: number;
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

export const getMetadata = function(img: imageType) : imageMetadata {
    return {
        entityId: img.entityId,
        encounterTypeName: img.encounterTypeName || null,
        subjectTypeName: img.subjectTypeName || null,
        programName: img.programName || null
    }
}

export const getImage = function(image: imageType, getThumbnail: boolean = false) {
    if (!getThumbnail) return image.signedUrl;

    const fileExtension = image.url.substring(image.url.lastIndexOf(".")).toLowerCase();

    if (isImage(fileExtension)) {
        return image.signedThumbnailUrl;
    }
    if (isAudioOrVideo(fileExtension)) {
        return PlayMediaThumbnail;
    }
    return FileThumbnail;
}
