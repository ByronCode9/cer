import {Link} from "react-router-dom";
import StatusElement from "./StatusElement";
import TotalReportGenerated from "./TotalReportGenerated";
import UserGrowth from "./UserGrowth";
import PersonalStatus from "./PersonalStatus";

const paymentData = [
   {
      amount: "$ 0",
      parsentage: "0%",
      title: "Your Revenue Share",
      variant: "equal",
   },
   {
      amount: "$ 8966",
      parsentage: "102.5%",
      title: "Total Revenue Collected",
      variant: "success",
   },
   {
      amount: "$ 10,000",
      parsentage: "1.5%",
      title: "Next Revenue Payment Due",
      variant: "danger",
   },
   {
      amount: "$20,186",
      parsentage: "12.5%",
      title: "Next Revenue Payment Due",
      variant: "success",
   },
];

const dataLog = [
   {
      title: ["Report ID", "Date & time"],
      items: [
         {
            label: "Website Audit Report #00687",
            date: "Mar 21, 2019, 3:30pm",
         },
         {
            label: "Contract Audit Report #00910",
            date: "Mar 21, 2019, 3:30pm",
         },
         {
            label: "Code Audit Report #087651",
            date: "Mar 21, 2019, 3:30pm",
         },
         {
            label: "Code Audit Report #087650",
            date: "Mar 21, 2019, 3:30pm",
         },
         {
            label: "Website Audit Report #00688",
            date: "Mar 21, 2019, 3:30pm",
         },
      ],
   },
];

const Overview = () => {
   return (
      <div className="">
         <div className="flex items-center gap-5 justify-between mb-8">
            <h2 className="xl:text-2xl lg:text-xl text-lg leading-normal text-[#FAFAFB] font-semibold">
               Overview
            </h2>
         </div>
         <div className="grid grid-cols-2 2xl:grid-cols-4 gap-3 md:gap-5 mb-5">
            {paymentData.map(({amount, parsentage, title, variant}, index) => (
               <StatusElement
                  variant={variant}
                  key={index}
                  amount={amount}
                  parsentage={parsentage}
                  title={title}
               />
            ))}
         </div>
         <div className="grid xl:grid-cols-4 gap-5 mb-5">
            <div className="xl:col-span-3">
               <div className="mb-5">
                  <TotalReportGenerated />
               </div>
               <div>
                  <div className="bg-lightBlack rounded py-6 px-2.5">
                     <div className="flex items-center gap-5 justify-between px-4 mb-6">
                        <h2 className="text-base font-semibold text-gray-100 leading-[1.5em] uppercase">
                           DATA Log
                        </h2>
                        <div>
                           <button className="p-2">
                              <img src="/images/Shape.svg" alt="" />
                           </button>
                        </div>
                     </div>
                     <div>
                        {dataLog.map(({title, items}, index) => (
                           <div key={index}>
                              <div className="flex justify-between gap-5 bg-[#292932] rounded py-[11px] px-4">
                                 {title.map((item, index) => (
                                    <div
                                       key={index}
                                       className="text-[11px] font-semibold text-[#92929D] leading-[1.46em] tracking-[0.8px] uppercase"
                                    >
                                       {item}
                                    </div>
                                 ))}
                              </div>
                              <div className="md:pt-0 pt-3">
                                 {items.map(({label, date}, index) => (
                                    <div
                                       key={index}
                                       className="flex gap-5 justify-between items-center py-3 md:py-5 px-4"
                                    >
                                       <b className="text-xs md:text-sm text-gray-100 tracking-[0.2px]">
                                          {label}
                                       </b>
                                       <p className="text-xs md:text-sm tracking-[0.1px] leading-[1.15em] text-[#92929D] text-right">
                                          {date}
                                       </p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <div className="mb-5">
                  <PersonalStatus />
               </div>
               <div className="bg-[#1E75FF] rounded w-full p-5 mb-5">
                  <h4 className="text-xs font-semibold text-gray-100 text-center leading-[1.5em] mb-4">
                     BECOME A MEMBER
                  </h4>
                  <h3 className="text-lg text-gray-100 font-semibold leading-[1.56em] text-center mb-8">
                     Get Access to Unlock All Features for One Year
                  </h3>
                  <div className="flex justify-center">
                     <Link
                        href="#"
                        className="text-xs font-semibold bg-white text-primary px-7 py-2.5 rounded leading-[1.5em]"
                     >
                        GO UNLIMITED FOR $99
                     </Link>
                  </div>
               </div>
               <div>
                  <UserGrowth />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Overview;
