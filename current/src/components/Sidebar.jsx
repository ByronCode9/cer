/* eslint-disable react/prop-types */
// icons
import {BiBarChartAlt2} from "react-icons/bi";
import {CiGlobe} from "react-icons/ci";
import {TbBuildingStore} from "react-icons/tb";
import {CgFileDocument} from "react-icons/cg";
import {IoSettingsOutline} from "react-icons/io5";
import {TbPhoneCall} from "react-icons/tb";
import {HiViewGrid} from "react-icons/hi";
import {IoIosArrowDown} from "react-icons/io";
import {Link, NavLink, useLocation} from "react-router-dom";
import {IoCloseOutline} from "react-icons/io5";
import {useState} from "react";
import SmoothCollapse from "react-smooth-collapse";

const Sidebar = ({toggle, setToggle}) => {
   const location = useLocation();

   //destructuring pathname from location
   const {pathname} = location;

   //Javascript split method to get the name of the path in array
   const splitLocation = pathname.split("/");
   const [open, setOpen] = useState(false);

   return (
      <div
         className={`${
            !toggle
               ? "-translate-x-full top-0 lg:translate-x-0 lg:top-[70px] "
               : "translate-x-0 top-0 lg:top-[70px] h-screen lg:h-[calc(100vh-70px)]"
         }   overflow-y-auto bg-lightBlack text-white fixed left-0 bottom-0 z-[1020] transition-all duration-300 w-[250px]`}
      >
         {/* logo */}
         <div className="h-[70px] flex items-center justify-between px-5 border-b border-[#44444F] lg:hidden">
            <Link to="/" onClick={() => setToggle(false)}>
               <img className="w-[100px]" src="/images/cerberai4329847.svg" alt="" />
            </Link>
            <button
               className="lg:hidden size-8 pt-1 grid place-content-center"
               onClick={() => setToggle(false)}
            >
               <IoCloseOutline className="text-xl" />
            </button>
         </div>

         {/* main sidebar */}
         <div className="flex flex-col sm:tracking-widest sm:text-xs text-[10px] px-4">
            {/* main */}
            <span className="font-medium sm:pl-1 lg:pl-2 sm:py-3 lg:py-5 py-2 opacity-50">
               MAIN
            </span>
            <div className="w-full flex flex-col sm:gap-3 lg:gap-4 gap-2 lg:pl-5 sm:pl-3 pl-4">
               {/* overview */}
               <NavLink
                  onClick={() => setToggle(false)}
                  to="/"
                  className={`flex items-center sm:gap-5 gap-1 hover:text-white transition-all duration-300`}
               >
                  <HiViewGrid className="lg:text-lg text-base" />
                  <span>Overview</span>
               </NavLink>

               {/* market */}
               <NavLink
                  onClick={() => setToggle(false)}
                  to="/marketexplorer"
                  className={`flex items-center sm:gap-5 gap-1 hover:text-white transition-all duration-300`}
               >
                  <BiBarChartAlt2 className="lg:text-lg text-base" />
                  <span>Market Explorer</span>
               </NavLink>

               {/* website auditor */}
               <NavLink
                  onClick={() => setToggle(false)}
                  to="/websiteauditor"
                  className={`flex items-center sm:gap-5 gap-1 hover:text-white transition-all duration-300`}
               >
                  <CiGlobe className="lg:text-lg text-base" />
                  <span>Website Auditor</span>
               </NavLink>

               {/* battle station */}
               <div className="flex flex-col sm:gap-3 lg:gap-5 gap-1 pr-2 hover:text-white transition-all duration-300">
                  {/* toggle btn */}
                  <div
                     role="button"
                     onClick={() => setOpen(!open)}
                     className={`flex items-center justify-between hover:text-white transition-all duration-300 anchor-element ${
                        ["contractauditor", "codeauditor", "tokenauditor"].includes(
                           splitLocation[1]
                        )
                           ? "active"
                           : ""
                     }`}
                  >
                     <div className="flex items-center sm:gap-5 gap-1">
                        <TbBuildingStore className="lg:text-lg text-base" />
                        <span>Battle Station</span>
                     </div>
                     {
                        <IoIosArrowDown
                           className={`duration-200 ${open === true ? "rotate-180" : ""}`}
                        />
                     }
                  </div>

                  {/* battle station submenu */}
                  <SmoothCollapse expanded={open}>
                     <div className="flex flex-col pl-10 lg:pl-12 sm:gap-2 lg:gap-3 gap-1">
                        <NavLink onClick={() => setToggle(false)} to="/tokenauditor">
                           Token Auditor
                        </NavLink>
                        <NavLink onClick={() => setToggle(false)} to="/contractauditor">
                           Contract Auditor
                        </NavLink>
                        <NavLink onClick={() => setToggle(false)} to="/codeauditor">
                           Code Auditor
                        </NavLink>
                     </div>
                  </SmoothCollapse>
               </div>
            </div>

            {/* help */}
            <span className="font-medium sm:pl-1 lg:pl-2 sm:py-3 lg:py-5 py-2 opacity-50">
               HELP
            </span>
            <div className="w-full flex flex-col sm:gap-3 lg:gap-4 gap-2 lg:pl-5 sm:pl-3 pl-2">
               {/* documentation */}
               <NavLink
                  onClick={() => setToggle(false)}
                  to="/documentation"
                  className={`flex items-center sm:gap-5 gap-1 hover:text-white transition-all duration-300`}
               >
                  <CgFileDocument className="lg:text-lg text-base" />
                  <span>Documentation</span>
               </NavLink>
               {/* settings */}
               <NavLink
                  onClick={() => setToggle(false)}
                  to="/settings"
                  className={`flex items-center sm:gap-5 gap-1 hover:text-white transition-all duration-300`}
               >
                  <IoSettingsOutline className="lg:text-lg text-base" />
                  <span>Settings</span>
               </NavLink>
               {/* support */}
               <NavLink
                  onClick={() => setToggle(false)}
                  to="/support"
                  className={`flex items-center sm:gap-5 gap-1 hover:text-white transition-all duration-300`}
               >
                  <TbPhoneCall className="lg:text-lg text-base" />
                  <span>Support</span>
               </NavLink>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
