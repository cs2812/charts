import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const RegionChart = ({ jsonData }) => {
  const filteredData = jsonData.filter((item) => item.region !== "");

  const regionCounts = filteredData.reduce((counts, entry) => {
    const region = entry.region.toString();
    counts[region] = (counts[region] || 0) + 1;
    return counts;
  }, {});
  const color = Object.keys(regionCounts).map(
    (ele) =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`
  );

  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: color,
        borderColor: color,
      },
    ],
    borderWidth: 1,
  };
  
  if (filteredData.length) {
    return <PolarArea data={chartData} />;
  } else {
    return <h3>There is No Data </h3>;
  }
};

export default RegionChart;
