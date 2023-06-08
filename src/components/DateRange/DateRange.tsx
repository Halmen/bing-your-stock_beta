"use client";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { css } from "@linaria/core";

interface Props {
  onDateChange: (value: [Date, Date]) => void;
  dates: [Date, Date];
}

const DateRange = ({ onDateChange, dates }: Props) => {
  return (
    <div>
      <DateRangePicker
        onChange={(value) => onDateChange(value as [Date, Date])}
        value={dates}
        maxDate={new Date()}
        clearIcon={null}
        className={calendar}
      />
    </div>
  );
};

const calendar = css`
  border: #0e03ab solid 2px;
  border-radius: 5px;
  height: 34px;

  .react-calendar {
    border-radius: 10px;
  }
`;

export default DateRange;
