import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
interface Option {
  id: number;
  name: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const options = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
  { id: 4, name: 'Option 4' },
  { id: 5, name: 'Option 5' }
];

export default function Accounts() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  function handleOptionClick(option: Option) {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  return (
    <Menu as="div" className="menu">
      <div>
        <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500">
          <span>{selectedOptions.length > 0 ? selectedOptions.length + ' selected' : 'Accounts'}</span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.id}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'flex justify-between w-full px-4 py-2 text-sm'
                    )}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.name}
                    {selectedOptions.includes(option) ? (
                      <CheckIcon className="check-button" aria-hidden="true" />
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

