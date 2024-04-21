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
   responsive: true,
   cutout: "90%",
   layout: {
      padding: 1,
   },
   plugins: {
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

function ReliableChart() {
   const data = {
      labels: ["", ""],
      datasets: [
         {
            id: 1,
            data: [85, 15],
            backgroundColor: ["#16C784", "#D9D9D9"],
            borderColor: ["#16C784", "#D9D9D9"],
            borderWidth: 1,
         },
      ],
   };

   return (
      <div>
         <div className="aspect-square relative w-[130px]">
            <div
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[135px] rounded-full"
               style={{
                  boxShadow: `0px 0px 14px rgba(125, 255, 205, 0.45)`,
               }}
            >
               <Doughnut width="100%" options={options} data={data} />
            </div>
            <div className="w-[105px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square bg-[#16C784] grid place-content-center rounded-full">
               <span className="font-semibold text-[50px] text-[#292932]">85</span>
            </div>
         </div>
      </div>
   );
}

export default ReliableChart;
