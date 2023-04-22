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

export default function ImageList() {
  const [imageList, setImageList] = useState({ total: 0, page: 0, data: [] });
  const [pagination, setPagination] = useState({ size: 10, page: 0 });
  const [orgID, setOrgID] = useState<string | string[] | undefined>();
  const [userName, setUserName] = useState<string | string[] | undefined>();
  const [locationFilter, setLocation] = useState<any>([]);
  const [subjectFilter, setSubjectFilter] = useState<any>();
  const [programFilter, setProgramFilter] = useState<any>([]);
  const [maxLevelLocation, setMaxtLevelLocation] = useState<any>([]);
  const [minLevel, setMinLevel] = useState();
  const [maxLevel, setMaxLvel] = useState<number>();
  const [encounterFilter, setEncounterFilter] = useState([]);
  const [loctionPid, setLocationPid] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) setOrgID(router.query.orgID);
    setUserName(router.query.username);
  }, [router.isReady, router.query.orgID, router.query.username]);

  useEffect(() => {
    const filterData = async () => {
      const filterResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_OPERATIONAL_MODULE}`

      console.log("filter-response",filterResponse)
      const jsonData = filterResponse;
      console.log("json-data",jsonData)

      // {
      //   formMappings: [
      //     {
      //       uuid: "a3e13dc2-4b29-4788-92f9-f313d6d9c518",
      //       id: 16616,
      //       formUUID: "0e70785c-7690-4865-b64c-6316fd55473a",
      //       subjectTypeUUID: "095244bf-600a-4872-8553-cc8c8a974c4b",
      //       formType: "IndividualProfile",
      //       formName: "Album Registration",
      //       enableApproval: false,
      //     },
      //   ],
      //   addressLevelTypes: [
      //     {
      //       uuid: "c55af85c-b043-470f-ab13-7871c69536e0",
      //       id: 741,
      //       name: "Dist",
      //       level: 1,
      //       parent: {
      //         uuid: "4e9ed3ea-149e-46dd-a46f-c6eb2826e34f",
      //       },
      //     },
      //   ],
      //   customRegistrationLocations: [],
      //   encounterTypes: [],
      //   allAddressLevels: [
      //     {
      //       uuid: "c55af85c-b043-470f-ab13-7871c69536e0",
      //       id: 741,
      //       name: "Dist",
      //       level: 1,
      //       parent: {
      //         uuid: "4e9ed3ea-149e-46dd-a46f-c6eb2826e34f",
      //       },
      //     },
      //     {
      //       uuid: "4e9ed3ea-149e-46dd-a46f-c6eb2826e34f",
      //       id: 725,
      //       name: "State",
      //       level: 2,
      //     },
      //   ],
      //   programs: [],
      //   taskTypes: [],
      //   relations: [],
      //   subjectTypes: [
      //     {
      //       uuid: "095244bf-600a-4872-8553-cc8c8a974c4b",
      //       operationalSubjectTypeName: "Album",
      //       groupRoles: [],
      //       allowEmptyLocation: false,
      //       validFirstNameFormat: null,
      //       validLastNameFormat: null,
      //       iconFileS3Key: null,
      //       nameHelpText: "abc",
      //       memberSubjectUUIDs: "",
      //       validMiddleNameFormat: null,
      //       allowMiddleName: false,
      //       group: false,
      //       allowProfilePicture: false,
      //       name: "Album",
      //       id: 698,
      //       type: "Individual",
      //     },
      //   ],
      //   forms: [
      //     {
      //       formType: "IndividualProfile",
      //       formName: "Album Registration",
      //       formUUID: "0e70785c-7690-4865-b64c-6316fd55473a",
      //     },
      //   ],
      // };
      const programs = jsonData.programs;
      const encounters = jsonData.encounterTypes;
      const sub = jsonData.subjectTypes;
      const addressLevel = jsonData.allAddressLevels;
      if (addressLevel !== undefined && addressLevel !== null) {
        const maxLeveldata = Math.max(...addressLevel.map((obj) => obj.level));
        setMaxLvel(maxLeveldata);
        const minLeveldata = Math.min(...addressLevel.map((obj) => obj.level));
        setMinLevel(minLeveldata);
        const maxLevelLocation = addressLevel.find(
          (obj) => obj.level === maxLevel
        );

        setMaxtLevelLocation(maxLevelLocation);

        const sortedData = addressLevel.sort(
          (a: { level: number }, b: { level: number }) => b.level - a.level
        );
        setLocation(sortedData);
      }

      setSubjectFilter(sub);
      setProgramFilter(programs);
      setEncounterFilter(encounters);
    };
    filterData();
  }, []);

  useEffect(() => {
    if (router.isReady) setOrgID(router.query.orgID);
    setUserName(router.query.username);
  }, [router.isReady, router.query.orgID, router.query.username]);

  useEffect(() => {
    if (router.isReady) setOrgID(router.query.orgID);
    setUserName(router.query.username);
  }, [router.isReady, router.query.orgID, router.query.username]);

  useEffect(() => {
    const fetchImages = async () => {
      if (orgID) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?orgID=${orgID}&page=${pagination.page}&size=${pagination.size}`
        );
        setImageList(response.data);
      }
    };
    fetchImages();
  }, [pagination, orgID]);

  const [showPerpage ,setShowperpage] = useState(10);

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
    console.log("selected Images --", JSON.stringify(selectedImage));
    console.log("userName --", userName);
    console.log("image des--", await inputValue);
    // console.log(`{"username": ", userName ", " data": "${selectedImage}]"`);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DOWNLOAD_REQUEST_URL}`,
      { username: userName, data: selectedImage }
    );
    console.log("response from handle --", response);
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

  // filters state
  const [concepts, setConcept] = useState<any[]>([]);
  const [date, setDateRange] = useState<any[]>([]);
  const [encouter, setEncounterType] = useState<any[]>([]);
  const [program, setProgamType] = useState<any[]>([]);
  const [account, setAcountType] = useState<any[]>([]);
  const [subject, setSubjectType] = useState<any[]>([]);

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
  // const locationParentId =(data: number)=>{
  //   console.log("data",data)
  //   setLocationPid(data);
  // }
  const subjectType = (data: any[]) => {
    setSubjectType(data);
  };

  const handleApplyFilter = async () => {
    console.log("this file is running ");
    console.log("value", concepts);
    console.log("datavalue", date);
  };
  const [number, setNumber] = useState(0);

  const handleNumberChange = (value: SetStateAction<number>) => {
    setNumber(value);
    setShowperpage(value);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="mt-10 text-lg leading-6 font-medium text-gray-900 ml-8 flex-none">
          Filters
        </span>
        <div className="mt-10 text-base leading-6 font-medium text-gray-900 mr-4">
          <NumberDropdown
            label="#Images per page"
            min={0}
            max={100}
            step={10}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      <dl className="grid grid-cols-0 gap-1 sm:grid-cols-7 w-auto mr-0 ml-8">
        {locationFilter &&
          locationFilter.map((locationIndex: any[], index: Key) => (
            <LocationHierarchy
              key={index}
              locationIndex={locationIndex}
              index={index}
              minLevel={minLevel}
              maxLevel={maxLevel}
            />
          ))}
        <Daterange dateRange={dateRange} />
        <EncounterType
          encounterType={encounterType}
          encounterFilter={encounterFilter}
        />
        <SubjectType subjectType={subjectType} subjectFilter={subjectFilter} />
        <Program programType={programType} programFilter={programFilter} />
        <Concepts concept={concept} />
        <Accounts accountType={accountType} />
      </dl>
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
              (image: {
                signedUrl: string;
                signedThumbnailUrl: string;
                uuid: string;
                subjectTypeName: string;
                createdDateTime: string;
              }) => (
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
                      name={image.subjectTypeName}
                      id={image.uuid}
                      onSelectImage={onSelectImage}
                      checkedImage={checkedImage}
                      imageDetail={image}
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
            orgID={orgID}
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
