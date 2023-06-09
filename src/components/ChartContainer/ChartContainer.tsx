"use client";
import { useState, useEffect } from "react";
import { Ticker } from "@/common/interfaces";
import DateRange from "@/components/DateRange/DateRange";
import Selector from "../Selector/Selector";
import { css } from "@linaria/core";
import Chart from "@/components/Chart/Chart";

const ChartContainer = ({ companyName, displaySymbol }: Ticker) => {
  const today = new Date();
  const endDate = new Date(today);
  const dateResolutions = ["D", "W", "M"];
  const startDate = new Date(today.setFullYear(today.getFullYear() - 1));
  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);
  const [dates, onDateChange] = useState<[Date, Date]>([startDate, endDate]);
  const [dateTimestamps, setTimeStampChange] = useState<[number, number]>([
    startTimestamp,
    endTimestamp,
  ]);
  const [rangeIndex, onRangeClick] = useState(0);
  useEffect(() => {
    const newStartTimestamp = Math.floor(dates[0].getTime() / 1000);
    const newEndTimestamp = Math.floor(dates[1].getTime() / 1000);
    setTimeStampChange([newStartTimestamp, newEndTimestamp]);
  }, [dates]);
  return (
    <>
      <Chart
        displaySymbol={displaySymbol}
        companyName={companyName}
        startTimeStamp={dateTimestamps[0]}
        endTimeStamp={dateTimestamps[1]}
        resolution={dateResolutions[rangeIndex] as "D" | "W" | "M"}
      />
      <div className={dateSettings}>
        <DateRange dates={dates} onDateChange={onDateChange} />
        <Selector
          buttons={dateResolutions}
          activeIndex={rangeIndex}
          onButtonClick={onRangeClick}
        />
      </div>
    </>
  );
};

const dateSettings = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 70px;

  @media (min-width: 500px) {
    flex-direction: row;
  }

  @media (min-width: 1350px) {
    margin-bottom: 0;
  }
`;

export default ChartContainer;
