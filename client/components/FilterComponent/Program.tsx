import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
interface Option {
  id: number;
  name: string;
  uuid: string;
}
interface Props {
  programType: (data: any[], programUuid: any[]) => void;
  programFilter: any[];
 
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Program({ programType, programFilter }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [programUUID, setProgramUUID]         = useState<Option[]>([])
  
  useEffect(() => {
    programType(selectedOptions, programUUID);
  }, [programType, selectedOptions, programUUID]);
  function handleOptionClick(option: {
    uuid: Option; name: Option; 
}) {
    if (selectedOptions.includes(option.name)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, option.name]);
    }
    if (selectedOptions.includes(option.uuid)) {
      setProgramUUID(programUUID.filter((o) => o !== option.uuid));
    } else {
      setProgramUUID([...programUUID, option.uuid]);
    }
  }

  return (
    <Menu
      as="div"
      className="location_menu"
    >
      <div>
        <Menu.Button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span>
            {selectedOptions.length > 0
              ? selectedOptions.length + " selected"
              : "Program"}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {programFilter &&
              programFilter.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "flex justify-between w-full px-4 py-2 text-sm"
                      )}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.name}
                      {selectedOptions.includes(option.name) ? (
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
    </Menu>
  );
}
