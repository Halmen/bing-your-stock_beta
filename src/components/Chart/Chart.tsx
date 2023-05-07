"use client";
import ReactApexChart from "react-apexcharts";
import useSWR from "swr";
import { ApexOptions } from "apexcharts";
import { getStockChart } from "@/common/https/finnhubAPI";
import { Stock } from "@/common/interfaces";


const transformData = () => ();

const getOptions = (chartName: string): ApexOptions => ({
  chart: {
    type: "candlestick",
    height: "auto",
    width: "100%",
  },
  title: {
    text: chartName,
    align: "left",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
});

const seriess = [
  {
    data: [
      {
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33],
      },
    ],
  },
];

const Chart = ({
  companyName = "Tibor's Crypto Scheme",
  displaySymbol,
}: Stock) => {
  const { data } = useSWR(
    `finnhub/chart/${displaySymbol}`,
    () => getStockChart(displaySymbol, "D"),
    {
      suspense: true,
      refreshInterval: 3660000,
      revalidateOnMount: true,
    }
  );
  const lengthOfData
 const series = 
  return (
    <>
      {data?.s === "no_data" && <p>Sorry no data avaiable</p>}
      {data?.s === "ok" && (
        <ReactApexChart
          options={getOptions(companyName)}
          series={series}
          type="candlestick"
          height={500}
        />
      )}
    </>
  );
};

export default Chart;
