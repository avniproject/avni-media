import axios from 'axios';
import jwt from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import {imageType} from '../model/ImageType';

const AuthTokenName = "authToken";

export const validateAccessToken = () => {
    try {
        const token = localStorage.getItem(AuthTokenName) || ""

        if (!token) {
            console.error("No token with name authToken found in local storage");
            return false;
        }

        const tokenData: any = jwt(token);
        const timeNowInSeconds = Math.floor(Date.now() / 1000);
        const expired = tokenData.exp >= timeNowInSeconds;
        console.log("Token expires in :", tokenData.exp - timeNowInSeconds)
        return expired;
    } catch (err) {
        console.log('Error occurred--', err);
        return false;
    }
}

export function storeToken(authToken:any) {
    if (typeof window === "undefined") {
        return;
    }
    localStorage.setItem("authToken", authToken);
}

export const redirectIfNotValid = function() {
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
    return  decodedToken["custom:userUUID"];
}

export const operationalModuleData = async () => {
    const filterResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_WEB}/web/operationalModules`
    );
    const jsonData = filterResponse.data
    const forms = jsonData.formMappings
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

export function isVideo(url: string) {
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv"];
    const fileExtension = url.substring(url.lastIndexOf(".")).toLowerCase();
    return videoExtensions.includes(fileExtension);
}
