import SecurityData from "./TokenAuditor/SecurityData";

const ContractAuditor = () => {
   const cardDetails = [
      {
         title: "No gas abuse.",
         describtion: "Some text about token being not a gas burner",
         variant: "success",
      },

      {
         title: "More info from GO+.",
         describtion:
            "Having a whitelist function means that, for this contract, some privileged users may have greater advantages in transactions, such as bypassing transaction limits, being exempt from taxes, trading earlier than others, or not being affected by transaction cooldown restrictions.",
         variant: "success",
      },
      {
         title: "The token can be bought",
         describtion:
            "Generally, these unbuyable tokens would be found in Reward Tokens. Such Tokens are issued as rewards for some on-chain applications and cannot be bought directly by users.",
         variant: "success",
      },
      {
         title: "Anti whale is modifiable",
         describtion:
            "The maximum token trading amount or maximum position can be modified, which may lead to suspension of trading. (honeypot risk).",
      },
      {
         title: "Trading cooldown function",
         describtion:
            "The token contract has the trading cooldown function. Within a certain time or block after buying, the user will not be able to sell the token.",
      },
   ];

   return (
      <div className="">
         {/* battle station */}
         <div className="flex justify-between mb-8 md:mb-12">
            <div className="flex flex-col">
               <span className="text-2xl leading-[1.5em] font-semibold tracking-[0.1px]">
                  Battle Station
               </span>
               <span className="font-semibold text-xs tracking-[0.4px] text-[#92929D]">
                  Contract
               </span>
            </div>
         </div>

         {/* contract address */}
         <div className="flex flex-col mb-8 md:mb-14">
            <span className="text-base leading-[2.25em] font-medium mb-1.5 text-[#92929D]">
               Enter contract address:
            </span>
            <div className="flex lg:items-center gap-5 justify-between lg:flex-row flex-col">
               <div className="flex lg:items-center gap-6 flex-grow lg:flex-row flex-col">
                  <input
                     type="text"
                     placeholder="0xf56d0e61adeecd42eeecd7815f1d53c30ed"
                     className="lg:max-w-[309px] w-full border border-[#FC5A5A] focus:border-[#FC5A5A]/75 outline-none bg-lightBlack rounded placeholder:text-[#92929D]/90 placeholder:text-[13px] py-1.5 px-3"
                  />
                  <button className="py-2 px-12 bg-primary hover:bg-primary/85 duration-300 rounded-xl font-medium text-sm leading-[1.57em]">
                     Audit
                  </button>
               </div>
               <button className="py-2 px-4 bg-primary hover:bg-primary/85 duration-300 rounded-xl font-medium text-sm leading-[1.57em]">
                  Generate PDF
               </button>
            </div>
         </div>

         <div className="grid lg:grid-cols-2 gap-10">
            <div className="py-6 bg-lightBlack rounded">
               <h2 className="text-[25px] leading-[1.2em] text-[#92929D] font-semibold px-6 mb-4">
                  GO+ Data
               </h2>
               <div className="">
                  {cardDetails.map(({title, describtion, variant}, index) => (
                     <SecurityData
                        key={index}
                        title={title}
                        describtion={describtion}
                        variant={variant}
                     />
                  ))}
               </div>
            </div>
            <div className="pt-6 bg-lightBlack rounded">
               <h2 className="text-[25px] leading-[1.2em] text-[#92929D] font-semibold px-6 mb-14">
                  OPENAI Response
               </h2>
               <div className="flex flex-col gap-[23px] px-3.5">
                  {[...Array(6)].map((_, index) => (
                     <p
                        key={index}
                        className="text-sm text-[#616E85] font-medium leading-[1.22em] max-w-[533px] w-full"
                     >
                        Having a whitelist function means that, for this contract, some privileged
                        users may have greater advantages in transactions, such as bypassing
                        transaction limits, being exempt from taxes, trading earlier than others, or
                        not being affected by transaction cooldown restrictions.
                     </p>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContractAuditor;
