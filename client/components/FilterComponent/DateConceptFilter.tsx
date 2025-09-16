import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs, { Dayjs }  from "dayjs";
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
interface Props {
  getDateConcept: (data: any[] | null) => void;
  conceptDates: any[] | null;
}

const DateConceptFilter = ({ getDateConcept, conceptDates }: Props) => {

  const [date, setDate] = useState<null | string[]>(null);
  const [value, setValue] = useState<[Dayjs, Dayjs] | null>(null);
  useEffect(() => {
    getDateConcept(date);
  }, [date]);

  useEffect(()=>{
    if (conceptDates === null || conceptDates.length === 0) {
      setValue(null); 
    } else {
      setValue([
        dayjs(conceptDates[0].from), 
        dayjs(conceptDates[0].to), 
      ]);
    }
  },[conceptDates])

  return (
    <>
      <Menu
        as="div"
        className="inline-flex text-left ml-0 mr-2 pr-0 mt-5 inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-0 py-0 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
        style={{position: 'relative', zIndex: 40}}
      >
        <RangePicker
          format={dateFormat}
          value ={value}
          onChange={(dateValue) => {
            if (dateValue) {
              setDate(
                dateValue.map((selectedDte) => {
                  return dayjs(selectedDte).format("YYYY-MM-DD");
                })
              );
            } else {
              setDate(null);
            }
          }}
        />
      </Menu>
    </>
  );
};

export default DateConceptFilter;
