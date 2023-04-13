import CheckButton from "./CheckButton";
import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import ImageCarousel from "./ImageCarousel";
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function ImageList() {

  const [imageList, setImageList] = useState({ total: 0, page: 0, data: [] });
  const [pagination, setPagination] = useState({ size: 10, page: 0 });

  const [orgID, setOrgID] = useState<string | string[] | undefined> ();
  const [userName, setUserName] = useState<string | string[] | undefined> ();

  const router = useRouter();

  useEffect(() => {
    if(router.isReady)
      setOrgID(router.query.orgID);
      setUserName(router.query.username);
  }, [router.isReady, router.query.orgID, router.query.username])

  useEffect(() => {
    const fetchImages = async () => {
      if(orgID) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?orgID=${orgID}&page=${pagination.page}&size=${pagination.size}`);
        setImageList(response.data)
      }
    }

    fetchImages()

  }, [pagination, orgID])

  const [showPerpage] = useState(10);

  const [carouselImage, setCarouselImage] = useState<{ uuid: string, signedUrl: string, signedThumbnailUrl: string, subjectTypeName: string } | null>(null);

  const [checkedImage, setCheckedImage] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string[]>([]);

  const onSelectImage = (value: string, checked: boolean, selectedImageDetails: any) => {
    if (checked) {
      setCheckedImage(prevCheckedImage => {
        const updatedCheckedImage = [...prevCheckedImage, value];
        return updatedCheckedImage;
      });

      setSelectedImage(prevSelectedImage => {
        const updatedSelectedImage = [...prevSelectedImage, selectedImageDetails];
        return updatedSelectedImage;
      });
    } else {
      setCheckedImage(prevCheckedImage => prevCheckedImage.filter(item => item !== value));

      setSelectedImage(prevSelectedImage => prevSelectedImage.filter(item => item !== selectedImageDetails));
    }
  };
  const pagechange = (size: number, page: number) => {
    setPagination({ size: size, page: page })
  };

  const handleSendSelectedImages = async () => {
    alert("We are procesing your donwload request. Once the download is ready, it will be available under Available Downloads.");
    console.log("selected Images --", JSON.stringify(selectedImage));
    console.log("userName --", userName);
    // console.log(`{"username": ", userName ", " data": "${selectedImage}]"`);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DOWNLOAD_REQUEST_URL}`, {"username": userName, "data": selectedImage});
    console.log("response from handle --", response);
  }

  return (
    <div className="bg-white">
      <div className="flex justify-center mt-10">
          <button className="inline-flex items-center px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 ml-2 mb-2">Apply Filter</button>

          <button onClick={handleSendSelectedImages} className="inline-flex items-center px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 ml-2 mb-2">Download</button>
          
          <Link href="./downloadList">
          <button className="inline-flex items-center px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 ml-2 mb-2">Available Downloads</button>
          </Link>
      </div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="-mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {imageList.data.map((image:{signedUrl: string, signedThumbnailUrl: string, uuid: string, subjectTypeName: string, createdDateTime: string}) => (
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
                <CheckButton name={image.subjectTypeName} id={image.uuid} onSelectImage={onSelectImage} checkedImage={checkedImage} imageDetail={image} flag="list" onSelectImageCarousel={function (): void {
                  throw new Error("Function not implemented.");
                }} />
              </div>
            </div>
          ))}
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
  )
}
