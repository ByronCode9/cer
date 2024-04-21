import SecurityData from "./SecurityData";

function TokenSecurity() {
   const cardDetails = [
      {
         title: "No gas abuse.",
         describtion: "Some text about token being not a gas burner",
         variant: "success",
      },
      {
         title: "Token is not self-destructible.",
         describtion:
            "No self-destruct function found. If this function exists and is triggered, the contract will be destroyed, all functions will be unavailable, and all related assets will be erased.",
         variant: "success",
      },
      {
         title: "More info from GO+.",
         describtion:
            "Having a whitelist function means that, for this contract, some privileged users may have greater advantages in transactions, such as bypassing transaction limits, being exempt from taxes, trading earlier than others, or not being affected by transaction cooldown restrictions.",
         variant: "success",
      },
      {
         title: "Functions that can suspend trading",
         describtion:
            "If a suspendable code is included, the token maybe neither be bought nor sold (honeypot risk).",
         variant: "warning",
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
      <div className="pt-6 bg-lightBlack rounded">
         <div className="flex justify-between items-center gap-5 px-6 mb-4">
            <h2 className="text-[25px] leading-[1.22em] text-[#92929D] font-semibold">
               Token Security Overview
            </h2>
            <div className="flex gap-1 items-center">
               <h3 className="text-xs font-semibold text-[#92929D] leading-[1.25em]">
                  Potential risk:
               </h3>
               <p className="text-base font-semibold text-[#FC5A5A] leading-[1.22em]">3</p>
            </div>
         </div>
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
   );
}

export default TokenSecurity;
