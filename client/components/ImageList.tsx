import React, {useEffect, useState, useRef, useCallback, Fragment, Key} from 'react';
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
import {imageType} from '../model/ImageType';
import CodedConceptFilter from "./FilterComponent/CodedConceptFilter";
import DateConceptFilter from "./FilterComponent/DateConceptFilter";
import TimeStampConceptFilter from "./FilterComponent/TimeStampConceptFilter";
import TextConceptFilter from "./FilterComponent/TextConceptFilter";
import NumericConceptFilter from "./FilterComponent/NumericConceptFilter";
import {Checkbox, Divider, FormControlLabel, Button as MUIButton} from "@mui/material";
import _ from 'lodash';
import {MediaSearchService} from "@/service/MediaSearchService";
import MediaViewItem from '@/components/MediaViewItem';
import Loading from './loading';

export default function ImageList() {
    const [parentId, setParentId] = useState<any[]>([])
    const [distLoc, setDistLoc] = useState<any[]>([])
    const [add, setAdd] = useState<any>([]);
    const [address, setAddress] = useState<any>([]);
    const [secondAddress, setSecondAddress] = useState<any>([]);
    const [selectedParentId, setSelectedParentId] = useState<any>([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [imageList, setImageList] = useState<any>({total: 0, data: []});
    const MIN_PAGE_SIZE = 10, MAX_PAGE_SIZE = 100, PAGE_SIZE_STEP = 10;
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
    const [selectedFieldConcepts, setSelectedFieldConcepts] = useState<any[]>([]);
    
    const [date, setDateRange] = useState<any[] | null>([]);
    const [encounter, setEncounterType] = useState<any[]>([]);
    const [program, setProgramType] = useState<any[]>([]);
    const [subject, setSubjectType] = useState<any[]>([]);
    const [subjectName, setSubjectName] = useState<string>("");
    const [dataBody, setDataBody] = useState<any>();
    const [conceptData, setConceptData] = useState<any[]>([]);
    
    const [conceptDataLoading, setConceptDataLoading] = useState<boolean>(false);
    const [mediaConcepts, setMediaConcepts] = useState<any>([]);
    const [formsData, setFormsData] = useState<any>([]);
    const [typeId, setTypeId] = useState<any>([])
    const [error, setError] = useState<string | null>(null);
    const [shouldReloadAfterReset, setShouldReloadAfterReset] = useState<boolean>(false);
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
    const [activeConceptFilters, setActiveConceptFilters] = useState<any[]>([]);
    
    const ALL_SELECTED = "ALL", SOME_SELECTED = "SOME", NONE_SELECTED = "NONE";
    const [selectAllInPage, setSelectAllInPage] = useState<any>({0: NONE_SELECTED});
    const [selectAllPages, setSelectAllPages] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [showCount, setShowCount] = useState<boolean>(false);

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
            setConceptDataLoading(true);
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
            setConceptDataLoading(false);
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
            try {
                setShowLoader(true);
                setError(null);
                const responseData = await MediaSearchService.searchMedia(dataBody, currentPage, showPerpage);
                setImageList(responseData);
            } catch (error: any) {
                console.error('Error fetching images:', error);
                setError(error?.response?.data?.message || error?.message || 'Failed to load images. Please try again.');
                setImageList({data: [], total: 0, count: 0});
            } finally {
                setShowLoader(false);
            }
        };

        fetchImages();
    }, [currentPage, showPerpage]);

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


    const pageChange = (page: number) => {
        setCurrentPage(page);
        if (selectAllPages) {
            setSelectAllInPage((oldValue: any) => {
                oldValue[page] = ALL_SELECTED;
                return oldValue;
            })
        }
    };
    const [showModal, setShowModal] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

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

    useEffect(() => {
        if (conceptData && conceptData.length > 0 && selectedFieldConcepts.length === 0) {
            setSelectedFieldConcepts([null]);
        }
    }, [conceptData]);

    const updateConceptFilter = (filterKey: string, newFilter: any) => {
        setActiveConceptFilters(prev => {
            // Remove any existing filter with the same conceptUuid OR the same filterKey
            const filtered = prev.filter((f) => {
                // Remove if same conceptUuid (for regular filters) OR same filterKey (for indexed filters)
                return !(f.conceptUuid === newFilter.conceptUuid || f._filterKey === filterKey);
            });
            
            // Check if the new filter is actually different from existing ones
            const existingFilter = prev.find(f => f.conceptUuid === newFilter.conceptUuid);
            if (existingFilter) {
                // Compare filter contents to avoid unnecessary updates
                const isIdentical = JSON.stringify(existingFilter) === JSON.stringify({...newFilter, _filterKey: filterKey});
                if (isIdentical) {
                        return prev; // No change needed
                }
            }
            
            return [...filtered, {...newFilter, _filterKey: filterKey}];
        });
    };

    const removeConceptFilter = useCallback((conceptUuid: string) => {
        setActiveConceptFilters(prev => {
            // Remove all filters for this conceptUuid (including indexed ones)
            return prev.filter(filter => filter.conceptUuid !== conceptUuid);
        });
    }, []);

    const addFieldFilter = () => {
        setSelectedFieldConcepts([...selectedFieldConcepts, null]);
    };

    const removeFieldFilter = (index: number) => {
        setSelectedFieldConcepts(prev => {
            const removedField = prev[index];
            if (removedField?.uuid) {
                removeConceptFilter(removedField.uuid);
            }
            // Set to null to preserve other filter positions
            const newFilters = [...prev];
            newFilters[index] = null;
            return newFilters;
        });
    };

    const updateFieldConcept = useCallback((index: number, newField: any) => {
        // Prevent infinite loops by checking if the field is actually changing
        const currentField = selectedFieldConcepts[index];
        
        // Don't update if:
        // 1. newField is undefined/null and current is already null
        // 2. newField is the same as current field
        if ((!newField && !currentField) || 
            (newField?.uuid && currentField?.uuid === newField.uuid)) {
            return;
        }
        
        
        setSelectedFieldConcepts(prev => {
            const oldField = prev[index];
            if (oldField && oldField.uuid) {
                removeConceptFilter(oldField.uuid);
            }
            const updatedFields = [...prev];
            updatedFields[index] = newField || null; // Ensure we set null instead of undefined
            return updatedFields;
        });
    }, [removeConceptFilter]);

    const renderFilterComponent = (selectedFieldConcept: any) => {
        
        const conceptUuid = selectedFieldConcept.uuid;
        const formUuid = selectedFieldConcept.formUuid;
        const dataType = selectedFieldConcept.dataType;
        const activeFilters = activeConceptFilters.filter(filter => filter.conceptUuid === conceptUuid);
        

        switch(dataType) {
            case "Text":
                return (
                    <TextConceptFilter
                        getConcepts={(data: string) => getTextConcept(data, conceptUuid, formUuid)}
                        textConcepts={activeFilters}
                    />
                );
            case "Notes":
                return (
                    <TextConceptFilter
                        getConcepts={(data: string) => getNoteConcept(data, conceptUuid, formUuid)}
                        textConcepts={activeFilters}
                    />
                );
            case "Coded":
                return (
                    <CodedConceptFilter
                        conceptCoded={(data: any) => conceptCoded(data, conceptUuid, formUuid)}
                        concepts={selectedFieldConcept.conceptAnswers || []}
                    />
                );
            case "Numeric":
                return (
                    <NumericConceptFilter
                        getNumericConcept={(fromNumber: number | null, toNumber: number | null) => getNumericConcept(fromNumber, toNumber, conceptUuid, formUuid)}
                        numericConcept={activeFilters}
                    />
                );
            case "Date":
                return (
                    <DateConceptFilter
                        getDateConcept={(data: any[] | null) => getDateConcept(data, conceptUuid, formUuid)}
                        conceptDates={activeFilters}
                    />
                );
            case "DateTime":
                return (
                    <TimeStampConceptFilter
                        getTimeStampConcept={(data: any[] | null) => getTimeStampConcept(data, conceptUuid, formUuid)}
                        dateTimeConcept={activeFilters}
                    />
                );
            default:
                return <div className="text-orange-600 italic">Unsupported field type: {dataType}</div>;
        }
    };

    const getDateConcept = (data: any[] | null, conceptUuid: string, formUuid: string) => {
        if (data && data.length > 0 && data.some((val: any) => val !== null && val !== undefined && val !== "")) {
            const newFilter = {
                "conceptUuid": conceptUuid,
                "formUuid": formUuid,
                "from": data[0],
                "to": data[1]
            };
            updateConceptFilter(conceptUuid, newFilter);
        } else {
            removeConceptFilter(conceptUuid);
        }
    };

    const getTimeStampConcept = (data: any[] | null, conceptUuid: string, formUuid: string) => {
        if (data && data.length > 0 && data.some((val: any) => val !== null && val !== undefined && val !== "")) {
            const newFilter = {
                "conceptUuid": conceptUuid,
                "formUuid": formUuid,
                "from": data[0],
                "to": data[1]
            };
            updateConceptFilter(conceptUuid, newFilter);
        } else {
            removeConceptFilter(conceptUuid);
        }
    };

    const getNumericConcept = (fromNumber: number | null, toNumber: number | null, conceptUuid: string, formUuid: string) => {
        // Don't create filter if both values are null/empty
        if (fromNumber === null && toNumber === null) {
            removeConceptFilter(conceptUuid);
            return;
        }
        
        const newFilter = {
            "conceptUuid": conceptUuid,
            "formUuid": formUuid,
            "from": fromNumber,
            "to": toNumber
        };
        updateConceptFilter(conceptUuid, newFilter);
    }

    const conceptCoded = (data: any, conceptUuid: string, formUuid: string) => {
        if (data.length > 0) {
            // For coded concepts, use a single filter with multiple values (IN clause)
            const newFilter = {
                "conceptUuid": conceptUuid,
                "formUuid": formUuid,
                "values": data // Multiple values for IN clause
            };
            updateConceptFilter(conceptUuid, newFilter);
        } else {
            removeConceptFilter(conceptUuid);
        }
    }

    const getNoteConcept = (data: string, conceptUuid: string, formUuid: string) => {
        if (data && data.trim().length > 0) {
            const newFilter = {
                "conceptUuid": conceptUuid,
                "formUuid": formUuid,
                "values": [data.trim()] // Keep the entire text as a single value, trimmed
            };
            updateConceptFilter(conceptUuid, newFilter);
        } else {
            removeConceptFilter(conceptUuid);
        }
    }

    const getTextConcept = (data: string, conceptUuid: string, formUuid: string) => {
        if (data && data.trim().length > 0) {
            const newFilter = {
                "conceptUuid": conceptUuid,
                "formUuid": formUuid,
                "values": [data.trim()] // Keep the entire text as a single value, trimmed
            };
            updateConceptFilter(conceptUuid, newFilter);
        } else {
            removeConceptFilter(conceptUuid);
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
            setActiveConceptFilters([]);
            setEncounterType([]);
            setProgramType([]);
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

            // Clean up conceptFilters by removing internal _filterKey property and filtering out empty values
            let conceptfilter = activeConceptFilters
                .map(filter => {
                    const {_filterKey, ...cleanFilter} = filter;
                    return cleanFilter;
                })
                .filter(filter => {
                    // Remove filters with empty values
                    if (filter.values) {
                        // For array values (Text, Notes, Coded)
                        return Array.isArray(filter.values) && filter.values.length > 0 && 
                               filter.values.some((val: any) => val !== null && val !== undefined && val !== "");
                    } else if (filter.from !== undefined || filter.to !== undefined) {
                        // For numeric/date range filters
                        return (filter.from !== null && filter.from !== undefined && filter.from !== "") ||
                               (filter.to !== null && filter.to !== undefined && filter.to !== "");
                    }
                    return true; // Keep other filter types
                });
            
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
                    imageConcepts: selectedMediaConcepts,
                    includeTotalCount: showCount
                }).filter(([key, value]) => {
                    // Enhanced empty value filtering for all filter types
                    if (Array.isArray(value)) {
                        // For arrays (subject, program, encounter, addresses, etc.)
                        return value.length > 0 && value.some(item => 
                            item !== null && item !== undefined && item !== "" && 
                            (typeof item === 'object' ? Object.keys(item).length > 0 : true)
                        );
                    } else if (typeof value === 'object' && value !== null) {
                        // For objects (like conceptFilters)
                        if (key === 'conceptFilters') {
                            return value.length > 0; // Already filtered above
                        }
                        return Object.keys(value).length > 0;
                    } else {
                        // For primitive values (strings, numbers, booleans)
                        return value !== null && value !== undefined && value !== "";
                    }
                })
            );
            setDataBody(body);
        }
        filtersData();
        resetSelections();
    }, [date, subject, subjectName, encounter, program, toDate, fromDate, add, activeConceptFilters, selectedMediaConcepts, showCount]);

    const handleApplyFilter = useCallback(async () => {
        try {
            redirectIfNotValid();
            setShowLoader(true);
            setError(null);
            setCurrentPage(0);
            const responseData = await MediaSearchService.searchMedia(dataBody, currentPage, showPerpage);
            setImageList(responseData);
        } catch (error: any) {
            console.error('Error applying filter:', error);
            setError(error?.response?.data?.message || error?.message || 'Failed to apply filter. Please check your filter criteria and try again.');
            setImageList({data: [], total: 0, count: 0});
        } finally {
            setShowLoader(false);
        }
    }, [dataBody, currentPage, showPerpage]);

    // Handle reload after reset when dataBody has been updated
    useEffect(() => {
        if (shouldReloadAfterReset && dataBody !== undefined) {
            // Check if dataBody is effectively empty (only has includeTotalCount or is empty)
            const isDataBodyEmpty = !dataBody || Object.keys(dataBody).length === 0 || 
                (Object.keys(dataBody).length === 1 && dataBody.hasOwnProperty('includeTotalCount'));
            
            if (isDataBodyEmpty || Object.keys(dataBody).every(key => 
                key === 'includeTotalCount' || 
                !dataBody[key] || 
                (Array.isArray(dataBody[key]) && dataBody[key].length === 0) ||
                dataBody[key] === "" || 
                dataBody[key] === null
            )) {
                setShouldReloadAfterReset(false);
                handleApplyFilter();
            }
        }
    }, [dataBody, shouldReloadAfterReset, handleApplyFilter]);

    const handleNumberChange = (value: number) => {
        setShowperpage(value);
    };

    const resetFilters = () => {
        // Clear all filter states instead of reloading
        setSubjectName("");
        setDateRange([]);
        setEncounterType([]);
        setProgramType([]);
        setSubjectType([]);
        setSelectedProgramUUId([]);
        setSelectedSubjectUUID([]);
        setSelectedEncounterTypeUUID([]);
        setSelectedFormSubject([]);
        setSelectedFormProgram([]);
        setSelectedFieldConcepts([null]); // Keep one empty filter
        setActiveConceptFilters([]);
        setSelectedMediaConcepts([]);
        
        // Clear location-related filters
        setParentId([]);
        setDistLoc([]);
        setAdd([]);
        setAddress([]);
        setSecondAddress([]);
        setSelectedParentId([]);
        setLocations([]);
        setOtherLocation([]);
        setTypeId([]);
        
        // Clear date filters
        setFromDate(null);
        setToDate(null);
        
        // Clear program/encounter display states
        setShowProgram([]);
        setShowEncounter([]);
        setShowAllEncounter([]);
        
        // Reset pagination and selection
        setCurrentPage(0);
        setCheckedImage([]);
        setSelectAllInPage({0: NONE_SELECTED});
        setSelectAllPages(false);
        
        // Reset concept data
        setConceptData([]);
        setConceptDataLoading(false);
        
        // Set flag to trigger reload after dataBody is updated
        setShouldReloadAfterReset(true);
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

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8" style={{ overflow: 'visible' }}>
                <div className="inline-flex flex-wrap items-center gap-4 mt-5" style={{ overflow: 'visible' }}>
                    <div className="filter-item">
                        <input
                            type="text"
                            className="filter-input"
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
                                        <div key={index} className="filter-item">
                                            <LocationHierarchy
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
                                        </div>
                                    );
                                }
                                return null;
                            }
                        )
                    )}
                    <div className="filter-item">
                        <Daterange dateRange={dateRange}/>
                    </div>

                    <div className="filter-item">
                        <Concepts setConceptsFunction={(x: string[]) => {
                            setSelectedMediaConcepts(x)
                        }} concepts={mediaConcepts} title={"Media Types"} multiSelect={true} searchable={false}/>
                    </div>

                    {subjectFilter && subjectFilter.length > 0 && (
                        <div className="filter-item">
                            <SubjectType
                                subjectType={subjectType}
                                subjectFilter={subjectFilter}
                                selectedSubjects={subject}
                            />
                        </div>
                    )}

                    {showprogram && showprogram.length > 0 && (
                        <div className="filter-item">
                            <Program programType={programType}
                                     programFilter={showprogram}
                                     selectedPrograms={program}
                            />
                        </div>
                    )}

                    {(showAllEncounter.length > 0 || showEncounter.length > 0) && (
                        <div className="filter-item">
                            <EncounterType
                                encounterType={encounterType}
                                showAllEncounter={showAllEncounter}
                                showEncounter={showEncounter}
                                selectedEncounters={encounter}
                            />
                        </div>
                    )}
                </div>

                {selectedFormSubject && selectedFormSubject.length > 0 && (
                    <div className="mt-3">
                        {conceptDataLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                                    <span className="text-sm">Loading filters...</span>
                                </div>
                            </div>
                        ) : conceptData && conceptData.length > 0 ? (
                            <>
                            {selectedFieldConcepts.map((selectedFieldConcept: any, index: number) => {
                            
                            const startTime = performance.now();
                            const selectedUuids = selectedFieldConcepts
                                .map((field, idx) => idx !== index && field ? field.uuid : null)
                                .filter(uuid => uuid !== null);
                            const uuidCalcTime = performance.now() - startTime;
                            
                            const filterStartTime = performance.now();
                            const availableFields = conceptData.filter((field: any) => 
                                !selectedUuids.includes(field.uuid)
                            );
                            const filterCalcTime = performance.now() - filterStartTime;
                            
                            
                            return (
                                <div key={index} className="mb-3 overflow-visible min-w-[40%] max-w-[60%]">
                                    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors overflow-visible">
                                        <div className="flex items-start gap-2">
                                            <div className="w-64 shrink-0">
                                                <Concepts 
                                                    setConceptsFunction={(data: any[]) => {
                                                        
                                                        // Only update if we have valid data or if we're clearing a selection
                                                        if (data && data.length > 0 && data[0]) {
                                                            updateFieldConcept(index, data[0]);
                                                        } else if (selectedFieldConcepts[index] && selectedFieldConcepts[index].uuid) {
                                                            // Only clear if there was actually a selection before
                                                            updateFieldConcept(index, null);
                                                        }
                                                        // Otherwise, ignore empty/undefined data to prevent loops
                                                    }}
                                                    concepts={availableFields}
                                                    title={selectedFieldConcept?.name || "Fields"}
                                                    multiSelect={false}
                                                    searchable={true}
                                                    selectedValue={selectedFieldConcept}
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 -ml-12">
                                                {selectedFieldConcept && selectedFieldConcept.uuid ? (
                                                    renderFilterComponent(selectedFieldConcept)
                                                ) : (
                                                    <div className="text-gray-400 italic py-2">Select a field to add filters</div>
                                                )}
                                            </div>

                                            {selectedFieldConcepts.length > 1 && (
                                                <div className="flex-shrink-0">
                                                    <button
                                                        onClick={() => removeFieldFilter(index)}
                                                        className="px-2 py-1 text-red-500 border border-dashed hover:text-red-700 border-red-700 hover:bg-red-50 rounded-md text-sm"
                                                        title="Remove field filter"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {selectedFieldConcepts.length > 0 && selectedFieldConcepts.some(field => field && field.uuid) && selectedFieldConcepts.length < conceptData.length && (
                            <div className="mb-3">
                                <button
                                    onClick={addFieldFilter}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-md border border-dashed border-teal-300 hover:border-teal-500"
                                >
                                    <span className="text-lg">+</span>
                                    Add Field Filter
                                </button>
                            </div>
                            )}
                            </>
                        ) : null}
                    </div>
                )}
                <FormControlLabel style={{paddingLeft: "20px"}} label={"Display Count"}
                                  control={<Checkbox
                                      onChange={(e) => setShowCount(e.target.checked)}
                                      checked={showCount}
                                  />}/>
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
                    {showLoader && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
                            <Loading />
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">Error:</span>
                                <span className="ml-1">{error}</span>
                                <button 
                                    onClick={() => setError(null)}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
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
                        onClick={resetFilters}
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
                {imageList.total === 0 ? (showLoader ? <></>: (<p style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", paddingTop: "24px", fontSize: "1rem"
                    }}>No results to display</p>)) :
                    <Fragment>
                        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div
                                className="-mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
                                {imageList.data.map(
                                    (image: imageType) =>
                                        <MediaViewItem key={image.uuid} image={image}
                                                       setCarouselImage={setCarouselImage}
                                                       minLevelName={minLevelName} onSelectImage={onSelectImage}
                                                       checkedImage={checkedImage}/>
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
                                currentPage={currentPage}
                                showPerpage={showPerpage}
                                checkedImage={checkedImage}
                                setCheckedImage={[]}
                                dataBody={dataBody}
                                minLevelName={minLevelName}
                                setCarouselImage={setCarouselImage}
                            />
                        )}
                        <Pagination
                            showperpage={showPerpage}
                            pagechange={pageChange}
                            enableNextPage={imageList.data.length === showPerpage}
                            totalCount={imageList.count}
                            currentPageLength={imageList.data.length}
                            currentPage={currentPage}
                        />
                    </Fragment>}
            </div>
        </>
    );
}
