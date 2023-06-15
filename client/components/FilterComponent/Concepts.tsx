import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";


interface Prop {
  concept: any;
  conceptdata: any[];
  selectedFormSubject: any[];
}

function classNames(...classes: string[]) {

  return classes.filter(Boolean).join(" ");
}

export default function Concepts({ concept, conceptdata, selectedFormSubject }: Prop) {
  console.log("conceptdata",conceptdata)

  const [selectedOptions, setSelectedOptions] = useState([]);
  
  useEffect(() => {

    concept(selectedOptions);

  }, [selectedOptions]);

  function handleOptionClick(option: any) {

    setSelectedOptions(option);

  }

  return (
    <Menu as="div" className="menu">
      <div>
        <Menu.Button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span>
            {selectedOptions && selectedOptions.length > 0 ? selectedOptions : "Concepts"}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
        {conceptdata && conceptdata.map((option) => (
            option !== undefined && (
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
                  </button>
                )}
              </Menu.Item>
            )
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
