import { Fragment, Key, SetStateAction, use, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Option } from "rc-select";
import axios from "axios";

interface Option {
  uuid: any;
  parentId: any;
  id: any;
  name: string;
  title: string;
}
interface Prop {
  filterData: () => void;
  locationIndex: {
    name: string;
    id: number;
    level: number;
  };
  index: Key;
  minLevel: number;
  maxLevel: number;
  selectedParentId : any[];
  getLocation:(data : any[])=>void;
  getOtherLocation:(data : any[])=>void;
  getTopLevel:(data : any[],levelname: string)=>void;
  getSecondLevel:(data : any[],levelType: string )=>void;
  getSelectedLocation: (data: any[])=>void
  loction: any[];
  otherLocation:any[];
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
  index,
  loction,
  selectedParentId,
  getLocation,
  getOtherLocation,
  getTopLevel,
  getSelectedLocation,
  getSecondLevel,
  maxLevel,
  otherLocation,
  minLevel,
}: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [optionSelected, setOptionSelected] = useState<any>()
  const [secondTypeName, setSecondTypeName] = useState<any>()
  const [selectLevelName, setSelectLevelName] = useState(null)
  const [secondLevel, setSecondLevel] = useState<any>([]);
  
  const [parentId, setParentId] = useState<Option | null>(null);
  const [toplevelData, setTopLevelData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<Option[]>([]);

  function handleOptionSelect(option: Option) {
    setOptionSelected(option)
    if (selectedOption.includes(option.id)) {
      setSelectedOption(selectedOption.filter((o) => o !== option.id));
    } else {
      setSelectedOption([...selectedOption, option.id]);
    }
  }

  useEffect(() => {
    if (optionSelected !== undefined) {
      setSelectLevelName(optionSelected.typeString)
    } else {
      setSelectLevelName(null)
    }
    if (optionSelected !== undefined && selectLevelName !== null) {
   getTopLevel(selectedOption,selectLevelName)}

  }, [optionSelected,selectedOptions,selectedOption,selectLevelName])
  
  
 
  useEffect(() => {
    if (locationIndex.level === maxLevel - 1) {
      const secondLevelTypeId = locationIndex.id;
      localStorage.setItem("secondLevelTypeId", secondLevelTypeId.toString());
    }
    const typeIdData = async () => {
      const typeId = locationIndex.id;

      if (locationIndex.level === maxLevel) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?typeId=${typeId}&page=0&size=1000&sort=id,DESC`
        );

        console.log(
          "Response data for top level ",
          response.data,
          "Response",
          response
        );
        console.log("index", locationIndex);
        const jsonDataState =response.data

        const stateData = jsonDataState.content;
        setTopLevelData(stateData);
        
        const secondLevelTypeIdString =
          localStorage.getItem("secondLevelTypeId");
        if ( secondLevelTypeIdString !== null) {
          try {
              const secondLevelTypeId = parseInt(secondLevelTypeIdString);
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId[${selectedOption}]&page0&size=1000&sort=id,DESC&typeId=${secondLevelTypeId }`
              );

              const distJsonData = response.data
              const distData = distJsonData.content;
        
            
             
                getLocation(distData)
                         
          } catch (Error) {
            console.log(
              `error found at ${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId[${selectedOption}]&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
            );
          }
        }
      } else {
        const typeId = locationIndex.id;


        try {
          if (selectedOptions.length > 0) {
            const response = await axios.get(
              `${
                process.env.NEXT_PUBLIC_TOP_ADDRESS
              }?parentId[${selectedOptions}]&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
            );

            const distJsonData = response.data;
           
            const distData = distJsonData.content;
           
            setSecondLevel(distData);
            getOtherLocation(secondLevel)
            console.log(
              `${
                process.env.NEXT_PUBLIC_TOP_ADDRESS
              }?parentId[${selectedOptions}]&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
            );
          }
        } catch (Error) {
          console.log(
            `error at ${
              process.env.NEXT_PUBLIC_TOP_ADDRESS
            }?parentId=${selectedOptions.join(
              ","
            )}&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
          );
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
    parentId,
  ]);

  function handleOptionClick(option: Option) {
    setSecondTypeName(option)
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
    }
  }
  
  useEffect(()=>{
    if(selectedOptions !== undefined && secondTypeName !== undefined){
      getSecondLevel(selectedOptions, secondTypeName.typeString)
    }
  },[selectedOptions, secondTypeName])

  return (
    <>
      <Menu
        as="div"
        className="relative inline-block text-left  pr-2 mt-5 z-20"
      >
        <div>
          {maxLevel === locationIndex.level ? (
            <Menu.Button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
              <span>
                {selectedOption.length > 0
                  ? selectedOption.length+" selected"
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

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
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
                          onClick={() => {handleOptionSelect(option);
                          }}
                        >
                          {option.title}
                          {selectedOption.includes(option.id) ? (
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
          ) : loction !== null ? (
            <Menu.Items className="origin-top-right absolute center-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {loction &&
                  loction.map((option: Option) => (
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
                          {selectedOptions.includes(option.id)? (
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
          ) : (
            // This is the default block, which will be executed if neither of the above conditions is true
            <Menu.Items className="origin-top-right absolute center-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {/* Display third level options */}
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
          )}
        </Transition>
      </Menu>
    </>
  );
}
