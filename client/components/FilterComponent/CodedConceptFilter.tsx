import { useEffect, useRef, useState } from "react";
import { Menu } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

interface Prop {
  concepts: any;
  conceptCoded: (data: any) => void;

}

export default function CodedConceptFilter({ concepts, conceptCoded }: Prop) {

  const [codedData, setCodedData] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  
  function handleOptionClick(option: any) {

    if (selectedOptions.includes(option.name)) {

      setSelectedOptions(selectedOptions.filter((o) => o !== option.name));

    } else {

      setSelectedOptions([...selectedOptions, option.name]);

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
    setSelectedOptions([])
  }, [concepts]);

  useEffect(() => {

    conceptCoded(selectedOptions);

  }, [selectedOptions]);

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
    <Menu as="div" className="menu">
     <div ref={dropdownRef}>
        <div>
          <button
            className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>
              {selectedOptions.length > 0
                ? selectedOptions.length + " selected"
                : "Value"}
            </span>
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {codedData &&
                codedData.map((option: { id:  null | undefined; name: string  }) => (
                  <div key={option.id}>
                    <button
                      className={`flex justify-between w-full px-4 py-2 text-sm ${
                        selectedOptions.includes(option)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.name}
                      {selectedOptions.includes(option.name) && (
                        <CheckIcon className="check-button" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Menu>
  );
}
