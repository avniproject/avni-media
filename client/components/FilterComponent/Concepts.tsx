import {useEffect, useState} from "react";
import {Menu} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";

interface Prop {
    setConceptsFunction: any;
    conceptData: any[];
    optionDependency: any[];
    title: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Concepts({setConceptsFunction, conceptData, title}: Prop) {
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setConceptsFunction(selectedOptions);
    }, [selectedOptions]);

    function handleOptionClick(option: any) {
        setSelectedOptions(option);
    }

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    const filteredConcepts = conceptData.filter((option) =>
        option.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );

    return (
        <Menu as="div" className="menu">
            <div>
                <Menu.Button
                    className="inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span>
            {selectedOptions && selectedOptions.length > 0 ? selectedOptions : title}
          </span>
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
            </div>

            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 text-sm border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Search..."
                    />
                    {filteredConcepts.length === 0 ? (
                        <div className="p-4 text-gray-500">No concepts found.</div>
                    ) : (
                        filteredConcepts.map((option) => (
                                <Menu.Item key={option.id}>
                                    {({active}) => (
                                        <button
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "flex text-start px-4 py-4 text-sm w-full"
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
