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
   BarElement,
} from "chart.js";
import {Bar} from "react-chartjs-2";

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
   PointElement,
   BarElement
);

const options = {
   maintainAspectRatio: false,
   plugins: {
      legend: {
         display: false,
      },
   },
   elements: {
      point: {
         radius: 0,
         tension: 10,
      },
   },
   layout: {
      padding: -18,
   },
   scales: {
      y: {
         border: {
            display: false,
            dash: [6, 4],
         },
         grid: {
            borderDash: [8, 4],
         },
         ticks: {
            padding: 20,
            maxTicksLimit: 6,
            minTicksLimit: 0,
         },
         afterFit: (axis) => {
            axis.paddingTop = 12;
            axis.paddingBottom = 32;
         },
      },
      x: {
         ticks: {
            padding: 20,
         },
         border: {
            display: false,
         },
         grid: {
            display: false,
         },
      },
   },
};

function UserGrowth() {
   const data = {
      labels: ["Jun", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
         {
            id: 1,
            data: [20, 40, 60, 375, 420, 700],
            borderRadius: 3,
            backgroundColor: "#1E75FF",
            borderWidth: 0,
            tension: 0.025,
            barThickness: 8,
         },
      ],
   };

   return (
      <div className=" bg-[#1C1C24] p-6 rounded">
         <div>
            <div className="mb-10">
               <h4 className="uppercase font-semibold text-base">User growth</h4>
            </div>
            <div className="h-[324px]">
               <Bar height="h-full w-full" options={options} data={data} />
            </div>
         </div>
      </div>
   );
}

export default UserGrowth;
