import CheckButton from "./CheckButton";
import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import ImageCarousel from "./ImageCarousel";
import axios from "axios";
import { useRouter } from 'next/router';

export default function ImageList() {

  const [imageList, setImageList] = useState({ total: 0, page: 0, data: [] });
  const [pagination, setPagination] = useState({ size: 10, page: 0 });

  const [orgUUID, setOrgUUID] = useState<string | string[] | undefined> ();

  const router = useRouter();

  useEffect(() => {
    if(router.isReady)
      setOrgUUID(router.query.orgUUID);
  }, [router.isReady, router.query.orgUUID])

  useEffect(() => {
    const fetchImages = async () => {
      if(orgUUID) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_IMAGE_LIST_URL}?orgUUID=${orgUUID}&page=${pagination.page}&size=${pagination.size}`);
        setImageList(response.data)
      }
    }

    fetchImages()

  }, [pagination, orgUUID])

  const [showPerpage] = useState(10);

  const [carouselImage, setCarouselImage] = useState<{ uuid: string, url: string, thumbnailUrl: string, subjectTypeName: string } | null>(null);

  const [checkedImage, setCheckedImage] = useState<string[]>([]);

  const onSelectImage = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedImage(prevCheckedImage => {
        const updatedCheckedImage = [...prevCheckedImage, value];
        return updatedCheckedImage;
      });
    } else {
      setCheckedImage(prevCheckedImage => prevCheckedImage.filter(item => item !== value));
    }
  };
  const pagechange = (size: number, page: number) => {
    setPagination({ size: size, page: page })
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="-mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {imageList.data.map((image:{url: string, thumbnailUrl: string, uuid: string, subjectTypeName: string, createdDateTime: string}) => (
            <div key={image.uuid}>
              <div className="relative">
                <div className="relative w-full h-50 rounded-lg overflow-hidden">
                  <button>
                    <img
                      src={image.thumbnailUrl}
                      alt={image?.subjectTypeName}
                      onClick={() => setCarouselImage(image)}
                      className="thumb"
                    />
                  </button>
                </div>
                <CheckButton name={image.subjectTypeName} id={image.uuid} onSelectImage={onSelectImage} checkedImage={checkedImage} flag="list" onSelectImageCarousel={function (): void {
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
          orgUUID={orgUUID}
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
