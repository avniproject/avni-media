import Buttons from "./Buttons"
import Daterange from "./Daterange"
import EncounterType from "./EncounterType"
import LocationHierarchy from "./LocationHierarchy"
import Program from "./Program"
import SubjectType from "./SubjectType"
  
  export default function Filter() {
    return (
      <>
      <div className="flex">
        <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900 ml-32">Filters</h3>
        <dl className="mt-2 grid grid-cols-0 gap-1 sm:grid-cols-5 w-auto mr-16">
          <LocationHierarchy />
          <Daterange />
          <EncounterType />
          <SubjectType />
          <Program />
        </dl>
        <div className="mt-2 pr-40">
            <Buttons />
        </div>
        </div>
        </>
    )
  }
  