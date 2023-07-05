import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const YearChart = ({ jsonData }) => {
  const filteredData = jsonData.filter((entry) => entry.end_year);
  // Count occurrences of each end_year value
  const counts = filteredData.reduce((acc, entry) => {
    const year = entry.end_year.toString();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Extract labels and values from the year counts
  const labels = Object.keys(counts);
  const values = Object.values(counts);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "End Year Frequency",
        fill: true,
        data: values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (filteredData.length) {
    return <Line data={data} options={options} />;
  } else {
    return <h3>There is No Data </h3>;
  }
};

export default YearChart;
