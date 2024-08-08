import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';

interface Props {
  showperpage: number;
  pagechange: (pageNumber: number) => void;
  nextPageData: any[];

}
  const Pagination = ({ showperpage, pagechange, nextPageData }: Props) => {
  const [counter, setCounter] = useState(1)

  const page = Math.ceil(nextPageData.length / showperpage)

  useEffect(() => {
   
    if (counter == page) {
      pagechange(counter - 1)
    }
    else {
      pagechange(counter -1 )
    }
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
      if (nextPageData.length >= 1) {
        setCounter(counter + 1)
      }
      else{
        setCounter(counter);
      }
    }
  }
  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 -mt-10">
      <div className="mt-px w-0 flex-1 flex justify-end">
        <button
          onClick={() => onButtonclick("previous")}
          disabled={counter === 1}
          className="border-t-2 border-transparent pt-1 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 ">
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
      <div className="-mt-px w-0 flex-1 flex justify-start">
        <button
          onClick={() => onButtonclick("next")}
          disabled={nextPageData.length === 0}
          className="border-t-2 border-transparent pt-1 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        >
          Next
          <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}
export default Pagination