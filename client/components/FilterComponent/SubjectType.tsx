import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

interface Option {
  id: number;
  name: string;
  uuid: string;
}
interface Prop {
  subjectType: (data: any[], subjectUuid: any[]) => void;
  subjectFilter: any[];
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SubjectType({ subjectType, subjectFilter }: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [subjectTypeUUID, setSubjectUUID] = useState<Option[]>([])
  
  useEffect(() => {
    subjectType(selectedOptions, subjectTypeUUID);
  }, [subjectType, selectedOptions, subjectTypeUUID]);

  function handleOptionClick(option: {
    uuid: Option; name: Option; 
}) {
    if (selectedOptions.includes(option.name)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, option.name]);
    }
    if (selectedOptions.includes(option.uuid)) {
      setSubjectUUID(subjectTypeUUID.filter((o) => o !== option.uuid));
    } else {
      setSubjectUUID([...subjectTypeUUID, option.uuid]);
    }
  }

  return (
    <Menu
      as="div"
      className="menu"
    >
      <div>
        <Menu.Button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span>
            {selectedOptions.length > 0
              ? selectedOptions.length + " selected"
              : "Subject Type"}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>  
        <Menu.Items className=" absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {subjectFilter &&
              subjectFilter.map((option) => (
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
