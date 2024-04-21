/* eslint-disable react/prop-types */
import {FiSearch} from "react-icons/fi";
import {FaUser} from "react-icons/fa6";
import {MdArrowDropDown} from "react-icons/md";
import {IoWalletOutline} from "react-icons/io5";
import {RxHamburgerMenu} from "react-icons/rx";

import {Link} from "react-router-dom";

const Header = ({toggle, setToggle}) => {
   return (
      <div className="w-full h-[70px] border-b border-[#44444F] bg-lightBlack flex items-center text-white gap-8 py-5 sticky top-0 z-[1010]">
         <div className="flex items-center flex-grow pl-5">
            <button
               onClick={() => setToggle(!toggle)}
               className={`rounded-full mr-4 pt-1.5 size-8 grid place-content-center lg:hidden`}
            >
               <RxHamburgerMenu className="text-lg" />
            </button>
            <div className="lg:w-[calc(250px-20px)] flex-shrink-0 flex items-center">
               <Link to="/">
                  <img className="lg:w-auto w-[100px]" src="/images/cerberai4329847.svg" alt="" />
               </Link>
            </div>
            <label
               className={`hidden lg:flex flex-row-reverse items-center sm:gap-3 gap-1 flex-grow max-w-[280px] sm:h-[38px] h-[25px] bg-[#13131A] rounded cursor-text px-3`}
            >
               <input
                  type="text"
                  name=""
                  className="outline-none flex-grow border-none bg-transparent sm:text-sm text-[10px] placeholder:text-[#92929D] text-[#FAFAFB] text-xs pt-[1px] peer"
                  placeholder="Search"
               />
               <FiSearch className="sm:text-[20px] text-[#92929D] text-[12px] cursor-pointer peer-focus:text-[#FAFAFB]" />
            </label>
         </div>

         <div className="flex items-center">
            <div className="mr-4">
               <button className="bg-[#1E75FF] text-[#FAFAFB] rounded-full size-7 lg:size-9 aspect-square grid place-content-center">
                  <IoWalletOutline className="text-[18px] lg:text-[24px]" />
               </button>
            </div>
            <div className="flex items-center gap-2 pr-5" role="button">
               <FaUser className="opacity-50 sm:text-[25px] text-[15px]" />
               <div className="flex items-center sm:gap-5">
                  <div className="flex flex-col">
                     <span className="sm:text-sm text-[10px] font-semibold">CryptoUser456</span>
                     <span className="sm:text-xs text-[8px] opacity-50">Email@address.com</span>
                  </div>
                  <MdArrowDropDown className="opacity-50 sm:text-[25px] text-[20px]" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
