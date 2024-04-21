function StatusElement(props) {
   // eslint-disable-next-line react/prop-types
   const {amount, parsentage, variant, title} = props;

   let variantStyles = {};

   if (variant === "success") {
      variantStyles = {
         icon: "/images/succecs-down.svg",
         color: "text-[#16C784]",
         mark: "+",
      };
   } else if (variant === "danger") {
      variantStyles = {
         icon: "/images/danger-down.svg",
         color: "text-[#FC5A5A]",
         mark: "-",
      };
   } else {
      variantStyles = {
         icon: "/images/equal.svg",
         color: "text-[#92929D]",
      };
   }

   return (
      <div className="p-5 rounded bg-[#1C1C24] flex md:flex-row flex-col gap-4 w-full">
         <div className="flex-shrink-0">
            <img src={variantStyles.icon} alt="" />
         </div>
         <div>
            <div className="flex md:flex-row flex-col gap-2 md:items-center mb-1">
               <h3 className="lg:text-[28px] md:text-2xl text-[22px] font-semibold leading-normal whitespace-nowrap">
                  {amount}
               </h3>
               <div>
                  <span
                     className={`lg:text-base md:text-sm text-xs font-semibold leading-normal hidden md:block ${variantStyles.color}`}
                  >
                     {variantStyles.mark}
                     {parsentage}
                  </span>
               </div>
            </div>
            <p className="lg:text-sm text-xs text-[#92929D] leading-[1.15em]">{title}</p>
         </div>
         <div>
            <span
               className={`lg:text-base md:text-sm text-xs font-semibold leading-normal block md:hidden ${variantStyles.color}`}
            >
               {variantStyles.mark}
               {parsentage}
            </span>
         </div>
      </div>
   );
}

export default StatusElement;
