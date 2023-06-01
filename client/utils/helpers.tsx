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
    // const filterResponse = await axios.get(
    //   `${process.env.NEXT_PUBLIC_OPERATIONAL_MODULE}`
    // );
    const jsonData = {
      "formMappings": [{
        "uuid": "1f9fd805-fa51-4256-acb7-0d2989097513",
        "id": 17310,
        "formUUID": "0e70785c-7690-4865-b64c-6316fd55473a",
        "subjectTypeUUID": "095244bf-600a-4872-8553-cc8c8a974c4b",
        "formType": "IndividualProfile",
        "formName": "Album Registration",
        "enableApproval": false
      }, {
        "uuid": "5a906ec6-8e47-46e0-90c6-69dafe308c80",
        "id": 20603,
        "formUUID": "39a2dd6a-ea92-43bf-8ba0-354c9b0040c9",
        "programUUID": "3eeed9ee-bcd4-4eb1-8d1b-066dfc53652a",
        "subjectTypeUUID": "095244bf-600a-4872-8553-cc8c8a974c4b",
        "formType": "ProgramEnrolment",
        "formName": "Abc Enrolment",
        "enableApproval": false
      }, {
        "uuid": "45318a38-020c-4974-8482-bbfe021d2000",
        "id": 20604,
        "formUUID": "c0dd2d3f-134b-45cd-94b4-ff0038219081",
        "programUUID": "3eeed9ee-bcd4-4eb1-8d1b-066dfc53652a",
        "subjectTypeUUID": "095244bf-600a-4872-8553-cc8c8a974c4b",
        "formType": "ProgramExit",
        "formName": "Abc Exit",
        "enableApproval": false
      }],
      "addressLevelTypes": [{
        "uuid": "ea6fb46a-6d07-4d45-bf89-1bc63a66b4eb",
        "id": 876,
        "name": "village",
        "level": 1.0,
        "parent": {
          "uuid": "185faba4-d1db-410e-8507-863743cb7ad1"
        }
      }],
      "customRegistrationLocations": [],
      "encounterTypes": [],
      "allAddressLevels": [{
        "uuid": "ea6fb46a-6d07-4d45-bf89-1bc63a66b4eb",
        "id": 876,
        "name": "village",
        "level": 1.0,
        "parent": {
          "uuid": "185faba4-d1db-410e-8507-863743cb7ad1"
        }
      }, {
        "uuid": "4e9ed3ea-149e-46dd-a46f-c6eb2826e34f",
        "id": 725,
        "name": "State",
        "level": 4.0
      }, {
        "uuid": "c55af85c-b043-470f-ab13-7871c69536e0",
        "id": 741,
        "name": "Dist",
        "level": 3.0,
        "parent": {
          "uuid": "4e9ed3ea-149e-46dd-a46f-c6eb2826e34f"
        }
      }, {
        "uuid": "185faba4-d1db-410e-8507-863743cb7ad1",
        "id": 875,
        "name": "Block",
        "level": 2.0,
        "parent": {
          "uuid": "c55af85c-b043-470f-ab13-7871c69536e0"
        }
      }, {
        "uuid": "17cff9f4-c16b-418e-a989-89eaedcf6865",
        "id": 874,
        "name": "Taluka",
        "level": 0.0,
        "parent": {
          "uuid": "c55af85c-b043-470f-ab13-7871c69536e0"
        }
      }],
      "programs": [{
        "uuid": "3eeed9ee-bcd4-4eb1-8d1b-066dfc53652a",
        "programSubjectLabel": "",
        "colour": "#ff0000",
        "operationalProgramName": "Abc",
        "name": "Abc",
        "id": 665
      }],
      "taskTypes": [],
      "relations": [],
      "subjectTypes": [{
        "memberSubjectUUIDs": "",
        "validMiddleNameFormat": null,
        "uuid": "095244bf-600a-4872-8553-cc8c8a974c4b",
        "group": false,
        "operationalSubjectTypeName": "Album",
        "allowEmptyLocation": false,
        "validFirstNameFormat": null,
        "validLastNameFormat": null,
        "iconFileS3Key": null,
        "nameHelpText": "abc",
        "allowProfilePicture": false,
        "allowMiddleName": false,
        "groupRoles": [],
        "name": "Album",
        "id": 698,
        "type": "Individual"
      }],
      "forms": [{
        "formType": "IndividualProfile",
        "formName": "Album Registration",
        "formUUID": "0e70785c-7690-4865-b64c-6316fd55473a"
      }, {
        "formType": "ProgramExit",
        "formName": "Abc Exit",
        "formUUID": "c0dd2d3f-134b-45cd-94b4-ff0038219081"
      }, {
        "formType": "ProgramEnrolment",
        "formName": "Abc Enrolment",
        "formUUID": "39a2dd6a-ea92-43bf-8ba0-354c9b0040c9"
      }]
    }
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
    signedUrl: string;
    signedThumbnailUrl: string;
    uuid: string;
    subjectTypeName: string;
    createdDateTime: string;
    encounterTypeName: string;
    programName: string;
    address: string;
    subjectName: string;
}

export const getImageName = (image: imageType , minLevelName: string) => {
    const lowestLevelAddress = getLowestLocation(image.address, minLevelName)
    return `${image.subjectName ? image.subjectName : ''}
              ${image.subjectTypeName ? '_' + image.subjectTypeName : ''}
              ${image.encounterTypeName ? '_' + image.encounterTypeName : ''}
              ${image.programName ? '_' + image.programName : ''}
              ${lowestLevelAddress ? '_' + lowestLevelAddress : ''}`;
}

const getLowestLocation = (address: string, minLevelName: string) => {
    return JSON.parse(address)[minLevelName];
}