import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const TopicChart = ({ jsonData }) => {
  const filteredData = jsonData.filter((entry) => entry.topic !== "");

  const counts = filteredData.reduce((acc, entry) => {
    const topic = entry.topic.toString();
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  // Extract labels and values from the year counts
  const labels = Object.keys(counts);
  const values = Object.values(counts);

  // console.log("lab",labels,labels.length)
  const color = values.map(
    (ele) =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: values,
        backgroundColor: color,

        borderColor: color,
      },
    ],
  };

  if (filteredData.length) {
    return <Doughnut data={data} />;
  } else {
    return <h3>There is No Data </h3>;
  }
};

export default TopicChart;
