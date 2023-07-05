import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const LikelyIntesityRelevance = ({ jsonData }) => {
  const filteredRegion = jsonData.filter((item) => item.region !== "");

  const Intensity = filteredRegion.reduce((acc, item) => {
    const region = item.region;
    const intensity = +item.intensity;
    acc[region] = (acc[region] || 0) + intensity;
    return acc;
  }, {});
  const Likelihood = filteredRegion.reduce((acc, item) => {
    const region = item.region;
    const likelihood = +item.likelihood;
    acc[region] = (acc[region] || 0) + likelihood + 5;
    return acc;
  }, {});
  const Relevance = filteredRegion.reduce((acc, item) => {
    const region = item.region;
    const relevance = +item.relevance;
    acc[region] = (acc[region] || 0) + relevance + 3;
    return acc;
  }, {});
  const region = Object.keys(Intensity);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Visualization of Regions ",
      },
    },
  };

  const data = {
    labels: region,
    datasets: [
      {
        label: "Total Intensity",
        data: Intensity,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Total Likelihood",
        data: Likelihood,
        borderColor: `rgb(149, 54, 238)`,
        backgroundColor: "rgba(149, 54, 238,0.5)",
      },
      {
        label: "Total Relevance",
        data: Relevance,
        borderColor: `rgb(238, 9, 82)`,
        backgroundColor: "rgba(238, 9, 82, 0.7)",
      },
    ],
  };

  if (filteredRegion.length) {
    return <Line options={options} data={data} />;
  } else {
    return <h3>There is No Data </h3>;
  }
};

export default LikelyIntesityRelevance;
