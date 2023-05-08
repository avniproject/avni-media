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
import Button from "./DownloadComponent/Button";
import jwt_decode from "jwt-decode";
import { redirectIfNotValid, getUserUuidFromToken, operationalModuleData, getImageName, imageType} from '@/utils/helpers'


export default function ImageList() {
  const [add, setAdd]= useState<any>([])
  const[address ,setAddress] = useState<any>([])
  const[secondAddress, setSecondAddress] = useState<any>([])
  const [selectedParentId,setSelectedParentId] = useState<any>([])
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
  const [minLevelName, setMinLevelName] = useState<string>('');
  const [encounterFilter, setEncounterFilter] = useState<any>([]);
  const [loction, setLocations] = useState<any>([]);
  const [otherLocation, setOtherLocation] = useState<any>([]);
  const [topLevel ,setTopLevel] =useState<any>([]);
  const [secondLevel ,setSecondLevel] = useState<any>([]);
  const [showPerpage, setShowperpage] = useState(10);
  // filters state
  const [concepts, setConcept] = useState<any[]>([]);
  const [date, setDateRange] = useState<any[]|null>([]);
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

      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?page=${pagination.page}&size=${showPerpage}`,
      //   options
      // );
      setImageList({
        "page": 0,
        "data": [{
          "uuid": "de79dcc1-d91d-417e-b35a-369b44246719",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/76e037de-a30e-485a-af9a-cb8613615499.jpg",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/76e037de-a30e-485a-af9a-cb8613615499.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fc3f4e7758e2a1e91a144a7dfd12cbeab9701d65d7ec0fe95ea06cdd829fb2be",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/76e037de-a30e-485a-af9a-cb8613615499.jpg",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/76e037de-a30e-485a-af9a-cb8613615499.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=99a32b0ad2346a4983bcfd59ab0b5bb23aaaf455bd364c35b8cdb13dde3e9384",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-05-04 10:06:38.906+00",
          "createdDateTime": "2023-05-04 10:06:38.906+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182386,\"uuid\":\"6edd7b3b-6374-4303-97ea-08d4fb2f0fd4\",\"is_voided\":false,\"created_by_id\":652,\"last_modified_by_id\":652,\"created_date_time\":\"2023-04-19T06:44:39.86+00:00\",\"last_modified_date_time\":\"2023-04-19T06:44:39.968+00:00\",\"Dist\":\"Mumbai\",\"Dist id\":182386,\"organisation_id\":null}"
        }, {
          "uuid": "0480ccd9-533c-4c1e-91ce-51c74f540c11",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/fadc4796-6182-479b-9439-adf5815b090b.png",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/fadc4796-6182-479b-9439-adf5815b090b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=30d7ad7f21c648c177350b73b847c118428616f634c5a34b30fb5c3849843609",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/fadc4796-6182-479b-9439-adf5815b090b.png",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/fadc4796-6182-479b-9439-adf5815b090b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=2ea9966d95fee86fe78a6260f7ab83777627164550d3fc74d9725e4bba19abde",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-05-02 04:04:23.738+00",
          "createdDateTime": "2023-05-02 04:04:23.738+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182386,\"uuid\":\"6edd7b3b-6374-4303-97ea-08d4fb2f0fd4\",\"is_voided\":false,\"created_by_id\":652,\"last_modified_by_id\":652,\"created_date_time\":\"2023-04-19T06:44:39.86+00:00\",\"last_modified_date_time\":\"2023-04-19T06:44:39.968+00:00\",\"Dist\":\"Mumbai\",\"Dist id\":182386,\"organisation_id\":null}"
        }, {
          "uuid": "0f0a579d-bfae-4ef1-ac98-76bfebb133dd",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/df9a25bb-770e-428a-98e8-c577c22b6a36.jpg",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/df9a25bb-770e-428a-98e8-c577c22b6a36.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c435cf5663c949dc2fa9c8ac7e322a4af49aea1494e95e8ed788fc9176d79bfe",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/df9a25bb-770e-428a-98e8-c577c22b6a36.jpg",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/df9a25bb-770e-428a-98e8-c577c22b6a36.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=6b2594c8b055cc421310c487149b11a51c2abd9a2f57cd608565b3ff102014c5",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-04-21 04:18:33.654+00",
          "createdDateTime": "2023-04-21 04:18:33.654+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182386,\"uuid\":\"6edd7b3b-6374-4303-97ea-08d4fb2f0fd4\",\"is_voided\":false,\"created_by_id\":652,\"last_modified_by_id\":652,\"created_date_time\":\"2023-04-19T06:44:39.86+00:00\",\"last_modified_date_time\":\"2023-04-19T06:44:39.968+00:00\",\"Dist\":\"Mumbai\",\"Dist id\":182386,\"organisation_id\":null}"
        }, {
          "uuid": "639eae52-60a2-4c13-a0de-a589897ee5b9",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/b71d3d8c-47f6-4288-bbd9-6b0a6c67d85f.JPG",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/b71d3d8c-47f6-4288-bbd9-6b0a6c67d85f.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c47ac6573d25203f135ecedb2c0692761e82b3b3f51edcdd6dbbe11530b3eeac",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/b71d3d8c-47f6-4288-bbd9-6b0a6c67d85f.JPG",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/b71d3d8c-47f6-4288-bbd9-6b0a6c67d85f.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c1660bff8d7f277efb85a58a0984b2c2bca31de8198ac9803305bdf18192916f",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-04-19 06:45:13.555+00",
          "createdDateTime": "2023-04-19 06:45:13.555+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182386,\"uuid\":\"6edd7b3b-6374-4303-97ea-08d4fb2f0fd4\",\"is_voided\":false,\"created_by_id\":652,\"last_modified_by_id\":652,\"created_date_time\":\"2023-04-19T06:44:39.86+00:00\",\"last_modified_date_time\":\"2023-04-19T06:44:39.968+00:00\",\"Dist\":\"Mumbai\",\"Dist id\":182386,\"organisation_id\":null}"
        }, {
          "uuid": "69228aa1-099e-4c7f-9f2e-a5578a3f0a49",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/d2bb86d0-54c6-454b-aab1-85cd00e66e7a.jpg",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/d2bb86d0-54c6-454b-aab1-85cd00e66e7a.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=1754379a3c0f69fc3b9ee31031c12865387747cade97bd04dda9b344f692947c",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/d2bb86d0-54c6-454b-aab1-85cd00e66e7a.jpg",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/d2bb86d0-54c6-454b-aab1-85cd00e66e7a.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=da9cfa4459eb05b9cdec72b2ba127a0cb66147feadb7d3af60b90b39a9209c38",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-04-13 10:40:48.026+00",
          "createdDateTime": "2023-04-13 10:40:48.026+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182370,\"uuid\":\"c155bfca-b718-484b-b4fc-e84844edcd15\",\"is_voided\":false,\"created_by_id\":1,\"last_modified_by_id\":1,\"created_date_time\":\"2023-04-06T10:15:58.42+00:00\",\"last_modified_date_time\":\"2023-04-06T10:15:58.462+00:00\",\"Dist\":null,\"Dist id\":null,\"organisation_id\":null}"
        }, {
          "uuid": "fced9384-d67e-4ef1-842a-da9c88fc511a",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/3a0dd203-ec8f-44c4-b816-5d1b17f7ff5e.png",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/3a0dd203-ec8f-44c4-b816-5d1b17f7ff5e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d80bc83758d6ddd68bf8aef083d21566bf75cd7dd73f0cfc48512841fbd6d018",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/3a0dd203-ec8f-44c4-b816-5d1b17f7ff5e.png",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/3a0dd203-ec8f-44c4-b816-5d1b17f7ff5e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=4379a56bab2eb8c92830f2855c842903eb0ea73f2bf26b430c37226543ada984",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-04-13 09:15:39.901+00",
          "createdDateTime": "2023-04-13 09:15:39.901+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182370,\"uuid\":\"c155bfca-b718-484b-b4fc-e84844edcd15\",\"is_voided\":false,\"created_by_id\":1,\"last_modified_by_id\":1,\"created_date_time\":\"2023-04-06T10:15:58.42+00:00\",\"last_modified_date_time\":\"2023-04-06T10:15:58.462+00:00\",\"Dist\":null,\"Dist id\":null,\"organisation_id\":null}"
        }, {
          "uuid": "97f87264-8eb2-449c-9231-9cfea6b94ded",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/0306a829-3a41-4ae2-80f8-52873bcc4751.png",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/0306a829-3a41-4ae2-80f8-52873bcc4751.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=58110720db25631757eb0ab0d3be9b6fc229d87cdc0571872e10ed4843fe803b",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/0306a829-3a41-4ae2-80f8-52873bcc4751.png",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/0306a829-3a41-4ae2-80f8-52873bcc4751.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=16fddb7cbf89c0bb48889aa6d5628c9cd80f12dbd3fde3d643beb764d5614466",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-04-13 09:21:13.955+00",
          "createdDateTime": "2023-04-13 07:17:15.954+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182370,\"uuid\":\"c155bfca-b718-484b-b4fc-e84844edcd15\",\"is_voided\":false,\"created_by_id\":1,\"last_modified_by_id\":1,\"created_date_time\":\"2023-04-06T10:15:58.42+00:00\",\"last_modified_date_time\":\"2023-04-06T10:15:58.462+00:00\",\"Dist\":null,\"Dist id\":null,\"organisation_id\":null}"
        }, {
          "uuid": "30ea9224-3040-41a5-ac29-10391f0807b4",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/b8472631-4f20-4c15-9948-d2a1bcabb8b5.png",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/b8472631-4f20-4c15-9948-d2a1bcabb8b5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=61c971ef3499d65bbba6c891cbd88e57db83905d5d7d975dfbe5374aadcfb7d3",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/b8472631-4f20-4c15-9948-d2a1bcabb8b5.png",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/b8472631-4f20-4c15-9948-d2a1bcabb8b5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=269af3118e4d5915a0806ba2a7ecd69e2fe0fdfc87e7988a10554969e49fa339",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-05-01 08:52:46.426+00",
          "createdDateTime": "2023-04-06 10:29:47.659+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182370,\"uuid\":\"c155bfca-b718-484b-b4fc-e84844edcd15\",\"is_voided\":false,\"created_by_id\":1,\"last_modified_by_id\":1,\"created_date_time\":\"2023-04-06T10:15:58.42+00:00\",\"last_modified_date_time\":\"2023-04-06T10:15:58.462+00:00\",\"Dist\":null,\"Dist id\":null,\"organisation_id\":null}"
        }, {
          "uuid": "81e809a2-1e25-48fe-8f10-2b636d60af3b",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/e70a306c-27c4-43cf-9aaa-37c8d3153dca.jpeg",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/e70a306c-27c4-43cf-9aaa-37c8d3153dca.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fbbe3b9c01e9c07d59ff1eeaf9691c943f1f0e1a1032fbe673c893f88d92b23c",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/e70a306c-27c4-43cf-9aaa-37c8d3153dca.jpeg",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/e70a306c-27c4-43cf-9aaa-37c8d3153dca.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=5664643d62b2105576d068cb152483d2c3b0b8a9f6bed72d437bdb9d6440b2a4",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-04-06 10:28:48.523+00",
          "createdDateTime": "2023-04-06 10:28:48.523+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182370,\"uuid\":\"c155bfca-b718-484b-b4fc-e84844edcd15\",\"is_voided\":false,\"created_by_id\":1,\"last_modified_by_id\":1,\"created_date_time\":\"2023-04-06T10:15:58.42+00:00\",\"last_modified_date_time\":\"2023-04-06T10:15:58.462+00:00\",\"Dist\":null,\"Dist id\":null,\"organisation_id\":null}"
        }, {
          "uuid": "ec40ae43-664e-47e0-81b5-c621096e3789",
          "url": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/f76806c7-ea23-4024-a292-c0f0b64c01fb.JPG",
          "conceptName": "Image",
          "signedUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/f76806c7-ea23-4024-a292-c0f0b64c01fb.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=dbdc361df3f81d7fb6a30ea91b7e6271b0bbeaac17bb71575bd4f6160732cc1b",
          "thumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/f76806c7-ea23-4024-a292-c0f0b64c01fb.JPG",
          "signedThumbnailUrl": "https://s3.ap-south-1.amazonaws.com/staging-user-media/mt/thumbnails/f76806c7-ea23-4024-a292-c0f0b64c01fb.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230508T033307Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAJ2GEFY7BEHSJPGQQ%2F20230508%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=e30ad15f43bbdf114b388871260374c78b17017fde435e3172adcb800c079378",
          "subjectTypeName": "Album",
          "programEnrolment": null,
          "encounterTypeName": null,
          "lastModifiedDateTime": "2023-04-06 10:26:42.889+00",
          "createdDateTime": "2023-04-06 10:26:42.889+00",
          "syncConcept1Name": null,
          "syncConcept2Name": null,
          "syncParameterValue1": null,
          "syncParameterValue2": null,
          "address": "{\"State\":\"MH\",\"gps_coordinates\":null,\"State id\":182370,\"id\":182370,\"uuid\":\"c155bfca-b718-484b-b4fc-e84844edcd15\",\"is_voided\":false,\"created_by_id\":1,\"last_modified_by_id\":1,\"created_date_time\":\"2023-04-06T10:15:58.42+00:00\",\"last_modified_date_time\":\"2023-04-06T10:15:58.462+00:00\",\"Dist\":null,\"Dist id\":null,\"organisation_id\":null}"
        }]
      },);
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
  // checke images function
  const onSelectImage = (
    value: string,
    checked: boolean,
   
  ) => {
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
    const { data } = imageList;
    const filteredData = imageList.data.filter((item: { uuid: string; }) => checkedImage.includes(item.uuid))
    console.log("filter data", filteredData);
    setSelectedImage((prevImages) => {
      const newImages = [...prevImages, ...filteredData];
      return newImages.filter(
        ({ uuid }, index) =>
          newImages.findIndex((image) => image.uuid === uuid) === index // remove duplicates
          && checkedImage.includes(uuid) // include only checked images
      );
    });
  }, [checkedImage, imageList]);
  
  // pagination function
  const pagechange = (size: number, page: number) => {
    setPagination({ size: size, page: page });
  };
  const [showModal, setShowModal] = useState(false);

  const handleSendSelectedImages = async (inputValue: any) => {
    console.log("selected ",selectedImage,checkedImage)
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

  const dateRange = (data: any[]|null) => {
    if(data !== null){
      setDateRange(data);
    }
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
          <Button 
            name="Apply Filter"
            onClick={handleApplyFilter} />
          <Button
            onClick={handleOpenModal}
            name=" Download" />
          <Link href="./downloadList">
            <Button 
              name='Available Downloads' onClick={function (): void {
                throw new Error("Function not implemented.");
              } }       
            />
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
            pagination ={pagination}
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
