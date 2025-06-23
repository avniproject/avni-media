import PlayMediaThumbnail from "../components/playMediaThumbnail";
import FileThumbnail from "../components/fileThumbnail";
import {isAudioOrVideo, isImage} from "../utils/helpers";
import _ from 'lodash';

export interface imageType {
    programEnrolment: string;
    signedUrl: string;
    signedThumbnailUrl: string;
    uuid: string;
    subjectTypeName: string;
    createdDateTime: string;
    encounterTypeName: string;
    programName: string;
    conceptName: string;
    address: string;
    subjectFirstName: string;
    subjectLastName: string
    subjectMiddleName: string
    url: string
    entityId: number;
    questionGroupConceptName?: string;
    repeatableQuestionGroupIndex?: number;
    mediaMetadata?: string;
}

export interface imageMetadata {
    subjectTypeName: string | null;
    programName: string | null;
    encounterTypeName: string | null;
    entityId: number;
}

export const getImageName = function (image: imageType, minLevelName: string) {
    const lowestLevelAddress = getLowestLocation(image.address, minLevelName)
    return `${image.subjectFirstName ? image.subjectFirstName : ''}
              ${image.subjectMiddleName ? '_' + image.subjectMiddleName : ''}
              ${image.subjectLastName ? '_' + image.subjectLastName : ''}
              ${image.subjectTypeName ? '_' + image.subjectTypeName : ''}
              ${image.encounterTypeName ? '_' + image.encounterTypeName : ''}
              ${image.programEnrolment ? '_' + image.programEnrolment : ''}
              ${image.questionGroupConceptName !== undefined ? '_' + image.questionGroupConceptName : ''}
              ${image.repeatableQuestionGroupIndex !== undefined ? '_' + image.repeatableQuestionGroupIndex : ''}
              ${lowestLevelAddress ? '_' + lowestLevelAddress : ''}`
        .replace(/\s+/g, '');
}

export const getImageDescription = function (image: imageType, minLevelName: string) {
    const lowestLevelAddress = getLowestLocation(image.address, minLevelName)
    let description = [];
    description.push(`${image.subjectFirstName ? 'Name: ' + image.subjectFirstName : ''}`);
    description.push(`${image.subjectMiddleName ? 'Middle Name: ' + image.subjectMiddleName : ''}`);
    description.push(`${image.subjectLastName ? 'Last Name: ' + image.subjectLastName : ''}`);
    description.push(`${image.subjectTypeName ? 'Type: ' + image.subjectTypeName : ''}`);
    description.push(`${image.encounterTypeName ? 'Encounter: ' + image.encounterTypeName : ''}`);
    description.push(`${image.programEnrolment ? 'Program: ' + image.programEnrolment : ''}`);
    description.push(`${image.conceptName ? 'Field: ' + image.conceptName : ''}`);
    description.push(`${lowestLevelAddress ? 'Address: ' + lowestLevelAddress : ''}`);
    description.push(`${image.questionGroupConceptName ? 'Question Group: ' + image.questionGroupConceptName : ''}`);
    description.push(`${image.repeatableQuestionGroupIndex !== undefined ? 'Question Group Index: ' + image.repeatableQuestionGroupIndex : ''}`);
    return description;
}

const getLowestLocation = function (address: string, minLevelName: string) {
    return JSON.parse(address)[minLevelName];
}

export const getMetadata = function (img: imageType): imageMetadata {
    return {
        entityId: img.entityId,
        encounterTypeName: img.encounterTypeName || null,
        subjectTypeName: img.subjectTypeName || null,
        programName: img.programName || null
    }
}

export const getImage = function (image: imageType, getThumbnail: boolean = false) {
    const fileExtension = image.url.substring(image.url.lastIndexOf(".")).toLowerCase();

    if (isImage(fileExtension)) {
        return getThumbnail ? image.signedThumbnailUrl : image.signedUrl;
    }
    if (isAudioOrVideo(fileExtension)) {
        return PlayMediaThumbnail;
    }
    return FileThumbnail;
}

export const getDownloadFileName = function (name: string, url: string) {
    let fileName = name;
    const fileExtension = url.substring(url.lastIndexOf('.'));
    if (!_.isEmpty(fileExtension) && fileExtension.length <= 5) {
        fileName += fileExtension;
    }
    
    return fileName;
}
