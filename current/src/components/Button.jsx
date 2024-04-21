/* eslint-disable react/prop-types */
// import {div} from "react-router-dom";

import {Link} from "react-router-dom";

function Button(props) {
   const {name, size = "small", path} = props;

   return (
      <Link
         to={path}
         className={`text-sm font-semibold bg-primary text-white rounded-[10px] leading-[1.44em] ${
            size === "small" ? "px-7 py-[9px]" : ""
         } `}
      >
         {name}
      </Link>
   );
}

export default Button;
