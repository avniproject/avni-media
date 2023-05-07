import CheckButton from "./CheckButton";
import { useState, useEffect, SetStateAction, Key } from "react";
import Pagination from "@/components/Pagination";
import ImageCarousel from "./ImageCarousel";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import UserInputModal from "./ImageDescriptionModal";
import Accounts from "./FilterComponent/Accounts";
import Concepts from "./FilterComponent/Concepts";
import Daterange from "./FilterComponent/Daterange";
import EncounterType from "./FilterComponent/EncounterType";
import LocationHierarchy from "./FilterComponent/LocationHierarchy";
import Program from "./FilterComponent/Program";
import SubjectType from "./FilterComponent/SubjectType";
import NumberDropdown from "./FilterComponent/ImageSize";
import jwt_decode from "jwt-decode";
import { redirectIfNotValid, getUserUuidFromToken, operationalModuleData, getImageName, imageType} from '@/utils/helpers'


export default function ImageList() {
  const [add, setAdd]= useState<any>([])
  const[address ,setAddress] = useState<any>([])
  const[secondAddress, setSecondAddress] = useState<any>([])
  const [selectedParentId,setSelectedParentId] = useState<any>([])
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [imageList, setImageList] = useState({ total: 0, page: 0, data: [] });
  const [pagination, setPagination] = useState({ size: 10, page: 0 });
  const [orgID, setOrgID] = useState<string | string[] | undefined>();
  const [userName, setUserName] = useState<string | string[] | undefined>();
  const [locationFilter, setLocation] = useState<any>([]);
  const [subjectFilter, setSubjectFilter] = useState<any>([]);
  const [programFilter, setProgramFilter] = useState<any>([]);
  const [maxLevelLocation, setMaxtLevelLocation] = useState<any>([]);
  const [minLevel, setMinLevel] = useState<number>();
  const [maxLevel, setMaxLevel] = useState<number>();
  const [minLevelName, setMinLevelName] = useState<string>('');
  const [encounterFilter, setEncounterFilter] = useState<any>([]);
  const [loction, setLocations] = useState<any>([]);
  const [otherLocation, setOtherLocation] = useState<any>([]);
  const [topLevel ,setTopLevel] =useState<any>([]);
  const [secondLevel ,setSecondLevel] = useState<any>([]);
  const [showPerpage, setShowperpage] = useState(10);
  // filters state
  const [concepts, setConcept] = useState<any[]>([]);
  const [date, setDateRange] = useState<any[]>([]);
  const [encouter, setEncounterType] = useState<any[]>([]);
  const [program, setProgamType] = useState<any[]>([]);
  const [account, setAcountType] = useState<any[]>([]);
  const [subject, setSubjectType] = useState<any[]>([]);
  const [dataBody, setDataBody]= useState<any>()
  const router = useRouter();

  useEffect(() => {
    const filterData = async () => {
      const processedData = await operationalModuleData()

      setMaxLevel(processedData.maxAddressLevel);

      setMinLevel(processedData.minAddressLevel);

      setMinLevelName(processedData.minLevelAddressName)

      setMaxtLevelLocation(processedData.maxLevelLocation);

      setLocation(processedData.sortedAddressLevel);

      setSubjectFilter(processedData.subjects);

      setProgramFilter(processedData.programs);

      setEncounterFilter(processedData.encounters);
    };
    filterData();
  }, []);

  useEffect(() => {
    const userUUID = getUserUuidFromToken()
    setUserName(userUUID);
  }, []);

  useEffect(() => {
    redirectIfNotValid();
    const fetchImages = async () => {
      const options = {
        headers: {
          "AUTH-TOKEN": localStorage.getItem("authToken"),
        },
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?page=${pagination.page}&size=${showPerpage}`,
        options
      );
      setImageList(response.data);
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
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  // checke images function
  const onSelectImage = (
    value: string,
    checked: boolean,
    selectedImageDetails: any
  ) => {
    if (checked) {
      setCheckedImage((prevCheckedImage) => {
        const updatedCheckedImage = [...prevCheckedImage, value];
        return updatedCheckedImage;
      });

      setSelectedImage((prevSelectedImage) => {
        const updatedSelectedImage = [
          ...prevSelectedImage,
          selectedImageDetails,
        ];
        return updatedSelectedImage;
      });
    } else {
      setCheckedImage((prevCheckedImage) =>
        prevCheckedImage.filter((item) => item !== value)
      );

      setSelectedImage((prevSelectedImage) =>
        prevSelectedImage.filter((item) => item !== selectedImageDetails)
      );
    }
  };
  // pagination function
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

  //  user input form
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
    setConcept(data);
  };

  const programType = (data: any[]) => {
    setProgamType(data);
  };

  const dateRange = (data: any[]) => {
    setDateRange(data);
  };

  const encounterType = (data: any[]) => {
    setEncounterType(data);
  };

  const accountType = (data: any[]) => {
    setAcountType(data);
  };

  const getLocation = (data: any[]) => {
    setLocations(data);
  };

  const getSelectedLocation=(data: any[])=>{
   console.log("data",data)
  }

  const getOtherLocation = (data: any[]) => {
    setOtherLocation(data);
  };


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

  const subjectType = (data: any[]) => {
    setSubjectType(data);
  };

useEffect(() => {

  if (address.length > 0 || secondAddress.length > 0) {
    setAdd([...address, ...secondAddress]);
  }
  else{
    setAdd([])
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
    const body = Object.fromEntries(
      Object.entries({
        subjectTypeNames: subject,
        programNames: program,
        encounterTypeNames: encouter,
        fromDate: fromDate,
        toDate: toDate,
        addresses: add,
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
 },[date, subject, encouter, program, toDate, fromDate, add]);



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

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="mt-10 text-lg leading-6 font-medium text-gray-900 ml-8 flex-none">
          Filters
        </span>
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

      <div className="flex justify-center mx-auto w-center mr-4 ml-4">
        {locationFilter &&
          locationFilter.map(
            (
              locationIndex: {
                name: string;
                id: number;
                level: number;
              },
              index: Key
            ) => (
              <LocationHierarchy
                key={index}
                locationIndex={locationIndex}
                index={index}
                selectedParentId={selectedParentId}
                minLevel={minLevel}
                maxLevel={maxLevel}
                getLocation={getLocation}
                loction={loction}
                getOtherLocation={getOtherLocation}
                otherLocation={otherLocation}
                getTopLevel={getTopLevel}
                getSecondLevel={getSecondLevel}
                getSelectedLocation={getSelectedLocation}
              />
            )
          )}
        <Daterange dateRange={dateRange} />
        {encounterFilter && encounterFilter.length > 0 && (
          <EncounterType
            encounterType={encounterType}
            encounterFilter={encounterFilter}
          />
        )}
        {subjectFilter && subjectFilter.length > 0 && (
          <SubjectType
            subjectType={subjectType}
            subjectFilter={subjectFilter}
          />
        )}

        {programFilter && programFilter.length > 0 && (
          <Program programType={programType} 
          programFilter={programFilter} />
        )}
        {/* <Concepts concept={concept} />
        <Accounts accountType={accountType} /> */}
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
          <button
            onClick={handleApplyFilter}
            className="inline-flex items-center px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 ml-2 mb-2"
          >
            Apply Filter
          </button>

          <button
            onClick={handleOpenModal}
            className="inline-flex items-center px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 ml-2 mb-2"
          >
            Download
          </button>

          <Link href="./downloadList">
            <button className="inline-flex items-center px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 ml-2 mb-2">
              Available Downloads
            </button>
          </Link>
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
            checkedImage={checkedImage}
            setCheckedImage={[]}
          />
        )}
        <Pagination
          showperpage={showPerpage}
          pagechange={pagechange}
          total={imageList.total}
        />
      </div>
    </>
  );
}
