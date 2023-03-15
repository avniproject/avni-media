import Link from "next/link";

/* This example requires Tailwind CSS v2.0+ */
export default function Buttons() {
    return (
      <>
      <div className="rows-3 w-20 items-center">
        <Link href="">
        <button
          type="button"
          className="inline-flex items-center px-9 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mb-2"
        >
          Apply
        </button>
        </Link>
        <Link href="">
        <button
          type="button"
          className="inline-flex items-center px-6 py-2 border border-transparent text-xs leading-4 font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mb-2"
        >
          Download
        </button>
        </Link>
        <Link href="./downloadList">
        <button
          type="button"
          className="inline-flex items-center px-5 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Available Downloads
        </button>
        </Link>
        </div>
        
      </>
    )
  }
  