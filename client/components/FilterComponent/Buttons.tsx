import Link from "next/link";

export default function Buttons() {
  return (
    <>
      <div className="columns-3 w-20 justify-end ml-96">
        <Link href="">
          <button
            type="button"
            className="inline-flex items-center ml-20 px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mb-2"
          >
            Apply Filters
          </button>
        </Link>
        <Link href="">
          <button
            type="button"
            className="inline-flex items-center ml-52 px-6 py-4 border border-transparent text-xs leading-4 font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mb-2"
          >
            Download
          </button>
        </Link>
        <Link href="./downloadList">
          <button
            type="button"
            className="inline-flex items-center ml-80 px-5 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Available Downloads
          </button>
        </Link>
      </div>

    </>
  )
}
