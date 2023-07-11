import axios from 'axios';
import jwt from 'jwt-decode';
import jwt_decode from "jwt-decode";

export const validateAccessToken = () => {
    try {
        const token = localStorage.getItem("authToken") || ""

        if(!token) return false;

        const tokenData: any = jwt(token);
        return tokenData.exp >= Math.floor(Date.now() / 1000);
    } catch(err) {
      console.log('Error occurred--', err);
      return false;
    }
}

export const redirectIfNotValid = () => {
    if (typeof window === "undefined") {
        return;
    }

    if (!validateAccessToken()) {
        window.location.href = `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}`;
        return;
    }
}

interface DecodedToken {
    [key: string]: any;
    "custom:userUUID": string;
}

export const getUserUuidFromToken = () => {
    const authToken = "" + localStorage.getItem("authToken");
    const decodedToken = jwt_decode(authToken) as DecodedToken;
    const userUUID = decodedToken["custom:userUUID"];
    return userUUID;
}

export const operationalModuleData = async () => {
    const filterResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_OPERATIONAL_MODULE}`
    );
    const jsonData = filterResponse.data
    const forms    = jsonData.formMappings
    const programs = jsonData.programs;
    const encounters = jsonData.encounterTypes;
    const subjects = jsonData.subjectTypes;
    const addressLevel = jsonData.allAddressLevels;
    let maxAddressLevel: number | undefined;
    let minAddressLevel: number | undefined;
    let minLevelAddressName: string = '';
    let maxLevelLocation;
    let sortedAddressLevel;

    if (addressLevel !== undefined && addressLevel !== null) {
      maxAddressLevel = Math.max(
        ...addressLevel.map((obj: { level: any }) => obj.level)
      );

      let minAddressLevel = Math.min(
        ...addressLevel.map((obj: { level: any }) => obj.level)
      );

      const minLevelAddress: any = addressLevel.find((obj: { level: number; }) => obj.level === minAddressLevel);
      minLevelAddressName = minLevelAddress.name,

      maxLevelLocation = addressLevel.find(
        (obj: { level: number | undefined }) => obj.level === maxAddressLevel
      );

      sortedAddressLevel = addressLevel.sort(
        (a: { level: number }, b: { level: number }) => b.level - a.level
      );
    }

    return {
        maxAddressLevel,
        minAddressLevel,
        minLevelAddressName,
        maxLevelLocation,
        sortedAddressLevel,
        subjects,
        programs,
        encounters,
        forms
    };
};

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

export const getImageName = (image: imageType , minLevelName: string) => {
    const lowestLevelAddress = getLowestLocation(image.address, minLevelName)
    return `${image.subjectFirstName ? image.subjectFirstName : ''}
              ${image.subjectLastName ? '_' + image.subjectLastName: ''}
              ${image.subjectTypeName ? '_' + image.subjectTypeName : ''}
              ${image.encounterTypeName ? '_' + image.encounterTypeName : ''}
              ${image.programEnrolment ? '_' + image.programEnrolment : ''}
              ${lowestLevelAddress ? '_' + lowestLevelAddress : ''}`;
}

const getLowestLocation = (address: string, minLevelName: string) => {
    return JSON.parse(address)[minLevelName];
}

export function isVideo(url:string) {
  const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"];
  const fileExtension = url.substring(url.lastIndexOf(".")).toLowerCase();
  console.log("abcnn",fileExtension)
  return videoExtensions.includes(fileExtension);
}