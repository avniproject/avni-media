import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';

interface Props {
  showperpage: number;
  pagechange: (pageNumber: number) => void;
  enableNextPage: boolean;
  totalCount: number;
  currentPageLength: number;
  currentPage: number;
}
  const Pagination = ({ showperpage, pagechange, enableNextPage, totalCount, currentPageLength, currentPage }: Props) => {
  const [counter, setCounter] = useState(currentPage + 1)

  useEffect(() => {
      pagechange(counter - 1)
  }, [counter, showperpage])

 
  const onButtonclick = (type: string) => {
    if (type == "previous") {
      if (counter == 1) {
        setCounter(1);
      }
      else {
        setCounter(counter - 1);
      }
    }
    else if (type == "next") {
      if (enableNextPage) {
        setCounter(counter + 1)
      }
      else{
        setCounter(counter);
      }
    }
  }
  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-items-center sm:px-0 -mt-10">
      <div className="mt-px px-2 w-0 flex-1 flex">
        <button
          onClick={() => onButtonclick("previous")}
          disabled={counter === 1}
          className="border-t-2 border-transparent pt-1 pr-1 inline-flex text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 ">
          <ArrowNarrowLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          Previous
        </button>
      </div>
      {/* {
        new Array(Math.ceil(total / showperpage)).fill("").map((page, index) => (
          <div key={index} className="pagination" onClick={() => setCounter(index + 1)} >
            <a
              className={`page-link ${index + 1 === counter ? "active active-page" : ""}`}
              href="#"
            >
              {index + 1}
            </a>
          </div>
        ))
      } */}
      <div className="flex flex-1">
        {((counter -1) * showperpage) + 1} to {((counter - 1) * showperpage) + currentPageLength}
        {totalCount && ' of ' + totalCount}
      </div>
      <div className="flex">
        <button
          onClick={() => onButtonclick("next")}
          disabled={!enableNextPage}
          className="border-t-2 border-transparent pt-1 pl-1 inline-flex text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}
export default Pagination