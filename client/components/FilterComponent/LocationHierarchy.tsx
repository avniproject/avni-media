import { Key, useEffect, useRef, useState } from "react";
import { Menu } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";
import { isEqual } from 'lodash'

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
  getLocation: (data: any[], selectedOption: any[]) => void;
  getDiffArray: (diffArray: any[])=>void;
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
  getDiffArray
}: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [optionSelected, setOptionSelected] = useState<any>();
  const [secondTypeName, setSecondTypeName] = useState<any>();
  const [selectLevelName, setSelectLevelName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [toplevelData, setTopLevelData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any[]>([]);
  const [preserverSelectedOption, setPreseveSelectedOption] = useState<any[]>([]);

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
  }, [optionSelected]);

  useEffect(() => {
    console.log('🔵 LocationHierarchy: useEffect[getTopLevel] triggered', { optionSelected, selectLevelName, selectedOption });
    if (optionSelected !== undefined && selectLevelName !== null) {
      console.log('🟢 LocationHierarchy: Calling getTopLevel', { selectedOption, selectLevelName });
      getTopLevel(selectedOption, selectLevelName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionSelected, selectLevelName, selectedOption]); // Removed getTopLevel to prevent infinite loops

  useEffect(() => {
    console.log('🔵 LocationHierarchy: useEffect[location] triggered', { locationCount: location.length, selectedOptionsCount: selectedOptions.length });
        const newLocation = location.filter((items:any)=>selectedOptions.includes(items.id))
        const uuidArray = newLocation.map((option) => option.id);
        if (!isEqual(selectedOptions, uuidArray)) {
          console.log('🟡 LocationHierarchy: Updating selectedOptions from location', { from: selectedOptions, to: uuidArray });
          setSelectedOptions(uuidArray);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // Intentionally excluding selectedOptions to prevent circular updates

  useEffect(()=>{
    console.log('🔵 LocationHierarchy: useEffect[otherLocation] triggered', { otherLocationCount: otherLocation.length, maxLevel, locationLevel: locationIndex.level });

    if( maxLevel && locationIndex.level < maxLevel-1){
    const extractedData = otherLocation.reduce((result, locations) => {
      const filteredData = locations.data.filter((item: {id : any; }) =>
        selectedOptions.includes(item.id)
      );
      if (filteredData.length > 0) {
        result.push({
          data: filteredData,
          level: locations.level,
        });
      }
      return result;
    }, []);

    const updatedSelectedOptions = extractedData.flatMap((item: { data: any[]; }) => item.data.map((data) => data.id));

    if (!isEqual(selectedOptions, updatedSelectedOptions)) {
      console.log('🟡 LocationHierarchy: Updating selectedOptions from otherLocation', { from: selectedOptions, to: updatedSelectedOptions });
      setSelectedOptions(updatedSelectedOptions);
    }
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
},[otherLocation, maxLevel, locationIndex.level]) // Added missing data dependencies, excluded selectedOptions to prevent circular updates

  useEffect(() => {
    console.log('🔵 LocationHierarchy: useEffect[MAIN] triggered', { selectedOptionsCount: selectedOptions.length, selectedOptionCount: selectedOption.length, locationLevel: locationIndex.level, maxLevel });
    const typeIdData = async () => {
      const typeId = locationIndex.id;
      console.log('🟠 LocationHierarchy: Starting typeIdData', { typeId, level: locationIndex.level, maxLevel });

      if (locationIndex.level === maxLevel) {
        console.log('🌐 LocationHierarchy: Making API call (maxLevel)', { typeId, url: `${process.env.NEXT_PUBLIC_WEB}/locations/search/find?typeId=${typeId}&page=0&size=1000&sort=id,DESC` });
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_WEB}/locations/search/find?typeId=${typeId}&page=0&size=1000&sort=id,DESC`
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
              console.log('🌐 LocationHierarchy: Making API call (maxLevel with parent)', { parentId: parentsId, typeId: item.id });
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_WEB}/locations/search/find?parentId=${parentsId}&page=0&size=1000&sort=id,DESC&typeId=${item.id}`
              );
            const distJsonData = response.data;
            const distData = distJsonData.content;
            if (distData && distData.length > 0 && distData[0].typeId) {
              getTypeId(distData[0].typeId);
            }
            getLocation(distData, selectedOption);
            })
          } catch (error) {
            console.error(
              `Error fetching location data:`, error
            );
          }
        } else {
          getLocation([],[]);
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
                  console.log('🌐 LocationHierarchy: Making API call (sub-level)', { parentId: parentsId, typeId: item.id });
                  const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_WEB}/locations/search/find?parentId=${parentsId}&page=0&size=1000&sort=id,DESC&typeId=${item.id}`
                  );
                  const distJsonDatas = response.data;
                  const distDatas = distJsonDatas.content;
                  getTypeId(distJsonDatas.content[0].typeId);
                  const level = distJsonDatas.content[0].level;
                  getOtherLocation(distDatas, level);
              })
            }
            if(!isEqual(preserverSelectedOption,selectedOptions)){
              const diffArray = preserverSelectedOption.filter((item)=> !selectedOptions.includes(item))
              getDiffArray(diffArray)
            }
          } catch (error) {
            console.error(
              `Error fetching location data:`, error
            );
          }
        }
      }
    };
    typeIdData();
    setPreseveSelectedOption(selectedOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, selectedOption, locationIndex, maxLevel, minLevel, locationFilter, index, preserverSelectedOption]); // Removed all function dependencies to prevent infinite loops
  function handleOptionClick(option: Option) {
    setSecondTypeName(option);
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
    }
  }

  useEffect(() => {
    console.log('🔵 LocationHierarchy: useEffect[getSecondLevel] triggered', { selectedOptionsCount: selectedOptions.length, secondTypeName });
    if (selectedOptions !== undefined && secondTypeName !== undefined) {
      console.log('🟢 LocationHierarchy: Calling getSecondLevel', { selectedOptions, typeString: secondTypeName.typeString });
      getSecondLevel(selectedOptions, secondTypeName.typeString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, secondTypeName]); // Removed getSecondLevel to prevent infinite loops

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
      <div className="relative location_menu">
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
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none location-dropdown">
              <div className="py-1">
                {toplevelData &&
                  toplevelData.map((option: Option) => (
                    <div key={`toplevel-${option.id || option.uuid}`}>
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
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none location-dropdown">
              <div className="py-1">
                {location.map((option) => (
                  <div key={`location-${option.uuid || option.id}`}>
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
            otherLocation.map((locationData, mapIndex) => {
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
                      key={`location-${locationData.level}-${mapIndex}`}
                      className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none location-dropdown"
                    >
                      <div className="py-1">
                        {locationData.data &&
                          locationData.data.map((option: Option) => (
                            <div key={`option-${option.uuid || option.id}`}>
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
      </div>
    </>
  );
}
