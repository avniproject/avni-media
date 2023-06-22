import { Key, useEffect, useRef, useState } from "react";
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
  maxLevel: number | undefined;
  selectedParentId: any[];
  getLocation: (data: any[]) => void;
  getOtherLocation: (data: any[], level: any) => void;
  getTopLevel: (data: any[], levelname: string) => void;
  getSecondLevel: (data: any[], levelType: string) => void;
  getTypeId: (data: any) => void;
  location: any[];
  otherLocation: any[];
  locationFilter: any[];
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
}: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [optionSelected, setOptionSelected] = useState<any>();
  const [secondTypeName, setSecondTypeName] = useState<any>();
  const [selectLevelName, setSelectLevelName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [toplevelData, setTopLevelData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any[]>([]);

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
    if (selectedOption.length === 0) {
      setSelectedOptions([]);
    }
  }, [selectedOption]);

  useEffect(() => {
    const typeIdData = async () => {
      const typeId = locationIndex.id;

      if (locationIndex.level === maxLevel) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?typeId=${typeId}&page=0&size=1000&sort=id,DESC`
        );

        const jsonDataState = response.data;
        const stateData = jsonDataState.content;
        setTopLevelData(stateData);
        if (selectedOption.length > 0) {
          const parentsId = selectedOption.slice(-1)[0];
          const parentsUUID = locationFilter[Number(index) ].uuid;
          const parentsJson = locationFilter.filter((item)=> item.parent!== undefined && item.parent.uuid === parentsUUID)
          try {
            parentsJson.map(async (item)=>{
              const response = await axios.get(
                `${
                  process.env.NEXT_PUBLIC_TOP_ADDRESS
                }?parentId=${parentsId}&page0&size=1000&sort=id,DESC&typeId=${item.id}` 
              );
            const distJsonData = response.data;
            const distData = distJsonData.content;
            getTypeId(distJsonData.content[0].typeId);
            getLocation(distData);
            })
          } catch (Error) {
            console.error(
              `error found at ${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parentsId}`
            );
          }
        } else {
          getLocation([]);
        }
      } else {
        if (
          locationFilter[Number(index) ] !== undefined &&
          locationFilter[Number(index) ].uuid !== undefined
        ) {
          const parentsUUID = locationFilter[Number(index) ].uuid;
          const parentsJson = locationFilter.filter((item)=> item.parent!== undefined && item.parent.uuid === parentsUUID)
          try {
            if (selectedOptions.length > 0 ) {
              const parentsId = selectedOptions.slice(-1)[0];
                parentsJson.map(async (item)=>{
                  const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parentsId}&page=0&size=1000&sort=id,DESC&typeId=${item.id}`
                  );
                  const distJsonDatas = response.data;
                  const distDatas = distJsonDatas.content;
                  getTypeId(distJsonDatas.content[0].typeId);
                  const level = distJsonDatas.content[0].level;
                  getOtherLocation(distDatas, level);
                })
            }
          } catch (Error) {
            console.error(
              `error at ${process.env.NEXT_PUBLIC_TOP_ADDRESS}`
            );
          }
        }
      }
    };
    typeIdData();
  }, [selectedOptions, selectedOption, locationIndex, maxLevel, minLevel]);
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

  const handleClickOutside = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <Menu as="div" className="location_menu">
        <div ref={dropdownRef}>
          <div>
            <button
              className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
              onClick={() => setIsOpen(!isOpen)}
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
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
          {locationIndex.level === maxLevel && isOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {toplevelData &&
                  toplevelData.map((option: Option) => (
                    <div key={option.id}>
                      <button
                        className={`flex justify-between w-full px-4 py-2 text-sm ${
                          selectedOption.includes(option.id)
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.title}
                        {selectedOption.includes(option.id) && (
                          <CheckIcon
                            className="check-button"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {isOpen && locationIndex.level === (maxLevel ?? 0) - 1 && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {location.map((option) => (
                  <div key={option.uuid}>
                    <button
                      className={classNames(
                        selectedOptions.includes(option.id)
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
                  </div>
                ))}
              </div>
            </div>
          )}
          {otherLocation && maxLevel !== undefined &&
            otherLocation.map((locationData) => {
            for(let i=2 ; i<= maxLevel ; i++)
            {
              if (
                maxLevel !== undefined &&
                locationData.level === (maxLevel ?? 0) - i &&
                locationIndex.level === (maxLevel ?? 0) - i
              ) {
                return (
                  isOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      key={locationData.level}
                    >
                      <div className="py-1">
                        {locationData.data &&
                          locationData.data.map((option: Option) => (
                            <div key={option.uuid}>
                              <button
                                className={classNames(
                                  selectedOptions.includes(option.id)
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
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                );
              }
            }
              return null;
            })}
        </div>
      </Menu>
    </>
  );
}
