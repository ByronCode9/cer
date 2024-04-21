import {Link} from "react-router-dom";
import TextField from "../../components/TextField";

function LogInPage() {
   return (
      <div className="bg-black w-full min-h-screen place-content-center p-4">
         <div className="flex flex-col items-center justify-center max-w-[292px] w-full mx-auto">
            <div className="mb-14">
               <Link to="/">
                  <img src="/images/cerberai.svg" alt="" />
               </Link>
            </div>
            <div className="flex flex-col gap-[26px] w-full mb-16">
               <TextField type="email" placeholder="Email" />
               <TextField type="password" placeholder="Password" />
            </div>
            <button className="text-sm font-semibold leading-[1.56em] tracking-[0.1px] bg-primary text-white rounded-[5px] px-7 py-2 w-full text-center mb-5">
               Log In
            </button>
            <Link to="/register" className="text-sm font-semibold leading-[1.5em] tracking-[0.1px">
               Sign up
            </Link>
         </div>
      </div>
   );
}

export default LogInPage;
