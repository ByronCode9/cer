/* eslint-disable react/prop-types */
function SecurityData(props) {
   const {title, describtion, variant} = props;

   let cardStyles = {};

   if (variant === "success") {
      cardStyles = {
         picture: "/images/Icon.svg",
         color: "text-[#16C784]",
      };
   } else if (variant === "warning") {
      cardStyles = {
         picture: "/images/Icon (1).svg",
         color: "text-[#F7971A]",
      };
   } else {
      cardStyles = {
         picture: "/images/Icon (2).svg",
         color: "text-[#FC5A5A]",
      };
   }

   return (
      <div className="even:bg-gray-400 py-4 pl-6 pr-2.5">
         <div className="flex items-center gap-3 mb-3">
            <img className="md:w-auto w-8" src={cardStyles.picture} alt="" />
            <h3 className={`text-lg md:text-xl font-semibold leading-[1.2em] ${cardStyles.color}`}>
               {title}
            </h3>
         </div>
         <p className="text-sm leading-[1.22em] text-[#616E85] font-medium">{describtion}</p>
      </div>
   );
}

export default SecurityData;
