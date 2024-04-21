/* eslint-disable no-irregular-whitespace */
import Ethereum from "./TokenAuditor/Ethereum";
import StatusAside from "./TokenAuditor/StatusAside";
import TokenSecurity from "./TokenAuditor/TokenSecurity";

const TokenAuditor = () => {
   return (
      <div>
         <div className="flex lg:flex-row flex-col lg:items-center gap-5 justify-between mb-8">
            <div className="flex gap-4 items-center">
               <div className="flex flex-col">
                  <span className="text-2xl leading-[1.5em] font-semibold tracking-[0.1px]">
                     Battle Station
                  </span>
                  <span className="font-semibold text-xs tracking-[0.4px] text-[#92929D]">
                     Token
                  </span>
               </div>
            </div>
            <div className="flex lg:justify-end gap-2 flex-col lg:flex-row flex-grow">
               <input
                  type="text"
                  placeholder="0xf56d0e61adeecd42eeecd7815f1d53c30ed"
                  className="lg:max-w-[382px] w-full border border-[#16C784] focus:border-[#16C784]/75 outline-none bg-lightBlack rounded placeholder:text-[#92929D]/90 text-[13px] py-1.5 px-3"
               />

               <button className="py-2 px-9 bg-primary hover:bg-primary/85 duration-300 rounded-xl font-medium text-sm leading-[1.57em]">
                  Audit
               </button>
            </div>
         </div>
         <div className="bg-gray-400 p-4 lg:p-8 rounded mb-6">
            <div className="flex items-center gap-5 justify-between flex-wrap mb-6">
               <div className="flex gap-3 items-center" role="button">
                  <img className="lg:w-auto md:w-14 w-12" src="/images/Frame 82.svg" alt="" />
                  <p className="text-3xl lg:text-6xl leading-[1.22em] font-semibold">
                     Ethereum 
                     <span className="text-[31px] text-[#979797] leading-[1.5em]">/ETH</span>
                  </p>
               </div>
               <div className="flex gap-12 md:gap-16 lg:gap-24">
                  <div className="flex gap-4 items-center">
                     <div className="bg-[#13131A] w-10 h-10 rounded-full flex items-center justify-center">
                        <img className="w-6" src="/images/bolt-solid.svg" alt="" />
                     </div>
                     <div>
                        <h3 className="text-sm text-[#FC5A5A] mb-0.5 leading-[1.25em]">
                           Risky item
                        </h3>
                        <p className="text-xl md:text-[25px] text-[#FFDADA] leading-[1.22em] font-semibold">
                           0
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-center">
                     <div className="bg-[#13131A] w-10 h-10 rounded-full flex items-center justify-center">
                        <img className="w-6" src="/images/exclamation-solid.svg" alt="" />
                     </div>
                     <div>
                        <h3 className="text-sm text-[#F7971A] mb-0.5 leading-[1.25em]">
                           Attention item
                        </h3>
                        <p className="text-xl md:text-[25px] text-[#FFD59F] leading-[1.22em] font-semibold">
                           6
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <Ethereum />
            </div>
         </div>
         <div className="grid xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
               <TokenSecurity />
            </div>
            <div className="">
               <StatusAside />
            </div>
         </div>
      </div>
   );
};

export default TokenAuditor;
