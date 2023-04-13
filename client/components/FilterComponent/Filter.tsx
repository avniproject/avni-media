import Accounts from "./Accounts"
import Buttons from "./Buttons"
import Concepts from "./Concepts"
import Daterange from "./Daterange"
import EncounterType from "./EncounterType"
import LocationHierarchy from "./LocationHierarchy"
import Program from "./Program"
import SubjectType from "./SubjectType"
  
  export default function Filter() {
    return (
      <>
        <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900 ml-8">Filters</h3>
        <dl className="mt-2 grid grid-cols-0 gap-1 sm:grid-cols-7 w-auto mr-0">
          <LocationHierarchy />
          <Daterange/>
          <EncounterType />
          <SubjectType />
          <Program />
          <Concepts />
          <Accounts />
        </dl>
        {/* <div className="mt-5 w-32 pr-20 columns-3">
            <Buttons />
        </div> */}
        </>
    )
  }
  