import { useEffect, useRef, useState } from "react";
import { Menu } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Option } from "rc-select";

interface Option {
  uuid: any;
  id: number;
  name: string;
}

interface Prop {
  encounterType: (data: any[], encounterTypeUUID: any[]) => void;
  showAllEncounter: any[];
  showEncounter: any[];
}

export default function EncounterType({
  encounterType,
  showAllEncounter,
  showEncounter
}: Prop) {
  
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [encounterTypeUUID, setEncounterTypeUUID]         = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  
  const newData = [...showAllEncounter, ...showEncounter];
  const showUniqueEncounter = Array.from(new Set(newData));
  useEffect(()=>{
    if(showEncounter.length === 0){
      setSelectedOptions([]);
      setEncounterTypeUUID([]);
    }
  },[showEncounter])

  useEffect(() => {
    encounterType(selectedOptions, encounterTypeUUID);
  }, [encounterTypeUUID, selectedOptions]);
  
  function handleOptionClick(option: Option) {
    if (selectedOptions.includes(option.name)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option.name));
    } else {
      setSelectedOptions([...selectedOptions, option.name]);
    }
    if (encounterTypeUUID.includes(option.uuid)) {
      setEncounterTypeUUID(encounterTypeUUID.filter((o) => o !== option.uuid));
    } else {
      setEncounterTypeUUID([...encounterTypeUUID, option.uuid]);
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
    <Menu as="div" className="menu_program_subject_encounter
      ">
       <div ref={dropdownRef}>
        <div>
          <button className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500" onClick={() => setIsOpen(!isOpen)}
          >
            <span>
              {selectedOptions.length > 0
                ? selectedOptions.length + " selected"
                : "Encounter Type"}
            </span>
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        
        { showUniqueEncounter.length > 0 && isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {showUniqueEncounter &&
                showUniqueEncounter.map((option) => (
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

