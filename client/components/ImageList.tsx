import CheckButton from "./CheckButton";
import { useState, useEffect, Key, useId} from "react";
import Pagination from "@/components/Pagination";
import ImageCarousel from "./ImageCarousel";
import axios from "axios";
import Link from "next/link";
import UserInputModal from "./ImageDescriptionModal";
import Concepts from "./FilterComponent/Concepts";
import Daterange from "./FilterComponent/Daterange";
import EncounterType from "./FilterComponent/EncounterType";
import LocationHierarchy from "./FilterComponent/LocationHierarchy";
import Program from "./FilterComponent/Program";
import SubjectType from "./FilterComponent/SubjectType";
import NumberDropdown from "./FilterComponent/ImageSize";
import Button from "./DownloadComponent/Button";
import {
  redirectIfNotValid,
  getUserUuidFromToken,
  operationalModuleData,
  getImageName,
  imageType,
} from "@/utils/helpers";
import CodedConceptFilter from "./FilterComponent/CodedConceptFilter";
import DateConceptFilter from "./FilterComponent/DateConceptFilter";
import TimeStampConceptFilter from "./FilterComponent/TimeStampConceptFilter";
import TexConceptFilter from "./FilterComponent/TextConceptFilter";
import NumericConceptFilter from "./FilterComponent/NumericConceptFilter";

