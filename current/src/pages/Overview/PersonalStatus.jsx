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
   cutout: 999999,
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

function PersonalStatus() {
   const reportData = {
      labels: ["", ""],
      datasets: [
         {
            id: 3,
            data: [70, 30],
            borderWidth: 5,
            borderColor: ["#1E75FF", "#19233A"],
         },
      ],
   };
   const supplyData = {
      labels: ["", ""],
      datasets: [
         {
            id: 3,
            data: [85, 25],
            borderWidth: 5,
            borderColor: ["#50B5FF", "#19233A"],
         },
      ],
   };

   return (
      <div className="px-4 py-8 rounded bg-[#1C1C24] grid grid-cols-2">
         <div className="flex flex-col items-center">
            <RenderCircle data={reportData} icon="/images/vite.svg" />
            <b className="font-semibold text-2xl block mb-1 mt-5">61</b>
            <p className="text-[#92929D] text-sm text-center">Total Reports Today</p>
         </div>
         <div className="flex flex-col items-center">
            <RenderCircle data={supplyData} icon="/images/ic_Goal Copy.svg" />
            <b className="font-semibold text-2xl block mb-1 mt-5">0.005%</b>
            <p className="text-[#92929D] text-sm text-center">Personal Supply</p>
         </div>
      </div>
   );
}

function RenderCircle({data, icon}) {
   return (
      <div className="w-[70px] aspect-square grid place-content-center relative z-0">
         <img
            src={icon}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            alt=""
         />
         <Doughnut width="100%" options={options} data={data} />
      </div>
   );
}

export default PersonalStatus;
