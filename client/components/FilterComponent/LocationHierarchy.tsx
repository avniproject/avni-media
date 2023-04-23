import { Fragment, Key, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Option } from "rc-select";
import axios from "axios";


interface Option {
  uuid: Key | null | undefined;
  id: number;
  name: string;
}
interface Prop {
  filterData: () => void;
  locationIndex: any[];
  index: Key;
  minLevel: number;
  maxLevel: number;
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
  maxLevel,
  minLevel,
}: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectUUID, setSelectUUID] = useState<any[]>([]);
  const [secondLevel, setSecondLevel] = useState<any>([]);
  const [parentId, setParentId] = useState<Option | null>(null);
  const [toplevelData, setTopLevelData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  function handleOptionSelect(option: Option) {
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  }

  useEffect(() => {
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
  }, [selectedOption]);

  useEffect(() => {
    if (locationIndex.level=== maxLevel-1){

    const secondLevelTypeId = locationIndex.id
    localStorage.setItem('secondLevelTypeId', secondLevelTypeId.toString());
    
  }
    const typeIdData = async () => {
      const typeId = locationIndex.id;

      if (locationIndex.level === maxLevel || locationIndex.level === maxLevel-1)  {


        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?typeId=${typeId}&page=0&size=1000&sort=id,DESC`
        );

        console.log(
          "Response data for top level ",
          response.data,
          "Response",
          response
        );
        console.log("index",locationIndex)
        const jsonDataState = response.data

        // {
        //   content: [
        //     {
        //       uuid: "c155bfca-b718-484b-b4fc-e84844edcd15",
        //       titleLineage: "MH",
        //       level: 2.0,
        //       typeId: 725,
        //       parentId: null,
        //       lineage: "182370",
        //       title: "MH",
        //       id: 182370,
        //       typeString: "State",
        //     },
        //     {
        //       uuid: "63cbfbc4-41e8-4952-b2bc-090056ebe7d4",
        //       titleLineage: "RJ",
        //       level: 2.0,
        //       typeId: 725,
        //       parentId: null,
        //       lineage: "182387",
        //       title: "RJ",
        //       id: 182387,
        //       typeString: "State",
        //     },
        //   ],
        //   pageable: {
        //     sort: {
        //       unsorted: false,
        //       sorted: true,
        //     },
        //     pageNumber: 0,
        //     pageSize: 1000,
        //     offset: 0,
        //     unpaged: false,
        //     paged: true,
        //   },
        //   last: true,
        //   totalElements: 2,
        //   totalPages: 1,
        //   first: true,
        //   sort: {
        //     unsorted: false,
        //     sorted: true,
        //   },
        //   numberOfElements: 2,
        //   size: 1000,
        //   number: 0,
        // };

        const stateData = jsonDataState.content;
        setTopLevelData(stateData);
        const savedSelectedOption = localStorage.getItem("selectedOption");
        const secondLevelTypeIdString = localStorage.getItem('secondLevelTypeId');
        if (savedSelectedOption !== null && secondLevelTypeIdString!==null) {
          const parsedOption = JSON.parse(savedSelectedOption);
          try {
            if (parsedOption && parsedOption.id !== undefined) {
              setParentId(parsedOption.id);
              const secondLevelTypeId = parseInt(secondLevelTypeIdString);
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parsedOption.id}&page=0&size=1000&sort=id,DESC&typeId=${secondLevelTypeId }`
              );

              const distJsonData = response.data;
              console.log("Response Data for other level", distJsonData);
              const distData = distJsonData.content;
              console.log("Response content  for other level", distData);

              setSecondLevel(distData);
            }
          } catch (Error) {

            console.log(
              `error found at ${process.env.NEXT_PUBLIC_TOP_ADDRESS}?parentId=${parsedOption.id}&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
            );
          }
        }
      } else {
        const typeId = locationIndex.id;

        const parentIds =
          selectedOptions.length >= 1 ? selectedOptions.join(",") : parentId;

        try {
          if (selectedOptions.length > 0) {
            const response = await axios.get(
              `${
                process.env.NEXT_PUBLIC_TOP_ADDRESS
              }?parentId=${selectedOptions.join(
                ","
              )}&page=0&size=1000&sort=id,DESC&typeId=${typeId}`
            );

            const distJsonData = response.data;
            console.log("Response data for multiselec", distJsonData);
            const distData = distJsonData.content;
            console.log("dist data", distData);
            setSecondLevel(distData);
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
        // {
        //   content: [
        //     {
        //       uuid: "6edd7b3b-6374-4303-97ea-08d4fb2f0fd4",
        //       titleLineage: "MH, Mumbai",
        //       level: 1.0,
        //       typeId: 741,
        //       parentId: 182370,
        //       lineage: "182370.182386",
        //       title: "Mumbai",
        //       id: 182386,
        //       typeString: "Dist",
        //     },
        //     {
        //       uuid: "ef74fdd2-bb73-4c6b-b1ef-3c6481a3487d",
        //       titleLineage: "MH, Nagpur",
        //       level: 1.0,
        //       typeId: 741,
        //       parentId: 182370,
        //       lineage: "182370.182388",
        //       title: "Nagpur",
        //       id: 182388,
        //       typeString: "Dist",
        //     },
        //   ],
        //   pageable: {
        //     sort: {
        //       unsorted: false,
        //       sorted: true,
        //     },
        //     pageNumber: 0,
        //     pageSize: 1000,
        //     offset: 0,
        //     unpaged: false,
        //     paged: true,
        //   },
        //   last: true,
        //   totalElements: 2,
        //   totalPages: 1,
        //   first: true,
        //   sort: {
        //     unsorted: false,
        //     sorted: true,
        //   },
        //   numberOfElements: 2,
        //   size: 1000,
        //   number: 0,
        // };
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
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }
  function onclickData(option: Option) {
    if (selectUUID.includes(option)) {
      setSelectUUID(selectUUID.filter((o) => o !== option));
    } else {
      setSelectUUID([...selectUUID, option]);
    }
  }
  return (
    <>
      <Menu
        as="div"
        className="relative inline-block text-left  pr-6 mt-5 z-20"
      >
        <div>
          {maxLevel === locationIndex.level ? (

            <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
              <span>
                {selectedOptions.length == 0
                  ? selectedOption?.name
                  : locationIndex.name}
              </span>
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          ) : (
            <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
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
          {maxLevel === locationIndex.level ? (
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
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option.title}
                          {selectedOption?.id === option.id ? (
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
            <Menu.Items className="origin-top-right absolute center-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {secondLevel &&
                  secondLevel.map((option: Option) => (
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
                            handleOptionClick(option.id);
                            onclickData(option.uuid);
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