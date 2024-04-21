import {useState} from "react";

const CodeAuditor = () => {
   const handleCount = (e) => {
      const text = e;
      const lines = text.split(/\r|\r\n|\n/);
      const count = lines.length;
      const numbers = Array.from({length: count}, (_, index) => index + 1);
      // Render the list of numbers
      setCount(numbers);
   };
   const [count, setCount] = useState([1]);

   return (
      <div
         id="scroll-hidden"
         className="w-full h-full flex flex-col sm:gap-8 lg:gap-12 gap-5 overflow-y-scroll"
      >
         {/* battle station */}
         <div className="w-full flex justify-between">
            <div className="flex flex-col">
               <span className="text-2xl leading-[1.5em] font-semibold tracking-[0.1px]">
                  Battle Station
               </span>
               <span className="font-semibold text-xs tracking-[0.4px] text-[#92929D]">
                  Code
               </span>
            </div>
         </div>
         {/* analyze */}
         <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 pb-10">
            <div className="">
               <div className="flex flex-col gap-3 sticky top-20">
                  <div className="flex items-center justify-between">
                     <span className="opacity-50 sm:text-base text-xs w-full">
                        Paste your code block:
                     </span>
                     <button className="w-[132px] h-[38px] bg-primary rounded-xl font-medium text-[14px]">
                        Analyze
                     </button>
                  </div>

                  <div className="bg-lightBlack rounded flex">
                     <div className="w-[80px] border-r border-[#44444F] flex flex-col items-center pt-3 overflow-hidden">
                        {count?.map((d, i) => (
                           <span key={i} className="opacity-50 sm:text-base text-xs">
                              {d}
                           </span>
                        ))}
                     </div>

                     <textarea
                        onChange={(e) => handleCount(e.target.value)}
                        rows={count.length}
                        placeholder="Pasted code"
                        className="w-full h-full outline-none border-none bg-transparent p-3 placeholder:text-white/20 sm:text-base text-xs"
                     />
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <span className="sm:py-2 opacity-50 sm:text-base text-xs">Findings:</span>
               <div
                  id="scroll-hidden"
                  className="w-full h-full bg-lightBlack rounded sm:px-10 px-5 sm:py-5 py-3 flex flex-col gap-5 font-semibold"
               >
                  <div className="flex flex-col sm:gap-3 gap-1">
                     <span className="text-xl">1. No gas abuse.</span>
                     <h1 className="lg:text-base sm:pl-5 pl-3 text-[#616E85]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
                        dolores! Repudiandae alias voluptatem recusandae eos dolores, laudantium
                        animi error, perspiciatis tempore voluptate similique neque delectus aut
                        unde eligendi, reiciendis veniam.
                     </h1>
                  </div>
                  <div className="flex flex-col sm:gap-3 gap-1">
                     <span className="text-xl">1. No gas abuse.</span>
                     <h1 className="lg:text-base sm:pl-5 pl-3 text-[#616E85]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
                        dolores! Repudiandae alias voluptatem recusandae eos dolores, laudantium
                        animi error, perspiciatis tempore voluptate similique neque delectus aut
                        unde eligendi, reiciendis veniam.
                     </h1>
                  </div>
                  <div className="flex flex-col sm:gap-3 gap-1">
                     <span className="text-xl">1. No gas abuse.</span>
                     <h1 className="lg:text-base sm:pl-5 pl-3 text-[#616E85]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
                        dolores! Repudiandae alias voluptatem recusandae eos dolores, laudantium
                        animi error, perspiciatis tempore voluptate similique neque delectus aut
                        unde eligendi, reiciendis veniam.
                     </h1>
                  </div>
                  <div className="flex flex-col sm:gap-3 gap-1">
                     <span className="text-xl">1. No gas abuse.</span>
                     <h1 className="lg:text-base sm:pl-5 pl-3 text-[#616E85]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
                        dolores! Repudiandae alias voluptatem recusandae eos dolores, laudantium
                        animi error, perspiciatis tempore voluptate similique neque delectus aut
                        unde eligendi, reiciendis veniam.
                     </h1>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CodeAuditor;
