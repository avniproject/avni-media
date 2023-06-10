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
  getOtherLocation: (data: any[], level: any) => void;
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
        } 
        else {
          getLocation([]);
        }
      } 
      else {
       if(locationFilter[Number(index) + 1] !== undefined && locationFilter[Number(index) + 1].id !== undefined ){
        const typeIds = locationFilter[Number(index) + 1].id;
        try {
            if (selectedOptions.length > 0 && typeIds !== null) {
              const parentsId = selectedOptions.slice(-1)[0]
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parentsId}&page=0&size=1000&sort=id,DESC&typeId=${typeIds}`
              );

              const distJsonDatas = response.data
              const distDatas = distJsonDatas.content;
              getTypeId(distJsonDatas.content[0].typeId);
              const level = distJsonDatas.content[0].level
              getOtherLocation(distDatas, level);
       
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
      <Menu as="div" className="location_menu">
        <div>
          <Menu.Button
            className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
          >
            <span>
              {locationIndex.level === maxLevel
                ? selectedOption.length > 0
                  ? `${selectedOption.length} selected`
                  : locationIndex.name
                : selectedOptions.length > 0
                ? `${selectedOptions.length} selected`
                : locationIndex.name}
            </span>
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        {(locationIndex.level === maxLevel || locationIndex.level === (maxLevel ?? 0) - 1) && (
          <Menu.Items
            className="origin-top-right absolute center-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              {locationIndex.level === maxLevel
                ? toplevelData &&
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
                  ))
                : location &&
                  location.map((option) => (
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
        )}
        {otherLocation &&
          otherLocation.map((locationData) => {
            if (
              maxLevel !== undefined &&
              locationData.level === (maxLevel ?? 0) - 2 &&
              locationIndex.level === (maxLevel ?? 0) - 2
            ) {
              return (
                <Menu.Items
                  className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  key={locationData.level}
                >
                  <div className="py-1">
                    {locationData.data &&
                      locationData.data.map((option: Option) => (
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
              );
            } else if (
              maxLevel !== undefined &&
              locationData.level === (maxLevel ?? 0) - 3 &&
              locationIndex.level === (maxLevel ?? 0) - 3
            ) {
              return (
                <Menu.Items
                  className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  key={locationData.level}
                >
                  <div className="py-1">
                    {locationData.data &&
                      locationData.data.map((option: Option) => (
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
              );
            }
            return null;
          })}
      </Menu>
    </>
  );  
}
