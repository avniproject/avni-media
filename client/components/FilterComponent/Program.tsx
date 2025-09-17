import {  useEffect, useRef, useState } from "react";
import { Menu } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { isEqual } from 'lodash'
interface Option {
  id: number;
  name: string;
  uuid: string;
}
interface Props {
  programType: (data: any[], programUuid: any[]) => void;
  programFilter: any[];
 
}

export default function Program({ programType, programFilter }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [programUUID, setProgramUUID]         = useState<Option[]>([])
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  
  useEffect(() => {
    programType(selectedOptions, programUUID);
  }, [ selectedOptions, programUUID]);
 
  useEffect(() => {
   
    const updatedOptionsArray = programFilter.filter((programs) =>
      programUUID.includes(programs.uuid)
    );
  
    const uuidArray = updatedOptionsArray.map((option) => option.uuid);
    const nameArray = updatedOptionsArray.map((option) => option.name);
    if (!isEqual(selectedOptions, nameArray)) {
      setSelectedOptions(nameArray);
    }

    if (!isEqual(programUUID, uuidArray)) {
      setProgramUUID(uuidArray);
    }
   
  }, [programFilter]);
  
  function handleOptionClick(option: {
    uuid: Option; name: Option; 
}) {
    if (selectedOptions.includes(option.name)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, option.name]);
    }

    if (programUUID.includes(option.uuid)) {
      setProgramUUID(programUUID.filter((o) => o !== option.uuid));
    } else {
      setProgramUUID([...programUUID, option.uuid]);
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
    <Menu as="div" className="menu_program_subject_encounter">
     <div ref={dropdownRef}>
        <div>
          <button
            className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>
              {selectedOptions.length > 0
                ? selectedOptions.length + " selected"
                : "Program Type"}
            </span>
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {isOpen && (
          <div className="origin-top-left absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              {programFilter &&
                programFilter.map((option) => (
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
    </Menu>
  );
}
