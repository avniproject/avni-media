import { DatePicker } from "antd";
import { useEffect, useState, useCallback, useRef } from "react";
import { Menu } from "@headlessui/react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
import _ from 'lodash';

const { RangePicker } = DatePicker;
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

interface Props {
  dateRange: (data: any[] | null) => void;
}

const DateRangeComp = ({ dateRange }: Props) => {
  const [date, setDate] = useState<null | string[]>(null);
  const lastDateRef = useRef<null | string[]>(null);

  // Memoized callback to prevent infinite loops
  const memoizedDateRange = useCallback(dateRange, [dateRange]);

  useEffect(() => {
    // Only call if date actually changed
    if (!_.isEqual(date, lastDateRef.current)) {
      lastDateRef.current = date;
      memoizedDateRange(date);
    }
  }, [date, memoizedDateRange]);

  return (
    <>
      <Menu
        as="div"
        className="inline-block text-left ml-0 mr-2 pr-0 inline-flex justify-between w-52 rounded-md border border-gray-300 shadow-sm px-0 py-0 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
        style={{position: 'relative', zIndex: 40, minWidth: '15rem'}}
      >
        <RangePicker
          format={dateFormat}
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

export default DateRangeComp;
