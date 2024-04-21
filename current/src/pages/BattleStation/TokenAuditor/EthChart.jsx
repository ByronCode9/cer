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
import {Line} from "react-chartjs-2";
import {Link} from "react-router-dom";

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
      padding: -20,
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

function EthChart() {
   const data = {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      datasets: [
         {
            id: 3,
            data: [...Array.from({length: 20}, () => Math.floor(Math.random() * 101))],
            borderWidth: 1.5,
            borderColor: "#0062FF",
            tension: 0.025,
         },
      ],
   };

   return (
      <div className="bg-[#1C1C24] p-5 rounded flex flex-col gap-6">
         <div className="flex gap-2">
            <div className="flex gap-2 flex-grow">
               <img src="/images/Frame 81.svg" alt="" />
               <div className="flex flex-col">
                  <b className="font-medium text-xl text-[#FAFAFB">Ethereum</b>
                  <span className="text-[#16C784] font-bold text-sm">$ 3,121.0425</span>
               </div>
            </div>
            <span className="text-[#FAFAFB]">ETH</span>
         </div>
         <Line height="75" options={options} data={data} />
         <div className="flex justify-between gap-2">
            <div role="button" className="flex gap-0.5 items-center">
               <img src="/images/icon _diagonal arrow right up outline_ (1).svg" alt="" />
               <span className="text-[#2FA15D] font-medium text-base">1,8%</span>
            </div>
            <Link
               href="/"
               className="text-[#0062FF] font-medium text-base underline underline-offset-4"
            >
               View
            </Link>
         </div>
      </div>
   );
}

export default EthChart;
