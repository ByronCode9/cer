import React from "react";
import { SparkLineChart } from "@mui/x-charts";

export const ChartCOmp = ({ chartDataFromParent }) => {
  console.log(chartDataFromParent, "chartDataFromParent");

  const chartData = chartDataFromParent?.price;

  console.log(chartData, "charting data");
  const chartLabels = chartDataFromParent?.price;

  return (
    <div>
      <SparkLineChart data={chartData} labels={chartLabels} height={60} />
    </div>
  );
};
