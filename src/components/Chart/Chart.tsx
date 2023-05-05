import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { ApexOptions } from "apexcharts";
import ErrorCard from "../ErrorCard/ErrorCard";

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

const series = [
  {
    data: [
      {
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33],
      },
    ],
  },
];

interface Props {
  chartName: string;
  tickerSymbol: string;
}

const Chart = ({
  chartName = "Tibor's Crypto Scheme",
  tickerSymbol,
}: Props) => {
  const [error, setError] = useState("");
  return (
    <>
      {error ? (
        <ErrorCard message={error} />
      ) : (
        <ReactApexChart
          options={getOptions(chartName)}
          series={series}
          type="candlestick"
          height={500}
        />
      )}
    </>
  );
};

export default Chart;
