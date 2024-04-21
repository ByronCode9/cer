import TokenChart from "./TokenChart";

function StatusAside() {
   const holderData = [
      {
         headline: "Holders",
         items: [
            {
               title: "Total Supply",
               amount: "100,000,000",
            },
            {
               title: "Total Holders",
               amount: "5.789",
            },
            {
               title: "Owner Holdings",
               amount: "5.789",
               parsentage: "(0%)",
            },
            {
               title: "Creator Holdings",
               amount: "1,35M",
               parsentage: "(6,7%)",
            },
         ],
      },
   ];

   const topHolders = [
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
      {
         title: "0xaf...4399",
         amount: "1.67M",
         parsentage: "(1.21%)",
      },
   ];

   return (
      <div className="flex flex-col gap-5">
         <div className="bg-lightBlack p-[15px] rounded">
            <h2 className="text-base font-semibold text-[#92929D] leading-[1.2em] text-center mb-2.5">
               Token distribution
            </h2>
            <div className="flex justify-center mb-3">
               <TokenChart />
            </div>
            <div className="flex flex-col gap-2.5">
               <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1">
                     <div className="w-[5px] h-[5px] rounded-full bg-[#F7971A] flex-shrink-0" />
                     <h3 className="text-xs leading-[1.5em] font-medium text-[#616E85]">
                        Crowdsale
                     </h3>
                  </div>
                  <p className="text-xs leading-[1.5em] font-semibold">83.33%</p>
               </div>
               <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1">
                     <div className="w-[5px] h-[5px] rounded-full bg-[#FC5A5A] flex-shrink-0" />
                     <h3 className="text-xs leading-[1.5em] font-medium text-[#616E85]">
                        Foundation
                     </h3>
                  </div>
                  <p className="text-xs leading-[1.5em] font-semibold">16.67%</p>
               </div>
            </div>
         </div>
         <div className="bg-lightBlack p-[15px] rounded">
            {holderData.map(({headline, items}, index) => (
               <div key={index}>
                  <h2 className="text-base font-semibold text-[#92929D] leading-[1.2em] text-center mb-2.5">
                     {headline}
                  </h2>
                  <div className="flex flex-col gap-[11px]">
                     {items.map(({title, amount, parsentage}, index) => (
                        <div key={index} className="flex gap-5 justify-between">
                           <h3 className="text-xs leading-[1.5em] font-medium text-[#616E85]">
                              {title}
                           </h3>
                           <div className="flex gap-1">
                              <p className="text-xs leading-[1.5em] font-semibold">{amount}</p>
                              <p className="text-xs leading-[1.5em] font-semibold text-[#616E85]">
                                 {parsentage}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>

         {/* top header */}
         <div className="bg-lightBlack p-[15px] rounded">
            <h2 className="text-base font-semibold text-[#92929D] leading-[1.2em] text-center mb-2.5">
               Top 10 Holders
            </h2>
            <p className="text-xs font-semibold leading-[1.5em] text-center mb-1">7.29%</p>
            <div className="mb-3">
               <div className="bg-[#13131A] w-full h-2.5 rounded relative z-0">
                  <div
                     className="bg-[#16C784] border border-[#6D6D6D]/10 -top-[1px] -bottom-[1px] rounded absolute left-0 duration-500"
                     style={{width: `10%`}}
                  />
               </div>
            </div>
            <div className="flex flex-col gap-[11px]">
               {topHolders.map(({title, amount, parsentage}, index) => (
                  <div key={index} className="flex gap-5 justify-between">
                     <h3 className="text-xs leading-[1.5em] font-medium text-[#616E85]">{title}</h3>
                     <div className="flex gap-1">
                        <p className="text-xs leading-[1.5em] font-semibold">{amount}</p>
                        <p className="text-xs leading-[1.5em] font-semibold text-[#616E85]">
                           {parsentage}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}

export default StatusAside;
