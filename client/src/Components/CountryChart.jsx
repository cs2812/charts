import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const CountryChart = ({ jsonData }) => {
  const filteredData = jsonData.filter((item) => item.country !== "");

  const countryCounts = filteredData.reduce((counts, entry) => {
    const country = entry.country.toString();
    counts[country] = (counts[country] || 0) + 1;
    return counts;
  }, {});
  const color = Object.keys(countryCounts).map(
    (ele) =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`
  );

  const chartData = {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        data: Object.values(countryCounts),
        backgroundColor: color,
        borderColor: color,
      },
    ],
  };

  if (filteredData.length) {
    return <Pie data={chartData} />;
  } else {
    return <h3>There is No Data </h3>;
  }
};

export default CountryChart;
