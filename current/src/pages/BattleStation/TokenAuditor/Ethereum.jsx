import {Link} from "react-router-dom";
import ReliableChart from "./ReliableChart";
import EthChart from "./EthChart";
import {Tooltip as ReactTooltip} from "react-tooltip";

function Ethereum() {
   const amountValue = [
      {
         title: "Market cap",
         info: "The market is something",
         amount: "$419,185,932,774",
      },
      {
         title: "24h Volume",
         info: "The 24h Value is something",
         amount: "$419,185,932,774",
      },
      {
         title: "Circulating supply",
         amount: "100,000,000 ETH",
      },
      {
         title: "Liquidity",
         amount: "$100,500.81",
      },
      {
         title: "Liquidity",
         amount: "$100,500.81",
      },
      {
         title: "Transactions",
         amount: "$100.81",
      },
      {
         title: "Holders",
         amount: "1,589",
      },
      {
         title: "Transactions",
         amount: "13,145",
      },
   ];

   const sellDetails = [
      {
         title: "Market cap",
         info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
         yesNo: "yes",
         mark: true,
      },
      {
         title: "24h Volume",
         info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
         yesNo: "yes",
         mark: true,
      },
      {
         title: "Circulating supply",
         yesNo: "no",
         mark: true,
      },
      {
         title: "Liquidity",
         yesNo: "5%",
         mark: true,
      },
      {
         title: "Liquidity",
         yesNo: "5%",
         mark: true,
      },
      {
         title: "Transactions",
         yesNo: "yes",
         mark: false,
      },
      {
         title: "Holders",
         yesNo: "no",
         mark: true,
      },
   ];
   return (
      <div className="gap-7 grid md:grid-cols-2 2xl:grid-cols-4">
         <div className="bg-[#1C1C24] items-center rounded px-8 py-4 flex flex-col justify-center gap-4">
            <div>
               <ReliableChart />
            </div>
            <div className="flex items-center gap-3">
               {[
                  {
                     icon: "/images/github.svg",
                  },
                  {
                     icon: "/images/twitter.svg",
                  },
                  {
                     icon: "/images/telegram.svg",
                  },
                  {
                     icon: "/images/globe-africa-solid.svg",
                  },
                  {
                     icon: "/images/discord.svg",
                  },
               ].map(({icon}, index) => (
                  <Link key={index} href="/">
                     <img src={icon} alt="" />
                  </Link>
               ))}
            </div>
            <p className="text-[#16C784] text-xs text-center">
               Project is considered to be reliable.
            </p>
         </div>
         <div className="2xl:hidden">
            <EthChart />
         </div>
         <div className="flex flex-col gap-3 px-1">
            {amountValue.map(({title, amount, info}, index) => (
               <div key={index} className="flex gap-5 items-center justify-between">
                  <div className="flex items-center gap-1">
                     <h3 className="text-xs text-[#616E85] fo`nt-medium leading-[1.5em]">
                        {title}
                     </h3>
                     {info && (
                        <div>
                           <ReactTooltip
                              id={`amount${index}`}
                              place="top-start"
                              variant="dark"
                              content={info}
                           />
                           <img data-tooltip-id={`amount${index}`} src="/images/SVG.svg" alt="" />
                        </div>
                     )}
                  </div>
                  <p className="text-xs font-semibold leading-[1.5em]">{amount}</p>
               </div>
            ))}
         </div>
         <div className="flex flex-col gap-3 px-1">
            {sellDetails.map(({title, yesNo, info, mark}, index) => (
               <div key={index} className="flex gap-5 items-center justify-between">
                  <div className="flex items-center gap-1">
                     <h3 className="text-xs text-[#616E85] font-medium leading-[1.5em]">{title}</h3>
                     {info && (
                        <div>
                           <ReactTooltip
                              id={`sell${index}`}
                              place="top-start"
                              variant="dark"
                              content={info}
                           />
                           <img data-tooltip-id={`sell${index}`} src="/images/SVG.svg" alt="" />
                        </div>
                     )}
                  </div>
                  <div className="flex items-center gap-[5px]">
                     <p
                        className={`text-xs font-semibold leading-[1.5em] ${
                           mark ? "text-[#16C784]" : "text-[#FC5A5A]"
                        }`}
                     >
                        {yesNo}
                     </p>
                     <img src={mark ? "/images/Checkmark.svg" : "/images/Cancel.svg"} alt="" />
                  </div>
               </div>
            ))}
         </div>
         <div className="hidden 2xl:block">
            <EthChart />
         </div>
      </div>
   );
}

export default Ethereum;
