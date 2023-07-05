import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IntensityChart = ({ jsonData }) => {

  const filterSector = jsonData.filter((entry) => entry.sector);
  const Intensity = filterSector.reduce((max,item)=>{
    const sector = item.sector
    const intensity = +item.intensity
    max[sector] = (Math.max(max[sector],intensity)||intensity)
    return max
  },{})

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Maximum Intensity of Sector",
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  };

  const data = {
    labels: Object.keys(Intensity),
    datasets: [
      {
        label: "Dataset 1",
        data: Object.values(Intensity),
        backgroundColor: "rgb(96, 173, 240)",
      },
    ],
  };


  if(filterSector.length){
    return <Bar options={options} data={data} />;
  }
  else{
    return <h3>There is No Data </h3>
  }
};

export default IntensityChart;