export default function ImageList() {
  const [add, setAdd] = useState<any>([]);
  const [address, setAddress] = useState<any>([]);
  const [secondAddress, setSecondAddress] = useState<any>([]);
  const [selectedParentId, setSelectedParentId] = useState<any>([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [imageList, setImageList] = useState<any>({ page: 0, data: [] });
  const [pagination, setPagination] = useState({ size: 10, page: 0 });
  const [userName, setUserName] = useState<string | string[] | undefined>();
  const [locationFilter, setLocation] = useState<any>([]);
  const [subjectFilter, setSubjectFilter] = useState<any>([]);
  const [programFilter, setProgramFilter] = useState<any>([]);
  const [maxLevelLocation, setMaxtLevelLocation] = useState<any>([]);
  const [minLevel, setMinLevel] = useState<number>();
  const [maxLevel, setMaxLevel] = useState<number>();
  const [minLevelName, setMinLevelName] = useState<string>("");
  const [encounterFilter, setEncounterFilter] = useState<any>([]);
  const [locations, setLocations] = useState<any>([]);
  const [otherLocation, setOtherLocation] = useState<any[]>([]);
  const [showPerpage, setShowperpage] = useState(10);
  const [concepts, setConcept] = useState<any>();
  const [date, setDateRange] = useState<any[] | null>([]);
  const [encouter, setEncounterType] = useState<any[]>([]);
  const [program, setProgamType] = useState<any[]>([]);
  const [subject, setSubjectType] = useState<any[]>([]);
  const [dataBody, setDataBody] = useState<any>();
  const [conceptdata, setConceptData] = useState<any>([]);
  const [formsData, setFormsData] = useState<any>([]);
  const [textConcept, setTextConcept] = useState<any>([])
  const [codedConcept, setCodedConcept] = useState<any>([])
  const [noteConcept, setNoteConcept] = useState<any>([])
  const [toNumericConcept, setToNumericConcept] = useState<any>([])
  const [dateTimeConcept, setDateTimeConcept] = useState<any[] | null>([]);
  const [conceptDates, setConceptDates] =  useState<any[] | null>([]);
  const [typeId, setTypeId] = useState<any>([])
  const [selectedProgramUUID, setSelectedProgramUUId] = useState<any[]>([]);
  const [selectedSubjectUUID, setSelectedSubjectUUID] =  useState<any[]>([]);
  const [nextPageData, setNextPageData] = useState<any>({ page: 0, data: [] });
  const [selectedFormSubject, setSelectedFormSubject] = useState<any>([]);
  const [selectedFormProgram, setSelectedFormProgram] = useState<any>([]);
  const [showprogram, setShowProgram] = useState<any[]>([])
  const [showEncounter, setShowEncounter]  = useState<any[]>([]);
  const [showAllEncounter,setShowAllEncounter] =useState<any[]>([])
  const[selectedEncounterTypeUUID ,setSelectedEncounterTypeUUID] = useState<any>([])
  useEffect(() => {
    const userUUID = getUserUuidFromToken();
    setUserName(userUUID);
    const filterData = async () => {
      const processedData = await operationalModuleData();

      setMaxLevel(processedData.maxAddressLevel);

      setMinLevel(processedData.minAddressLevel);

      setMinLevelName(processedData.minLevelAddressName);

      setMaxtLevelLocation(processedData.maxLevelLocation);

      setLocation(processedData.sortedAddressLevel);

      setSubjectFilter(processedData.subjects);

      setProgramFilter(processedData.programs);

      setEncounterFilter(processedData.encounters);

      setFormsData(processedData.forms);
    };
    filterData();
  }, []);
  
  const getConceptData=async (formUUID: any, filteredConcept: any[] )=>{
    // const formData = await axios.get(
    //   `${process.env.NEXT_PUBLIC_FORMS}${formUUID}`
    // );
    const forms = {
        "uuid": "c53a160b-d245-44f6-8b47-f0c1f1dee80b",
        "voided": false,
        "decisionConcepts": [],
        "formType": "IndividualProfile",
        "formElementGroups": [
            {
                "uuid": "06b71c6b-48cd-489e-8ed5-9ebcfad29420",
                "voided": false,
                "rule": "'use strict';\n({params, imports}) => {\n    const individual = params.entity;\n    const moment = imports.moment;\n    const formElementGroup = params.formElementGroup;\n    const _ = imports.lodash;\n    let visibility = true;\n    return formElementGroup.formElements.map((formElement) => {\n        \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"85eda3f4-ee7c-4123-b330-77b4a7f817fd\").matches();\n  \n        visibility = condition11 ;\n  \n        return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, null);\n    });\n};",
                "applicableFormElements": [
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "1759ba71-3813-4efe-b925-832dde28d287",
                        "voided": false,
                        "concept": {
                            "uuid": "23641a68-fa4f-4f6d-96c1-52d351fc225a",
                            "voided": false,
                            "dataType": "Image",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Before implementation"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 1.0,
                        "validFormat": null,
                        "name": "Before implementation",
                        "type": "MultiSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "6002e9ec-daec-4121-bc97-db9eeaa04288",
                        "voided": false,
                        "concept": {
                            "uuid": "2eb0ad24-83bd-437e-bcde-fcbf2c4559b4",
                            "voided": false,
                            "dataType": "Image",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "After implementation"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 3.0,
                        "validFormat": null,
                        "name": "After implementation",
                        "type": "MultiSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "fca7ae7a-56e4-46e8-8e5d-0f6db8b2ecb6",
                        "voided": false,
                        "concept": {
                            "uuid": "cb456ef2-f20f-4927-ac4b-a3efdddd5680",
                            "voided": false,
                            "dataType": "Image",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "During Implementation"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 2.0,
                        "validFormat": null,
                        "name": "During Implementation",
                        "type": "MultiSelect"
                    }
                ],
                "displayOrder": 5.0,
                "name": "Photographs"
            },
            {
                "uuid": "849eab42-27b7-4b6b-8803-6de5ab53ac8f",
                "voided": true,
                "rule": null,
                "applicableFormElements": [
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "c16e77b5-2a2f-4fde-9fc9-b11fb5f060a0",
                        "voided": true,
                        "concept": {
                            "uuid": "1b4b80b0-33d9-4d95-8a66-b110346798d0",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "location"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"164971fe-2166-4b06-b215-926fba6362ef\").defined.matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 1.0,
                        "validFormat": null,
                        "name": "Location",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "780214ff-95e9-4f51-bb22-6f8eb086411d",
                        "voided": true,
                        "concept": {
                            "uuid": "164971fe-2166-4b06-b215-926fba6362ef",
                            "voided": false,
                            "dataType": "Location",
                            "keyValues": [
                                {
                                    "key": "isWithinCatchment",
                                    "value": true
                                },
                                {
                                    "key": "lowestAddressLevelTypeUUIDs",
                                    "value": [
                                        "47a9e070-090d-46f8-8f06-834c193b8bec"
                                    ]
                                },
                                {
                                    "key": "highestAddressLevelTypeUUID",
                                    "value": "fda77dde-6346-47b9-84e0-25e7f171f55a"
                                }
                            ],
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Location"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"17d911ad-18a5-4903-b43e-32d4674e86f0\").defined.matches();\n  \n  if(condition11 ){\n    value = individual.getObservationValue(\"17d911ad-18a5-4903-b43e-32d4674e86f0\");  \n}\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 2.0,
                        "validFormat": null,
                        "name": "Location",
                        "type": "SingleSelect"
                    }
                ],
                "displayOrder": 2.0,
                "name": "Location Details"
            },
            {
                "uuid": "06b82141-5ac6-4a27-b6e8-14db42ed5a74",
                "voided": true,
                "rule": null,
                "applicableFormElements": [
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "74f54a80-5b79-4ac6-b273-773ce1017a94",
                        "voided": true,
                        "concept": {
                            "uuid": "706ec20c-611e-4acd-a046-d6a45e161b19",
                            "voided": true,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 0.0,
                                    "uuid": "74d0f7db-87dd-4b9e-9e7f-0ee7948194ee",
                                    "answerConcept": {
                                        "uuid": "1449c205-e3df-4e57-8068-24a533688ffc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 1"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133540
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "6db066e6-efc2-48b9-85f5-70da9c9c9f81",
                                    "answerConcept": {
                                        "uuid": "fea4b9ca-e3bd-423e-98ed-ae41cecdf8d1",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 2"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133539
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "fcf12c2b-f331-4934-be2e-bea989907674",
                                    "answerConcept": {
                                        "uuid": "022f498b-d68d-43b5-95a2-07a388b8b746",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 3"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133541
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Blocks (voided~220547)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 2.0,
                        "validFormat": null,
                        "name": "Blocks",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "e2e4e459-0e5c-4aa7-b6be-f7b31a77da33",
                        "voided": true,
                        "concept": {
                            "uuid": "fdcb1ae2-505d-4784-993f-1de9d5e2ba60",
                            "voided": false,
                            "dataType": "Location",
                            "keyValues": [
                                {
                                    "key": "isWithinCatchment",
                                    "value": true
                                },
                                {
                                    "key": "lowestAddressLevelTypeUUIDs",
                                    "value": [
                                        "3410e7a2-cefe-4fc7-94b4-6631656c548c"
                                    ]
                                },
                                {
                                    "key": "highestAddressLevelTypeUUID",
                                    "value": "fda77dde-6346-47b9-84e0-25e7f171f55a"
                                }
                            ],
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "State"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 4.0,
                        "validFormat": null,
                        "name": "State",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "0a2a42bb-fb14-4f81-80fc-53092e45a06b",
                        "voided": true,
                        "concept": {
                            "uuid": "8c87be17-2564-41d2-a6a4-1239e06ef9d2",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 33.0,
                                    "uuid": "8cbaffc8-620d-466c-8c3b-0eca216ea79d",
                                    "answerConcept": {
                                        "uuid": "ba835221-04c0-4e55-a08f-e6e25bb6719c",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "None"
                                    },
                                    "abnormal": false,
                                    "unique": true,
                                    "voided": false,
                                    "id": 133817
                                },
                                {
                                    "order": 13.0,
                                    "uuid": "6ff78915-1fc7-4d4c-a5d2-d6f2231e0a1f",
                                    "answerConcept": {
                                        "uuid": "8585d735-9b9e-4801-adc8-c9c8c0b89518",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "lohar"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133789
                                },
                                {
                                    "order": 19.0,
                                    "uuid": "654419ce-e421-4a49-800a-8c21ffe10304",
                                    "answerConcept": {
                                        "uuid": "27818169-2925-4895-b4ea-6cc30cedc5b0",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Ragpickers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133813
                                },
                                {
                                    "order": 29.0,
                                    "uuid": "48bef6dd-6df8-40d4-bd31-1b486a891159",
                                    "answerConcept": {
                                        "uuid": "3fdad012-1109-4684-907c-0a268e6d1e9b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Tribal Community"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133797
                                },
                                {
                                    "order": 31.0,
                                    "uuid": "dcac6215-8659-430c-a2c3-47fa54641891",
                                    "answerConcept": {
                                        "uuid": "95867a1b-bb19-469e-b21c-313016f3725d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Weavers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133791
                                },
                                {
                                    "order": 27.0,
                                    "uuid": "456e8f0b-5ff2-45c5-b243-c7b066d0d9a5",
                                    "answerConcept": {
                                        "uuid": "e179e806-3487-433e-ba5f-9b341db3ed20",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Third Gender"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133815
                                },
                                {
                                    "order": 24.0,
                                    "uuid": "a8ddacd2-dc59-4e6e-a706-b9ea58fbaf04",
                                    "answerConcept": {
                                        "uuid": "c792d850-6ff6-46d6-b62b-1f7a91c3952f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Street Vendors"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133793
                                },
                                {
                                    "order": 32.0,
                                    "uuid": "17d780b6-618b-4216-be2b-ec93174f7ed7",
                                    "answerConcept": {
                                        "uuid": "e0c9a937-415b-4bcc-be63-e7a41fa3c0d6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Widows"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133811
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "5aef38dc-8464-4296-a85d-3829d9116066",
                                    "answerConcept": {
                                        "uuid": "1b6229ca-3360-4ba8-b858-1048f64f8d6b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Devdasi community"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133800
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "75000be7-276d-4845-a045-c4db40fa597c",
                                    "answerConcept": {
                                        "uuid": "8df338a9-de53-4c13-8dd5-b869c3d45f2d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "HIV affected"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133818
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "73ca8976-be6b-4039-b187-f0c50cd2f70f",
                                    "answerConcept": {
                                        "uuid": "81f059e7-7a88-4e9e-883e-a9bfb8ef468a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Differently Abled"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133810
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "875b6f1c-7747-4768-9250-4a1d712caff4",
                                    "answerConcept": {
                                        "uuid": "a87c0a89-9a65-43ab-8f94-daee22093c3b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Health workers and sweepers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133806
                                },
                                {
                                    "order": 20.0,
                                    "uuid": "f4a4842a-683a-4a8e-86f6-5f7d8771fa96",
                                    "answerConcept": {
                                        "uuid": "43803088-d89d-425e-991f-1343ddbd66c4",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Rickshaw Pullers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133799
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "d5162d8f-283e-4e82-967e-8867b4ce6802",
                                    "answerConcept": {
                                        "uuid": "a45cf0ac-7200-49a2-be31-a7317aaa46b6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Daily Wagers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133821
                                },
                                {
                                    "order": 21.0,
                                    "uuid": "5aa40cb2-3e62-44f4-a609-3733984efb39",
                                    "answerConcept": {
                                        "uuid": "508b8292-894a-4ed2-b090-96283dccaff0",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Rohingya community"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133812
                                },
                                {
                                    "order": 30.0,
                                    "uuid": "47ee58d0-df87-4900-90a3-ca71ca0623a9",
                                    "answerConcept": {
                                        "uuid": "cf177b27-87c3-4dc1-8255-68ffe549b9f4",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Unorganized sector"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133803
                                },
                                {
                                    "order": 25.0,
                                    "uuid": "7d604a09-ef2d-4446-9224-bf14c2042abc",
                                    "answerConcept": {
                                        "uuid": "a3e19465-bebb-427a-8df2-7d58e28c5091",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Tailor Cutting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133796
                                },
                                {
                                    "order": 15.0,
                                    "uuid": "83d5a199-11f6-4d42-b2b0-32521bf73a1b",
                                    "answerConcept": {
                                        "uuid": "0ee9a1f6-c598-47ae-9c84-64aae903cc9b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Migrant workers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133804
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "ce185519-a2ab-46f4-8ea2-ccad0ecc0d09",
                                    "answerConcept": {
                                        "uuid": "7cf699d9-0a47-4111-95ce-b0c5df581762",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Adolescents"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133805
                                },
                                {
                                    "order": 14.0,
                                    "uuid": "afe56e2b-c6dd-4074-b93d-c675de59b624",
                                    "answerConcept": {
                                        "uuid": "c40880c6-cac6-4fd8-b30c-395f532d0a9c",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Mentally Challenged"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133819
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "ff53dce2-6489-4c6d-8dd8-1b61ed9758d3",
                                    "answerConcept": {
                                        "uuid": "73d1cedb-66f4-425b-9da4-7b22e87df967",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Artisans"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133814
                                },
                                {
                                    "order": 23.0,
                                    "uuid": "5b084ad0-20a3-430d-b40d-192de74e96fc",
                                    "answerConcept": {
                                        "uuid": "c913f919-19bb-4789-948f-1ce239452da2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Sex Workers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133790
                                },
                                {
                                    "order": 26.0,
                                    "uuid": "d9be6e43-1139-470f-87e3-c26f557135ae",
                                    "answerConcept": {
                                        "uuid": "0640170e-b58f-4aac-a30c-01f5ad908a0a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Tea garden workers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133792
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "c1eaa773-f586-4d86-b689-b75d9854e89b",
                                    "answerConcept": {
                                        "uuid": "4af95ec9-9da1-4367-a2fa-2a8392822cc8",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Leprosy affected"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133801
                                },
                                {
                                    "order": 28.0,
                                    "uuid": "1c4e245b-7099-4450-8c80-f86c205eb31f",
                                    "answerConcept": {
                                        "uuid": "bb9b146f-d1df-49d9-82eb-dab38c2bc8c8",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Transgenders"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133809
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "34553c1a-aed0-4d49-8a54-70a9d3c3ecfe",
                                    "answerConcept": {
                                        "uuid": "0016afc5-47a2-46e0-867d-75ac3b0edfa0",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Embroidery workers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133807
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "92f2d181-5005-406f-9ab3-6569e029eb0c",
                                    "answerConcept": {
                                        "uuid": "84adcd3a-c177-418e-88ea-ca3a1cdb56f5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Agricultural Related"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133794
                                },
                                {
                                    "order": 16.0,
                                    "uuid": "e7e9bb51-1d48-4bea-ac53-66c08528697a",
                                    "answerConcept": {
                                        "uuid": "7720a9df-4c19-437d-8c47-0b55183af349",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Puppeteers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133802
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "94b92ce7-1abb-4e33-a614-1763430e5b5e",
                                    "answerConcept": {
                                        "uuid": "bc660964-f0c1-422a-a275-c308bbc86a9e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Construction workers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133808
                                },
                                {
                                    "order": 22.0,
                                    "uuid": "ea7a7f96-b195-4514-b831-dc6c27656892",
                                    "answerConcept": {
                                        "uuid": "b4f90cb7-1cd7-4f72-aba0-49f961fc27ea",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Senior Citizens"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133795
                                },
                                {
                                    "order": 9.0,
                                    "uuid": "2f3ca4a1-47da-4ccc-86b6-043149245b40",
                                    "answerConcept": {
                                        "uuid": "10d355b7-d81e-4937-8a5c-39e30c4e130b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Fisher community"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133798
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "b075072e-03c2-4ab0-8054-b3423f8aa268",
                                    "answerConcept": {
                                        "uuid": "d46b9822-d3c3-492d-a2a3-9ab623cfd802",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Children"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133816
                                },
                                {
                                    "order": 18.0,
                                    "uuid": "11a2843d-9b05-498a-9445-139bf1ae26d5",
                                    "answerConcept": {
                                        "uuid": "dc6278fa-b9f5-457d-b5a4-807189ac26e6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "PWD"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133820
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Target Community"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 12.0,
                        "validFormat": null,
                        "name": "Target Community",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "673f984c-3815-4e09-bdd2-5c1f97dbecc8",
                        "voided": true,
                        "concept": {
                            "uuid": "8def364d-94be-45b6-84e5-660ca43efd29",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Mohalla / Area"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 9.0,
                        "validFormat": null,
                        "name": "Mohalla / Area",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "a31c661b-747c-45a8-8f57-75fc488fd323",
                        "voided": true,
                        "concept": {
                            "uuid": "45008c2c-e3cf-45b7-96fc-0350b2927d42",
                            "voided": true,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 2.0,
                                    "uuid": "5cdb7519-e973-4533-8267-8890528e3e0d",
                                    "answerConcept": {
                                        "uuid": "022f498b-d68d-43b5-95a2-07a388b8b746",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 3"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133564
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "5072a8a2-5b3a-4ac4-abdf-57d3ed28b817",
                                    "answerConcept": {
                                        "uuid": "fea4b9ca-e3bd-423e-98ed-ae41cecdf8d1",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 2"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133566
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "c474d269-5934-4596-8ab7-ee0c1cb6c8c3",
                                    "answerConcept": {
                                        "uuid": "1449c205-e3df-4e57-8068-24a533688ffc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 1"
                                    },
                                    "abnormal": false,
                                    "unique": true,
                                    "voided": false,
                                    "id": 133565
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Districts (voided~207396)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 1.0,
                        "validFormat": null,
                        "name": "Districts",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "3aa37c6d-9c7a-4f0c-b988-213f663288e9",
                        "voided": true,
                        "concept": {
                            "uuid": "17d911ad-18a5-4903-b43e-32d4674e86f0",
                            "voided": true,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 0.0,
                                    "uuid": "0c590cee-1ae4-415b-8ba3-a908ff4bd60b",
                                    "answerConcept": {
                                        "uuid": "1449c205-e3df-4e57-8068-24a533688ffc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 1"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133333
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "7da25ca5-08b1-4d95-a333-fc971da56889",
                                    "answerConcept": {
                                        "uuid": "022f498b-d68d-43b5-95a2-07a388b8b746",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 3"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133334
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "77e69a15-b09a-4f34-9607-946f482d604a",
                                    "answerConcept": {
                                        "uuid": "fea4b9ca-e3bd-423e-98ed-ae41cecdf8d1",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Value 2"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133332
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Villages (voided~220507)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 3.0,
                        "validFormat": null,
                        "name": "Village",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "3b94a887-86b1-45e1-a467-e4931063327b",
                        "voided": true,
                        "concept": {
                            "uuid": "8def364d-94be-45b6-84e5-660ca43efd29",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Mohalla / Area"
                        },
                        "keyValues": [],
                        "rule": "",
                        "displayOrder": 7.0,
                        "validFormat": null,
                        "name": "Mohalla / Area",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "22d0b26a-e849-4775-a74b-5e825a6b6345",
                        "voided": true,
                        "concept": {
                            "uuid": "1f22b2fd-7279-4b6d-a92d-9a7415a8b14b",
                            "voided": true,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Village (voided~207375)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 5.0,
                        "validFormat": null,
                        "name": "Village",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "605055eb-d757-451f-9d18-d5020a7da409",
                        "voided": true,
                        "concept": {
                            "uuid": "d04d6382-91d2-468c-b45f-d3afce94cba2",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 4.0,
                                    "uuid": "bcc0fb3d-059c-4930-8d7e-8755ecb2322f",
                                    "answerConcept": {
                                        "uuid": "231a6748-7677-4eb1-8a37-15a0ab207d67",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW-Rahat"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133298
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "bd0623d8-1282-4cca-a4c7-f4cc0a528f0c",
                                    "answerConcept": {
                                        "uuid": "85eda3f4-ee7c-4123-b330-77b4a7f817fd",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133300
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "baffd6b0-a730-45d5-9233-c5c0004f095d",
                                    "answerConcept": {
                                        "uuid": "971c7a76-d296-4d47-9a90-47a612ceb4ca",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Vaapsi"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 142034
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "d9a40b20-1e7b-4ab8-b3e8-59f557cd20f3",
                                    "answerConcept": {
                                        "uuid": "6b5b0f34-c925-4ff8-bbf8-a72baf4e0f32",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only NJPC"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133302
                                },
                                {
                                    "order": 15.0,
                                    "uuid": "93617461-2d33-44b9-91cf-e5b68e6bf3f4",
                                    "answerConcept": {
                                        "uuid": "cbf0805f-aac1-40b9-b78c-1c568b86ef24",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Rahat"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 143788
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "eb78f687-9b3a-4a38-a3ab-7eb806a4b7c0",
                                    "answerConcept": {
                                        "uuid": "820b5991-7002-4be5-89db-f1a4e10d4cd6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW-NJPC"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133299
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "58cf1d78-376f-4310-9af4-80d4a2063e28",
                                    "answerConcept": {
                                        "uuid": "118ad0b3-0e16-46f2-902c-15722d6047c9",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only Rahat"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133306
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "ecdbb924-9810-4d9b-9934-cc91cf83518c",
                                    "answerConcept": {
                                        "uuid": "54d27687-374e-4988-ad81-e4d26bf02bf3",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Specific Initiative"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 142033
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "06499475-7adf-4299-a1b7-6e3597799f9f",
                                    "answerConcept": {
                                        "uuid": "abbd4c79-e71e-403d-b263-e49259180f5f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only S2S"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133301
                                },
                                {
                                    "order": 14.0,
                                    "uuid": "8812750e-3751-4d0d-963a-f4ea6d47d8dd",
                                    "answerConcept": {
                                        "uuid": "9fd9d626-faf7-4833-a3ab-47ec3b4388f6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "S2S"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133305
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "1af5a65e-856f-4a7e-8953-044378ea68c2",
                                    "answerConcept": {
                                        "uuid": "18aee17d-bc4e-4e84-b5bd-df28961acf77",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only CFW"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133304
                                },
                                {
                                    "order": 13.0,
                                    "uuid": "8716899a-ab00-4510-9f72-0d3d1d9533a1",
                                    "answerConcept": {
                                        "uuid": "6404fcaf-31de-4322-9620-c1b958f9c548",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "NJPC"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133307
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "eed2b174-caa4-474e-8c7d-cca9b79c8906",
                                    "answerConcept": {
                                        "uuid": "4db0c307-9053-4bd4-b917-580d00e43f1d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW-S2S"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133303
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Type of Initiative"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 10.0,
                        "validFormat": null,
                        "name": "Type of initiative",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "7846c295-d0f4-4bfd-8b76-82bd3a1fd113",
                        "voided": true,
                        "concept": {
                            "uuid": "164971fe-2166-4b06-b215-926fba6362ef",
                            "voided": false,
                            "dataType": "Location",
                            "keyValues": [
                                {
                                    "key": "isWithinCatchment",
                                    "value": true
                                },
                                {
                                    "key": "lowestAddressLevelTypeUUIDs",
                                    "value": [
                                        "47a9e070-090d-46f8-8f06-834c193b8bec"
                                    ]
                                },
                                {
                                    "key": "highestAddressLevelTypeUUID",
                                    "value": "fda77dde-6346-47b9-84e0-25e7f171f55a"
                                }
                            ],
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Location"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 8.0,
                        "validFormat": null,
                        "name": "Village",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "2495a713-31a3-4875-b455-7a9bd2f2b336",
                        "voided": true,
                        "concept": {
                            "uuid": "164971fe-2166-4b06-b215-926fba6362ef",
                            "voided": false,
                            "dataType": "Location",
                            "keyValues": [
                                {
                                    "key": "isWithinCatchment",
                                    "value": true
                                },
                                {
                                    "key": "lowestAddressLevelTypeUUIDs",
                                    "value": [
                                        "47a9e070-090d-46f8-8f06-834c193b8bec"
                                    ]
                                },
                                {
                                    "key": "highestAddressLevelTypeUUID",
                                    "value": "fda77dde-6346-47b9-84e0-25e7f171f55a"
                                }
                            ],
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Location"
                        },
                        "keyValues": [],
                        "rule": "",
                        "displayOrder": 6.0,
                        "validFormat": null,
                        "name": "Village",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "64338f34-a179-4be7-9c06-3fd9093beef7",
                        "voided": true,
                        "concept": {
                            "uuid": "bba1a9f8-398f-4ae7-b19d-c75821afbb65",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Related Distribution"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 11.0,
                        "validFormat": null,
                        "name": "Related Distribution",
                        "type": "SingleSelect"
                    }
                ],
                "displayOrder": 1.0,
                "name": "Address"
            },
            {
                "uuid": "ed16c160-7741-445e-bc51-7cb74d0b981f",
                "voided": false,
                "rule": null,
                "applicableFormElements": [
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "3dba9e43-d271-41fe-ac43-498680140df5",
                        "voided": false,
                        "concept": {
                            "uuid": "ed133199-dbae-4ba7-8c5c-2f23f119edf5",
                            "voided": false,
                            "dataType": "Image",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Photograph"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptNameOtherThan(\"85eda3f4-ee7c-4123-b330-77b4a7f817fd\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 30.0,
                        "validFormat": null,
                        "name": "Photograph",
                        "type": "MultiSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": true,
                            "group": null,
                            "uuid": "5d8aa3b7-ef6c-488b-bb1a-19572054868d",
                            "voided": true,
                            "concept": {
                                "uuid": "6e6fe7fc-0cf0-4b68-93a6-7b95e12fd08c",
                                "voided": true,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Objective of work (voided~207476)"
                            },
                            "keyValues": [],
                            "rule": null,
                            "displayOrder": 42.0,
                            "validFormat": null,
                            "name": "Objective of work",
                            "type": "SingleSelect"
                        },
                        "uuid": "ff3d292d-53b1-4fcd-9a15-fb89a6b1f188",
                        "voided": true,
                        "concept": {
                            "uuid": "0730dcd3-d272-481f-8a5d-09de5fae1005",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 1.0,
                                    "uuid": "2cfbeaec-f2b1-4267-8312-5ea6e59fdba4",
                                    "answerConcept": {
                                        "uuid": "835cab14-f41e-43d4-a77f-db59b715317f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Difficulty in reaching to water source"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133892
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "7c88d7be-372f-4de4-8c54-9f71776e2d7d",
                                    "answerConcept": {
                                        "uuid": "cfd4cfd5-3f06-40fc-bc85-05cbfefaaf4e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Shortage of water in the village"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133894
                                },
                                {
                                    "order": 14.0,
                                    "uuid": "0992bdda-6196-463f-98d6-117d6759e052",
                                    "answerConcept": {
                                        "uuid": "f9a72c48-3238-441d-a1de-2d8cd938dc22",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Any other not given above"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133880
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "f19fe362-b64b-45f5-8993-fe66205f4575",
                                    "answerConcept": {
                                        "uuid": "b748ae00-0844-473d-b427-6031936809fa",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was a need for water tables to increase"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133885
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "5c15cf29-a68b-4fd2-96c1-51b8151a062f",
                                    "answerConcept": {
                                        "uuid": "5381428f-cc8e-4a20-9e3c-994794de27f5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "It was difficult to get clean and adequate water to fulfil household responsibilities"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133888
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "22c2ebbe-4bf2-476b-a300-d3c6ddab6e2f",
                                    "answerConcept": {
                                        "uuid": "50bd6eb9-cce1-4eff-b4c2-e7177256e83f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Difficulty to get water for livestock related needs"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133886
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "d295c1c1-7d88-44e2-843d-e1efa0adf142",
                                    "answerConcept": {
                                        "uuid": "9b08e1dd-d469-4f2e-a2b7-045c5256ca6a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was getting wasted"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133887
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "88fc2ef6-7056-4f04-85b7-3b471b8eec24",
                                    "answerConcept": {
                                        "uuid": "c3bed0f8-f8fd-4403-ba66-837547d38623",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water needed to be conserved"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133889
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "058c6770-e77d-4c78-b30d-0be6d905948d",
                                    "answerConcept": {
                                        "uuid": "a4818198-5117-4d32-8ed0-aa7e1eaa6e80",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was dirty for use for livestock related needs"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133890
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "71ebc262-e5b3-49ba-bfd6-5e6b78e98594",
                                    "answerConcept": {
                                        "uuid": "0c1c43ae-9509-4f61-bc20-99ffb21fb3cc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Villagers especially women and children were spending too much time in collecting waters"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133893
                                },
                                {
                                    "order": 9.0,
                                    "uuid": "0a8df192-0016-43f4-859a-6ac658640e39",
                                    "answerConcept": {
                                        "uuid": "829f7f00-fcca-46fe-b0b5-ef39f2548141",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Villagers including children were getting sick"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133884
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "f7145e93-9107-4fcc-b9e1-ec9089583e48",
                                    "answerConcept": {
                                        "uuid": "4cf67429-031f-41ae-a8e1-5e1a3dd696d5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was too dirty to drink"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133883
                                },
                                {
                                    "order": 13.0,
                                    "uuid": "faecb311-f348-4578-a764-96a663f6334f",
                                    "answerConcept": {
                                        "uuid": "14816271-baf3-4c13-865f-dcef92ab0c03",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water used to collect and the place would get  flooded/swamped"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133891
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "edd3f811-917b-4cbf-91d2-3995de5baff6",
                                    "answerConcept": {
                                        "uuid": "0605d833-b691-4a85-88a6-8dcba0405dbc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Shortage of water for irrigation purposes"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133881
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "be4f415e-a301-42d6-8bc3-e6de5a29e7cb",
                                    "answerConcept": {
                                        "uuid": "5ed8e7d5-ff25-4b5f-a46b-2e2bb4f2756c",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was dirty to use for household related needs"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133882
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Water management"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 46.0,
                        "validFormat": null,
                        "name": "Water management",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": false,
                            "group": null,
                            "uuid": "f3539ada-8120-4b24-a9fc-187a93b6a976",
                            "voided": false,
                            "concept": {
                                "uuid": "1157c7c8-9f27-410d-9115-ef36191fba06",
                                "voided": false,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Number of participants"
                            },
                            "keyValues": [],
                            "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptNameOtherThan(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                            "displayOrder": 19.0,
                            "validFormat": null,
                            "name": "Number of participants",
                            "type": "SingleSelect"
                        },
                        "uuid": "dd14da84-5a91-42bf-9f21-002404dfdccb",
                        "voided": false,
                        "concept": {
                            "uuid": "a043fea3-1658-4b5e-becd-ee55ab305a03",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of Participants (Other)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 23.0,
                        "validFormat": null,
                        "name": "Number of Participants (Other)",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "fc2b2846-d06a-4b7f-a557-0ff42f1c35f8",
                        "voided": true,
                        "concept": {
                            "uuid": "b116f78d-1c06-4014-a511-72378136204f",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 9.0,
                                    "uuid": "18987103-bc01-4490-991b-4043ab26a5f2",
                                    "answerConcept": {
                                        "uuid": "82246b7a-c13f-435d-9e17-d8d288ff3891",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water-Tank/Pipeline"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133437
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "85dd0f44-323e-4523-aa17-8c9c963ab9ce",
                                    "answerConcept": {
                                        "uuid": "00ee1a95-2236-4c43-83d7-36c911172069",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "River"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133438
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "20566d54-e9a6-49a3-bcfc-e5a6a21bde9f",
                                    "answerConcept": {
                                        "uuid": "1a4d980d-30ef-46e4-8b76-44da9002be6b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Backwater"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133434
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "bb8b7f2f-e50f-48d6-b8c9-71f4766a8e1c",
                                    "answerConcept": {
                                        "uuid": "be655900-d882-4d99-ab29-faf560b8e832",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Soak pit"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133433
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "be4067cc-07da-4406-aef9-37920925d583",
                                    "answerConcept": {
                                        "uuid": "824d11d4-525d-4610-9afe-f87c030a54eb",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Check dam"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133441
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "65250f4f-204c-415f-a3dd-f4709a82b124",
                                    "answerConcept": {
                                        "uuid": "a44830b7-3271-4313-baea-b6dc4e9cd5ae",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Canal"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133435
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "e904bf70-96c5-471c-bc3f-9f2c91fd8505",
                                    "answerConcept": {
                                        "uuid": "64fe012a-3230-4115-8092-f16bf6286200",
                                        "voided": true,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "BackwaterDugwell/Chua/Jalkund (voided~207440)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133436
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "02cce120-0a99-4f79-99ad-5287abbb60f9",
                                    "answerConcept": {
                                        "uuid": "a5f019c6-17a0-4536-8222-67935d482774",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Waterfall/Jharna/Spring Water/Dhara"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133439
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "d7d643ea-31aa-456d-a3e4-59669e728f6e",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133445
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "832c5dca-4a1c-4faf-9582-28e28b3ec668",
                                    "answerConcept": {
                                        "uuid": "b1dfb9e0-0bbc-448f-a6ce-aae2488b390e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Pond"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133440
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "fcf6b53c-c0fe-47a2-b53b-644a89c3daaf",
                                    "answerConcept": {
                                        "uuid": "8cb3d890-db22-4c8b-885d-0cd71a0e4aad",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Dugwell/Chua/Jalkhund"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133444
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "60a74f48-2bf3-4028-a33a-23987d30982c",
                                    "answerConcept": {
                                        "uuid": "0dfe3de6-6bb0-4514-9c8a-3fde7752c440",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Chapri/Dabri/Chari/Naula/Jhiriya/Kulam"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133442
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "bb1502e5-dd77-4739-8533-bd14b0467b3e",
                                    "answerConcept": {
                                        "uuid": "a7b922a1-a389-4ba1-94ca-59baf7a961d0",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Well"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133443
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Sub-type for Water management"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"1b061e73-b94f-499d-b82c-234670e104c5\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 37.0,
                        "validFormat": null,
                        "name": "Activity Sub-type for Water management",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "6d53c6c1-7a3e-4d80-8fbd-697f00c712b4",
                        "voided": false,
                        "concept": {
                            "uuid": "0ea2a76f-933e-448e-896a-46a4238a3488",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 52.0,
                                    "uuid": "3ecfc600-8e69-4e54-9f61-3c95ea22eced",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133610
                                },
                                {
                                    "order": 39.0,
                                    "uuid": "8e43c1b0-ffc2-4992-9bd4-1af6672fc327",
                                    "answerConcept": {
                                        "uuid": "cf36fe36-d7fe-4f2f-be9b-54f02480ed79",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To protect school facilities and ensure safety for children"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133654
                                },
                                {
                                    "order": 20.0,
                                    "uuid": "d0a1302a-d4b8-46ab-a0ef-f1bd010a0533",
                                    "answerConcept": {
                                        "uuid": "abb094e0-64f5-4058-9d56-0f270cb4add2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to nearby market facilities"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133628
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "1f104f58-f5d4-4a7c-a2c1-5d49e10ae2ca",
                                    "answerConcept": {
                                        "uuid": "0605d833-b691-4a85-88a6-8dcba0405dbc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Shortage of water for irrigation purposes"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133619
                                },
                                {
                                    "order": 19.0,
                                    "uuid": "9e033523-bd2e-410c-8933-5b0458dac7dd",
                                    "answerConcept": {
                                        "uuid": "6980e13a-5071-4b87-88b9-54f8d6bcce36",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/ or no connectivity to the nearby villages"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133613
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "4e86b223-99dd-4207-b77e-9ad03995fd80",
                                    "answerConcept": {
                                        "uuid": "75813429-7612-49f9-b159-e746c38be9da",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The crops needed organic manure hence composting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133632
                                },
                                {
                                    "order": 50.0,
                                    "uuid": "a338cc87-96a0-401c-84e3-0bb2f71359d0",
                                    "answerConcept": {
                                        "uuid": "4cf67429-031f-41ae-a8e1-5e1a3dd696d5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was too dirty to drink"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133644
                                },
                                {
                                    "order": 28.0,
                                    "uuid": "ae64c34b-073e-4e87-9de1-38c093205d9d",
                                    "answerConcept": {
                                        "uuid": "67977dec-8209-4483-8b77-030797cbd53e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was stench all over the place"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133647
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "6320b71b-90fe-4a8e-bfe4-5a92e1a63187",
                                    "answerConcept": {
                                        "uuid": "4fed6486-9c2e-4cbc-a6bb-92ad7c669955",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Children were unable to play"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133605
                                },
                                {
                                    "order": 31.0,
                                    "uuid": "688a2798-b21c-4247-ae0b-ab5c33a3a459",
                                    "answerConcept": {
                                        "uuid": "6e387d83-5663-458a-b69a-4eb2252e0594",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To construct partitions to demarcate areas"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133636
                                },
                                {
                                    "order": 26.0,
                                    "uuid": "eee636f1-75b8-444d-aecd-4751f80908bb",
                                    "answerConcept": {
                                        "uuid": "448ebcb5-6974-43b7-8d9b-67002770e1b5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was shortage of vegetables in the village/to improve availability of vegetables in the village, hence kitchen garden"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133645
                                },
                                {
                                    "order": 36.0,
                                    "uuid": "20f0f841-61a9-49f6-8071-99ec23ab1edf",
                                    "answerConcept": {
                                        "uuid": "f674eee6-c577-4807-a5c2-b7bfa6d1c516",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To improve water retention capacity"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133651
                                },
                                {
                                    "order": 46.0,
                                    "uuid": "fbf6b71d-89fe-4b1e-ba00-9ce55dd8a818",
                                    "answerConcept": {
                                        "uuid": "14816271-baf3-4c13-865f-dcef92ab0c03",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water used to collect and the place would get  flooded/swamped"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133618
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "09129182-fe33-49ea-b9da-c7e6978509f7",
                                    "answerConcept": {
                                        "uuid": "e550818a-037c-4cad-8565-5a9d6ed4b76e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The garbage used to be dumped everywhere"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133606
                                },
                                {
                                    "order": 22.0,
                                    "uuid": "9b71b430-7181-4362-97c8-6350af7e5bc2",
                                    "answerConcept": {
                                        "uuid": "c1b668ce-5d81-4e25-80f2-10a0fc98d313",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to water facilities/sources"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133648
                                },
                                {
                                    "order": 51.0,
                                    "uuid": "7b6b62a7-5056-41a8-a690-0512b541df56",
                                    "answerConcept": {
                                        "uuid": "f9a72c48-3238-441d-a1de-2d8cd938dc22",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Any other not given above"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133640
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "66ca051d-e172-467a-ae5c-860ccc6e0d28",
                                    "answerConcept": {
                                        "uuid": "e66b7d80-a9ce-42eb-8ed4-96f1c5c2198e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "In order to increase life and longevity of trees"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133625
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "1f2a5268-8ecb-4cee-8060-28328cdb20d2",
                                    "answerConcept": {
                                        "uuid": "50bd6eb9-cce1-4eff-b4c2-e7177256e83f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Difficulty to get water for livestock related needs"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133602
                                },
                                {
                                    "order": 18.0,
                                    "uuid": "e788ab28-8336-45a4-babe-1ac38def8018",
                                    "answerConcept": {
                                        "uuid": "38ca7b94-0432-4e3a-bea8-1d33f9b2abad",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was fear of getting bitten by snakes and worms while commuting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133629
                                },
                                {
                                    "order": 35.0,
                                    "uuid": "817f1eac-3e6e-4a54-823a-eb448dda0684",
                                    "answerConcept": {
                                        "uuid": "508c3b0b-9ba2-44a5-b8e4-9c82713368a4",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To improve grazing facilities for livestock"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133631
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "a1a403d9-b5c5-4045-a2cf-5b92296bfa1d",
                                    "answerConcept": {
                                        "uuid": "32d75b8f-e0c0-424b-85ae-a1d2829ee86a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The children did not have a proper place to study"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133609
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "4278ceba-cbfe-41de-857e-c524b38215e5",
                                    "answerConcept": {
                                        "uuid": "f667c9e4-4300-4d4d-a726-009046566fa1",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The place was very dirty"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133653
                                },
                                {
                                    "order": 43.0,
                                    "uuid": "be81d008-d4c9-4d03-ad0a-72044afdfa4c",
                                    "answerConcept": {
                                        "uuid": "18803ff7-484e-4187-a2ae-64e4f47890aa",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Villagers were getting sick repeatedly"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133617
                                },
                                {
                                    "order": 47.0,
                                    "uuid": "66b4e51e-95c2-4ca2-adfc-c6f4a571e020",
                                    "answerConcept": {
                                        "uuid": "a4818198-5117-4d32-8ed0-aa7e1eaa6e80",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was dirty for use for livestock related needs"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133649
                                },
                                {
                                    "order": 13.0,
                                    "uuid": "49713f8a-e30f-4ffc-8f30-8f18fd133abd",
                                    "answerConcept": {
                                        "uuid": "28aeea13-e4e5-4ba9-9ec8-0f1863d0d190",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The walls/boundaries of the school were damaged affecting studies"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133622
                                },
                                {
                                    "order": 16.0,
                                    "uuid": "f21150e3-4b45-4383-af98-b8f7476c522b",
                                    "answerConcept": {
                                        "uuid": "b748ae00-0844-473d-b427-6031936809fa",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was a need for water tables to increase"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133626
                                },
                                {
                                    "order": 9.0,
                                    "uuid": "18c1f0f3-e698-4f14-8410-6918d05535c1",
                                    "answerConcept": {
                                        "uuid": "951ec09c-d99b-4830-9ea5-e5f9b4ddead9",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The drains were clogged"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133637
                                },
                                {
                                    "order": 27.0,
                                    "uuid": "71f0dd8e-d3f5-4f3b-8010-25ce3ebe9087",
                                    "answerConcept": {
                                        "uuid": "07557c41-b1e1-47fd-8a16-d3dc5363a16e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was soil erosion due to heavy water flow hence need for plantation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133641
                                },
                                {
                                    "order": 40.0,
                                    "uuid": "384b8b8f-f27d-4ccc-acc3-e72fa885a364",
                                    "answerConcept": {
                                        "uuid": "3ce67f78-49b8-4663-bb9d-00293e4e67a3",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To repair/rebuilt damaged community infrastructure"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133607
                                },
                                {
                                    "order": 23.0,
                                    "uuid": "62dec699-924d-4c87-a4fb-8e9b3476a54c",
                                    "answerConcept": {
                                        "uuid": "865be3b0-6b05-475b-b624-43aca7568538",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to nearly medical facilities"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133624
                                },
                                {
                                    "order": 15.0,
                                    "uuid": "f1afc22e-fd98-40a6-9129-f9a413c1d251",
                                    "answerConcept": {
                                        "uuid": "2db06055-67eb-4966-8591-c414aa00c774",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There is fear of being attacked by animals in heavily bushed roads"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133603
                                },
                                {
                                    "order": 17.0,
                                    "uuid": "7b7ca23b-62f9-4013-8f37-50499b38f6f0",
                                    "answerConcept": {
                                        "uuid": "7759083b-3bdd-4fac-b198-04ea94955631",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was fear of diseases like cholera and typhoid happening"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133630
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "91a10014-d824-4a5e-b51b-1ec1fa61d8a4",
                                    "answerConcept": {
                                        "uuid": "3035de80-1603-4ea9-947b-82d093e2bba2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The road could not be used for commuting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133634
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "1df677c9-0639-4a33-a5c6-d6aa2c72b5dd",
                                    "answerConcept": {
                                        "uuid": "835cab14-f41e-43d4-a77f-db59b715317f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Difficulty in reaching to water source"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133608
                                },
                                {
                                    "order": 25.0,
                                    "uuid": "91b8396b-fe2d-47a5-979c-13569ba673c5",
                                    "answerConcept": {
                                        "uuid": "20a4f33f-caa5-44ef-97dd-c39d50aade45",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was no meeting place for villagers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133611
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "a164727b-6499-423c-83c6-5806d08dfad1",
                                    "answerConcept": {
                                        "uuid": "cfd4cfd5-3f06-40fc-bc85-05cbfefaaf4e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Shortage of water in the village"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133614
                                },
                                {
                                    "order": 34.0,
                                    "uuid": "fe9b2b9b-8c4a-4f11-aade-d7664d472434",
                                    "answerConcept": {
                                        "uuid": "14c72422-9cfc-49f4-a835-7ab131dd3190",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To improve agricultural productivity"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133650
                                },
                                {
                                    "order": 41.0,
                                    "uuid": "ea78cab5-ed6f-44da-bb8f-e18c1ba5eb02",
                                    "answerConcept": {
                                        "uuid": "0c1c43ae-9509-4f61-bc20-99ffb21fb3cc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Villagers especially women and children were spending too much time in collecting waters"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133652
                                },
                                {
                                    "order": 37.0,
                                    "uuid": "8518abc2-92bb-4ed3-8cf5-b86a3f2d59e0",
                                    "answerConcept": {
                                        "uuid": "e369cc1c-1ce2-4b84-b4bd-e827eccdfcb5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To increase incomes in the village from sales of vegetables"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133638
                                },
                                {
                                    "order": 45.0,
                                    "uuid": "35ad1c43-981c-4266-a590-40f1562d6415",
                                    "answerConcept": {
                                        "uuid": "a2a28a0e-6458-4d8e-8fa7-4e9179c29e2d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water needed to be conserved, hence planted trees"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133621
                                },
                                {
                                    "order": 21.0,
                                    "uuid": "ea1350fe-8b9c-415c-b768-e1c0bddad7ff",
                                    "answerConcept": {
                                        "uuid": "adecc97c-6583-4439-9c8d-06b552b10e1d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to nearly educational facilities/schools"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133604
                                },
                                {
                                    "order": 32.0,
                                    "uuid": "fdaddcbd-28a1-4fb0-920d-788970dc6323",
                                    "answerConcept": {
                                        "uuid": "9359f1ad-5024-4464-8cea-39579c1468ec",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To decrease the impact of deforestation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133627
                                },
                                {
                                    "order": 29.0,
                                    "uuid": "4f5d3022-cd0c-4d48-a74c-c1396e65126f",
                                    "answerConcept": {
                                        "uuid": "486aceb0-4960-485a-a8e4-9bdad2f65c58",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There were mosquitoes breeding"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133642
                                },
                                {
                                    "order": 48.0,
                                    "uuid": "1322fd5c-2854-4fa2-a6f5-1bf8c0703d56",
                                    "answerConcept": {
                                        "uuid": "5ed8e7d5-ff25-4b5f-a46b-2e2bb4f2756c",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was dirty to use for household related needs"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133620
                                },
                                {
                                    "order": 14.0,
                                    "uuid": "a941d879-8048-4d68-8d18-67459dd96e9b",
                                    "answerConcept": {
                                        "uuid": "b145f169-e306-4d4c-a820-88b51a63b2a6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The women did not have bathrooms to change or bathe in privacy"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133635
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "c1c7c01d-494a-4a0e-9c04-93cc5f9edfb8",
                                    "answerConcept": {
                                        "uuid": "5381428f-cc8e-4a20-9e3c-994794de27f5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "It was difficult to get clean and adequate water to fulfil household responsibilities"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133633
                                },
                                {
                                    "order": 38.0,
                                    "uuid": "99cb2c3c-9c8e-46cd-9064-6781eebbd71f",
                                    "answerConcept": {
                                        "uuid": "027da0d9-9fab-4d60-aea7-f232c386a7b7",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To protect community infrastructure from getting damaged"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133623
                                },
                                {
                                    "order": 33.0,
                                    "uuid": "0288a78c-6d48-42c9-9fe6-c8bfae65422f",
                                    "answerConcept": {
                                        "uuid": "18121e37-b6e6-4301-a61b-4ccad01d1aad",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To ensure better nutrition to pregnant and lactating mother, hence kitchen garden"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133646
                                },
                                {
                                    "order": 24.0,
                                    "uuid": "3d89f468-d84e-43a4-8838-922f721206b4",
                                    "answerConcept": {
                                        "uuid": "834993e6-5643-4229-914d-a58df97cef30",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was no connectivity to the market"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133616
                                },
                                {
                                    "order": 44.0,
                                    "uuid": "eaa41821-afff-4113-b992-816784aef969",
                                    "answerConcept": {
                                        "uuid": "c3bed0f8-f8fd-4403-ba66-837547d38623",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water needed to be conserved"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133612
                                },
                                {
                                    "order": 49.0,
                                    "uuid": "faa560a6-bd47-4a9a-802d-e11074d907b9",
                                    "answerConcept": {
                                        "uuid": "9b08e1dd-d469-4f2e-a2b7-045c5256ca6a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water was getting wasted"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133639
                                },
                                {
                                    "order": 42.0,
                                    "uuid": "4d4a1e7c-16c6-4c30-95ef-cb9084527b4b",
                                    "answerConcept": {
                                        "uuid": "829f7f00-fcca-46fe-b0b5-ef39f2548141",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Villagers including children were getting sick"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133615
                                },
                                {
                                    "order": 30.0,
                                    "uuid": "4f0f8795-dc21-4528-bec5-9c25a66ec1a9",
                                    "answerConcept": {
                                        "uuid": "5ffcc7bd-a725-43dc-a7bf-e6bee3b4d478",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To augment supply of vegetables in the mid-day meals of children, hence kitchen garden in aaganwadi/school"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133643
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Objective of Work"
                        },
                        "keyValues": [
                            {
                                "key": "ExcludedAnswers",
                                "value": [
                                    "Others"
                                ]
                            }
                        ],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnyAnswerConceptName(\"85eda3f4-ee7c-4123-b330-77b4a7f817fd\").matches();\n  \n  const condition21 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnyAnswerConceptName(\"452bc10f-09b4-446e-93f4-52d477885be0\",\"fe6cd113-e3e3-44b6-abe7-81ba7605787b\",\"1b061e73-b94f-499d-b82c-234670e104c5\",\"d0162f3e-d9a5-40e0-84e4-7130e8e732ee\",\"f73d13a5-f6cf-4138-b4c6-849efbbe632f\").matches();\n    \n  const condition12 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"1b061e73-b94f-499d-b82c-234670e104c5\").matches();\n    \n  const condition13 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"452bc10f-09b4-446e-93f4-52d477885be0\").matches();\n    \n  const condition14 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"fe6cd113-e3e3-44b6-abe7-81ba7605787b\").matches();\n    \n  const condition15 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"d0162f3e-d9a5-40e0-84e4-7130e8e732ee\").matches();\n    \n  const condition16 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"f73d13a5-f6cf-4138-b4c6-849efbbe632f\").matches();\n  \n  visibility = condition11 && condition21 ;\n    if(condition12 ) {\n    _.forEach([\"f667c9e4-4300-4d4d-a726-009046566fa1\",\"486aceb0-4960-485a-a8e4-9bdad2f65c58\",\"951ec09c-d99b-4830-9ea5-e5f9b4ddead9\",\"3035de80-1603-4ea9-947b-82d093e2bba2\",\"e550818a-037c-4cad-8565-5a9d6ed4b76e\",\"67977dec-8209-4483-8b77-030797cbd53e\",\"4fed6486-9c2e-4cbc-a6bb-92ad7c669955\",\"18803ff7-484e-4187-a2ae-64e4f47890aa\",\"38ca7b94-0432-4e3a-bea8-1d33f9b2abad\",\"7759083b-3bdd-4fac-b198-04ea94955631\",\"2db06055-67eb-4966-8591-c414aa00c774\",\"b145f169-e306-4d4c-a820-88b51a63b2a6\",\"07557c41-b1e1-47fd-8a16-d3dc5363a16e\",\"75813429-7612-49f9-b159-e746c38be9da\",\"448ebcb5-6974-43b7-8d9b-67002770e1b5\",\"5ffcc7bd-a725-43dc-a7bf-e6bee3b4d478\",\"18121e37-b6e6-4301-a61b-4ccad01d1aad\",\"e369cc1c-1ce2-4b84-b4bd-e827eccdfcb5\",\"f674eee6-c577-4807-a5c2-b7bfa6d1c516\",\"14c72422-9cfc-49f4-a835-7ab131dd3190\",\"508c3b0b-9ba2-44a5-b8e4-9c82713368a4\",\"9359f1ad-5024-4464-8cea-39579c1468ec\",\"6e387d83-5663-458a-b69a-4eb2252e0594\",\"20a4f33f-caa5-44ef-97dd-c39d50aade45\",\"6980e13a-5071-4b87-88b9-54f8d6bcce36\",\"865be3b0-6b05-475b-b624-43aca7568538\",\"adecc97c-6583-4439-9c8d-06b552b10e1d\",\"abb094e0-64f5-4058-9d56-0f270cb4add2\",\"c1b668ce-5d81-4e25-80f2-10a0fc98d313\",\"32d75b8f-e0c0-424b-85ae-a1d2829ee86a\",\"28aeea13-e4e5-4ba9-9ec8-0f1863d0d190\",\"e66b7d80-a9ce-42eb-8ed4-96f1c5c2198e\",\"cf36fe36-d7fe-4f2f-be9b-54f02480ed79\",\"027da0d9-9fab-4d60-aea7-f232c386a7b7\",\"3ce67f78-49b8-4663-bb9d-00293e4e67a3\",\"834993e6-5643-4229-914d-a58df97cef30\",\"a2a28a0e-6458-4d8e-8fa7-4e9179c29e2d\",\"865be3b0-6b05-475b-b624-43aca7568538\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition13 ) {\n    _.forEach([\"9b08e1dd-d469-4f2e-a2b7-045c5256ca6a\",\"c3bed0f8-f8fd-4403-ba66-837547d38623\",\"b748ae00-0844-473d-b427-6031936809fa\",\"829f7f00-fcca-46fe-b0b5-ef39f2548141\",\"0c1c43ae-9509-4f61-bc20-99ffb21fb3cc\",\"5381428f-cc8e-4a20-9e3c-994794de27f5\",\"50bd6eb9-cce1-4eff-b4c2-e7177256e83f\",\"0605d833-b691-4a85-88a6-8dcba0405dbc\",\"14816271-baf3-4c13-865f-dcef92ab0c03\",\"f667c9e4-4300-4d4d-a726-009046566fa1\",\"486aceb0-4960-485a-a8e4-9bdad2f65c58\",\"951ec09c-d99b-4830-9ea5-e5f9b4ddead9\",\"3035de80-1603-4ea9-947b-82d093e2bba2\",\"e550818a-037c-4cad-8565-5a9d6ed4b76e\",\"67977dec-8209-4483-8b77-030797cbd53e\",\"4fed6486-9c2e-4cbc-a6bb-92ad7c669955\",\"18803ff7-484e-4187-a2ae-64e4f47890aa\",\"38ca7b94-0432-4e3a-bea8-1d33f9b2abad\",\"7759083b-3bdd-4fac-b198-04ea94955631\",\"2db06055-67eb-4966-8591-c414aa00c774\",\"b145f169-e306-4d4c-a820-88b51a63b2a6\",\"c3bed0f8-f8fd-4403-ba66-837547d38623\",\"cfd4cfd5-3f06-40fc-bc85-05cbfefaaf4e\",\"835cab14-f41e-43d4-a77f-db59b715317f\",\"4cf67429-031f-41ae-a8e1-5e1a3dd696d5\",\"a4818198-5117-4d32-8ed0-aa7e1eaa6e80\",\"5ed8e7d5-ff25-4b5f-a46b-2e2bb4f2756c\",\"07557c41-b1e1-47fd-8a16-d3dc5363a16e\",\"75813429-7612-49f9-b159-e746c38be9da\",\"448ebcb5-6974-43b7-8d9b-67002770e1b5\",\"5ffcc7bd-a725-43dc-a7bf-e6bee3b4d478\",\"18121e37-b6e6-4301-a61b-4ccad01d1aad\",\"e369cc1c-1ce2-4b84-b4bd-e827eccdfcb5\",\"14c72422-9cfc-49f4-a835-7ab131dd3190\",\"508c3b0b-9ba2-44a5-b8e4-9c82713368a4\",\"f674eee6-c577-4807-a5c2-b7bfa6d1c516\",\"9359f1ad-5024-4464-8cea-39579c1468ec\",\"6e387d83-5663-458a-b69a-4eb2252e0594\",\"a2a28a0e-6458-4d8e-8fa7-4e9179c29e2d\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition14 ) {\n    _.forEach([\"cfd4cfd5-3f06-40fc-bc85-05cbfefaaf4e\",\"835cab14-f41e-43d4-a77f-db59b715317f\",\"4cf67429-031f-41ae-a8e1-5e1a3dd696d5\",\"a4818198-5117-4d32-8ed0-aa7e1eaa6e80\",\"5ed8e7d5-ff25-4b5f-a46b-2e2bb4f2756c\",\"9b08e1dd-d469-4f2e-a2b7-045c5256ca6a\",\"c3bed0f8-f8fd-4403-ba66-837547d38623\",\"b748ae00-0844-473d-b427-6031936809fa\",\"829f7f00-fcca-46fe-b0b5-ef39f2548141\",\"0c1c43ae-9509-4f61-bc20-99ffb21fb3cc\",\"5381428f-cc8e-4a20-9e3c-994794de27f5\",\"50bd6eb9-cce1-4eff-b4c2-e7177256e83f\",\"0605d833-b691-4a85-88a6-8dcba0405dbc\",\"14816271-baf3-4c13-865f-dcef92ab0c03\",\"c3bed0f8-f8fd-4403-ba66-837547d38623\",\"448ebcb5-6974-43b7-8d9b-67002770e1b5\",\"07557c41-b1e1-47fd-8a16-d3dc5363a16e\",\"75813429-7612-49f9-b159-e746c38be9da\",\"5ffcc7bd-a725-43dc-a7bf-e6bee3b4d478\",\"18121e37-b6e6-4301-a61b-4ccad01d1aad\",\"e369cc1c-1ce2-4b84-b4bd-e827eccdfcb5\",\"14c72422-9cfc-49f4-a835-7ab131dd3190\",\"f674eee6-c577-4807-a5c2-b7bfa6d1c516\",\"508c3b0b-9ba2-44a5-b8e4-9c82713368a4\",\"9359f1ad-5024-4464-8cea-39579c1468ec\",\"6e387d83-5663-458a-b69a-4eb2252e0594\",\"20a4f33f-caa5-44ef-97dd-c39d50aade45\",\"834993e6-5643-4229-914d-a58df97cef30\",\"6980e13a-5071-4b87-88b9-54f8d6bcce36\",\"865be3b0-6b05-475b-b624-43aca7568538\",\"c1b668ce-5d81-4e25-80f2-10a0fc98d313\",\"adecc97c-6583-4439-9c8d-06b552b10e1d\",\"abb094e0-64f5-4058-9d56-0f270cb4add2\",\"32d75b8f-e0c0-424b-85ae-a1d2829ee86a\",\"28aeea13-e4e5-4ba9-9ec8-0f1863d0d190\",\"e66b7d80-a9ce-42eb-8ed4-96f1c5c2198e\",\"cf36fe36-d7fe-4f2f-be9b-54f02480ed79\",\"027da0d9-9fab-4d60-aea7-f232c386a7b7\",\"3ce67f78-49b8-4663-bb9d-00293e4e67a3\",\"a2a28a0e-6458-4d8e-8fa7-4e9179c29e2d\",\"865be3b0-6b05-475b-b624-43aca7568538\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition15 ) {\n    _.forEach([\"cfd4cfd5-3f06-40fc-bc85-05cbfefaaf4e\",\"835cab14-f41e-43d4-a77f-db59b715317f\",\"4cf67429-031f-41ae-a8e1-5e1a3dd696d5\",\"a4818198-5117-4d32-8ed0-aa7e1eaa6e80\",\"5ed8e7d5-ff25-4b5f-a46b-2e2bb4f2756c\",\"9b08e1dd-d469-4f2e-a2b7-045c5256ca6a\",\"c3bed0f8-f8fd-4403-ba66-837547d38623\",\"b748ae00-0844-473d-b427-6031936809fa\",\"829f7f00-fcca-46fe-b0b5-ef39f2548141\",\"0c1c43ae-9509-4f61-bc20-99ffb21fb3cc\",\"5381428f-cc8e-4a20-9e3c-994794de27f5\",\"50bd6eb9-cce1-4eff-b4c2-e7177256e83f\",\"0605d833-b691-4a85-88a6-8dcba0405dbc\",\"14816271-baf3-4c13-865f-dcef92ab0c03\",\"f667c9e4-4300-4d4d-a726-009046566fa1\",\"486aceb0-4960-485a-a8e4-9bdad2f65c58\",\"951ec09c-d99b-4830-9ea5-e5f9b4ddead9\",\"3035de80-1603-4ea9-947b-82d093e2bba2\",\"e550818a-037c-4cad-8565-5a9d6ed4b76e\",\"67977dec-8209-4483-8b77-030797cbd53e\",\"4fed6486-9c2e-4cbc-a6bb-92ad7c669955\",\"18803ff7-484e-4187-a2ae-64e4f47890aa\",\"38ca7b94-0432-4e3a-bea8-1d33f9b2abad\",\"7759083b-3bdd-4fac-b198-04ea94955631\",\"2db06055-67eb-4966-8591-c414aa00c774\",\"b145f169-e306-4d4c-a820-88b51a63b2a6\",\"20a4f33f-caa5-44ef-97dd-c39d50aade45\",\"834993e6-5643-4229-914d-a58df97cef30\",\"6980e13a-5071-4b87-88b9-54f8d6bcce36\",\"865be3b0-6b05-475b-b624-43aca7568538\",\"c1b668ce-5d81-4e25-80f2-10a0fc98d313\",\"adecc97c-6583-4439-9c8d-06b552b10e1d\",\"abb094e0-64f5-4058-9d56-0f270cb4add2\",\"32d75b8f-e0c0-424b-85ae-a1d2829ee86a\",\"28aeea13-e4e5-4ba9-9ec8-0f1863d0d190\",\"e66b7d80-a9ce-42eb-8ed4-96f1c5c2198e\",\"cf36fe36-d7fe-4f2f-be9b-54f02480ed79\",\"027da0d9-9fab-4d60-aea7-f232c386a7b7\",\"3ce67f78-49b8-4663-bb9d-00293e4e67a3\",\"865be3b0-6b05-475b-b624-43aca7568538\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition16 ) {\n    _.forEach([\"cfd4cfd5-3f06-40fc-bc85-05cbfefaaf4e\",\"835cab14-f41e-43d4-a77f-db59b715317f\",\"4cf67429-031f-41ae-a8e1-5e1a3dd696d5\",\"a4818198-5117-4d32-8ed0-aa7e1eaa6e80\",\"5ed8e7d5-ff25-4b5f-a46b-2e2bb4f2756c\",\"9b08e1dd-d469-4f2e-a2b7-045c5256ca6a\",\"c3bed0f8-f8fd-4403-ba66-837547d38623\",\"b748ae00-0844-473d-b427-6031936809fa\",\"0c1c43ae-9509-4f61-bc20-99ffb21fb3cc\",\"829f7f00-fcca-46fe-b0b5-ef39f2548141\",\"5381428f-cc8e-4a20-9e3c-994794de27f5\",\"50bd6eb9-cce1-4eff-b4c2-e7177256e83f\",\"0605d833-b691-4a85-88a6-8dcba0405dbc\",\"14816271-baf3-4c13-865f-dcef92ab0c03\",\"f667c9e4-4300-4d4d-a726-009046566fa1\",\"486aceb0-4960-485a-a8e4-9bdad2f65c58\",\"951ec09c-d99b-4830-9ea5-e5f9b4ddead9\",\"3035de80-1603-4ea9-947b-82d093e2bba2\",\"e550818a-037c-4cad-8565-5a9d6ed4b76e\",\"67977dec-8209-4483-8b77-030797cbd53e\",\"4fed6486-9c2e-4cbc-a6bb-92ad7c669955\",\"18803ff7-484e-4187-a2ae-64e4f47890aa\",\"38ca7b94-0432-4e3a-bea8-1d33f9b2abad\",\"7759083b-3bdd-4fac-b198-04ea94955631\",\"2db06055-67eb-4966-8591-c414aa00c774\",\"b145f169-e306-4d4c-a820-88b51a63b2a6\",\"07557c41-b1e1-47fd-8a16-d3dc5363a16e\",\"a2a28a0e-6458-4d8e-8fa7-4e9179c29e2d\",\"75813429-7612-49f9-b159-e746c38be9da\",\"448ebcb5-6974-43b7-8d9b-67002770e1b5\",\"5ffcc7bd-a725-43dc-a7bf-e6bee3b4d478\",\"18121e37-b6e6-4301-a61b-4ccad01d1aad\",\"e369cc1c-1ce2-4b84-b4bd-e827eccdfcb5\",\"f674eee6-c577-4807-a5c2-b7bfa6d1c516\",\"14c72422-9cfc-49f4-a835-7ab131dd3190\",\"508c3b0b-9ba2-44a5-b8e4-9c82713368a4\",\"9359f1ad-5024-4464-8cea-39579c1468ec\",\"6e387d83-5663-458a-b69a-4eb2252e0594\",\"20a4f33f-caa5-44ef-97dd-c39d50aade45\",\"834993e6-5643-4229-914d-a58df97cef30\",\"6980e13a-5071-4b87-88b9-54f8d6bcce36\",\"865be3b0-6b05-475b-b624-43aca7568538\",\"c1b668ce-5d81-4e25-80f2-10a0fc98d313\",\"adecc97c-6583-4439-9c8d-06b552b10e1d\",\"abb094e0-64f5-4058-9d56-0f270cb4add2\",\"32d75b8f-e0c0-424b-85ae-a1d2829ee86a\",\"28aeea13-e4e5-4ba9-9ec8-0f1863d0d190\",\"e66b7d80-a9ce-42eb-8ed4-96f1c5c2198e\",\"cf36fe36-d7fe-4f2f-be9b-54f02480ed79\",\"027da0d9-9fab-4d60-aea7-f232c386a7b7\",\"3ce67f78-49b8-4663-bb9d-00293e4e67a3\",\"016a6d0a-60f9-405f-8dac-08fcf6b39823\",\"865be3b0-6b05-475b-b624-43aca7568538\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 31.0,
                        "validFormat": null,
                        "name": "Objective of work",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": true,
                            "group": null,
                            "uuid": "5d8aa3b7-ef6c-488b-bb1a-19572054868d",
                            "voided": true,
                            "concept": {
                                "uuid": "6e6fe7fc-0cf0-4b68-93a6-7b95e12fd08c",
                                "voided": true,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Objective of work (voided~207476)"
                            },
                            "keyValues": [],
                            "rule": null,
                            "displayOrder": 42.0,
                            "validFormat": null,
                            "name": "Objective of work",
                            "type": "SingleSelect"
                        },
                        "uuid": "37445bff-eb19-4939-908c-d927908e2dda",
                        "voided": true,
                        "concept": {
                            "uuid": "21a0ec64-d7d7-4dd9-a4b9-3ce68cc6be3c",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 12.0,
                                    "uuid": "db2ec3a5-ddc9-4aeb-aea4-6080d45fabd5",
                                    "answerConcept": {
                                        "uuid": "f9a72c48-3238-441d-a1de-2d8cd938dc22",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Any other not given above"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133666
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "d916da05-ee25-4520-8c6b-c636e0a43f61",
                                    "answerConcept": {
                                        "uuid": "67977dec-8209-4483-8b77-030797cbd53e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was stench all over the place"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133664
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "9afeced2-5027-46cd-9c34-c68a9eebb94f",
                                    "answerConcept": {
                                        "uuid": "2db06055-67eb-4966-8591-c414aa00c774",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There is fear of being attacked by animals in heavily bushed roads"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133669
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "12140b55-1764-450b-b647-3fdf070c32d9",
                                    "answerConcept": {
                                        "uuid": "e550818a-037c-4cad-8565-5a9d6ed4b76e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The garbage used to be dumped everywhere"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133674
                                },
                                {
                                    "order": 9.0,
                                    "uuid": "58520566-e7d2-4805-bf4c-946eba301418",
                                    "answerConcept": {
                                        "uuid": "7759083b-3bdd-4fac-b198-04ea94955631",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was fear of diseases like cholera and typhoid happening"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133670
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "d1ed0ed4-edc8-4f21-aea4-2b3296cee6a8",
                                    "answerConcept": {
                                        "uuid": "b145f169-e306-4d4c-a820-88b51a63b2a6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The women did not have bathrooms to change or bathe in privacy"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133672
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "6dbc9599-0967-442d-8a57-ddc73a1d5a66",
                                    "answerConcept": {
                                        "uuid": "951ec09c-d99b-4830-9ea5-e5f9b4ddead9",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The drains were clogged"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133667
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "ec8ef7a0-2b81-4008-9093-2a216cbf1195",
                                    "answerConcept": {
                                        "uuid": "3035de80-1603-4ea9-947b-82d093e2bba2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The road could not be used for commuting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133676
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "27899641-ee08-45dd-9f4d-b9524e2822bc",
                                    "answerConcept": {
                                        "uuid": "38ca7b94-0432-4e3a-bea8-1d33f9b2abad",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was fear of getting bitten by snakes and worms while commuting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133668
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "e362e928-2a7e-4464-a353-649280229944",
                                    "answerConcept": {
                                        "uuid": "f667c9e4-4300-4d4d-a726-009046566fa1",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The place was very dirty"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133675
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "17ec2147-290d-4ae4-9e53-f02b1f455bcb",
                                    "answerConcept": {
                                        "uuid": "18803ff7-484e-4187-a2ae-64e4f47890aa",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Villagers were getting sick repeatedly"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133665
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "1de65ebb-1962-4345-90a2-bf671b5818a4",
                                    "answerConcept": {
                                        "uuid": "486aceb0-4960-485a-a8e4-9bdad2f65c58",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There were mosquitoes breeding"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133671
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "7c9e7dc0-d1c4-4d26-92d5-65e224a16126",
                                    "answerConcept": {
                                        "uuid": "4fed6486-9c2e-4cbc-a6bb-92ad7c669955",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Children were unable to play"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133673
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Sanitation activity"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 44.0,
                        "validFormat": null,
                        "name": "Sanitation",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "0dfdce15-da75-4fd0-8472-8690b89a4710",
                        "voided": true,
                        "concept": {
                            "uuid": "3e1070a7-6c19-4594-aeb6-542025a66f8a",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Specify Other Objective"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"0ea2a76f-933e-448e-896a-46a4238a3488\").containsAnswerConceptName(\"016a6d0a-60f9-405f-8dac-08fcf6b39823\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 41.0,
                        "validFormat": null,
                        "name": "Specify Other Objective",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "779711cc-dc68-414d-b5ea-553c2106054c",
                        "voided": true,
                        "concept": {
                            "uuid": "de182013-d8c6-4b2f-a474-7033bda1d518",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 2.0,
                                    "uuid": "cdc95746-eaac-4416-ab13-5ea9f6d6f8cb",
                                    "answerConcept": {
                                        "uuid": "c5c22ebd-f12a-4ee7-8718-297225204ca6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Tuition / Training / vocational center"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141245
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "418d11ec-f282-4f6c-b4a4-c20f5357228a",
                                    "answerConcept": {
                                        "uuid": "353a5c77-6b72-4aac-8c49-c2fdd0abad10",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "School"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141246
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "c9099900-8db2-4808-9eb3-7f14bcad8bdc",
                                    "answerConcept": {
                                        "uuid": "db17de4f-d7f6-4ab3-afd6-6231a874890a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Anganwadi"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141247
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Type of school"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 29.0,
                        "validFormat": null,
                        "name": "Type of school",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "dc858cab-bffa-40a3-a196-424e70e464ed",
                        "voided": true,
                        "concept": {
                            "uuid": "e1f72d4e-bf41-434d-aeac-05a286373181",
                            "voided": false,
                            "dataType": "Encounter",
                            "keyValues": [
                                {
                                    "key": "encounterTypeUUID",
                                    "value": "a29e1dbe-c894-4384-9db4-0fd2df745df8"
                                },
                                {
                                    "key": "encounterScope",
                                    "value": "Within Subject"
                                },
                                {
                                    "key": "encounterIdentifier",
                                    "value": "{Location}-{Distribution Date}"
                                }
                            ],
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity's Distribution"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 10.0,
                        "validFormat": null,
                        "name": "Related Distribution",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "c8e3dcac-2ef9-4b8e-a7f8-edecc893e6a3",
                        "voided": true,
                        "concept": {
                            "uuid": "3ab64b6c-8ad3-4cbe-9dc8-fa3a8246d6e6",
                            "voided": true,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 1.0,
                                    "uuid": "09922ce3-8205-42a5-bf2f-acc13927bd05",
                                    "answerConcept": {
                                        "uuid": "3f7366d8-350c-4290-aa9e-e265eea76ae5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Toilet/Bathroom/private spaces"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133428
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "ebe7530d-9cda-402c-8fc5-b2efaac0005c",
                                    "answerConcept": {
                                        "uuid": "3f0bd027-abf0-4beb-a7e7-9967d1994852",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Drainage"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133429
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "f9a18ad3-1948-4a85-bf6f-5d27ac7f2955",
                                    "answerConcept": {
                                        "uuid": "729f12d6-57dc-4b4f-a1cd-8c7e7c02db42",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water body premises"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133427
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "34507b41-a5e4-4741-a206-aaa3ef9ec2b4",
                                    "answerConcept": {
                                        "uuid": "58653f74-082c-47a7-9a25-548990a4bd4c",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Community spaces- Meeting point/ Religious places/ School/ Park & AWC etc"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133432
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "d71fce8c-e1d1-484b-8030-026b8d4f99ac",
                                    "answerConcept": {
                                        "uuid": "ec39b654-3009-46ad-a2d4-2fda9f40d856",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Dustbin"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133431
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "1cf2987c-14f7-46eb-91a9-0efc29d1b793",
                                    "answerConcept": {
                                        "uuid": "ba6d69d5-bdb8-48bd-bd70-87e0b9848178",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Road & road-side bush cutting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133426
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "43f63d76-cfda-44e2-8f32-b56cbcca9be6",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133430
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Sub-type for Sanitation (voided~207454)"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"fe6cd113-e3e3-44b6-abe7-81ba7605787b\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 38.0,
                        "validFormat": null,
                        "name": "Activity Sub-type for Sanitation",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "b37c5e28-b503-47f5-99ec-cfb0469efb4d",
                        "voided": false,
                        "concept": {
                            "uuid": "e2d35dee-c34f-4f54-a68b-f32ee81835b6",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Other Block"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = false;\n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.lowestAddressLevel.defined.matches();\n  const isDefined = individual.lowestAddressLevel !== undefined && individual.lowestAddressLevel.locationMappings.length !== 0;\n  //&& individual.lowestAddressLevel.isSelected;\n  if (isDefined) {\n    const block = individual.lowestAddressLevel.locationMappings[0].that.parent.name;\n    if (block === 'Other') {\n      visibility = true;\n    }\n    else {\n      visibility = false;\n    }\n  }\n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility);\n};",
                        "displayOrder": 4.0,
                        "validFormat": null,
                        "name": "Other Block",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "f3539ada-8120-4b24-a9fc-187a93b6a976",
                        "voided": false,
                        "concept": {
                            "uuid": "1157c7c8-9f27-410d-9115-ef36191fba06",
                            "voided": false,
                            "dataType": "QuestionGroup",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of participants"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptNameOtherThan(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 19.0,
                        "validFormat": null,
                        "name": "Number of participants",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "014e577a-6dcf-4c40-a485-96bdebd04b24",
                        "voided": true,
                        "concept": {
                            "uuid": "d04d6382-91d2-468c-b45f-d3afce94cba2",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 4.0,
                                    "uuid": "bcc0fb3d-059c-4930-8d7e-8755ecb2322f",
                                    "answerConcept": {
                                        "uuid": "231a6748-7677-4eb1-8a37-15a0ab207d67",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW-Rahat"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133298
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "bd0623d8-1282-4cca-a4c7-f4cc0a528f0c",
                                    "answerConcept": {
                                        "uuid": "85eda3f4-ee7c-4123-b330-77b4a7f817fd",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133300
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "baffd6b0-a730-45d5-9233-c5c0004f095d",
                                    "answerConcept": {
                                        "uuid": "971c7a76-d296-4d47-9a90-47a612ceb4ca",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Vaapsi"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 142034
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "d9a40b20-1e7b-4ab8-b3e8-59f557cd20f3",
                                    "answerConcept": {
                                        "uuid": "6b5b0f34-c925-4ff8-bbf8-a72baf4e0f32",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only NJPC"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133302
                                },
                                {
                                    "order": 15.0,
                                    "uuid": "93617461-2d33-44b9-91cf-e5b68e6bf3f4",
                                    "answerConcept": {
                                        "uuid": "cbf0805f-aac1-40b9-b78c-1c568b86ef24",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Rahat"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 143788
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "eb78f687-9b3a-4a38-a3ab-7eb806a4b7c0",
                                    "answerConcept": {
                                        "uuid": "820b5991-7002-4be5-89db-f1a4e10d4cd6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW-NJPC"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133299
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "58cf1d78-376f-4310-9af4-80d4a2063e28",
                                    "answerConcept": {
                                        "uuid": "118ad0b3-0e16-46f2-902c-15722d6047c9",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only Rahat"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133306
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "ecdbb924-9810-4d9b-9934-cc91cf83518c",
                                    "answerConcept": {
                                        "uuid": "54d27687-374e-4988-ad81-e4d26bf02bf3",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Specific Initiative"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 142033
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "06499475-7adf-4299-a1b7-6e3597799f9f",
                                    "answerConcept": {
                                        "uuid": "abbd4c79-e71e-403d-b263-e49259180f5f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only S2S"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133301
                                },
                                {
                                    "order": 14.0,
                                    "uuid": "8812750e-3751-4d0d-963a-f4ea6d47d8dd",
                                    "answerConcept": {
                                        "uuid": "9fd9d626-faf7-4833-a3ab-47ec3b4388f6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "S2S"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133305
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "1af5a65e-856f-4a7e-8953-044378ea68c2",
                                    "answerConcept": {
                                        "uuid": "18aee17d-bc4e-4e84-b5bd-df28961acf77",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Only CFW"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133304
                                },
                                {
                                    "order": 13.0,
                                    "uuid": "8716899a-ab00-4510-9f72-0d3d1d9533a1",
                                    "answerConcept": {
                                        "uuid": "6404fcaf-31de-4322-9620-c1b958f9c548",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "NJPC"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133307
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "eed2b174-caa4-474e-8c7d-cca9b79c8906",
                                    "answerConcept": {
                                        "uuid": "4db0c307-9053-4bd4-b917-580d00e43f1d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW-S2S"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133303
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Type of Initiative"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 9.0,
                        "validFormat": null,
                        "name": "Type of initiative",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": true,
                            "group": null,
                            "uuid": "5d8aa3b7-ef6c-488b-bb1a-19572054868d",
                            "voided": true,
                            "concept": {
                                "uuid": "6e6fe7fc-0cf0-4b68-93a6-7b95e12fd08c",
                                "voided": true,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Objective of work (voided~207476)"
                            },
                            "keyValues": [],
                            "rule": null,
                            "displayOrder": 42.0,
                            "validFormat": null,
                            "name": "Objective of work",
                            "type": "SingleSelect"
                        },
                        "uuid": "42e72a39-9d37-4161-9280-47adcf682033",
                        "voided": true,
                        "concept": {
                            "uuid": "5c26afbe-c19e-4419-b89e-d03846c0e2e2",
                            "voided": true,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 1.0,
                                    "uuid": "d21fa39f-1a3b-4e53-98a9-3de4f45f1c34",
                                    "answerConcept": {
                                        "uuid": "95882ddd-13f3-4ea8-b7f2-026e332bdc06",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Making"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133372
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "ecb99bcd-6754-4f42-86c3-4e4dc85b6244",
                                    "answerConcept": {
                                        "uuid": "cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Cleaning"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133373
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "9e20c59a-eb5a-493f-87fc-efaedae99b21",
                                    "answerConcept": {
                                        "uuid": "b66fa362-b975-4f0e-a7b2-9b0c37205c54",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Repairing"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133371
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Category (voided~207467)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 43.0,
                        "validFormat": null,
                        "name": "Activity Category",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": false,
                            "group": null,
                            "uuid": "f3539ada-8120-4b24-a9fc-187a93b6a976",
                            "voided": false,
                            "concept": {
                                "uuid": "1157c7c8-9f27-410d-9115-ef36191fba06",
                                "voided": false,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Number of participants"
                            },
                            "keyValues": [],
                            "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptNameOtherThan(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                            "displayOrder": 19.0,
                            "validFormat": null,
                            "name": "Number of participants",
                            "type": "SingleSelect"
                        },
                        "uuid": "3aca7360-5835-4c8e-b0ec-6f54e2543995",
                        "voided": false,
                        "concept": {
                            "uuid": "2966afcc-2c07-44cf-8711-3fc23f52a6b5",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of Participants (Female)"
                        },
                        "keyValues": [],
                        "rule": "",
                        "displayOrder": 22.0,
                        "validFormat": null,
                        "name": "Number of Participants (Female)",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "88fa13b3-7256-4e66-acca-5ae23b2f27e3",
                        "voided": false,
                        "concept": {
                            "uuid": "2e85dffe-c09e-4adb-a1b2-41f59aa68d49",
                            "voided": false,
                            "dataType": "Date",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity End Date"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  let activityStartDateObservation = individual.findObservation('8c938361-485e-4b5a-9643-51b741905fd8');\n  let activityStartDateValue = _.isEmpty(activityStartDateObservation) ? activityStartDateObservation : activityStartDateObservation.getReadableValue();\n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"2e85dffe-c09e-4adb-a1b2-41f59aa68d49\").lessThan(activityStartDateValue, 'ms').matches();\n  \n  let activityStartDate = individual.getObservationValue('8c938361-485e-4b5a-9643-51b741905fd8');\n  \n  if(activityStartDate && condition11 ){\n    validationErrors.push(\"Activity End Date cannot be before Activity Start Date\");  \n}\n\nconst condition12 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"2e85dffe-c09e-4adb-a1b2-41f59aa68d49\").greaterThan(moment().startOf('day').toDate()).matches();\n  \n  if(condition12 ){\n    validationErrors.push(\"Date cannot be in the future\");  \n}\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 12.0,
                        "validFormat": null,
                        "name": "Activity end date",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "fef58a64-b5a0-490b-8cd9-26f3346b402b",
                        "voided": true,
                        "concept": {
                            "uuid": "6bc60f7a-fe77-435a-b9ba-93de5e131123",
                            "voided": true,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 1.0,
                                    "uuid": "11a366bb-5248-4db8-ba20-16d769b69141",
                                    "answerConcept": {
                                        "uuid": "db432dbe-7aed-44e8-9385-42973b3cf7bb",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Benches"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133414
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "e9c8493b-ba46-4291-a917-4663a59ac1a1",
                                    "answerConcept": {
                                        "uuid": "961b337f-fee4-4bed-a77a-83db71f1b5a2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Ground levelling"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133416
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "fe734cbe-cc7a-44fa-ab98-e1581dd3660e",
                                    "answerConcept": {
                                        "uuid": "f98bacd7-701e-49ce-a268-b3e83d8f194f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Road"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133418
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "51e48b54-c86d-4d76-9f30-feaa44ab8544",
                                    "answerConcept": {
                                        "uuid": "f431cbac-b99d-48fb-8694-0299c352eb9a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Fencing & boundary wall"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133419
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "5a3a5660-0b84-4e1e-a8ab-e3ee53c42e3d",
                                    "answerConcept": {
                                        "uuid": "f599df1e-a5e6-4f3e-b985-a196d55a3c73",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Bandstand"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133411
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "d0b86fdb-9913-48e0-8033-3180bda4a426",
                                    "answerConcept": {
                                        "uuid": "61d8f60f-8496-4b6d-8d1a-9967e0ff024f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Bridge/Pulia"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133417
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "d9ea077a-d8fc-4876-880f-1b6c255fc2d8",
                                    "answerConcept": {
                                        "uuid": "d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Community Hall/Center/House"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133413
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "1b491e54-a2d3-431b-a1be-62ccd5d5790c",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133415
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "7ae5f465-a0ce-424a-8e5a-ac7734b61248",
                                    "answerConcept": {
                                        "uuid": "62f4b7d6-4a4a-4064-aa0e-a0c21053eec2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Wall for roads"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133412
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Sub-type (voided~207436)"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"452bc10f-09b4-446e-93f4-52d477885be0\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 36.0,
                        "validFormat": null,
                        "name": "Activity Sub-type for Access infrastructure",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "33a6be39-d780-40e5-9477-ef688d59d9a1",
                        "voided": false,
                        "concept": {
                            "uuid": "49be122c-b452-4b5c-ad77-bbf1fcf1ea3a",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 4.0,
                                    "uuid": "480db828-ff01-4977-8b0a-696cc6f44c63",
                                    "answerConcept": {
                                        "uuid": "278d95a9-5a62-4ff2-b515-4a6332e09aca",
                                        "voided": false,
                                        "dataType": "Coded",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Miscellaneous"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133468
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "81e48df0-51ea-470b-882f-b5f5a407a230",
                                    "answerConcept": {
                                        "uuid": "72a547e0-0058-4840-8f9e-d22479e4a48f",
                                        "voided": false,
                                        "dataType": "Coded",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Access_Infrastructure"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133467
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "dfde732e-c7c7-40dc-a3df-cdbfc467e162",
                                    "answerConcept": {
                                        "uuid": "f73d13a5-f6cf-4138-b4c6-849efbbe632f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Miscellaneous Activity"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133466
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "129b4f58-db99-433d-bc58-6da99222a53d",
                                    "answerConcept": {
                                        "uuid": "dc829fd5-0c19-4223-93a0-c29b8919dcc9",
                                        "voided": false,
                                        "dataType": "Coded",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Agriculture_Plantation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133464
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "a1449a3a-9080-43ff-ab85-49e4c31cd413",
                                    "answerConcept": {
                                        "uuid": "fe6cd113-e3e3-44b6-abe7-81ba7605787b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Sanitation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133465
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "6e94e31a-6d3f-433d-a18b-b30f241e919a",
                                    "answerConcept": {
                                        "uuid": "476a03c0-071a-42df-a04e-ec60752d1283",
                                        "voided": false,
                                        "dataType": "Coded",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water_Management"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133469
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "f177a51d-1e09-4785-8952-bc1c8ed9b25d",
                                    "answerConcept": {
                                        "uuid": "1b061e73-b94f-499d-b82c-234670e104c5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water Management"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133463
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "f19fe2c3-06f6-44cc-972f-99b9fde80957",
                                    "answerConcept": {
                                        "uuid": "d0162f3e-d9a5-40e0-84e4-7130e8e732ee",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Agriculture Plantation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133470
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "f611b3a5-4f6a-44d5-8a02-d5c537432c19",
                                    "answerConcept": {
                                        "uuid": "452bc10f-09b4-446e-93f4-52d477885be0",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Access Infrastructure"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133471
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Type"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"85eda3f4-ee7c-4123-b330-77b4a7f817fd\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 13.0,
                        "validFormat": null,
                        "name": "Activity type",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "bec0bd55-59e7-4aca-b533-4f1745195fa8",
                        "voided": false,
                        "concept": {
                            "uuid": "2d3389d4-07ae-42cd-8c25-e9a0203e2c9a",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 6.0,
                                    "uuid": "504d6352-fcda-40ea-b42b-7a2447d393ca",
                                    "answerConcept": {
                                        "uuid": "f903963d-1c98-4f85-827c-c15a0930b845",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Any other"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133663
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "dc6e1de3-8eab-48b8-abbf-6b24815c6c50",
                                    "answerConcept": {
                                        "uuid": "bb9ba1dd-82c9-45ac-86c4-d524ab514f49",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Cultural (Dance/Drama/Singing/Poem/Skit/Story Telling/Rhymes)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133659
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "32556b39-cdc9-492f-9f83-b3cffd3d55fe",
                                    "answerConcept": {
                                        "uuid": "267c7456-ba18-44b3-93b3-a371460f9a30",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Academic (Counting/Writing/Essay/Alphabet)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133660
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "078d3d95-1db4-4170-9da3-05ecdf665c80",
                                    "answerConcept": {
                                        "uuid": "5a74c9f8-e5eb-4113-9c61-720d7eb4de7e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "School Improvement Activities (Plantation/Kitchen Garden/Cleaning of School/Garden)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133657
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "cdee3ad2-9a34-4dd1-9873-0d0ae3d45371",
                                    "answerConcept": {
                                        "uuid": "e1c97f61-ec50-4594-9254-606c2f15d2b9",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Art & Craft (Painting/Drawing/Rangoli/ Craft Activity/Poster)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133661
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "dfbb6c2e-196c-4988-b460-8ac229092ccb",
                                    "answerConcept": {
                                        "uuid": "ad8143ae-40f1-4b6b-ba97-c95cc091e9d8",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Knowledge Activities (Health/Hygiene/Environment/Conservation)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133658
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "ebb7a48a-6674-49a6-94b2-c620584aa944",
                                    "answerConcept": {
                                        "uuid": "6f1feaba-3286-414d-a40b-d7eb259b7183",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Sports (Games/Kho Kho/Yoga/Any other)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133662
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Conducted With Students"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 27.0,
                        "validFormat": null,
                        "name": "Activity Conducted With Students",
                        "type": "MultiSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "8f7d84e8-7b2e-42c0-a604-07e61734acb4",
                        "voided": false,
                        "concept": {
                            "uuid": "9a182a63-61df-441c-af58-953253c8d0f2",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of Days of Participation"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptNameOtherThan(\"85eda3f4-ee7c-4123-b330-77b4a7f817fd\").matches();\n  const condition12 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"8c938361-485e-4b5a-9643-51b741905fd8\").defined.matches();\n  const condition22 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"2e85dffe-c09e-4adb-a1b2-41f59aa68d49\").defined.matches();\n  \n  visibility = condition11 ;\n  \n  if(condition12 && condition22 ){\n    let activityStartDateObservation = individual.findObservation('8c938361-485e-4b5a-9643-51b741905fd8');\n    let activityStartDateValue = _.isEmpty(activityStartDateObservation) ? activityStartDateObservation : moment(activityStartDateObservation.getReadableValue());\n    let activityEndDateObservation = individual.findObservation('2e85dffe-c09e-4adb-a1b2-41f59aa68d49');\n    let activityEndDateValue = _.isEmpty(activityEndDateObservation) ? activityEndDateObservation : moment(activityEndDateObservation.getReadableValue());\n    let difference = activityEndDateValue.diff((activityStartDateValue), 'days') + 1;\n    const condition31 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"9a182a63-61df-441c-af58-953253c8d0f2\").greaterThan(difference).matches();\n    if(condition31 ){\n        validationErrors.push(`No of days of participation should not be greater than ${difference}`);\n    }\n}\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 26.0,
                        "validFormat": null,
                        "name": "Number of days of participation",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "4329a2e2-fc5a-4a0d-8984-cec5e68b7d11",
                        "voided": false,
                        "concept": {
                            "uuid": "8c938361-485e-4b5a-9643-51b741905fd8",
                            "voided": false,
                            "dataType": "Date",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Start Date"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"8c938361-485e-4b5a-9643-51b741905fd8\").greaterThan(moment().startOf('day').toDate()).matches();\n  \n  if(condition11 ){\n    validationErrors.push(\"Date cannot be in the future\");  \n}\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 11.0,
                        "validFormat": null,
                        "name": "Activity start date",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "a2d34b27-fd1a-4989-819b-f05f1757b23c",
                        "voided": true,
                        "concept": {
                            "uuid": "bdb69c4d-d46a-4387-9b08-aba1cdaf66cc",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 0.0,
                                    "uuid": "f621c7fa-3fe5-4dda-87f1-532884109510",
                                    "answerConcept": {
                                        "uuid": "798e61fa-8d8d-43b4-8738-251be7bdc5b4",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Compost Pit"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133421
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "81e1cffd-448b-4487-9ef1-17177c7b484d",
                                    "answerConcept": {
                                        "uuid": "4ca95b4a-0d74-4bea-aac5-9f45da876178",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Community farming"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133420
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "161e993c-0fca-43b4-b8f7-32f9b8189e03",
                                    "answerConcept": {
                                        "uuid": "d7356902-e705-414d-99e4-f08b10fe7f73",
                                        "voided": true,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Land Bundling (voided~207458)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133423
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "9512077f-f643-4a6f-afea-e056281cdcba",
                                    "answerConcept": {
                                        "uuid": "74d20d4a-8444-476c-9b7b-b5b4341bcf8e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Plantation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133422
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "87edbba2-455a-40bd-9c7c-d88bc42d672d",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133424
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "ddfcc738-1cb1-43f3-9034-f1a338ef7951",
                                    "answerConcept": {
                                        "uuid": "a9375cc4-e115-4f06-aa6c-33b7b4217685",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Kitchen Garden"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133425
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity Sub-type for Agricultural plantation"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"d0162f3e-d9a5-40e0-84e4-7130e8e732ee\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 39.0,
                        "validFormat": null,
                        "name": "Activity Sub-type for Agricultural plantation",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "bfc628e7-049a-4730-8cc6-7a23ed3ce30a",
                        "voided": true,
                        "concept": {
                            "uuid": "2fb51840-9356-4b24-85e8-76135a6492bb",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Account code"
                        },
                        "keyValues": [],
                        "rule": "",
                        "displayOrder": 2.0,
                        "validFormat": null,
                        "name": "Account code",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "a68419b1-a826-4909-964b-8c30ff3906b5",
                        "voided": false,
                        "concept": {
                            "uuid": "e08bdfcc-fefc-4425-9abb-22578697e5a0",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Specify Other Sub Type"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"016a6d0a-60f9-405f-8dac-08fcf6b39823\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 15.0,
                        "validFormat": null,
                        "name": "Specify Other Sub Type",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "eb67de1b-2fd2-4d99-95a3-4c0c4d138c81",
                        "voided": false,
                        "concept": {
                            "uuid": "98913e69-ab32-48aa-9f50-cf539779ccf8",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Source Id"
                        },
                        "keyValues": [
                            {
                                "key": "editable",
                                "value": false
                            }
                        ],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const formElement = params.formElement;\n  let value = individual.uuid;\n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, true, value);\n};",
                        "displayOrder": 6.0,
                        "validFormat": null,
                        "name": "Source Id (temp field)",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "2e8ff47f-480b-4b7c-a36f-5ea1b3daa6c5",
                        "voided": false,
                        "concept": {
                            "uuid": "886b5ade-d1b0-4919-b9a4-cd4141fca178",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 4.0,
                                    "uuid": "3f5a2a3d-7908-4ac3-bc95-cb1adc64f4c6",
                                    "answerConcept": {
                                        "uuid": "6116fbd2-f5e4-46bb-930d-7df3d7bc2292",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Repairing / Cleaning"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133364
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "4a9a453d-66dd-4d7d-9c83-0854a7ab9e36",
                                    "answerConcept": {
                                        "uuid": "cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Cleaning"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133367
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "f9505744-7c8d-4baf-888e-7b450a3541de",
                                    "answerConcept": {
                                        "uuid": "b66fa362-b975-4f0e-a7b2-9b0c37205c54",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Repairing"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133368
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "292b81f6-9b9e-4239-a3c3-f56d660e4686",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133370
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "6905aa84-b6a7-4da2-97d4-4125871aa10a",
                                    "answerConcept": {
                                        "uuid": "3c01a59c-3428-4f10-b95a-34c0b0dd2c67",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Making / Repairing"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133369
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "9c7d1916-9f9c-4d45-8cae-d6e8b059a4ee",
                                    "answerConcept": {
                                        "uuid": "dca93504-ecb5-40fc-bfca-8d96d54f35f2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Making / Repairing / Cleaning"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133366
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "855284d8-fb0e-4729-bfcb-db49e9e1d3c5",
                                    "answerConcept": {
                                        "uuid": "95882ddd-13f3-4ea8-b7f2-026e332bdc06",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Making"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133365
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity category"
                        },
                        "keyValues": [
                            {
                                "key": "ExcludedAnswers",
                                "value": [
                                    "Repairing / Cleaning",
                                    "Making / Repairing",
                                    "Making / Repairing / Cleaning"
                                ]
                            }
                        ],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnyAnswerConceptName(\"452bc10f-09b4-446e-93f4-52d477885be0\",\"1b061e73-b94f-499d-b82c-234670e104c5\",\"d0162f3e-d9a5-40e0-84e4-7130e8e732ee\",\"fe6cd113-e3e3-44b6-abe7-81ba7605787b\",\"f73d13a5-f6cf-4138-b4c6-849efbbe632f\").matches();\n    \n  const condition12 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"f599df1e-a5e6-4f3e-b985-a196d55a3c73\",\"db432dbe-7aed-44e8-9385-42973b3cf7bb\",\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb\",\"f431cbac-b99d-48fb-8694-0299c352eb9a\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"961b337f-fee4-4bed-a77a-83db71f1b5a2\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\",\"ec39b654-3009-46ad-a2d4-2fda9f40d856\",\"3f7366d8-350c-4290-aa9e-e265eea76ae5\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"a9375cc4-e115-4f06-aa6c-33b7b4217685\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"74d20d4a-8444-476c-9b7b-b5b4341bcf8e\",\"b462ddf4-977b-4bc5-8157-7f0132c5245d\",\"38dc542e-277d-4790-8982-0d2f3253f0fc\",\"32699e9f-c289-4581-9781-24b2bdbb0841\").matches();\n    \n  const condition13 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"58653f74-082c-47a7-9a25-548990a4bd4c\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"729f12d6-57dc-4b4f-a1cd-8c7e7c02db42\",\"961b337f-fee4-4bed-a77a-83db71f1b5a2\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\").matches();\n    \n  const condition14 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"58653f74-082c-47a7-9a25-548990a4bd4c\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"729f12d6-57dc-4b4f-a1cd-8c7e7c02db42\",\"74d20d4a-8444-476c-9b7b-b5b4341bcf8e\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"ec39b654-3009-46ad-a2d4-2fda9f40d856\",\"b462ddf4-977b-4bc5-8157-7f0132c5245d\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\",\"32699e9f-c289-4581-9781-24b2bdbb0841\").matches();\n  \n  visibility = condition11 ;\n    if(condition12 ) {\n    _.forEach([\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition13 ) {\n    _.forEach([\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition14 ) {\n    _.forEach([\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 16.0,
                        "validFormat": null,
                        "name": "Activity category",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "685e3c63-cfed-4a87-9a2d-16cc37ae2a5c",
                        "voided": false,
                        "concept": {
                            "uuid": "16b4db7c-e0a8-41f1-ac67-07470a762d9f",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Other Village"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const formElement = params.formElement;\n  const statusBuilder = new imports.rulesConfig.FormElementStatusBuilder({individual, formElement});\n  let visibility = false;\n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.lowestAddressLevel.defined.matches();\n  if (condition11) {\n    const village = individual.lowestAddressLevel.that.name;\n    const otherVillage = 'Other'\n    const showCondition = village === otherVillage;\n    statusBuilder.show().whenItem(showCondition).is.truthy;\n  }\n  return statusBuilder.build();\n};",
                        "displayOrder": 5.0,
                        "validFormat": null,
                        "name": "Other Village",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "17a733a2-9cf3-4197-bda2-3b540bd3ec56",
                        "voided": false,
                        "concept": {
                            "uuid": "5e259bfe-07a8-4c88-a712-d22b9a612429",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Tola / Mohalla"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 3.0,
                        "validFormat": null,
                        "name": "Tola / Mohalla",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "e4bd3b1a-2b42-448c-a099-79d866870d39",
                        "voided": false,
                        "concept": {
                            "uuid": "33919c90-92b1-44f6-a5c8-3d04a3d159a1",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Specify other for objective of work"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"0ea2a76f-933e-448e-896a-46a4238a3488\").containsAnswerConceptName(\"f9a72c48-3238-441d-a1de-2d8cd938dc22\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 32.0,
                        "validFormat": null,
                        "name": "Specify other",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "e6c3c79d-f87c-42c9-9de6-5cd48bd4cfe3",
                        "voided": true,
                        "concept": {
                            "uuid": "885b713c-7c3b-469e-bcab-5b30c742c2c4",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Specify other S2S related activity"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"2d3389d4-07ae-42cd-8c25-e9a0203e2c9a\").containsAnswerConceptName(\"f903963d-1c98-4f85-827c-c15a0930b845\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 28.0,
                        "validFormat": null,
                        "name": "Specify other S2S related activity",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "53b2f878-80b7-464d-bfa8-67af53c29796",
                        "voided": true,
                        "concept": {
                            "uuid": "278d95a9-5a62-4ff2-b515-4a6332e09aca",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 2.0,
                                    "uuid": "f4700ae5-ab90-4281-b521-22de393fae25",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133459
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "89fa9e44-74bf-42c6-8e50-ed9fb6135f9d",
                                    "answerConcept": {
                                        "uuid": "8a4d7b13-598d-4a8a-83f6-72cbfb7c7911",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Truck Unloading"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133460
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "d167a2fe-c0c0-493e-b712-ef3937f0f017",
                                    "answerConcept": {
                                        "uuid": "3f7366d8-350c-4290-aa9e-e265eea76ae5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Toilet/Bathroom/private spaces"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133462
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "37ee399a-617c-484f-950d-235ad9b786cb",
                                    "answerConcept": {
                                        "uuid": "38dc542e-277d-4790-8982-0d2f3253f0fc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Electric Pole"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133461
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Miscellaneous"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"f73d13a5-f6cf-4138-b4c6-849efbbe632f\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 40.0,
                        "validFormat": null,
                        "name": "Activity Sub-type for Miscellaneous",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "148ef386-8392-4cb2-a729-aa566376f5a1",
                        "voided": true,
                        "concept": {
                            "uuid": "de182013-d8c6-4b2f-a474-7033bda1d518",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 2.0,
                                    "uuid": "cdc95746-eaac-4416-ab13-5ea9f6d6f8cb",
                                    "answerConcept": {
                                        "uuid": "c5c22ebd-f12a-4ee7-8718-297225204ca6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Tuition / Training / vocational center"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141245
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "418d11ec-f282-4f6c-b4a4-c20f5357228a",
                                    "answerConcept": {
                                        "uuid": "353a5c77-6b72-4aac-8c49-c2fdd0abad10",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "School"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141246
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "c9099900-8db2-4808-9eb3-7f14bcad8bdc",
                                    "answerConcept": {
                                        "uuid": "db17de4f-d7f6-4ab3-afd6-6231a874890a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Anganwadi"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141247
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Type of school"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 35.0,
                        "validFormat": null,
                        "name": "Type of school",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": false,
                            "group": null,
                            "uuid": "f3539ada-8120-4b24-a9fc-187a93b6a976",
                            "voided": false,
                            "concept": {
                                "uuid": "1157c7c8-9f27-410d-9115-ef36191fba06",
                                "voided": false,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Number of participants"
                            },
                            "keyValues": [],
                            "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptNameOtherThan(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                            "displayOrder": 19.0,
                            "validFormat": null,
                            "name": "Number of participants",
                            "type": "SingleSelect"
                        },
                        "uuid": "39947adc-2b5e-4f4a-bf83-ee71bcb0ea5a",
                        "voided": false,
                        "concept": {
                            "uuid": "526b0d5d-51cc-4004-8c12-7a6c71c6c516",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of Participants (Male)"
                        },
                        "keyValues": [],
                        "rule": "",
                        "displayOrder": 21.0,
                        "validFormat": null,
                        "name": "Number of Participants (Male)",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "c4aec555-b75c-4cd2-8b15-5ca1606f077f",
                        "voided": false,
                        "concept": {
                            "uuid": "5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 1.0,
                                    "uuid": "d2bbe7fd-3c45-40af-8df0-2f02327cc0a9",
                                    "answerConcept": {
                                        "uuid": "9fd9d626-faf7-4833-a3ab-47ec3b4388f6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "S2S"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 143544
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "ff1e416c-0832-469d-9719-51df34177b4a",
                                    "answerConcept": {
                                        "uuid": "6404fcaf-31de-4322-9620-c1b958f9c548",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "NJPC"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 143542
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "2ab1ba3f-69d1-4ed0-99bb-b224a7069feb",
                                    "answerConcept": {
                                        "uuid": "85eda3f4-ee7c-4123-b330-77b4a7f817fd",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "CFW"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 143543
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Type of initiative"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 8.0,
                        "validFormat": null,
                        "name": "Type of initiative",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "6b6e4dd4-e8bf-4ed0-8fd0-2d2d9126b28f",
                        "voided": false,
                        "concept": {
                            "uuid": "2e39d19d-fc03-400e-9f5e-1f815483ea47",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "School / Aanganwadi / Learning Center Name"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 34.0,
                        "validFormat": null,
                        "name": "School / Aanganwadi / Learning Center Name",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "54ba6c16-2a6a-451d-b2a6-6b5b83660ecd",
                        "voided": true,
                        "concept": {
                            "uuid": "31ea4861-8939-42c2-a7a1-bcd2313946c6",
                            "voided": true,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": 1.0,
                            "highNormal": null,
                            "lowNormal": 1.0,
                            "unit": null,
                            "name": "Number of participants (voided~220326)"
                        },
                        "keyValues": [],
                        "rule": "",
                        "displayOrder": 24.0,
                        "validFormat": null,
                        "name": "Number of participants",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": true,
                            "group": null,
                            "uuid": "5d8aa3b7-ef6c-488b-bb1a-19572054868d",
                            "voided": true,
                            "concept": {
                                "uuid": "6e6fe7fc-0cf0-4b68-93a6-7b95e12fd08c",
                                "voided": true,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Objective of work (voided~207476)"
                            },
                            "keyValues": [],
                            "rule": null,
                            "displayOrder": 42.0,
                            "validFormat": null,
                            "name": "Objective of work",
                            "type": "SingleSelect"
                        },
                        "uuid": "40676051-fa41-4604-bff1-1cf898484dfe",
                        "voided": true,
                        "concept": {
                            "uuid": "72a547e0-0058-4840-8f9e-d22479e4a48f",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 9.0,
                                    "uuid": "c7bbb942-3ccc-4058-8228-b75438aabe7f",
                                    "answerConcept": {
                                        "uuid": "e66b7d80-a9ce-42eb-8ed4-96f1c5c2198e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "In order to increase life and longevity of trees"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133352
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "d0554307-1e4f-4655-b827-2d39b23d5e27",
                                    "answerConcept": {
                                        "uuid": "3ce67f78-49b8-4663-bb9d-00293e4e67a3",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To repair/rebuilt damaged community infrastructure"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133359
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "7d6cf0e2-8815-4abf-9033-e22cda05af52",
                                    "answerConcept": {
                                        "uuid": "865be3b0-6b05-475b-b624-43aca7568538",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to nearly medical facilities"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133358
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "b7f70094-07c3-4776-bdf4-e76a3994fda2",
                                    "answerConcept": {
                                        "uuid": "cf36fe36-d7fe-4f2f-be9b-54f02480ed79",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To protect school facilities and ensure safety for children"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133363
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "282c6c47-28ae-4cf8-a4a2-73e9f33854fa",
                                    "answerConcept": {
                                        "uuid": "32d75b8f-e0c0-424b-85ae-a1d2829ee86a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The children did not have a proper place to study"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133360
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "dc7a6f42-cbb2-441c-bd10-233c5d140829",
                                    "answerConcept": {
                                        "uuid": "6980e13a-5071-4b87-88b9-54f8d6bcce36",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/ or no connectivity to the nearby villages"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133361
                                },
                                {
                                    "order": 13.0,
                                    "uuid": "707801b1-7f6c-41ab-891f-c52e027ad703",
                                    "answerConcept": {
                                        "uuid": "f9a72c48-3238-441d-a1de-2d8cd938dc22",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Any other not given above"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133350
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "eae195f6-6035-4b63-a7f3-8ec34d778ad9",
                                    "answerConcept": {
                                        "uuid": "28aeea13-e4e5-4ba9-9ec8-0f1863d0d190",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The walls/boundaries of the school were damaged affecting studies"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133355
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "ad6eb6bb-2cb2-4430-b099-6a87eb30274f",
                                    "answerConcept": {
                                        "uuid": "c1b668ce-5d81-4e25-80f2-10a0fc98d313",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to water facilities/sources"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133354
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "29845421-716f-401b-accd-ebbcb19d62d5",
                                    "answerConcept": {
                                        "uuid": "adecc97c-6583-4439-9c8d-06b552b10e1d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to nearly educational facilities/schools"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133357
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "798e31f8-a280-4953-b046-27c971af05be",
                                    "answerConcept": {
                                        "uuid": "834993e6-5643-4229-914d-a58df97cef30",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was no connectivity to the market"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133356
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "b8d5882e-9e9e-4f99-8022-ead1e3581c59",
                                    "answerConcept": {
                                        "uuid": "027da0d9-9fab-4d60-aea7-f232c386a7b7",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To protect community infrastructure from getting damaged"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133362
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "0b834dc1-5a03-4ec1-af20-e12aecaec2b3",
                                    "answerConcept": {
                                        "uuid": "20a4f33f-caa5-44ef-97dd-c39d50aade45",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was no meeting place for villagers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133351
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "425cd370-c0df-4f49-9944-4b533813f181",
                                    "answerConcept": {
                                        "uuid": "abb094e0-64f5-4058-9d56-0f270cb4add2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was limited/or no connectivity to nearby market facilities"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133353
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Access_Infrastructure"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 47.0,
                        "validFormat": null,
                        "name": "Access_Infrastructure",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "d744b05e-a663-44eb-9486-3c7bfce2f809",
                        "voided": false,
                        "concept": {
                            "uuid": "5c511e8d-8ebc-4471-b44b-e4c2898d9aad",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 6.0,
                                    "uuid": "ef447f09-2c92-4d27-867b-59bba58af65f",
                                    "answerConcept": {
                                        "uuid": "824d11d4-525d-4610-9afe-f87c030a54eb",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Check dam"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133378
                                },
                                {
                                    "order": 22.0,
                                    "uuid": "c8f055f5-2c02-42e3-b80b-9e19f037c1f4",
                                    "answerConcept": {
                                        "uuid": "b1dfb9e0-0bbc-448f-a6ce-aae2488b390e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Pond"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133376
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "4327975c-4015-4259-bd51-ae35679ed2a4",
                                    "answerConcept": {
                                        "uuid": "b462ddf4-977b-4bc5-8157-7f0132c5245d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Compost pit"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133408
                                },
                                {
                                    "order": 13.0,
                                    "uuid": "beff8e14-e8cd-44da-ac73-dcb323802ce3",
                                    "answerConcept": {
                                        "uuid": "ec39b654-3009-46ad-a2d4-2fda9f40d856",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Dustbin"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133400
                                },
                                {
                                    "order": 25.0,
                                    "uuid": "59ce7c76-ac57-43b7-b92c-30375ed5247e",
                                    "answerConcept": {
                                        "uuid": "f98bacd7-701e-49ce-a268-b3e83d8f194f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Road"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133402
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "0581ed44-da12-4518-8ef5-b1ebfd0de5ea",
                                    "answerConcept": {
                                        "uuid": "a44830b7-3271-4313-baea-b6dc4e9cd5ae",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Canal"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133388
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "b28da4a4-28bf-4246-a848-664c93f2a064",
                                    "answerConcept": {
                                        "uuid": "4ca95b4a-0d74-4bea-aac5-9f45da876178",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Community farming"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133392
                                },
                                {
                                    "order": 31.0,
                                    "uuid": "23d23535-70f2-47f7-be38-9e751a1bb7b8",
                                    "answerConcept": {
                                        "uuid": "62f4b7d6-4a4a-4064-aa0e-a0c21053eec2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Wall for roads"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133398
                                },
                                {
                                    "order": 36.0,
                                    "uuid": "eb968d68-bf38-44d5-ba60-f26f26d5cfaf",
                                    "answerConcept": {
                                        "uuid": "a7b922a1-a389-4ba1-94ca-59baf7a961d0",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Well"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133382
                                },
                                {
                                    "order": 19.0,
                                    "uuid": "0eec69e7-3903-4c30-967f-9f68907f712a",
                                    "answerConcept": {
                                        "uuid": "d7356902-e705-414d-99e4-f08b10fe7f73",
                                        "voided": true,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Land Bundling (voided~207458)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133386
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "92e364b1-2d04-4ad2-8f2c-ef8fe3726323",
                                    "answerConcept": {
                                        "uuid": "d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Community Hall/Center/House"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133380
                                },
                                {
                                    "order": 29.0,
                                    "uuid": "521a6a8d-725e-47ef-8296-da7772f03db4",
                                    "answerConcept": {
                                        "uuid": "3f7366d8-350c-4290-aa9e-e265eea76ae5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Toilet/Bathroom/private spaces"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133396
                                },
                                {
                                    "order": 9.0,
                                    "uuid": "9de9c0ec-f697-439d-adbc-edc07fea5124",
                                    "answerConcept": {
                                        "uuid": "58653f74-082c-47a7-9a25-548990a4bd4c",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Community spaces- Meeting point/ Religious places/ School/ Park & AWC etc"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133404
                                },
                                {
                                    "order": 21.0,
                                    "uuid": "1fc7442e-68dc-4d29-9378-841855441cf1",
                                    "answerConcept": {
                                        "uuid": "74d20d4a-8444-476c-9b7b-b5b4341bcf8e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Plantation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133399
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "2f94f3f6-5944-43a6-a458-f043a23c81eb",
                                    "answerConcept": {
                                        "uuid": "db432dbe-7aed-44e8-9385-42973b3cf7bb",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Benches"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133406
                                },
                                {
                                    "order": 16.0,
                                    "uuid": "2c25d02c-f54c-479f-859c-eca8b46f09b6",
                                    "answerConcept": {
                                        "uuid": "961b337f-fee4-4bed-a77a-83db71f1b5a2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Ground levelling"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133374
                                },
                                {
                                    "order": 24.0,
                                    "uuid": "31940800-ea65-4e60-a8e7-802f79184e57",
                                    "answerConcept": {
                                        "uuid": "00ee1a95-2236-4c43-83d7-36c911172069",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "River"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133387
                                },
                                {
                                    "order": 35.0,
                                    "uuid": "c70e252a-5a08-482b-be06-34abcb5fa1a6",
                                    "answerConcept": {
                                        "uuid": "a5f019c6-17a0-4536-8222-67935d482774",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Waterfall/Jharna/Spring Water/Dhara"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133381
                                },
                                {
                                    "order": 34.0,
                                    "uuid": "1d0c5a73-8903-402e-8b06-f56e678a31de",
                                    "answerConcept": {
                                        "uuid": "82246b7a-c13f-435d-9e17-d8d288ff3891",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water-Tank/Pipeline"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133389
                                },
                                {
                                    "order": 27.0,
                                    "uuid": "717d3c84-11e5-4e4d-b0ea-1c22096ea350",
                                    "answerConcept": {
                                        "uuid": "32699e9f-c289-4581-9781-24b2bdbb0841",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Seed ball"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133401
                                },
                                {
                                    "order": 18.0,
                                    "uuid": "e609f965-ac08-4ba5-a1ca-8e1376911fc3",
                                    "answerConcept": {
                                        "uuid": "9ada0111-bbea-4fde-8097-32ccc0de6c78",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Land Bunding"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133410
                                },
                                {
                                    "order": 32.0,
                                    "uuid": "594e87fd-2e6b-4798-a03c-73077cff448f",
                                    "answerConcept": {
                                        "uuid": "729f12d6-57dc-4b4f-a1cd-8c7e7c02db42",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water body premises"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133385
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "eaa7a8a3-2667-4575-8de1-e4d72d8ec231",
                                    "answerConcept": {
                                        "uuid": "f599df1e-a5e6-4f3e-b985-a196d55a3c73",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Bandstand"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133379
                                },
                                {
                                    "order": 5.0,
                                    "uuid": "e563337e-7166-414a-a4eb-1f1abf8983ba",
                                    "answerConcept": {
                                        "uuid": "0dfe3de6-6bb0-4514-9c8a-3fde7752c440",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Chapri/Dabri/Chari/Naula/Jhiriya/Kulam"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133383
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "d0f67b60-d31f-44d9-8d3f-ea3093f6e93a",
                                    "answerConcept": {
                                        "uuid": "1a4d980d-30ef-46e4-8b76-44da9002be6b",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Backwater"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133377
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "4d85d59c-420a-4006-9683-a8c771f5e302",
                                    "answerConcept": {
                                        "uuid": "3f0bd027-abf0-4beb-a7e7-9967d1994852",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Drainage"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133375
                                },
                                {
                                    "order": 14.0,
                                    "uuid": "f33f1fa3-f9fe-4eef-be95-94d22dc220e3",
                                    "answerConcept": {
                                        "uuid": "38dc542e-277d-4790-8982-0d2f3253f0fc",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Electric Pole"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133391
                                },
                                {
                                    "order": 28.0,
                                    "uuid": "fe7a87e2-79be-4bb1-8a59-0745bc4d74d2",
                                    "answerConcept": {
                                        "uuid": "be655900-d882-4d99-ab29-faf560b8e832",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Soak pit"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133390
                                },
                                {
                                    "order": 17.0,
                                    "uuid": "9dbd2c4e-be6f-4a51-8c01-52d959e721d7",
                                    "answerConcept": {
                                        "uuid": "a9375cc4-e115-4f06-aa6c-33b7b4217685",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Kitchen Garden"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133393
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "4f7324dd-fbeb-4c2b-af31-7c4a39065b32",
                                    "answerConcept": {
                                        "uuid": "61d8f60f-8496-4b6d-8d1a-9967e0ff024f",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Bridge/Pulia"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133397
                                },
                                {
                                    "order": 26.0,
                                    "uuid": "860ef05f-e82c-411a-8353-a542ad665793",
                                    "answerConcept": {
                                        "uuid": "ba6d69d5-bdb8-48bd-bd70-87e0b9848178",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Road & road-side bush cutting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133403
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "19146d9f-3e4a-4d7b-aab0-d9a5b8ba5aff",
                                    "answerConcept": {
                                        "uuid": "8cb3d890-db22-4c8b-885d-0cd71a0e4aad",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Dugwell/Chua/Jalkhund"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133394
                                },
                                {
                                    "order": 30.0,
                                    "uuid": "c1b174bc-0f6c-47a8-b3ad-de1b3739d373",
                                    "answerConcept": {
                                        "uuid": "8a4d7b13-598d-4a8a-83f6-72cbfb7c7911",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Truck Unloading"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133395
                                },
                                {
                                    "order": 23.0,
                                    "uuid": "b9f9d9e5-7df3-4568-8d9a-ccf638cdebf4",
                                    "answerConcept": {
                                        "uuid": "ec5c4214-ddd6-4146-8282-195f4d711c59",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Pond ghat / embankment"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133407
                                },
                                {
                                    "order": 37.0,
                                    "uuid": "298c06cc-3b77-4929-aa9b-94e17483be35",
                                    "answerConcept": {
                                        "uuid": "1162b0e5-7ccf-4eac-92b4-6e71898fa268",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Percolation pit"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 143787
                                },
                                {
                                    "order": 15.0,
                                    "uuid": "d7626f0a-4c79-474a-9956-1cd3394dbc54",
                                    "answerConcept": {
                                        "uuid": "f431cbac-b99d-48fb-8694-0299c352eb9a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Fencing & boundary wall"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133405
                                },
                                {
                                    "order": 20.0,
                                    "uuid": "4ab16d39-b713-440d-8ba9-19b26172a779",
                                    "answerConcept": {
                                        "uuid": "016a6d0a-60f9-405f-8dac-08fcf6b39823",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Others"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133409
                                },
                                {
                                    "order": 33.0,
                                    "uuid": "2583f995-e1e9-422b-ae5d-75c20c297269",
                                    "answerConcept": {
                                        "uuid": "8748bdc4-de26-4411-a9b4-269abf7fc6f5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water storage pit"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133384
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Activity sub type"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"452bc10f-09b4-446e-93f4-52d477885be0\").matches();\n    \n  const condition12 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"1b061e73-b94f-499d-b82c-234670e104c5\").matches();\n    \n  const condition13 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"fe6cd113-e3e3-44b6-abe7-81ba7605787b\").matches();\n    \n  const condition14 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"d0162f3e-d9a5-40e0-84e4-7130e8e732ee\").matches();\n    \n  const condition15 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnswerConceptName(\"f73d13a5-f6cf-4138-b4c6-849efbbe632f\").matches();\n    \n  const condition16 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"49be122c-b452-4b5c-ad77-bbf1fcf1ea3a\").containsAnyAnswerConceptName(\"452bc10f-09b4-446e-93f4-52d477885be0\",\"1b061e73-b94f-499d-b82c-234670e104c5\",\"fe6cd113-e3e3-44b6-abe7-81ba7605787b\",\"d0162f3e-d9a5-40e0-84e4-7130e8e732ee\",\"f73d13a5-f6cf-4138-b4c6-849efbbe632f\").matches();\n  \n  if(condition11 ) {\n    _.forEach([\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"0dfe3de6-6bb0-4514-9c8a-3fde7752c440\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"8cb3d890-db22-4c8b-885d-0cd71a0e4aad\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"a5f019c6-17a0-4536-8222-67935d482774\",\"82246b7a-c13f-435d-9e17-d8d288ff3891\",\"a7b922a1-a389-4ba1-94ca-59baf7a961d0\",\"be655900-d882-4d99-ab29-faf560b8e832\",\"ec39b654-3009-46ad-a2d4-2fda9f40d856\",\"3f7366d8-350c-4290-aa9e-e265eea76ae5\",\"58653f74-082c-47a7-9a25-548990a4bd4c\",\"3f0bd027-abf0-4beb-a7e7-9967d1994852\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"729f12d6-57dc-4b4f-a1cd-8c7e7c02db42\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"a9375cc4-e115-4f06-aa6c-33b7b4217685\",\"74d20d4a-8444-476c-9b7b-b5b4341bcf8e\",\"38dc542e-277d-4790-8982-0d2f3253f0fc\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\",\"b462ddf4-977b-4bc5-8157-7f0132c5245d\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\",\"32699e9f-c289-4581-9781-24b2bdbb0841\",\"8748bdc4-de26-4411-a9b4-269abf7fc6f5\",\"1162b0e5-7ccf-4eac-92b4-6e71898fa268\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition12 ) {\n    _.forEach([\"f599df1e-a5e6-4f3e-b985-a196d55a3c73\",\"db432dbe-7aed-44e8-9385-42973b3cf7bb\",\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb\",\"f431cbac-b99d-48fb-8694-0299c352eb9a\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"961b337f-fee4-4bed-a77a-83db71f1b5a2\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\",\"ec39b654-3009-46ad-a2d4-2fda9f40d856\",\"3f7366d8-350c-4290-aa9e-e265eea76ae5\",\"58653f74-082c-47a7-9a25-548990a4bd4c\",\"3f0bd027-abf0-4beb-a7e7-9967d1994852\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"729f12d6-57dc-4b4f-a1cd-8c7e7c02db42\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"a9375cc4-e115-4f06-aa6c-33b7b4217685\",\"74d20d4a-8444-476c-9b7b-b5b4341bcf8e\",\"38dc542e-277d-4790-8982-0d2f3253f0fc\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\",\"b462ddf4-977b-4bc5-8157-7f0132c5245d\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"32699e9f-c289-4581-9781-24b2bdbb0841\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition13 ) {\n    _.forEach([\"f599df1e-a5e6-4f3e-b985-a196d55a3c73\",\"db432dbe-7aed-44e8-9385-42973b3cf7bb\",\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb\",\"f431cbac-b99d-48fb-8694-0299c352eb9a\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"961b337f-fee4-4bed-a77a-83db71f1b5a2\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\",\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"0dfe3de6-6bb0-4514-9c8a-3fde7752c440\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"8cb3d890-db22-4c8b-885d-0cd71a0e4aad\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"a5f019c6-17a0-4536-8222-67935d482774\",\"82246b7a-c13f-435d-9e17-d8d288ff3891\",\"a7b922a1-a389-4ba1-94ca-59baf7a961d0\",\"be655900-d882-4d99-ab29-faf560b8e832\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"a9375cc4-e115-4f06-aa6c-33b7b4217685\",\"74d20d4a-8444-476c-9b7b-b5b4341bcf8e\",\"38dc542e-277d-4790-8982-0d2f3253f0fc\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\",\"b462ddf4-977b-4bc5-8157-7f0132c5245d\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\",\"32699e9f-c289-4581-9781-24b2bdbb0841\",\"8748bdc4-de26-4411-a9b4-269abf7fc6f5\",\"1162b0e5-7ccf-4eac-92b4-6e71898fa268\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition14 ) {\n    _.forEach([\"f599df1e-a5e6-4f3e-b985-a196d55a3c73\",\"db432dbe-7aed-44e8-9385-42973b3cf7bb\",\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb\",\"f431cbac-b99d-48fb-8694-0299c352eb9a\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"961b337f-fee4-4bed-a77a-83db71f1b5a2\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\",\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"0dfe3de6-6bb0-4514-9c8a-3fde7752c440\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"8cb3d890-db22-4c8b-885d-0cd71a0e4aad\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"a5f019c6-17a0-4536-8222-67935d482774\",\"82246b7a-c13f-435d-9e17-d8d288ff3891\",\"a7b922a1-a389-4ba1-94ca-59baf7a961d0\",\"be655900-d882-4d99-ab29-faf560b8e832\",\"ec39b654-3009-46ad-a2d4-2fda9f40d856\",\"3f7366d8-350c-4290-aa9e-e265eea76ae5\",\"58653f74-082c-47a7-9a25-548990a4bd4c\",\"3f0bd027-abf0-4beb-a7e7-9967d1994852\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"729f12d6-57dc-4b4f-a1cd-8c7e7c02db42\",\"38dc542e-277d-4790-8982-0d2f3253f0fc\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\",\"8748bdc4-de26-4411-a9b4-269abf7fc6f5\",\"1162b0e5-7ccf-4eac-92b4-6e71898fa268\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition15 ) {\n    _.forEach([\"f599df1e-a5e6-4f3e-b985-a196d55a3c73\",\"db432dbe-7aed-44e8-9385-42973b3cf7bb\",\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb\",\"f431cbac-b99d-48fb-8694-0299c352eb9a\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"961b337f-fee4-4bed-a77a-83db71f1b5a2\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\",\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"0dfe3de6-6bb0-4514-9c8a-3fde7752c440\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"8cb3d890-db22-4c8b-885d-0cd71a0e4aad\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"a5f019c6-17a0-4536-8222-67935d482774\",\"82246b7a-c13f-435d-9e17-d8d288ff3891\",\"a7b922a1-a389-4ba1-94ca-59baf7a961d0\",\"be655900-d882-4d99-ab29-faf560b8e832\",\"ec39b654-3009-46ad-a2d4-2fda9f40d856\",\"58653f74-082c-47a7-9a25-548990a4bd4c\",\"3f0bd027-abf0-4beb-a7e7-9967d1994852\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"729f12d6-57dc-4b4f-a1cd-8c7e7c02db42\",\"b462ddf4-977b-4bc5-8157-7f0132c5245d\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"a9375cc4-e115-4f06-aa6c-33b7b4217685\",\"74d20d4a-8444-476c-9b7b-b5b4341bcf8e\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"3f7366d8-350c-4290-aa9e-e265eea76ae5\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\",\"8748bdc4-de26-4411-a9b4-269abf7fc6f5\",\"32699e9f-c289-4581-9781-24b2bdbb0841\",\"1162b0e5-7ccf-4eac-92b4-6e71898fa268\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    visibility = condition16 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 14.0,
                        "validFormat": null,
                        "name": "Activity sub type",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": {
                            "mandatory": true,
                            "group": null,
                            "uuid": "5d8aa3b7-ef6c-488b-bb1a-19572054868d",
                            "voided": true,
                            "concept": {
                                "uuid": "6e6fe7fc-0cf0-4b68-93a6-7b95e12fd08c",
                                "voided": true,
                                "dataType": "QuestionGroup",
                                "keyValues": null,
                                "conceptAnswers": [],
                                "highAbsolute": null,
                                "lowAbsolute": null,
                                "highNormal": null,
                                "lowNormal": null,
                                "unit": null,
                                "name": "Objective of work (voided~207476)"
                            },
                            "keyValues": [],
                            "rule": null,
                            "displayOrder": 42.0,
                            "validFormat": null,
                            "name": "Objective of work",
                            "type": "SingleSelect"
                        },
                        "uuid": "0a09518a-e6ac-47ae-ba64-ff93ece6b0e6",
                        "voided": true,
                        "concept": {
                            "uuid": "dc829fd5-0c19-4223-93a0-c29b8919dcc9",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 5.0,
                                    "uuid": "bcfa8b84-70de-4931-a36e-bd837d4e626e",
                                    "answerConcept": {
                                        "uuid": "18121e37-b6e6-4301-a61b-4ccad01d1aad",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To ensure better nutrition to pregnant and lactating mother, hence kitchen garden"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133455
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "92b7ead1-5e72-4bb0-bd72-eea1b83bd618",
                                    "answerConcept": {
                                        "uuid": "448ebcb5-6974-43b7-8d9b-67002770e1b5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was shortage of vegetables in the village/to improve availability of vegetables in the village, hence kitchen garden"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133447
                                },
                                {
                                    "order": 9.0,
                                    "uuid": "14b413dd-8d1d-4875-b5de-6e4d8282255e",
                                    "answerConcept": {
                                        "uuid": "508c3b0b-9ba2-44a5-b8e4-9c82713368a4",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To improve grazing facilities for livestock"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133458
                                },
                                {
                                    "order": 11.0,
                                    "uuid": "36a56952-5887-4379-a9d5-700e9842e7d8",
                                    "answerConcept": {
                                        "uuid": "6e387d83-5663-458a-b69a-4eb2252e0594",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To construct partitions to demarcate areas"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133456
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "cd89548c-c95a-4cdb-9347-6ce0dde642b6",
                                    "answerConcept": {
                                        "uuid": "a2a28a0e-6458-4d8e-8fa7-4e9179c29e2d",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Water needed to be conserved, hence planted trees"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133453
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "5d77d23c-9cbf-4135-8a06-f16d6113986f",
                                    "answerConcept": {
                                        "uuid": "5ffcc7bd-a725-43dc-a7bf-e6bee3b4d478",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To augment supply of vegetables in the mid-day meals of children, hence kitchen garden in aaganwadi/school"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133457
                                },
                                {
                                    "order": 10.0,
                                    "uuid": "f6a8163c-dc1c-4504-9467-17816504ece8",
                                    "answerConcept": {
                                        "uuid": "9359f1ad-5024-4464-8cea-39579c1468ec",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To decrease the impact of deforestation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133451
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "244ba2bf-af6f-475f-bca2-2616e7c5485b",
                                    "answerConcept": {
                                        "uuid": "75813429-7612-49f9-b159-e746c38be9da",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "The crops needed organic manure hence composting"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133450
                                },
                                {
                                    "order": 8.0,
                                    "uuid": "bd2a0c15-d583-4b04-8f99-74e1e1f9d66a",
                                    "answerConcept": {
                                        "uuid": "14c72422-9cfc-49f4-a835-7ab131dd3190",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To improve agricultural productivity"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133452
                                },
                                {
                                    "order": 7.0,
                                    "uuid": "d2c58f01-9edd-4b10-9417-2fe9bec96fb8",
                                    "answerConcept": {
                                        "uuid": "f674eee6-c577-4807-a5c2-b7bfa6d1c516",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To improve water retention capacity"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133448
                                },
                                {
                                    "order": 6.0,
                                    "uuid": "97f58338-43bc-487f-824e-95b8ab4d00f1",
                                    "answerConcept": {
                                        "uuid": "e369cc1c-1ce2-4b84-b4bd-e827eccdfcb5",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "To increase incomes in the village from sales of vegetables"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133449
                                },
                                {
                                    "order": 12.0,
                                    "uuid": "981a08ed-140e-4dac-8d0c-806e45877de4",
                                    "answerConcept": {
                                        "uuid": "f9a72c48-3238-441d-a1de-2d8cd938dc22",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Any other not given above"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133446
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "f93eb5f9-852b-428d-a37b-5f7b5f9b6cef",
                                    "answerConcept": {
                                        "uuid": "07557c41-b1e1-47fd-8a16-d3dc5363a16e",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "There was soil erosion due to heavy water flow hence need for plantation"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133454
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Agriculture_Plantation"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 45.0,
                        "validFormat": null,
                        "name": "Agriculture_Plantation",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "5d8aa3b7-ef6c-488b-bb1a-19572054868d",
                        "voided": true,
                        "concept": {
                            "uuid": "6e6fe7fc-0cf0-4b68-93a6-7b95e12fd08c",
                            "voided": true,
                            "dataType": "QuestionGroup",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Objective of work (voided~207476)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 42.0,
                        "validFormat": null,
                        "name": "Objective of work",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "956eabce-b684-4289-848e-fe648d7ee684",
                        "voided": true,
                        "concept": {
                            "uuid": "526b0d5d-51cc-4004-8c12-7a6c71c6c516",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of Participants (Male)"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"d04d6382-91d2-468c-b45f-d3afce94cba2\").containsAnswerConceptNameOtherThan(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 18.0,
                        "validFormat": null,
                        "name": "Number of participants (Male)",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "4ff2dd40-32b5-436c-9670-5f93a7e2dca3",
                        "voided": false,
                        "concept": {
                            "uuid": "b250eea7-f1e7-42de-a57c-4e30b49b1c22",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "No of working days"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"85eda3f4-ee7c-4123-b330-77b4a7f817fd\").matches();\nconst condition12 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"8c938361-485e-4b5a-9643-51b741905fd8\").defined.matches();\nconst condition22 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"2e85dffe-c09e-4adb-a1b2-41f59aa68d49\").defined.matches();\nvisibility = condition11 ;\nif(condition12 && condition22 ){\n    let activityStartDateObservation = individual.findObservation('8c938361-485e-4b5a-9643-51b741905fd8');\n    let activityStartDateValue = _.isEmpty(activityStartDateObservation) ? activityStartDateObservation : moment(activityStartDateObservation.getReadableValue());\n    let activityEndDateObservation = individual.findObservation('2e85dffe-c09e-4adb-a1b2-41f59aa68d49');\n    let activityEndDateValue = _.isEmpty(activityEndDateObservation) ? activityEndDateObservation : moment(activityEndDateObservation.getReadableValue());\n    let difference = activityEndDateValue.diff((activityStartDateValue), 'days') + 1;\n    console.log(activityStartDateValue, activityEndDateValue, difference);\n    const condition31 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"b250eea7-f1e7-42de-a57c-4e30b49b1c22\").greaterThan(difference).matches();\n    if(condition31 ){\n        validationErrors.push(`No of working days should not be greater than ${difference}`);\n    }\n}\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 17.0,
                        "validFormat": null,
                        "name": "No of working days",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "da05ee05-fcf1-4fbe-a5b9-6ac564acb732",
                        "voided": true,
                        "concept": {
                            "uuid": "2966afcc-2c07-44cf-8711-3fc23f52a6b5",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of Participants (Female)"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"d04d6382-91d2-468c-b45f-d3afce94cba2\").containsAnswerConceptNameOtherThan(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 25.0,
                        "validFormat": null,
                        "name": "Number of participants (Female)",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "d1dbb6b3-8f28-422e-b99f-18925fe83583",
                        "voided": true,
                        "concept": {
                            "uuid": "c03c7864-8fbb-4557-907a-1047092bdc37",
                            "voided": true,
                            "dataType": "Location",
                            "keyValues": [
                                {
                                    "key": "isWithinCatchment",
                                    "value": true
                                },
                                {
                                    "key": "lowestAddressLevelTypeUUIDs",
                                    "value": [
                                        "3410e7a2-cefe-4fc7-94b4-6631656c548c"
                                    ]
                                },
                                {
                                    "key": "highestAddressLevelTypeUUID",
                                    "value": "fda77dde-6346-47b9-84e0-25e7f171f55a"
                                }
                            ],
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Address (voided~220053)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 1.0,
                        "validFormat": null,
                        "name": "Address",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "6a348307-8583-40da-9811-e8b10c347480",
                        "voided": false,
                        "concept": {
                            "uuid": "f5cc0324-9b14-42d8-b704-8cb2c5592a48",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Number of Participants"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 20.0,
                        "validFormat": null,
                        "name": "Number of participants",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "cc47d0bb-90c2-4e30-82e6-b3edf1cfa88c",
                        "voided": false,
                        "concept": {
                            "uuid": "2978117c-a297-4171-99c6-23c3522ca0f8",
                            "voided": false,
                            "dataType": "Text",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Account  name"
                        },
                        "keyValues": [],
                        "rule": "",
                        "displayOrder": 7.0,
                        "validFormat": null,
                        "name": "Account  name",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "fa22989f-c836-4e60-8269-7019ade176de",
                        "voided": false,
                        "concept": {
                            "uuid": "de182013-d8c6-4b2f-a474-7033bda1d518",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 2.0,
                                    "uuid": "cdc95746-eaac-4416-ab13-5ea9f6d6f8cb",
                                    "answerConcept": {
                                        "uuid": "c5c22ebd-f12a-4ee7-8718-297225204ca6",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Tuition / Training / vocational center"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141245
                                },
                                {
                                    "order": 0.0,
                                    "uuid": "418d11ec-f282-4f6c-b4a4-c20f5357228a",
                                    "answerConcept": {
                                        "uuid": "353a5c77-6b72-4aac-8c49-c2fdd0abad10",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "School"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141246
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "c9099900-8db2-4808-9eb3-7f14bcad8bdc",
                                    "answerConcept": {
                                        "uuid": "db17de4f-d7f6-4ab3-afd6-6231a874890a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Anganwadi"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 141247
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Type of school"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptName(\"9fd9d626-faf7-4833-a3ab-47ec3b4388f6\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 33.0,
                        "validFormat": null,
                        "name": "Type of school",
                        "type": "SingleSelect"
                    }
                ],
                "displayOrder": 3.0,
                "name": "Activity Details"
            },
            {
                "uuid": "76d294bc-eee0-495b-a698-f7551247e96d",
                "voided": false,
                "rule": "'use strict';\n({params, imports}) => {\n    const individual = params.entity;\n    const moment = imports.moment;\n    const formElementGroup = params.formElementGroup;\n    const _ = imports.lodash;\n    let visibility = true;\n    return formElementGroup.formElements.map((formElement) => {\n        \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"f431cbac-b99d-48fb-8694-0299c352eb9a\",\"961b337f-fee4-4bed-a77a-83db71f1b5a2\",\"016a6d0a-60f9-405f-8dac-08fcf6b39823\",\"58653f74-082c-47a7-9a25-548990a4bd4c\",\"82246b7a-c13f-435d-9e17-d8d288ff3891\",\"a5f019c6-17a0-4536-8222-67935d482774\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\").matches();\n  \n  const condition21 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5df1e2e2-2bd1-40ee-a430-9dd3f9618eeb\").containsAnswerConceptNameOtherThan(\"85eda3f4-ee7c-4123-b330-77b4a7f817fd\").matches();\n  \n        visibility = !(condition11 || condition21 );\n  \n        return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, null);\n    });\n};",
                "applicableFormElements": [
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "c212f32a-df88-40d3-8730-59d74aaa06d4",
                        "voided": true,
                        "concept": {
                            "uuid": "acf809e2-30ba-49ab-9119-a344cc5ea7cb",
                            "voided": true,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Breadth (voided~207550)"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 6.0,
                        "validFormat": null,
                        "name": "Breadth",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "79eee4ce-9755-4b07-9cdc-54e211cfbac1",
                        "voided": true,
                        "concept": {
                            "uuid": "d4c428d1-512f-4881-87f0-611d7746dd6c",
                            "voided": true,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Numbers (voided~207563)"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInEncounter(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"23598869-15a8-43d3-a8f3-4f75b372cdc1\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 3.0,
                        "validFormat": null,
                        "name": "Nos",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "2c7e0bfb-3653-44a5-9576-fb55999bc0fa",
                        "voided": false,
                        "concept": {
                            "uuid": "4542ba21-0801-416b-b739-9ca6707dc4b4",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": "Feet",
                            "name": "Height / Depth"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\").matches();\n  \n  const condition21 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\").matches();\n  \n  const condition31 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnyAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition41 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\").matches();\n  \n  const condition51 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\",\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\").matches();\n  \n  const condition61 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"700c0785-7f52-43b4-917d-e1c482c62db2\").matches();\n  \n  const condition71 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"a7b922a1-a389-4ba1-94ca-59baf7a961d0\").matches();\n  \n  const condition81 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition91 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"700c0785-7f52-43b4-917d-e1c482c62db2\").matches();\n  \n  visibility = condition11 && condition21 && condition31 || condition41 && condition51 && condition61 || condition71 && condition81 && condition91 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 7.0,
                        "validFormat": null,
                        "name": "Height / Depth",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "f949b826-d66d-43a3-a294-65fcd49577ce",
                        "voided": true,
                        "concept": {
                            "uuid": "09ee602c-ed75-4df9-b0c2-04f6adbcd199",
                            "voided": true,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Height (voided~207551)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 11.0,
                        "validFormat": null,
                        "name": "Height",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "4952ad67-05bb-4ef3-8987-1f7f092de647",
                        "voided": false,
                        "concept": {
                            "uuid": "c0d271f6-ec81-4c09-9dbf-a99f559788e5",
                            "voided": false,
                            "dataType": "Coded",
                            "keyValues": null,
                            "conceptAnswers": [
                                {
                                    "order": 0.0,
                                    "uuid": "f90d0287-fc23-4888-ab5f-5c031bd31084",
                                    "answerConcept": {
                                        "uuid": "96452733-db5e-4e82-8e75-8ef8a308ea8a",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Area"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133598
                                },
                                {
                                    "order": 4.0,
                                    "uuid": "d5ac0406-fd24-438c-88b5-e330e0a6e3a0",
                                    "answerConcept": {
                                        "uuid": "700c0785-7f52-43b4-917d-e1c482c62db2",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Volume"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133599
                                },
                                {
                                    "order": 1.0,
                                    "uuid": "31d62b86-75b8-4f08-b4af-47306dd2230f",
                                    "answerConcept": {
                                        "uuid": "23598869-15a8-43d3-a8f3-4f75b372cdc1",
                                        "voided": false,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Numbers"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": false,
                                    "id": 133600
                                },
                                {
                                    "order": 2.0,
                                    "uuid": "adca6a0b-9f60-4380-a873-b7ea282238b6",
                                    "answerConcept": {
                                        "uuid": "61848cd7-b583-4640-b426-331de38417ee",
                                        "voided": true,
                                        "dataType": "NA",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Numbers (voided~207468)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133601
                                },
                                {
                                    "order": 3.0,
                                    "uuid": "09a14fbd-4f54-47a4-ba88-1f79780a434f",
                                    "answerConcept": {
                                        "uuid": "d4c428d1-512f-4881-87f0-611d7746dd6c",
                                        "voided": true,
                                        "dataType": "Numeric",
                                        "keyValues": null,
                                        "highAbsolute": null,
                                        "lowAbsolute": null,
                                        "highNormal": null,
                                        "lowNormal": null,
                                        "unit": null,
                                        "name": "Numbers (voided~207563)"
                                    },
                                    "abnormal": false,
                                    "unique": false,
                                    "voided": true,
                                    "id": 133597
                                }
                            ],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Measurements Type"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\",\"3f0bd027-abf0-4beb-a7e7-9967d1994852\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"a7b922a1-a389-4ba1-94ca-59baf7a961d0\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"8a4d7b13-598d-4a8a-83f6-72cbfb7c7911\",\"016a6d0a-60f9-405f-8dac-08fcf6b39823\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\").matches();\n    \n  const condition12 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\",\"3f0bd027-abf0-4beb-a7e7-9967d1994852\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"00ee1a95-2236-4c43-83d7-36c911172069\").matches();\n    \n  const condition13 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"f599df1e-a5e6-4f3e-b985-a196d55a3c73\",\"db432dbe-7aed-44e8-9385-42973b3cf7bb\",\"d5a9fcb4-51aa-4d4c-865c-a7854bea0dcb\",\"ec39b654-3009-46ad-a2d4-2fda9f40d856\",\"3f7366d8-350c-4290-aa9e-e265eea76ae5\",\"729f12d6-57dc-4b4f-a1cd-8c7e7c02db42\",\"b462ddf4-977b-4bc5-8157-7f0132c5245d\",\"a9375cc4-e115-4f06-aa6c-33b7b4217685\",\"74d20d4a-8444-476c-9b7b-b5b4341bcf8e\",\"be655900-d882-4d99-ab29-faf560b8e832\",\"0dfe3de6-6bb0-4514-9c8a-3fde7752c440\",\"8cb3d890-db22-4c8b-885d-0cd71a0e4aad\",\"be655900-d882-4d99-ab29-faf560b8e832\",\"38dc542e-277d-4790-8982-0d2f3253f0fc\",\"32699e9f-c289-4581-9781-24b2bdbb0841\",\"8748bdc4-de26-4411-a9b4-269abf7fc6f5\").matches();\n    \n  const condition14 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\").matches();\n  \n  if(condition11 ) {\n    _.forEach([\"23598869-15a8-43d3-a8f3-4f75b372cdc1\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition12 ) {\n    _.forEach([\"23598869-15a8-43d3-a8f3-4f75b372cdc1\",\"700c0785-7f52-43b4-917d-e1c482c62db2\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition13 ) {\n    _.forEach([\"96452733-db5e-4e82-8e75-8ef8a308ea8a\",\"700c0785-7f52-43b4-917d-e1c482c62db2\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n    if(condition14 ) {\n    _.forEach([\"96452733-db5e-4e82-8e75-8ef8a308ea8a\"], (answer) => {\n        const answerToSkip = formElement.getAnswerWithConceptUuid(answer);\n        if (answerToSkip) answersToSkip.push(answerToSkip);\n    });\n};\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 1.0,
                        "validFormat": null,
                        "name": "Measurements type",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "52eabb72-e4df-4abd-bba1-49b8d8252834",
                        "voided": true,
                        "concept": {
                            "uuid": "a32d438f-ecd6-4f7a-9753-d42f923f743a",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Height"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 8.0,
                        "validFormat": null,
                        "name": "Height",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "08e9beef-88c3-48de-9fc9-6c1f3a0bf0fe",
                        "voided": true,
                        "concept": {
                            "uuid": "7405d9a6-465b-4e74-a6bb-4e4b93b1856c",
                            "voided": true,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Diameter (voided~207552)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 12.0,
                        "validFormat": null,
                        "name": "Diameter",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "a53daa4f-03a2-4c57-a83c-33b8f8da1b94",
                        "voided": true,
                        "concept": {
                            "uuid": "f82fa2e6-19a0-4ef8-886f-e485dc677925",
                            "voided": true,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Depth (voided~207553)"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 13.0,
                        "validFormat": null,
                        "name": "Depth",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "a2c82fd7-1072-4d62-97a0-1ff8c1dd14e8",
                        "voided": false,
                        "concept": {
                            "uuid": "614c185c-7f63-406d-9f2a-6619564947f4",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Diameter"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"a7b922a1-a389-4ba1-94ca-59baf7a961d0\").matches();\n  \n  const condition21 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition31 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnyAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\",\"700c0785-7f52-43b4-917d-e1c482c62db2\").matches();\n  \n  visibility = condition11 && condition21 && condition31 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 9.0,
                        "validFormat": null,
                        "name": "Diameter",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "0146d0d9-c277-4eb9-ab17-a48fa032fbd0",
                        "voided": false,
                        "concept": {
                            "uuid": "1197d309-c9a1-4d65-8e45-61bfd6f01aee",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": "Feet",
                            "name": "Breadth"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\").matches();\n  \n  const condition21 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\").matches();\n  \n  const condition31 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition41 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"3f0bd027-abf0-4beb-a7e7-9967d1994852\").matches();\n  \n  const condition51 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition61 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition71 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\").matches();\n  \n  const condition81 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition91 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition101 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\").matches();\n  \n  const condition111 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnswerConceptName(\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition121 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition131 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\").matches();\n  \n  const condition141 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\",\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\").matches();\n  \n  const condition151 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"700c0785-7f52-43b4-917d-e1c482c62db2\").matches();\n  \n  visibility = condition11 && condition21 && condition31 || condition41 && condition51 && condition61 || condition71 && condition81 && condition91 || condition101 && condition111 && condition121 || condition131 && condition141 && condition151 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 5.0,
                        "validFormat": null,
                        "name": "Breadth",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": false,
                        "group": null,
                        "uuid": "452c8209-e773-4c4c-b0bd-1c6bef90d0d3",
                        "voided": true,
                        "concept": {
                            "uuid": "ad7e9f42-d8b9-420b-b281-f5fc9cee43ef",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Depth"
                        },
                        "keyValues": [],
                        "rule": null,
                        "displayOrder": 10.0,
                        "validFormat": null,
                        "name": "Depth",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "bce223bb-c9f4-49eb-81d9-57895c79a03c",
                        "voided": false,
                        "concept": {
                            "uuid": "7ea0b0c5-e593-44ac-80f0-e675a53d1d4a",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": "Feet",
                            "name": "Length"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"61d8f60f-8496-4b6d-8d1a-9967e0ff024f\",\"f98bacd7-701e-49ce-a268-b3e83d8f194f\",\"4ca95b4a-0d74-4bea-aac5-9f45da876178\",\"9ada0111-bbea-4fde-8097-32ccc0de6c78\",\"62f4b7d6-4a4a-4064-aa0e-a0c21053eec2\").matches();\n  \n  const condition21 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition31 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition41 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\").matches();\n  \n  const condition51 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\",\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\").matches();\n  \n  const condition61 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition71 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"3f0bd027-abf0-4beb-a7e7-9967d1994852\").matches();\n  \n  const condition81 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\",\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition91 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition101 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnswerConceptName(\"ba6d69d5-bdb8-48bd-bd70-87e0b9848178\").matches();\n  \n  const condition111 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnswerConceptName(\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\").matches();\n  \n  const condition121 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"96452733-db5e-4e82-8e75-8ef8a308ea8a\").matches();\n  \n  const condition131 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"5c511e8d-8ebc-4471-b44b-e4c2898d9aad\").containsAnyAnswerConceptName(\"a44830b7-3271-4313-baea-b6dc4e9cd5ae\",\"1a4d980d-30ef-46e4-8b76-44da9002be6b\",\"b1dfb9e0-0bbc-448f-a6ce-aae2488b390e\",\"00ee1a95-2236-4c43-83d7-36c911172069\",\"824d11d4-525d-4610-9afe-f87c030a54eb\",\"ec5c4214-ddd6-4146-8282-195f4d711c59\").matches();\n  \n  const condition141 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"886b5ade-d1b0-4919-b9a4-cd4141fca178\").containsAnyAnswerConceptName(\"b66fa362-b975-4f0e-a7b2-9b0c37205c54\",\"cf0e9df1-cc8d-48e9-94b6-6ec3a13b09a3\",\"95882ddd-13f3-4ea8-b7f2-026e332bdc06\").matches();\n  \n  const condition151 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"700c0785-7f52-43b4-917d-e1c482c62db2\").matches();\n  \n  visibility = condition11 && condition21 && condition31 || condition41 && condition51 && condition61 || condition71 && condition81 && condition91 || condition101 && condition111 && condition121 || condition131 && condition141 && condition151 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 4.0,
                        "validFormat": null,
                        "name": "Length",
                        "type": "SingleSelect"
                    },
                    {
                        "mandatory": true,
                        "group": null,
                        "uuid": "29046aa8-8497-497c-a437-f89f4adcb43c",
                        "voided": false,
                        "concept": {
                            "uuid": "c8d91a28-238d-40ad-a26b-1be059c47863",
                            "voided": false,
                            "dataType": "Numeric",
                            "keyValues": null,
                            "conceptAnswers": [],
                            "highAbsolute": null,
                            "lowAbsolute": null,
                            "highNormal": null,
                            "lowNormal": null,
                            "unit": null,
                            "name": "Nos"
                        },
                        "keyValues": [],
                        "rule": "'use strict';\n({params, imports}) => {\n  const individual = params.entity;\n  const moment = imports.moment;\n  const formElement = params.formElement;\n  const _ = imports.lodash;\n  let visibility = true;\n  let value = null;\n  let answersToSkip = [];\n  let validationErrors = [];\n  \n  const condition11 = new imports.rulesConfig.RuleCondition({individual, formElement}).when.valueInRegistration(\"c0d271f6-ec81-4c09-9dbf-a99f559788e5\").containsAnswerConceptName(\"23598869-15a8-43d3-a8f3-4f75b372cdc1\").matches();\n  \n  visibility = condition11 ;\n  \n  return new imports.rulesConfig.FormElementStatus(formElement.uuid, visibility, value, answersToSkip, validationErrors);\n};",
                        "displayOrder": 2.0,
                        "validFormat": null,
                        "name": "Nos",
                        "type": "SingleSelect"
                    }
                ],
                "displayOrder": 4.0,
                "name": "Measurement"
            }
        ],
        "name": "Activity Registration"
    }
    const formElementGroups = forms.formElementGroups;
    await Promise.all(
      formElementGroups.map(
        async (formjson: { applicableFormElements: any }) => {
          let applicableFormElements = formjson.applicableFormElements;
          await Promise.all(
            applicableFormElements.map(
              async (element: {
                voided: boolean;
                concept: { uuid: string; dataType: any };
              }) => {
                if (element.voided === false) {
                  const dataType = element.concept.dataType;
                  const isDateType = dataType === "Date";
                  const isDateTimeType = dataType === "DateTime";
                  const isNumericType = dataType === "Numeric";
                  const isCodedType = dataType === "Coded";
                  const isNotesType = dataType === "Notes";
                  const isTextType = dataType === "Text";
                   if (
                       isDateType ||
                       isDateTimeType ||
                       isNumericType ||
                       isCodedType ||
                       isNotesType ||
                       isTextType
                   ) {
                       const exists = filteredConcept.some(
                       (concept: { uuid: string }) =>
                           concept.uuid === element.concept.uuid
                       );
                       if (!exists) {
                       filteredConcept.push(element.concept);
                       }
                   }
                }
              }
            )
           );
         }
       )
    );
    return filteredConcept;
   }
  useEffect(() => {
    const formTypeArray = ["IndividualProfile", "ProgramEnrolment", "ProgramEncounter", "Encounter"]
    const data = async () => {
      if (selectedProgramUUID.length > 0 && selectedSubjectUUID.length > 0 && selectedEncounterTypeUUID.length > 0) {
        const filteredConcepts: any[] = [];
        await Promise.all(
          formsData.map(async (element: any) => {
            if (
              formTypeArray.includes(element.formType )
            ) {
                if (
                  selectedProgramUUID.some(
                    (uuid) => uuid === element.programUUID
                  ) &&
                  selectedSubjectUUID.some(
                    (uuid) => uuid === element.subjectTypeUUID
                  )&&
                  selectedEncounterTypeUUID.some(
                    (uuid: any) => uuid === element.encounterTypeUUID
                  )
                ) {
                  await getConceptData(element.formUUID, filteredConcepts)
              }
            }  
        }));
        setConceptData(filteredConcepts);
      }
     else if (selectedProgramUUID.length > 0 && selectedSubjectUUID.length > 0) {
        const filteredConcepts: any[] = [];
        await Promise.all(
          formsData.map(async (element: any) => {
            if (
              formTypeArray.includes(element.formType )
            ) {
                if (
                  selectedProgramUUID.some(
                    (uuid) => uuid === element.programUUID
                  ) &&
                  selectedSubjectUUID.some(
                    (uuid) => uuid === element.subjectTypeUUID
                  )
                ) {
                  await getConceptData(element.formUUID, filteredConcepts)

                }
            }  
        }));
        setConceptData(filteredConcepts);
      }
      else if (selectedEncounterTypeUUID.length > 0 && selectedSubjectUUID.length > 0) {
        const filteredConcepts: any[] = [];
        await Promise.all(
          formsData.map(async (element: any) => {
            if (
              formTypeArray.includes(element.formType )
            ) {
                if (
                  selectedEncounterTypeUUID.some(
                    (uuid: any) => uuid === element.encounterTypeUUID
                  ) &&
                  selectedSubjectUUID.some(
                    (uuid) => uuid === element.subjectTypeUUID
                  )
                ) {
                  await getConceptData(element.formUUID, filteredConcepts)
              }
            }  
        }));
        setConceptData(filteredConcepts);
      }
      else if ( selectedSubjectUUID.length > 0) {
        const filteredConcepts: any[] = [];
        await Promise.all(
          formsData.map(async (element: any) => {
            if (
              formTypeArray.includes(element.formType )
            ) {
                if (
                  
                  selectedSubjectUUID.some(
                    (uuid) => uuid === element.subjectTypeUUID
                  )
                ) {
                  await getConceptData(element.formUUID, filteredConcepts)
              }
            }  
        }));
        setConceptData(filteredConcepts);
      }
    };
    data();
  }, [formsData, selectedProgramUUID, selectedSubjectUUID, selectedEncounterTypeUUID]);
  
  useEffect(() => {
    if (selectedFormSubject) {
      const formMappingsWithProgramUUID = programFilter.filter((mapping: { uuid: any; }) =>
        selectedFormSubject.some(
          (selectedFormSubject: { programUUID: any; }) =>
            selectedFormSubject.programUUID === mapping.uuid
        )
      );
      setShowProgram(formMappingsWithProgramUUID);
    } else {
      setShowProgram([]);
    }
  }, [selectedFormSubject, programFilter]);

  useEffect(()=>{
    const encounters = formsData.filter((form:any) => {
      return form.programUUID === undefined && form.subjectTypeUUID !== undefined && form.encounterTypeUUID !== undefined;
    });
    if(encounters && selectedSubjectUUID){
      const encounterWithSubject = encounters.filter(
        (encounters: { subjectTypeUUID: any }) =>
          selectedSubjectUUID.includes(encounters.subjectTypeUUID)
      );
      const encounterUUIDs = encounterWithSubject.map((encounter: { encounterTypeUUID: any; }) => encounter.encounterTypeUUID);
      const filteredEncounters = encounterFilter.filter((mapping: { uuid: any; }) =>
      encounterUUIDs.includes(mapping.uuid)
    );
    setShowAllEncounter([...filteredEncounters])
    }
  },[encounterFilter, selectedSubjectUUID])

  useEffect(() => {
    if (selectedFormProgram) {
      const formMappingsWithEncounter = encounterFilter.filter((mapping: { uuid: any; }) =>
      selectedFormProgram.some(
          (selectedFormProgram: { encounterTypeUUID: any; }) =>
          selectedFormProgram.encounterTypeUUID === mapping.uuid
        )
      );
      setShowEncounter(formMappingsWithEncounter);
    } else {
      setShowEncounter([]);
    }
  }, [encounterFilter, selectedFormSubject]);
  useEffect(() => {
    redirectIfNotValid();
    const fetchImages = async () => {
      const options = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("authToken"),
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}/search?page=${pagination.page}&size=${showPerpage}`,
        dataBody,
        options
      );
      const nextPageResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}/search?page=${pagination.page + 1}&size=${showPerpage}`,
        dataBody,
        options
      );
      setImageList(response.data);
      setNextPageData(nextPageResponse.data);
    };

    fetchImages();
  }, [pagination, showPerpage]);

  const [carouselImage, setCarouselImage] = useState<{
    uuid: string;
    signedUrl: string;
    signedThumbnailUrl: string;
    subjectTypeName: string;
  } | null>(null);

  const [checkedImage, setCheckedImage] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<any[]>([]);

  const onSelectImage = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedImage((prevCheckedImage) => {
        const updatedCheckedImage = [...prevCheckedImage, value];
        return updatedCheckedImage;
      });
    } else {
      setCheckedImage((prevCheckedImage) =>
        prevCheckedImage.filter((item) => item !== value)
      );
    }
  };

  useEffect(() => {

    const filteredData = imageList.data.filter((item: { uuid: string; }) => checkedImage.includes(item.uuid))
    setSelectedImage((prevImages) => {
      const newImages = [...prevImages, ...filteredData];
      return newImages.filter(
        ({ uuid }, index) =>
          newImages.findIndex((image) => image.uuid === uuid) === index 
          && checkedImage.includes(uuid) 
      );
    });
  }, [checkedImage, imageList]);
  

  const pagechange = (size: number, page: number) => {
    setPagination({ size: size, page: page });
  };
  const [showModal, setShowModal] = useState(false);

  const handleSendSelectedImages = async (inputValue: any) => {
    alert(
      `We are procesing your donwload request. Once the download is ready, it will be available under Available Downloads.`
    );
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOWNLOAD_REQUEST_URL}`,
      { username: userName, data: selectedImage, description: inputValue, addressLevel: locationFilter }
    );
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (inputValue: any) => {
    await handleSendSelectedImages(inputValue);
  };

  const concept = (data: any[]) => {
    const conceptJson = conceptdata.find((item: { name: any }) => item && item.name === data);
    setConcept(conceptJson);
  };

  const conceptDate = (data: any[]|null) => {
    if(data && data.length>0){
      setConceptDates([{
        "conceptUuid":concepts.uuid,
        "from": data[0],
        "to": data[1]
      }])
    }
  };

  const conceptDateTime = (data: any[]|null) => {
    if(data && data.length>0){
      setDateTimeConcept([{
        "conceptUuid": concepts.uuid,
        "from": data[0],
        "to": data[1]
      }])
    }
  };

  const conceptNumeric = (fromNumber: number, toNumber: number) =>{
   setToNumericConcept([{
    "conceptUuid":concepts.uuid,
    "from": fromNumber,
    "to": toNumber
   }])
  }

  const conceptCoded = (data: any) =>{
    if(data.length>0){
      setCodedConcept([{
        "conceptUuid": concepts.uuid,
        "values":data
       }])
    }
  }

  const conceptNote = (data: string) =>{

    if(data && data.length>0){
      setNoteConcept([{
        "conceptUuid": concepts.uuid,
        "values":[data]      
      }])
    }
   
  }

  const conceptText = (data: string) =>{

   if(data && data.length>0){
    setTextConcept([{
      "conceptUuid":concepts.uuid ,
      "values":[data]
     }])
   }
  
  }

  const programType = (data: any[], programUuid: string[]) => {
    setSelectedProgramUUId(programUuid);
    setProgamType(data);
  };

  const dateRange = (data: any[]|null) => {
    if(data !== null){
      setDateRange(data);
    }
  };

  const encounterType = (data: any[], encounterTypeUUID: any[]) => {
    setSelectedEncounterTypeUUID(encounterTypeUUID)
    setEncounterType(data);
  };

  const getLocation = async (data: any[]) => {

    if(data.length === 0){
  
      setLocations(data);
    }
    else{
      const newLocations = data.map((newLocation) => {
        const exists = locations.some(
          (locations: { uuid: string }) => locations.uuid === newLocation.uuid
        );
        if(exists === false){
          return newLocation;
        }
      });
      if (Array.isArray(newLocations) && newLocations.every(loc => loc !== undefined)) {
        setLocations([...locations, ...newLocations]);
      } else {
        setLocations([...locations]);
      }      
    }
   
   
  };
  
  const getOtherLocation = (data: any[], level: any) => {
    const existingLocation = otherLocation.find((loc: { level: any; }) => loc.level === level);
    if (existingLocation) {
      const newData = data.filter((item) => {
        return !existingLocation.data.some((existingItem: { uuid: any; }) => existingItem.uuid === item.uuid);
      });
  
      existingLocation.data = [...existingLocation.data, ...newData];
      setOtherLocation([...otherLocation]);
    } else {
      const newLocation = { level, data };
      setOtherLocation([...otherLocation, newLocation]);
    } 
  };
  
  const getTypeId = (data: any) => {
    if (typeId.includes(data)) {
     setTypeId(typeId.filter((o: any) => o !== typeId));
    } else {
      setTypeId([...typeId, data]);
    }
  }

  const getTopLevel = (data: any[],levelname: string) => {

    setSelectedParentId(data)
    if(data.length>0 && levelname !== null){
    
    setAddress([{
      "addressLevelType":levelname,
      "addressLevelIds":data
    }])
  }
  else{
 
    setAddress([])
  }
  };
 
  const getSecondLevel = (data: any[],levelname: string) => {
  if(data.length>0 && levelname!= undefined){

    setSecondAddress([{
      "addressLevelType": levelname,
      "addressLevelIds":data
    }])
  }
  else{
  
    setSecondAddress([])
  }
 
  };

  const subjectType = (data: any[], subjectUuid: string[]) => {
    setSelectedSubjectUUID(subjectUuid)
    setSubjectType(data);
  };
  useEffect(() => {
    if (selectedSubjectUUID.length > 0) {
      const selectedForms = formsData.filter(
        (formData: { subjectTypeUUID: any }) =>
          selectedSubjectUUID.includes(formData.subjectTypeUUID)
      );
      setSelectedFormSubject(selectedForms);
    } else {
      setSelectedFormSubject(null);
    }
    if (selectedProgramUUID.length > 0) {
      const selectedForms = formsData.filter(
        (formData: { programUUID: any }) =>
        selectedProgramUUID.includes(formData.programUUID)
      );
      setSelectedFormProgram(selectedForms);
    } else {
      setSelectedFormProgram(null);
    }
  }, [selectedSubjectUUID, formsData, selectedProgramUUID]);

  useEffect(() => {
    if (secondAddress.length > 0) {
      setAdd(secondAddress);
    } else if (address.length > 0) {
      setAdd(address);
    } else {
      setAdd([]);
    }
  }, [address, secondAddress]);
  
 useEffect(()=>{
  
  const fitersData = async () => {
    if (date && date.length > 0) {
      setToDate(date[1]);
      setFromDate(date[0]);
    } else {
      setToDate(null);
      setFromDate(null);
    }
  
    let conceptfilter = [];

    if (codedConcept && codedConcept.length > 0) {
      conceptfilter.push(codedConcept[0]);
    }
    
    if (toNumericConcept && toNumericConcept.length > 0) {
      conceptfilter.push(toNumericConcept[0]);
    }
    
    if (textConcept && textConcept.length > 0) {
      conceptfilter.push(textConcept[0]);
    }
    if (noteConcept && noteConcept.length > 0) {
      conceptfilter.push(noteConcept[0]);
    }
    if(dateTimeConcept && dateTimeConcept.length>0){
      conceptfilter.push(dateTimeConcept[0])
    }
    if(conceptDates && conceptDates.length>0){
     conceptfilter.push(conceptDates[0])
    } 
    const body = Object.fromEntries(
      Object.entries({
        subjectTypeNames: subject,
        programNames: program,
        encounterTypeNames: encouter,
        fromDate: fromDate,
        toDate: toDate,
        addresses: add,
        conceptFilters: conceptfilter
      }).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return value !== null && value !== undefined && value !== "";
        }
      })
    );
   setDataBody(body)
  }
  fitersData()
 },[date, subject, encouter, program, toDate, fromDate, add, codedConcept, toNumericConcept, dateTimeConcept, conceptDates, textConcept, noteConcept]);

  const handleApplyFilter = async () => {
    redirectIfNotValid();
    const options = {
      headers: {
        "AUTH-TOKEN": localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}/search?page=${pagination.page}&size=${pagination.size}`,
      dataBody,
      options
    );
    setImageList(response.data);
  };
  const handleNumberChange = (value: number) => {
    setShowperpage(value);
  };

  const restFilters = () => {

    location.reload();

  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl leading-6 font-semibold text-gray-900 ml-8 flex-none">
          Media Viewer
        </h1>
        <div className="mt-10 text-base leading-6 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700  mr-6">
          <NumberDropdown
            label="Images per page "
            min={10}
            max={100}
            step={10}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      <div className="text-center">
        {locationFilter && (
            locationFilter.map(
              (locationIndex: { name: string; id: number; level: number; parent: any }, index: Key) => {
                if (index === 0 || typeId.find(((item: number) => item === locationIndex.id)) ) {
                  return (
                    <LocationHierarchy
                      key={index}
                      locationIndex={locationIndex}
                      index={index}
                      selectedParentId={selectedParentId}
                      locationFilter ={locationFilter}
                      minLevel={minLevel}
                      maxLevel={maxLevel}
                      getLocation={getLocation}
                      location={locations}
                      getOtherLocation={getOtherLocation}
                      otherLocation={otherLocation}
                      getTopLevel={getTopLevel}
                      getSecondLevel={getSecondLevel}
                      getTypeId = {getTypeId}
                    />
                  );
                }
                return null;
              }
            )
        )}
        <Daterange dateRange={dateRange} />
        {subjectFilter && subjectFilter.length > 0 && (
          <SubjectType
            subjectType={subjectType}
            subjectFilter={subjectFilter}
          />
        )}

        {showprogram && showprogram.length > 0 && (
          <Program programType={programType} 
          programFilter={showprogram}
           />
        )}

        {(showAllEncounter.length > 0 || showEncounter.length > 0) &&(
          <EncounterType
            encounterType={encounterType}
            showAllEncounter={ showAllEncounter}
            showEncounter={showEncounter}
          />
        )}

        { selectedFormSubject && selectedFormSubject.length > 0 && conceptdata &&
            <Concepts concept={concept} conceptdata={conceptdata} 
            selectedFormSubject={selectedFormSubject}
            />
        }
        {  selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Coded" ? (
          <CodedConceptFilter concepts={concepts.conceptAnswers} 
          conceptCoded={conceptCoded}
          />
        ) :  selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Date" ? (
          <DateConceptFilter
          conceptDate={conceptDate}
          />
        ) : selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "DateTime" ? (
          <TimeStampConceptFilter conceptDateTime={conceptDateTime} />
        ) :  selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Text" ? (
          <TexConceptFilter
          conceptNote={conceptText} />
        ) :  selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Numeric" ? (
          <NumericConceptFilter conceptNumeric={conceptNumeric} />
        ) : selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Notes" ? (
          <TexConceptFilter 
          conceptNote={conceptNote}/>
        ) : null}
      </div>

      <div className="bg-white">
        <div className="flex justify-center mt-10">
          {showModal && (
            <UserInputModal
              showModal={showModal}
              onClose={handleCloseModal}
              onSubmit={handleSubmit}
              date={date}
              subject={subject}
            />
          )}
          <Button 
            name="Apply Filter"
            onClick={handleApplyFilter} />
          <Button
            onClick={handleOpenModal}
            name=" Download" />
          <Link href="./downloadList">
            <Button 
              name='Available Downloads' onClick={function (): void {}}       
            />
        </Link>
        <Button
         onClick={restFilters}  
         name = "Reset Filters"
         />
        </div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="-mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
            {imageList.data.map(
              (image: imageType) => (
                <div key={`${image.uuid}-${Math.random()}`}>
                  <div className="relative">
                    <div className="relative w-full h-50 rounded-lg overflow-hidden">
                      <button>
                        <img
                          src={image.signedThumbnailUrl}
                          alt={image?.subjectTypeName}
                          onClick={() => setCarouselImage(image)}
                          className="thumb"
                        />
                      </button>
                    </div>
                    <CheckButton
                      name={ getImageName(image, minLevelName)}
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
              )
            )}
          </div>
        </div>
        {carouselImage && (
          <ImageCarousel
            imageList={imageList.data}
            totalRecords={imageList.total}
            carouselImage={carouselImage}
            onClose={() => setCarouselImage(null)}
            onSelectImage={onSelectImage}
            pagination ={pagination}
            checkedImage={checkedImage}
            setCheckedImage={[]}
            dataBody = {dataBody}
          />
        )}
        <Pagination
          showperpage={showPerpage}
          pagechange={pagechange}
          nextPageData={nextPageData.data}
        />
      </div>
    </>
  );
}