import {useState} from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import {useLocation} from "react-router-dom";

const App = () => {
   const {pathname} = useLocation();
   const [toggle, setToggle] = useState(false);

   const isNonAuth = ["/login", "/register"].includes(pathname);

   return (
      <div className="">
         {!isNonAuth && <Header toggle={toggle} setToggle={setToggle} />}

         <div className="oveden">
            {!isNonAuth && <Sidebar toggle={toggle} setToggle={setToggle} />}
            <div className={`${isNonAuth ? "" : "lg:ml-[250px]"} duration-200`}>
               <Main />
            </div>
         </div>
      </div>
   );
};

export default App;
