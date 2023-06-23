import CheckButton from "./CheckButton";
import { useState, useEffect, Key } from "react";
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
        {concepts && concepts.dataType === "Coded" ? (
          <CodedConceptFilter concepts={concepts.conceptAnswers} 
          conceptCoded={conceptCoded}
          />
        ) : concepts && concepts.dataType === "Date" ? (
          <DateConceptFilter
          conceptDate={conceptDate}
          />
        ) : concepts && concepts.dataType === "DateTime" ? (
          <TimeStampConceptFilter conceptDateTime={conceptDateTime} />
        ) : concepts && concepts.dataType === "Text" ? (
          <TexConceptFilter
          conceptNote={conceptText} />
        ) : concepts && concepts.dataType === "Numeric" ? (
          <NumericConceptFilter conceptNumeric={conceptNumeric} />
        ) : concepts && concepts.dataType === "Notes" ? (
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
                <div key={image.uuid}>
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
