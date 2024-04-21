/* eslint-disable react/prop-types */
"use client";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LineElement,
   LinearScale,
   PointElement,
} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.defaults.backgroundColor = "#9BD0F5";
ChartJS.defaults.borderColor = "#44444F";
ChartJS.defaults.color = "#696974";
ChartJS.defaults.font.family = "Inter, sans-serif";
ChartJS.defaults.font.size = "14px";

ChartJS.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LineElement,
   LinearScale,
   PointElement
);

const options = {
   layout: {
      padding: 1,
   },
   plugins: {
      cutout: {
         spacing: 10, // Set spacing between segments to zero
      },
      legend: {
         display: false,
      },
   },
   scales: {
      y: {
         display: false,
      },
      x: {
         display: false,
      },
   },
};

function TokenChart() {
   const data = {
      labels: ["", ""],
      datasets: [
         {
            id: 1,
            data: [85, 15],
            backgroundColor: ["#F7971A", "#FC5A5A"],
            borderColor: ["#F7971A", "#FC5A5A"],
            borderWidth: 1,
         },
      ],
   };

   return (
      <div className="w-[110px]">
         <Doughnut width="100%" options={options} data={data} />
      </div>
   );
}

export default TokenChart;
