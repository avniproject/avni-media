import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Option } from "rc-select";
interface Option {
  id: number;
  name: string;
}

interface Prop {
  encounterType: (data: any[]) => void;
  encounterFilter: any[];
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function EncounterType({
  encounterType,
  encounterFilter,
}: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  useEffect(() => {
    encounterType(selectedOptions);
  }, [encounterType, Option]);
  function handleOptionClick(option: Option) {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  return (
    <Menu
      as="div"
      className="relative inline-block text-left -ml-4 pr-6 mt-5 z-10"
    >
      <div>
        <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span>
            {selectedOptions.length > 0
              ? selectedOptions.length + " selected"
              : "Encounter Type"}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {encounterFilter &&
              encounterFilter.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "flex justify-between w-full px-4 py-2 text-sm"
                      )}
                      onClick={() => handleOptionClick(option.name)}
                    >
                      {option.name}
                      {selectedOptions.includes(option.name) ? (
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
      </Transition>
    </Menu>
  );
}
