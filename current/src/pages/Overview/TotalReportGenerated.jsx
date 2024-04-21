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

let options = {
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

function TotalReportGenerated() {
   const data = {
      labels: ["Jun", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
         {
            id: 1,
            data: [0, 0, 0, 0, 3, 20, 10, 13, 30, 33, 25, 10],
            borderColor: "#E2E2EA",
            tension: 0.025,
         },
         {
            id: 2,
            data: [0, 5, 8, 10, 20, 16, 30, 25, 10, 15, 5],
            borderColor: "#0062FF",
            tension: 0.025,
         },
         {
            id: 3,
            data: [0, 0, 4, 10, 16, 10, 30, 25, 20, 10, 25],
            borderColor: "#50B5FF",
            tension: 0.025,
         },
      ],
   };

   return (
      <div className=" bg-[#1C1C24] p-6 rounded ">
         <div className="mb-10 flex items-center justify-between gap-x-4 gap-y-2 flex-wrap ">
            <h4 className="uppercase font-semibold text-base">TOTAL Reports GENERATED</h4>
            <div className="flex items-center gap-3 md:gap-5">
               {data.datasets.map(({borderColor, id}) => (
                  <div
                     key={id}
                     className="flex flex-wrap items-center gap-1 md:gap-2.5"
                     role="button"
                  >
                     <span
                        style={{backgroundColor: borderColor}}
                        className="w-2.5 h-3 block rounded"
                     />
                     <span className="text-xs md:text-sm text-[#92929D]"> Contract Audit</span>
                  </div>
               ))}
            </div>
         </div>
         <div className="">
            <Line className="h-[400px] md:h-[320px] w-full" options={options} data={data} />
         </div>
      </div>
   );
}

export default TotalReportGenerated;
