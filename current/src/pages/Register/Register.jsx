import {Link} from "react-router-dom";
import TextField from "../../components/TextField";

function RegisterPage() {
   return (
      <div className="bg-black w-full min-h-screen grid place-content-center p-4">
         <div className="flex flex-col items-center justify-center max-w-[292px] w-full mx-auto">
            <div className="mb-14">
               <Link to="/">
                  <img src="/images/cerberai.svg" alt="" />
               </Link>
            </div>
            <div className="flex flex-col gap-[26px] w-full mb-16">
               <TextField type="text" placeholder="Username" />
               <TextField type="email" placeholder="Email" />
               <TextField type="password" placeholder="Password" />
               <TextField type="password" placeholder="Confirm Password" />
            </div>
            <button className="text-sm font-semibold leading-[1.56em] tracking-[0.1px] bg-primary text-white rounded-[5px] px-7 py-2 w-full text-center mb-5">
               Sign up
            </button>
            <Link
               to="/login"
               role="button"
               className="text-sm font-semibold leading-[1.5em] tracking-[0.1px] flex items-center gap-[5px]"
            >
               <img src="/images/Left Arrow.png" alt="" />
               Back
            </Link>
         </div>
      </div>
   );
}

export default RegisterPage;
