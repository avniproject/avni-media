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
    const jsonData = {"formMappings":[{"uuid":"cd568d89-9f3d-46be-9725-f42378b7ab97","id":16193,"formUUID":"57bb2d3a-f8a5-4405-8d2c-514456e91533","encounterTypeUUID":"543c3eb6-fc01-4e3a-b3e1-ef50ec6a8896","subjectTypeUUID":"bc0a4ae3-77b3-4620-81c4-2d02d1c62280","formType":"Encounter","formName":"Dispatch receipt form","enableApproval":false},{"uuid":"9b65fd50-a19d-419c-a425-754267c3f402","id":16194,"formUUID":"ba3ee4a5-3155-49ef-9d37-4fee9744e95c","encounterTypeUUID":"543c3eb6-fc01-4e3a-b3e1-ef50ec6a8896","subjectTypeUUID":"bc0a4ae3-77b3-4620-81c4-2d02d1c62280","formType":"IndividualEncounterCancellation","formName":"Dispatch receipt  Encounter Cancellation","enableApproval":false},{"uuid":"b760887d-981e-4995-a69f-38c73d4f935a","id":17326,"formUUID":"50623132-abbd-45df-9c92-23cdbb76323b","subjectTypeUUID":"360606c2-3514-4848-8e7e-8b5830325130","formType":"IndividualProfile","formName":"Demand Registration","enableApproval":false},{"uuid":"f836b5d3-fca3-43ed-b0d7-babdc62f3c54","id":17331,"formUUID":"c53a160b-d245-44f6-8b47-f0c1f1dee80b","subjectTypeUUID":"07d0e5b8-0dad-4469-9623-10278261f829","formType":"IndividualProfile","formName":"Activity Registration","enableApproval":false},{"uuid":"de8abf10-6a74-4f2e-b2db-e29ac3ed788f","id":19118,"formUUID":"52c11e75-6e11-4d12-8f42-50f83d130d93","subjectTypeUUID":"07df088a-7924-461d-9a9b-24a29d43813b","formType":"IndividualProfile","formName":"Inventory Item Registration","enableApproval":false},{"uuid":"612b7808-49c7-4fe6-85cd-e8d2fe30bc36","id":21014,"formUUID":"70bfa0ec-dc10-4e2c-8cd7-edef1b85c090","subjectTypeUUID":"bc0a4ae3-77b3-4620-81c4-2d02d1c62280","formType":"IndividualProfile","formName":"Dispatch Registration","enableApproval":false},{"uuid":"281b2fff-cca6-4b5f-88bd-9613a36f6dc0","id":21801,"formUUID":"f19d7b5b-7b8b-4b5a-aa3b-5dcd6b1b496e","subjectTypeUUID":"461abfde-8767-41f3-993e-b68599999f07","formType":"IndividualProfile","formName":"Distribution Registration","enableApproval":false}],"addressLevelTypes":[{"uuid":"47a9e070-090d-46f8-8f06-834c193b8bec","id":680,"name":"Village","level":1.0,"parent":{"uuid":"3410e7a2-cefe-4fc7-94b4-6631656c548c"}}],"customRegistrationLocations":[{"subjectTypeUUID":"360606c2-3514-4848-8e7e-8b5830325130","addressLevels":[{"uuid":"6b0db0bd-93ad-4f54-b09a-a8f935ba4d85","id":678,"name":"District","level":3.0,"parent":{"uuid":"fda77dde-6346-47b9-84e0-25e7f171f55a"}}]},{"subjectTypeUUID":"07d0e5b8-0dad-4469-9623-10278261f829","addressLevels":[]},{"subjectTypeUUID":"bc0a4ae3-77b3-4620-81c4-2d02d1c62280","addressLevels":[{"uuid":"6b0db0bd-93ad-4f54-b09a-a8f935ba4d85","id":678,"name":"District","level":3.0,"parent":{"uuid":"fda77dde-6346-47b9-84e0-25e7f171f55a"}}]}],"encounterTypes":[{"uuid":"543c3eb6-fc01-4e3a-b3e1-ef50ec6a8896","operationalEncounterTypeName":"Dispatch receipt","name":"Dispatch receipt","id":1676}],"allAddressLevels":[{"uuid":"fda77dde-6346-47b9-84e0-25e7f171f55a","id":677,"name":"State","level":4.0},{"uuid":"6b0db0bd-93ad-4f54-b09a-a8f935ba4d85","id":678,"name":"District","level":3.0,"parent":{"uuid":"fda77dde-6346-47b9-84e0-25e7f171f55a"}},{"uuid":"3410e7a2-cefe-4fc7-94b4-6631656c548c","id":679,"name":"Block","level":2.0,"parent":{"uuid":"6b0db0bd-93ad-4f54-b09a-a8f935ba4d85"}},{"uuid":"47a9e070-090d-46f8-8f06-834c193b8bec","id":680,"name":"Village","level":1.0,"parent":{"uuid":"3410e7a2-cefe-4fc7-94b4-6631656c548c"}}],"programs":[],"taskTypes":[],"relations":[],"subjectTypes":[{"memberSubjectUUIDs":"","uuid":"07df088a-7924-461d-9a9b-24a29d43813b","allowMiddleName":false,"allowProfilePicture":false,"group":false,"operationalSubjectTypeName":"Inventory Item","allowEmptyLocation":true,"validFirstNameFormat":null,"validLastNameFormat":null,"iconFileS3Key":null,"nameHelpText":null,"groupRoles":[],"validMiddleNameFormat":null,"lastNameOptional":false,"name":"Inventory Item","id":690,"type":"Individual"},{"memberSubjectUUIDs":"","uuid":"461abfde-8767-41f3-993e-b68599999f07","allowMiddleName":false,"allowProfilePicture":false,"group":false,"operationalSubjectTypeName":"Distribution","allowEmptyLocation":false,"validFirstNameFormat":null,"validLastNameFormat":null,"iconFileS3Key":null,"nameHelpText":null,"groupRoles":[],"validMiddleNameFormat":null,"lastNameOptional":false,"name":"Distribution","id":697,"type":"Individual"},{"memberSubjectUUIDs":"","uuid":"07d0e5b8-0dad-4469-9623-10278261f829","allowMiddleName":false,"allowProfilePicture":false,"group":false,"operationalSubjectTypeName":"Activity","allowEmptyLocation":false,"validFirstNameFormat":null,"validLastNameFormat":null,"iconFileS3Key":null,"nameHelpText":null,"groupRoles":[],"validMiddleNameFormat":null,"lastNameOptional":false,"name":"Activity","id":696,"type":"Individual"},{"memberSubjectUUIDs":"","uuid":"360606c2-3514-4848-8e7e-8b5830325130","allowMiddleName":false,"allowProfilePicture":false,"group":false,"operationalSubjectTypeName":"Demand","allowEmptyLocation":false,"validFirstNameFormat":null,"validLastNameFormat":null,"iconFileS3Key":null,"nameHelpText":null,"groupRoles":[],"validMiddleNameFormat":null,"lastNameOptional":false,"name":"Demand","id":632,"type":"Individual"},{"memberSubjectUUIDs":"","uuid":"bc0a4ae3-77b3-4620-81c4-2d02d1c62280","allowMiddleName":false,"allowProfilePicture":false,"group":false,"operationalSubjectTypeName":"Dispatch","allowEmptyLocation":false,"validFirstNameFormat":null,"validLastNameFormat":null,"iconFileS3Key":null,"nameHelpText":null,"groupRoles":[],"validMiddleNameFormat":null,"lastNameOptional":false,"name":"Dispatch","id":647,"type":"Individual"}],"forms":[{"formType":"Encounter","formName":"Dispatch Form","formUUID":"9b611867-c553-4435-8ee3-4f4ce96e3d06"},{"formType":"IndividualProfile","formName":"Demand Registration","formUUID":"50623132-abbd-45df-9c92-23cdbb76323b"},{"formType":"IndividualEncounterCancellation","formName":"Dispatch receipt  Encounter Cancellation","formUUID":"ba3ee4a5-3155-49ef-9d37-4fee9744e95c"},{"formType":"Encounter","formName":"Dispatch receipt form","formUUID":"57bb2d3a-f8a5-4405-8d2c-514456e91533"},{"formType":"IndividualProfile","formName":"Dispatch Registration","formUUID":"70bfa0ec-dc10-4e2c-8cd7-edef1b85c090"},{"formType":"IndividualProfile","formName":"Dispatch Registration","formUUID":"f3ea5028-a53f-4ba7-9ea0-97434a8e5061"},{"formType":"IndividualProfile","formName":"Activity Registration","formUUID":"c53a160b-d245-44f6-8b47-f0c1f1dee80b"},{"formType":"IndividualProfile","formName":"Inventory Item Registration","formUUID":"52c11e75-6e11-4d12-8f42-50f83d130d93"},{"formType":"IndividualProfile","formName":"Distribution Registration","formUUID":"f19d7b5b-7b8b-4b5a-aa3b-5dcd6b1b496e"}]}
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