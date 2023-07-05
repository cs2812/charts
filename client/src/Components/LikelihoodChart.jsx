import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LikelihoodChart = ({ jsonData }) => {
  const filterSector = jsonData.filter((entry) => entry.sector);

  const Likelihood = filterSector.reduce((max, item) => {
    const sector = item.sector.toString();
    const likelihood = +item.likelihood;
    max[sector] = Math.max(max[sector], likelihood) || likelihood;
    return max;
  }, {});
  const Relevance = filterSector.reduce((max, item) => {
    const sector = item.sector;
    const relevance = +item.relevance;
    max[sector] = Math.max(max[sector], relevance) || relevance;
    return max;
  }, {});

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Maximum Likelihood and Relevance of Sectors",
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };

  const data = {
    labels: Object.keys(Likelihood),
    datasets: [
      {
        label: "Likelihood",
        data: Object.values(Likelihood),
        backgroundColor: "rgb(114, 205, 122)",
        stack: "Stack 0",
      },
      {
        label: "Relevance",
        data: Object.values(Relevance),
        backgroundColor: "rgb(58, 136, 65)",
        stack: "Stack 0",
      },
    ],
  };
  
  if(filterSector.length){
    return <Bar data={data} options={options} /> 
  }
  else{
    return <h3>There is No Data </h3>
  }
};

export default LikelihoodChart;
