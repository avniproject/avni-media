import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface Prop {
  concepts: any;
  conceptCoded: (data: any, conceptName: string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CodedConceptFilter({ concepts, conceptCoded }: Prop) {
  const [codedData, setCodedData] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  function handleOptionClick(option: any) {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }
  useEffect(() => {
    const answerConceptData = async () => {
      const newData = await Promise.all(
        concepts.map(async (element: any) => {
          return element.answerConcept;
        })
      );
      setCodedData(newData);
    };

    answerConceptData();
  }, [concepts]);

  useEffect(() => {
    conceptCoded(selectedOptions, "CodedConcept");
  }, [selectedOptions]);

  return (
    <Menu as="div" className="menu">
      <div>
        <Menu.Button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span>
            {selectedOptions.length > 0
              ? selectedOptions.length + " selected"
              : "Value"}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {codedData.length > 0 &&
            codedData.map((option: any) => (
              <Menu.Item key={option.uuid}>
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
            ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
