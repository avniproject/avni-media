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
  isVideo
} from "@/utils/helpers";
import CodedConceptFilter from "./FilterComponent/CodedConceptFilter";
import DateConceptFilter from "./FilterComponent/DateConceptFilter";
import TimeStampConceptFilter from "./FilterComponent/TimeStampConceptFilter";
import TexConceptFilter from "./FilterComponent/TextConceptFilter";
import NumericConceptFilter from "./FilterComponent/NumericConceptFilter";

export default function ImageList() {
  const [parentid, setParentId] =useState<any[]>([])
  const [otherLevelParent, setOtherLevelParent] = useState<any>({selectedParentId: [] ,level:0 })
  const [otherLocationPassData, setOtherLocationPassData] = useState<any[]>([])
  const [distloc, setDistloc] =useState<any[]>([])
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
    const formData = await axios.get(
      `${process.env.NEXT_PUBLIC_FORMS}${formUUID}`
    );
    const forms = formData.data;
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
    setDateTimeConcept([])
    setTextConcept([])
    setToNumericConcept([])
    setConceptDates([])
    setNoteConcept([])
    setCodedConcept([])
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
    }else{
      setCodedConcept([])
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
  
  useEffect(()=>{
   
    const filteredLoc = locations.filter((locationItem: { parentId: any; })=>parentid.includes(locationItem.parentId))
    setDistloc(filteredLoc)
  },[parentid])

  const getLocation = async (data: any[],parentsIdArray: any[]) => {
  
    setParentId(parentsIdArray)
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
  
  const getDiffArray = (diffArray:any[])=>{
   if(diffArray.length > 0){
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
    if(data.length === 0){
      setCodedConcept([])
      setEncounterType([])
      setProgamType([])
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
                      location={distloc}
                      getOtherLocation={getOtherLocation}
                      otherLocation={otherLocation}
                      getTopLevel={getTopLevel}
                      getSecondLevel={getSecondLevel}
                      getTypeId = {getTypeId}
                      getDiffArray = {getDiffArray}
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
          conceptDates={conceptDates}
          />
        ) : selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "DateTime" ? (
          <TimeStampConceptFilter conceptDateTime={conceptDateTime} 
          dateTimeConcept={dateTimeConcept}/>
        ) :  selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Text" ? (
          <TexConceptFilter
          conceptNote={conceptText}
          textConcept ={textConcept}
           />
        ) :  selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Numeric" ? (
          <NumericConceptFilter conceptNumeric={conceptNumeric}
          toNumericConcept={toNumericConcept}
           />
        ) : selectedFormSubject && selectedFormSubject.length > 0 && concepts && concepts.dataType === "Notes" ? (
          <TexConceptFilter 
          conceptNote={conceptNote}
          textConcept ={noteConcept}/>
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
                          src={isVideo(image.url) ? 'data:image/png;base64,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' : image.signedThumbnailUrl}
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