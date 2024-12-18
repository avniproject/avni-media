import axios from 'axios';
import jwt from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import {getAppHomeUrl, getUserName, isDevModeWithoutIDP} from "@/utils/ConfigUtil";

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
        const tokenValid = tokenData.exp >= timeNowInSeconds;
        console.log("Token expires in :", tokenData.exp - timeNowInSeconds)
        return tokenValid;
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

    if (!isDevModeWithoutIDP() && !validateAccessToken() ) {
        window.location.href = getAppHomeUrl();
        return;
    }
}

export function fetchAuthHeaders() {
    if (isDevModeWithoutIDP()) {
        return {"USER-NAME": getUserName()};
    } else {
        return {"AUTH-TOKEN": localStorage.getItem("authToken")};
    }
}

interface DecodedToken {
    [key: string]: any;
    "custom:userUUID": string;
}

export const getUserUuidFromToken = () => {
    if(isDevModeWithoutIDP()) return getUserName();
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

export function isAudioOrVideo(fileExtension: string) {
    const audioVideoFileExtensions = [".mp4", ".mov", ".avi", ".mkv", ".mp3", ".wav"];
    return matchesFileExtension(fileExtension, audioVideoFileExtensions);
}

export function isImage(fileExtension: string) {
    const imageFileExtensions = [".png", ".jpg", ".jpeg"];
    return matchesFileExtension(fileExtension, imageFileExtensions);
}

export function matchesFileExtension(fileExtension: string, supportedExtensions: string[]) {
    return supportedExtensions.includes(fileExtension);
}
