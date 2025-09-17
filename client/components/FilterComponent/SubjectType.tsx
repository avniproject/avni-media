import {  useEffect, useRef, useState } from "react";
import { Menu } from "@headlessui/react";
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

export default function SubjectType({ subjectType, subjectFilter }: Prop) {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [subjectTypeUUID, setSubjectUUID] = useState<any[]>([]);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    subjectType(selectedOptions, subjectTypeUUID);
  }, [selectedOptions, subjectTypeUUID]);

  function handleOptionClick(option: Option) {
    if (selectedOptions.includes(option.name)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, option.name]);
    }
    if (subjectTypeUUID.includes(option.uuid)) {
      setSubjectUUID(subjectTypeUUID.filter((o) => o !== option.uuid));
    } else {
      setSubjectUUID([...subjectTypeUUID, option.uuid]);
    }
  }

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
    <div className="relative menu_program_subject_encounter">
     <div ref={dropdownRef}>
      <div>
        <button
          className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectedOptions.length > 0
              ? selectedOptions.length + " selected"
              : "Subject Type"}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none subject-dropdown">
          <div className="py-1">
            {subjectFilter &&
              subjectFilter.map((option) => (
                <div key={option.id}>
                  <button
                    className={`flex justify-between w-full px-4 py-2 text-sm ${
                      selectedOptions.includes(option.name)
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
    </div>
  );
}
