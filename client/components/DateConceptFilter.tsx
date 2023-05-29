import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
interface Props {
  conceptDate: (data: any[] | null, conceptName: string) => void;
}

const DateConceptFilter = ({ conceptDate }: Props) => {
  // date state
  const [date, setDate] = useState<null | string[]>(null);

  useEffect(() => {
    conceptDate(date,"DateConcept");
  }, [date]);

  return (
    <>
      <Menu
        as="div"
        className=" inline-flex  text-left ml-0 mr-2 pr-0 mt-5 z-10 inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-0 py-0 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
      >
        <RangePicker
          format={dateFormat}
          onChange={(dateValue) => {
            if (dateValue) {
              // check if dateValue is not null
              setDate(
                dateValue.map((selectedDte) => {
                  return dayjs(selectedDte).format("YYYY-MM-DD");
                })
              );
            } else {
              // handle null case
              setDate(null);
            }
          }}
        />
      </Menu>
    </>
  );
};

export default DateConceptFilter;
