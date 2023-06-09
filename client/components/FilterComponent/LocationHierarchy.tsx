import { Key, useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";

interface Option {
  uuid: any;
  parentId: any;
  id: any;
  name: string;
  title: string;
}
interface Prop {
  locationIndex: {
    name: string;
    id: number;
    level: number;
  };
  index: Key;
  minLevel: number | undefined;
  maxLevel: number | undefined ;
  selectedParentId: any[];
  getLocation: (data: any[]) => void;
  getOtherLocation: (data: any[]) => void;
  getTopLevel: (data: any[], levelname: string) => void;
  getSecondLevel: (data: any[], levelType: string) => void;
  getTypeId: (data: any) => void;
  location: any[];
  otherLocation: any[];
  locationFilter: any[]
  resetFilterflag: boolean|undefined;
  
}
interface Location {
  id: number;
  name: string;
  children: Location[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LocationHierarchy({
  locationIndex,
  location,
  getLocation,
  getOtherLocation,
  getTopLevel,
  getSecondLevel,
  maxLevel,
  otherLocation,
  minLevel,
  index,
  getTypeId,
  locationFilter,
  resetFilterflag
}: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [optionSelected, setOptionSelected] = useState<any>();
  const [secondTypeName, setSecondTypeName] = useState<any>();
  const [selectLevelName, setSelectLevelName] = useState(null);
 
  const [toplevelData, setTopLevelData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);
  useEffect(()=>{
    setSelectedOption([]);
    setSelectedOptions([]);
  },[resetFilterflag])
  function handleOptionSelect(option: Option) {
    setOptionSelected(option);
    if (selectedOption.includes(option.id)) {
      setSelectedOption(selectedOption.filter((o) => o !== option.id));
    } else {
      setSelectedOption([...selectedOption, option.id]);
    }
  }

  useEffect(() => {
    if (optionSelected !== undefined) {
      setSelectLevelName(optionSelected.typeString);
    } else {
      setSelectLevelName(null);
    }
    if (optionSelected !== undefined && selectLevelName !== null) {
      getTopLevel(selectedOption, selectLevelName);
    }
  }, [optionSelected, selectedOptions, selectedOption, selectLevelName]);

  useEffect(() => {
    
    const typeIdData = async () => {
      const typeId = locationIndex.id;
      
      if (locationIndex.level === maxLevel) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?typeId=${typeId}&page=0&size=1000&sort=id,DESC`
        );

        const jsonDataState = response.data
        const stateData = jsonDataState.content;
        setTopLevelData(stateData);
        if (selectedOption.length > 0) {
          const parentsId = selectedOption.slice(-1)[0]
          
            try {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parentsId}&page0&size=1000&sort=id,DESC&typeId=${locationFilter[Number(index) + 1].id}`
              );
             
              const distJsonData = response.data
              const distData = distJsonData.content;
              getTypeId(distJsonData.content[0].typeId);
              getLocation(distData);
            } catch (Error) {
              console.error(
                `error found at ${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parentsId}&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
              );
            }
        } else {
          getLocation([]);
        }
      } 
      else {
       if(locationFilter[Number(index) + 1].id !== undefined){
        const typeIds = locationFilter[Number(index) + 1].id;
        try {
            if (selectedOptions.length > 0 && typeIds !== null) {
              const parentsId = selectedOptions.slice(-1)[0]
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parentsId}&page=0&size=1000&sort=id,DESC&typeId=${typeIds}`
              );

              const distJsonDatas = {
                "content" : [ {
                  "title" : "Ambalappuzha",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "b55359f4-ffce-44c7-a27e-812ba7c02a04",
                  "lineage" : "182381.182385.182437",
                  "titleLineage" : "Kerala, Alappuzha, Ambalappuzha",
                  "id" : 182437,
                  "typeString" : "Block"
                }, {
                  "title" : "Aryad",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "c2e2fdf5-299e-4c4b-b291-900d03478226",
                  "lineage" : "182381.182385.182444",
                  "titleLineage" : "Kerala, Alappuzha, Aryad",
                  "id" : 182444,
                  "typeString" : "Block"
                }, {
                  "title" : "Bharanicavu",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "bf80c462-6f69-4877-87a2-5d067691f835",
                  "lineage" : "182381.182385.182452",
                  "titleLineage" : "Kerala, Alappuzha, Bharanicavu",
                  "id" : 182452,
                  "typeString" : "Block"
                }, {
                  "title" : "Champakulam",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "922ccd5e-2da4-4c01-aded-ff4317dff187",
                  "lineage" : "182381.182385.182460",
                  "titleLineage" : "Kerala, Alappuzha, Champakulam",
                  "id" : 182460,
                  "typeString" : "Block"
                }, {
                  "title" : "Chengannur",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "13ebe7da-c93e-41bf-be8c-d290647a66ad",
                  "lineage" : "182381.182385.182468",
                  "titleLineage" : "Kerala, Alappuzha, Chengannur",
                  "id" : 182468,
                  "typeString" : "Block"
                }, {
                  "title" : "Harippad",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "4e0b5112-95bd-4d92-b2d5-d8247d2134d2",
                  "lineage" : "182381.182385.182478",
                  "titleLineage" : "Kerala, Alappuzha, Harippad",
                  "id" : 182478,
                  "typeString" : "Block"
                }, {
                  "title" : "Kanjikkuzhy",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "d68c2d0e-1ccd-4c0c-a08a-c93d6d4b6d50",
                  "lineage" : "182381.182385.182487",
                  "titleLineage" : "Kerala, Alappuzha, Kanjikkuzhy",
                  "id" : 182487,
                  "typeString" : "Block"
                }, {
                  "title" : "Mavelikkara",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "f78436e9-ae2d-4f7c-893a-4cf6687907c0",
                  "lineage" : "182381.182385.182496",
                  "titleLineage" : "Kerala, Alappuzha, Mavelikkara",
                  "id" : 182496,
                  "typeString" : "Block"
                }, {
                  "title" : "Muthukulam",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "5a046698-74e7-4021-833d-66bf9862ebea",
                  "lineage" : "182381.182385.182506",
                  "titleLineage" : "Kerala, Alappuzha, Muthukulam",
                  "id" : 182506,
                  "typeString" : "Block"
                }, {
                  "title" : "Other",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "3fb5ba98-6f30-4d64-9fa4-3d9d56721de1",
                  "lineage" : "182381.182385.202731",
                  "titleLineage" : "Kerala, Alappuzha, Other",
                  "id" : 202731,
                  "typeString" : "Block"
                }, {
                  "title" : "Pattanakkad",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "835303d6-b642-4354-b84a-de90b4a30a08",
                  "lineage" : "182381.182385.182516",
                  "titleLineage" : "Kerala, Alappuzha, Pattanakkad",
                  "id" : 182516,
                  "typeString" : "Block"
                }, {
                  "title" : "Thycattussery",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "cc9f7dfe-f173-4ad6-8cb8-f1ba1024c607",
                  "lineage" : "182381.182385.182524",
                  "titleLineage" : "Kerala, Alappuzha, Thycattussery",
                  "id" : 182524,
                  "typeString" : "Block"
                }, {
                  "title" : "Veliyanad",
                  "level" : 2.0,
                  "parentId" : 182385,
                  "typeId" : 679,
                  "uuid" : "1f8c905c-af49-4335-8c27-8e91c958f0a0",
                  "lineage" : "182381.182385.182530",
                  "titleLineage" : "Kerala, Alappuzha, Veliyanad",
                  "id" : 182530,
                  "typeString" : "Block"
                } ],
                "pageable" : {
                  "sort" : {
                    "sorted" : true,
                    "unsorted" : false
                  },
                  "pageNumber" : 0,
                  "pageSize" : 1000,
                  "offset" : 0,
                  "unpaged" : false,
                  "paged" : true
                },
                "last" : true,
                "totalElements" : 13,
                "totalPages" : 1,
                "first" : true,
                "sort" : {
                  "sorted" : true,
                  "unsorted" : false
                },
                "numberOfElements" : 13,
                "size" : 1000,
                "number" : 0
              }
              const distDatas = distJsonDatas.content;
              getTypeId(distJsonDatas.content[0].typeId);
              getOtherLocation(distDatas);
       
            }
          } catch (Error) {
            console.error(
              `error at ${
                process.env.NEXT_PUBLIC_TOP_ADDRESS
              }?parentId=$&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
            );
          }
        }
      }
    };
    typeIdData();
  }, [
    selectedOptions,
    selectedOption,
    locationIndex,
    maxLevel,
    minLevel,
  ]);
  function handleOptionClick(option: Option) {
    setSecondTypeName(option);
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
    }
  }
  
  useEffect(() => {
    if (selectedOptions !== undefined && secondTypeName !== undefined) {
      getSecondLevel(selectedOptions, secondTypeName.typeString);
    }
  }, [selectedOptions, secondTypeName]);
  return (
    <>
      <Menu
        as="div"
        className="location_menu"
      >
        <div>
          {maxLevel === locationIndex.level ? (
            <Menu.Button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
              <span>
                {selectedOption.length > 0
                  ? selectedOption.length + " selected"
                  : locationIndex.name}
              </span>
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          ) : (
            <Menu.Button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
              <span>
                {selectedOptions.length > 0
                  ? selectedOptions.length + " selected"
                  : locationIndex.name}
              </span>
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          )}
        </div>
        {locationIndex.level === maxLevel ? (
          <Menu.Items className="origin-top-right absolute center-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {toplevelData &&
                toplevelData.map((option: Option) => (
                  <Menu.Item key={option.id}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex justify-between w-full px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          handleOptionSelect(option);
                        }}
                      >
                        {option.title}
                        {selectedOption.includes(option.id) ? (
                          <CheckIcon
                            className="check-button"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        ) : maxLevel !== undefined &&  locationIndex.level === maxLevel-1  ? (
          <Menu.Items className="origin-top-right absolute center-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {location &&
                location.map((option: Option) => (
                  <Menu.Item key={option.uuid}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex justify-between w-full px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          handleOptionClick(option);
                        }}
                      >
                        {option.title}
                        {selectedOptions.includes(option.id) ? (
                          <CheckIcon
                            className="h-5 w-5 text-teal-500"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        ) :otherLocation ? (
          <Menu.Items className="origin-top-right absolute center-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {otherLocation &&
                otherLocation.map((option: Option) => (
                  <Menu.Item key={option.uuid}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex justify-between w-full px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          handleOptionClick(option);
                        }}
                      >
                        {option.title}
                        {selectedOptions.includes(option.id) ? (
                          <CheckIcon
                            className="h-5 w-5 text-teal-500"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        ):null}
      </Menu>
    </>
  );
}
