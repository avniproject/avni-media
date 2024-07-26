import CheckButton from "./CheckButton";
import {Key, useEffect, useState} from "react";
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
import {fetchAuthHeaders, getUserUuidFromToken, operationalModuleData, redirectIfNotValid} from "@/utils/helpers";
import {imageType, getImageName, getImage, getImageNameWithoutNewLines} from '../model/ImageType';
import CodedConceptFilter from "./FilterComponent/CodedConceptFilter";
import DateConceptFilter from "./FilterComponent/DateConceptFilter";
import TimeStampConceptFilter from "./FilterComponent/TimeStampConceptFilter";
import TexConceptFilter from "./FilterComponent/TextConceptFilter";
import NumericConceptFilter from "./FilterComponent/NumericConceptFilter";
import {Checkbox, Divider, FormControlLabel, Button as MUIButton} from "@mui/material";
import _ from 'lodash';
import {MediaSearchService} from "@/service/MediaSearchService";

export default function ImageList() {
    const [parentId, setParentId] = useState<any[]>([])
    const [distLoc, setDistLoc] = useState<any[]>([])
    const [add, setAdd] = useState<any>([]);
    const [address, setAddress] = useState<any>([]);
    const [secondAddress, setSecondAddress] = useState<any>([]);
    const [selectedParentId, setSelectedParentId] = useState<any>([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [imageList, setImageList] = useState<any>({page: 0, data: []});
    const MIN_PAGE_SIZE = 10, MAX_PAGE_SIZE = 100, PAGE_SIZE_STEP = 10;
    const [pagination, setPagination] = useState({size: MIN_PAGE_SIZE, page: 0});
    const [showPerpage, setShowperpage] = useState(PAGE_SIZE_STEP);
    const [userName, setUserName] = useState<string | string[] | undefined>();
    const [locationFilter, setLocation] = useState<any>([]);
    const [subjectFilter, setSubjectFilter] = useState<any>([]);
    const [programFilter, setProgramFilter] = useState<any>([]);
    const [maxLevelLocation, setMaxLevelLocation] = useState<any>([]);
    const [minLevel, setMinLevel] = useState<number>();
    const [maxLevel, setMaxLevel] = useState<number>();
    const [minLevelName, setMinLevelName] = useState<string>("");
    const [encounterFilter, setEncounterFilter] = useState<any>([]);
    const [locations, setLocations] = useState<any>([]);
    const [otherLocation, setOtherLocation] = useState<any[]>([]);
    const [selectedFieldConcepts, setSelectedFieldConcept] = useState<any>();
    const [date, setDateRange] = useState<any[] | null>([]);
    const [encounter, setEncounterType] = useState<any[]>([]);
    const [program, setProgramType] = useState<any[]>([]);
    const [subject, setSubjectType] = useState<any[]>([]);
    const [subjectName, setSubjectName] = useState<any>();
    const [dataBody, setDataBody] = useState<any>();
    const [conceptData, setConceptData] = useState<any>([]);
    const [mediaConcepts, setMediaConcepts] = useState<any>([]);
    const [formsData, setFormsData] = useState<any>([]);
    const [textConcept, setTextConcept] = useState<any>([])
    const [codedConcept, setCodedConcept] = useState<any>([])
    const [noteConcept, setNoteConcept] = useState<any>([])
    const [numericConcept, setToNumericConcept] = useState<any>([])
    const [dateTimeConcept, setDateTimeConcept] = useState<any[] | null>([]);
    const [conceptDates, setConceptDates] = useState<any[] | null>([]);
    const [typeId, setTypeId] = useState<any>([])
    const [selectedProgramUUID, setSelectedProgramUUId] = useState<any[]>([]);
    const [selectedSubjectUUID, setSelectedSubjectUUID] = useState<any[]>([]);
    const [nextPageData, setNextPageData] = useState<any>({page: 0, data: []});
    const [selectedFormSubject, setSelectedFormSubject] = useState<any>([]);
    const [selectedFormProgram, setSelectedFormProgram] = useState<any>([]);
    const [showprogram, setShowProgram] = useState<any[]>([])
    const [showEncounter, setShowEncounter] = useState<any[]>([]);
    const [showAllEncounter, setShowAllEncounter] = useState<any[]>([]);
    const [selectedEncounterTypeUUID, setSelectedEncounterTypeUUID] = useState<any>([]);
    const [selectedMediaConcepts, setSelectedMediaConcepts] = useState<any>([]);
    const selectedFieldConcept = selectedFieldConcepts && selectedFieldConcepts.length > 0 && selectedFieldConcepts[0];
    const ALL_SELECTED = "ALL", SOME_SELECTED = "SOME", NONE_SELECTED = "NONE";
    const [selectAllInPage, setSelectAllInPage] = useState<any>({0: NONE_SELECTED});
    const [selectAllPages, setSelectAllPages] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    useEffect(() => {
        const userUUID = getUserUuidFromToken();
        setUserName(userUUID);
        const filterData = async () => {
            const processedData = await operationalModuleData();

            setMaxLevel(processedData.maxAddressLevel);

            setMinLevel(processedData.minAddressLevel);

            setMinLevelName(processedData.minLevelAddressName);

            setMaxLevelLocation(processedData.maxLevelLocation);

            setLocation(processedData.sortedAddressLevel);

            setSubjectFilter(processedData.subjects);

            setProgramFilter(processedData.programs);

            setEncounterFilter(processedData.encounters);

            setFormsData(processedData.forms);
        };
        filterData();
    }, []);


    const getConceptData = async (formUUID: any, filteredConcept: any[]) => {
        const formData = await axios.get(
            `${process.env.NEXT_PUBLIC_WEB}/web/form/${formUUID}`
        );
        const forms = formData.data;
        const formElementGroups = forms.formElementGroups;
        await Promise.all(
            formElementGroups.map(
                async (formJson: { applicableFormElements: any }) => {
                    let applicableFormElements = formJson.applicableFormElements;
                    await Promise.all(
                        applicableFormElements.map(
                            async (element: {
                                voided: boolean;
                                concept: { uuid: string; dataType: any };
                            }) => {
                                if (!element.voided) {
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
                                            filteredConcept.push(_.merge(element.concept, {formUuid: formUUID}));
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
        axios.get("/web/concept/media").then((response) => setMediaConcepts(response.data));
    }, []);

    useEffect(() => {
        const formTypeArray = ["IndividualProfile", "ProgramEnrolment", "ProgramEncounter", "Encounter"]
        const data = async () => {
            if (selectedProgramUUID.length > 0 && selectedSubjectUUID.length > 0 && selectedEncounterTypeUUID.length > 0) {
                const filteredConcepts: any[] = [];
                await Promise.all(
                    formsData.map(async (element: any) => {
                        if (
                            formTypeArray.includes(element.formType)
                        ) {
                            if (
                                selectedProgramUUID.some(
                                    (uuid) => uuid === element.programUUID
                                ) &&
                                selectedSubjectUUID.some(
                                    (uuid) => uuid === element.subjectTypeUUID
                                ) &&
                                selectedEncounterTypeUUID.some(
                                    (uuid: any) => uuid === element.encounterTypeUUID
                                )
                            ) {
                                await getConceptData(element.formUUID, filteredConcepts)
                            }
                        }
                    }));
                setConceptData(filteredConcepts);
            } else if (selectedProgramUUID.length > 0 && selectedSubjectUUID.length > 0) {
                const filteredConcepts: any[] = [];
                await Promise.all(
                    formsData.map(async (element: any) => {
                        if (
                            formTypeArray.includes(element.formType)
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
            } else if (selectedEncounterTypeUUID.length > 0 && selectedSubjectUUID.length > 0) {
                const filteredConcepts: any[] = [];
                await Promise.all(
                    formsData.map(async (element: any) => {
                        if (
                            formTypeArray.includes(element.formType)
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
            } else if (selectedSubjectUUID.length > 0) {
                const filteredConcepts: any[] = [];
                await Promise.all(
                    formsData.map(async (element: any) => {
                        if (
                            formTypeArray.includes(element.formType)
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

    useEffect(() => {
        const encounters = formsData.filter((form: any) => {
            return form.programUUID === undefined && form.subjectTypeUUID !== undefined && form.encounterTypeUUID !== undefined;
        });
        if (encounters && selectedSubjectUUID) {
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
    }, [encounterFilter, selectedSubjectUUID])

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
            const responseData = await MediaSearchService.searchMedia(dataBody, pagination.page, showPerpage);
            const nextPageResponseData = await MediaSearchService.searchMedia(dataBody, pagination.page + 1, showPerpage);

            setImageList(responseData);
            setNextPageData(nextPageResponseData);
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
                return (prevCheckedImage.indexOf(value) == -1) ? [...prevCheckedImage, value] : prevCheckedImage
            });
        } else {
            setCheckedImage((prevCheckedImage) =>
                prevCheckedImage.filter((item) => item !== value)
            );
        }
    };

    useEffect(() => {
        let currentPageSelectAllState = NONE_SELECTED;
        setSelectAllInPage((oldValue: any) => {
            const currentPageNotSelectedImages = imageList.data.filter((image: any) => !checkedImage.includes(image.uuid))
            if (currentPageNotSelectedImages.length === 0 && imageList.data.length > 0) {
                oldValue[currentPage] = ALL_SELECTED;
            } else if (currentPageNotSelectedImages.length === imageList.data.length) {
                oldValue[currentPage] = NONE_SELECTED
            } else {
                oldValue[currentPage] = SOME_SELECTED;
            }
            currentPageSelectAllState = oldValue[currentPage];
            return oldValue;
        })
        setSelectAllPages((oldValue: boolean) => oldValue && currentPageSelectAllState == ALL_SELECTED)
    }, [checkedImage]);

    const toggleCheckAllImagesInCurrentPage = () => {
        setSelectAllInPage((oldValue: any) => {
            const currentValue = oldValue[currentPage] || NONE_SELECTED;
            const nextValue = (currentValue === NONE_SELECTED || currentValue === SOME_SELECTED) ? ALL_SELECTED : NONE_SELECTED;
            return {...oldValue, [currentPage]: nextValue}
        });
    }

    useEffect(() => {
        if (selectAllInPage[currentPage] === ALL_SELECTED) {
            imageList.data.forEach((image: any) => onSelectImage(image.uuid, true));
        } else if (selectAllInPage[currentPage] === NONE_SELECTED) {
            imageList.data.forEach((image: any) => onSelectImage(image.uuid, false));
        }
    }, [imageList, selectAllInPage])

    useEffect(() => {
        const filteredData = imageList.data.filter((item: { uuid: string; }) => checkedImage.includes(item.uuid))
        setSelectedImage((prevImages) => {
            const newImages = [...prevImages, ...filteredData];
            return newImages.filter(
                ({uuid}, index) =>
                    newImages.findIndex((image) => image.uuid === uuid) === index
                    && checkedImage.includes(uuid)
            );
        });
    }, [checkedImage, imageList]);


    const pageChange = (size: number, page: number) => {
        setPagination({size: size, page: page});
        setCurrentPage(page);
        if (selectAllPages) {
            setSelectAllInPage((oldValue: any) => {
                oldValue[page] = ALL_SELECTED;
                return oldValue;
            })
        }
    };
    const [showModal, setShowModal] = useState(false);

    const handleSendSelectedImages = async (inputValue: any) => {
        alert(`We are processing your download request. Once the download is ready, it will be available under Available Downloads. At most 1000 media items will be included in the download bundle.`);
        if (selectAllPages) {
            const options = {headers: fetchAuthHeaders()};
            await axios.post(
                `${process.env.NEXT_PUBLIC_ETL}/requestDownloadAll`,
                {mediaSearchRequest: dataBody, username: userName, description: inputValue, addressLevelTypes: locationFilter},
                options
            );
        } else {
            await axios.post(
                `${process.env.NEXT_PUBLIC_MEDIA_VIEWER}/requestDownload`,
                {username: userName, data: selectedImage, description: inputValue, addressLevelTypes: locationFilter}
            );
        }
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

    const setConcepts = (data: any[]) => {
        setSelectedFieldConcept(data);
        setDateTimeConcept([])
        setTextConcept([])
        setToNumericConcept([])
        setConceptDates([])
        setNoteConcept([])
        setCodedConcept([])
    };

    const getDateConcept = (data: any[] | null) => {
        if (data && data.length > 0) {
            setConceptDates([{
                "conceptUuid": selectedFieldConcept.uuid,
                "formUuid": selectedFieldConcept.formUuid,
                "from": data[0],
                "to": data[1]
            }])
        }
    };

    const getTimeStampConcept = (data: any[] | null) => {
        if (data && data.length > 0) {
            setDateTimeConcept([{
                "conceptUuid": selectedFieldConcept.uuid,
                "formUuid": selectedFieldConcept.formUuid,
                "from": data[0],
                "to": data[1]
            }])
        }
    };

    const getNumericConcept = (fromNumber: number, toNumber: number) => {
        setToNumericConcept([{
            "conceptUuid": selectedFieldConcept.uuid,
            "formUuid": selectedFieldConcept.formUuid,
            "from": fromNumber,
            "to": toNumber
        }])
    }

    const conceptCoded = (data: any) => {
        if (data.length > 0) {
            setCodedConcept([{
                "conceptUuid": selectedFieldConcept.uuid,
                "formUuid": selectedFieldConcept.formUuid,
                "values": data
            }])
        } else {
            setCodedConcept([])
        }
    }

    const getNoteConcept = (data: string) => {

        if (data && data.length > 0) {
            setNoteConcept([{
                "conceptUuid": selectedFieldConcept.uuid,
                "formUuid": selectedFieldConcept.formUuid,
                "values": data.split(" ")
            }])
        }

    }

    const getTextConcept = (data: string) => {

        if (data && data.length > 0) {
            setTextConcept([{
                "conceptUuid": selectedFieldConcept.uuid,
                "formUuid": selectedFieldConcept.formUuid,
                "values": data.split(" ")
            }])
        }

    }

    const programType = (data: any[], programUuid: string[]) => {
        setSelectedProgramUUId(programUuid);
        setProgramType(data);
    };

    const dateRange = (data: any[] | null) => {
        if (data !== null) {
            setDateRange(data);
        }
    };

    const encounterType = (data: any[], encounterTypeUUID: any[]) => {
        setSelectedEncounterTypeUUID(encounterTypeUUID)
        setEncounterType(data);
    };

    useEffect(() => {

        const filteredLoc = locations.filter((locationItem: { parentId: any; }) => parentId.includes(locationItem.parentId))
        setDistLoc(filteredLoc)
    }, [parentId])

    const getLocation = async (data: any[], parentsIdArray: any[]) => {

        setParentId(parentsIdArray)
        if (data.length === 0) {

            setLocations(data);
        } else {
            const newLocations = data.map((newLocation) => {
                const exists = locations.some(
                    (locations: { uuid: string }) => locations.uuid === newLocation.uuid
                );
                if (exists === false) {
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

    const getDiffArray = (diffArray: any[]) => {
        if (diffArray.length > 0) {
            const filteredData = otherLocation.map((loc) => {
                return {
                    ...loc,
                    data: loc.data.filter((item: { parentId: any; level: any; }) => {
                        if (item.parentId && loc.level && item.level) {
                            return !diffArray.includes(item.parentId) && loc.level === item.level;
                        }
                        return false;
                    }),
                };
            });
            setOtherLocation(filteredData)
        }
    }

    const getOtherLocation = (data: any[], level: any) => {
        const existingLocation = otherLocation.find((loc: { level: any; }) => loc.level === level);
        if (existingLocation) {
            const newData = data.filter((item) => {
                return !existingLocation.data.some((existingItem: { uuid: any; }) => existingItem.uuid === item.uuid);
            });

            existingLocation.data = [...existingLocation.data, ...newData];
            setOtherLocation([...otherLocation]);
        } else {
            const newLocation = {level, data};
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

    const getTopLevel = (data: any[], levelname: string) => {

        setSelectedParentId(data)
        if (data.length > 0 && levelname !== null) {

            setAddress([{
                "addressLevelType": levelname,
                "addressLevelIds": data
            }])
        } else {

            setAddress([])
        }
    };

    const getSecondLevel = (data: any[], levelname: string) => {
        if (data.length > 0 && levelname != undefined) {

            setSecondAddress([{
                "addressLevelType": levelname,
                "addressLevelIds": data
            }])
        } else {

            setSecondAddress([])
        }

    };

    const subjectType = (data: any[], subjectUuid: string[]) => {
        setSelectedSubjectUUID(subjectUuid)
        setSubjectType(data);
        if (data.length === 0) {
            setCodedConcept([])
            setEncounterType([])
            setProgramType([])
            setDateTimeConcept([])
            setTextConcept([])
            setToNumericConcept([])
            setConceptDates([])
            setNoteConcept([])
        }
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

    useEffect(() => {
        const filtersData = async () => {
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

            if (numericConcept && numericConcept.length > 0) {
                conceptfilter.push(numericConcept[0]);
            }

            if (textConcept && textConcept.length > 0) {
                conceptfilter.push(textConcept[0]);
            }
            if (noteConcept && noteConcept.length > 0) {
                conceptfilter.push(noteConcept[0]);
            }
            if (dateTimeConcept && dateTimeConcept.length > 0) {
                conceptfilter.push(dateTimeConcept[0])
            }
            if (conceptDates && conceptDates.length > 0) {
                conceptfilter.push(conceptDates[0])
            }
            const body = Object.fromEntries(
                Object.entries({
                    subjectName: subjectName,
                    subjectTypeNames: subject,
                    programNames: program,
                    encounterTypeNames: encounter,
                    fromDate: fromDate,
                    toDate: toDate,
                    addresses: add,
                    conceptFilters: conceptfilter,
                    imageConcepts: selectedMediaConcepts
                }).filter(([_, value]) => {
                    if (Array.isArray(value)) {
                        return value.length > 0;
                    } else {
                        return value !== null && value !== undefined && value !== "";
                    }
                })
            );
            setDataBody(body);
        }
        filtersData();
        resetSelections();
    }, [date, subject, subjectName, encounter, program, toDate, fromDate, add, codedConcept, numericConcept, dateTimeConcept, conceptDates, textConcept, noteConcept, selectedMediaConcepts]);

    const handleApplyFilter = async () => {
        redirectIfNotValid();
        const responseData = await MediaSearchService.searchMedia(dataBody, 0, pagination.size);
        setImageList(responseData);
    };

    const handleNumberChange = (value: number) => {
        setShowperpage(value);
    };

    const restFilters = () => {
        location.reload();
    };

    const toggleSelectAllPages = () => {
        setSelectAllPages(oldValue => {
            const newValue = !oldValue;
            if (!newValue) {
                setSelectAllInPage({[currentPage]: NONE_SELECTED})
                setCheckedImage([]);
            }
            return newValue
        });
    }

    const resetSelections = () => {
        setSelectAllInPage({[currentPage]: NONE_SELECTED});
        setSelectAllPages(false);
        setCheckedImage([]);
    }

    const showCodedFilter = selectedFormSubject && selectedFormSubject.length > 0 && selectedFieldConcept && selectedFieldConcept.dataType === "Coded";
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-xl leading-6 font-semibold text-gray-900 ml-8 flex-none">
                    Media Viewer
                </h1>
                <div className="mt-10 text-base leading-6 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 mr-6">
                    <NumberDropdown
                        label="Images per page "
                        min={MIN_PAGE_SIZE}
                        max={MAX_PAGE_SIZE}
                        step={PAGE_SIZE_STEP}
                        onChange={handleNumberChange}
                    />
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="inline-flex w-56 h-10 mt-5">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        placeholder="Name"
                    />
                </div>
                {locationFilter && (
                    locationFilter.map(
                        (locationIndex: { name: string; id: number; level: number; parent: any }, index: Key) => {
                            if (index === 0 || typeId.find(((item: number) => item === locationIndex.id))) {
                                return (
                                    <LocationHierarchy
                                        key={index}
                                        locationIndex={locationIndex}
                                        index={index}
                                        selectedParentId={selectedParentId}
                                        locationFilter={locationFilter}
                                        minLevel={minLevel}
                                        maxLevel={maxLevel}
                                        getLocation={getLocation}
                                        location={distLoc}
                                        getOtherLocation={getOtherLocation}
                                        otherLocation={otherLocation}
                                        getTopLevel={getTopLevel}
                                        getSecondLevel={getSecondLevel}
                                        getTypeId={getTypeId}
                                        getDiffArray={getDiffArray}
                                    />
                                );
                            }
                            return null;
                        }
                    )
                )}
                <Daterange dateRange={dateRange}/>

                <Concepts setConceptsFunction={(x: string[]) => {
                    setSelectedMediaConcepts(x)
                }} concepts={mediaConcepts} title={"Media Types"} multiSelect={true} searchable={false}/>

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

                {(showAllEncounter.length > 0 || showEncounter.length > 0) && (
                    <EncounterType
                        encounterType={encounterType}
                        showAllEncounter={showAllEncounter}
                        showEncounter={showEncounter}
                    />
                )}

                {selectedFormSubject && selectedFormSubject.length > 0 && conceptData &&
                    <Concepts setConceptsFunction={setConcepts} concepts={conceptData} title="Fields" multiSelect={false} searchable={true}/>
                }
                {showCodedFilter ? (
                    <CodedConceptFilter concepts={selectedFieldConcept.conceptAnswers}
                                        conceptCoded={conceptCoded}
                    />
                ) : selectedFormSubject && selectedFormSubject.length > 0 && selectedFieldConcept && selectedFieldConcept.dataType === "Date" ? (
                    <DateConceptFilter
                        getDateConcept={getDateConcept}
                        conceptDates={conceptDates}
                    />
                ) : selectedFormSubject && selectedFormSubject.length > 0 && selectedFieldConcept && selectedFieldConcept.dataType === "DateTime" ? (
                    <TimeStampConceptFilter
                        getTimeStampConcept={getTimeStampConcept}
                        dateTimeConcept={dateTimeConcept}/>
                ) : selectedFormSubject && selectedFormSubject.length > 0 && selectedFieldConcept && selectedFieldConcept.dataType === "Text" ? (
                    <TexConceptFilter
                        getConcepts={getTextConcept}
                        textConcept={textConcept}
                    />
                ) : selectedFormSubject && selectedFormSubject.length > 0 && selectedFieldConcept && selectedFieldConcept.dataType === "Numeric" ? (
                    <NumericConceptFilter
                        getNumericConcept={getNumericConcept}
                        numericConcept={numericConcept}
                    />
                ) : selectedFormSubject && selectedFormSubject.length > 0 && selectedFieldConcept && selectedFieldConcept.dataType === "Notes" ? (
                    <TexConceptFilter
                        getConcepts={getNoteConcept}
                        textConcept={noteConcept}/>
                ) : null}
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4 sm:py-4">
                <div>
                    {showModal && (
                        <UserInputModal
                            showModal={showModal}
                            onClose={handleCloseModal}
                            onSubmit={handleSubmit}
                            date={date}
                            subject={subject}
                        />
                    )}
                    <Button name="Apply Filter" onClick={handleApplyFilter}/>
                    <Button onClick={handleOpenModal} name=" Download"/>
                    <Link href="./downloadList">
                        <Button
                            name='Available Downloads' onClick={function (): void {
                        }}
                        />
                    </Link>
                    <Button
                        onClick={restFilters}
                        name="Reset Filters"
                    />
                    <FormControlLabel style={{paddingLeft: "48px"}} label={"Select All"}
                                      control={<Checkbox
                                          onChange={toggleCheckAllImagesInCurrentPage}
                                          checked={selectAllInPage[currentPage] === ALL_SELECTED}
                                          indeterminate={selectAllInPage[currentPage] === SOME_SELECTED}
                                          disabled={selectAllPages}
                                      />}/>
                    {(selectAllInPage[currentPage] === ALL_SELECTED) && <>
                        <MUIButton variant="text" onClick={toggleSelectAllPages} style={{
                            textTransform: "capitalize",
                            fontSize: "1rem"
                        }}>{selectAllPages ? "Clear selection" : "Select all media matching filter"}</MUIButton>
                    </>}
                    {
                        (selectAllPages || checkedImage.length > 0) && <Divider style={{paddingTop: "24px"}}/>
                    }
                    {
                        (!selectAllPages && checkedImage.length > 0) && <p style={{paddingTop: "24px", fontSize: "1rem"}}>Selected {checkedImage.length} media items</p>
                    }
                    {
                        selectAllPages && <p style={{paddingTop: "24px", fontSize: "1rem"}}>Selected all media items in all pages</p>
                    }
                </div>
                <Divider style={{paddingTop: "24px"}}/>
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="-mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
                        {imageList.data.map(
                            (image: imageType) => {
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
                                                imageNameWithoutNewLines={getImageNameWithoutNewLines(image, minLevelName)}
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
                        pagination={pagination}
                        checkedImage={checkedImage}
                        setCheckedImage={[]}
                        dataBody={dataBody}
                    />
                )}
                <Pagination
                    showperpage={showPerpage}
                    pagechange={pageChange}
                    nextPageData={nextPageData.data}
                />
            </div>
        </>
    );
}
