import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/authService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle login button click
  const handleLogin = async () => {
    const credentials = { email, password };
    try {
      await login(credentials)
        .then((res) => {
          if (res) {
            if (res) {
              message.success("Login successfull");
              navigate("/dashboard");
            }
          } else {
            message.error("Invalid email or password");
          }
        })
        .catch(() => {});
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      <main
        className="flex items-center justify-center flex-1 snipcss-CGFkG"
        style={{ flexBasis: "50%", alignSelf: "center", height: "100vh" }}
      >
        <div className="w-full max-w-xs">
          <div className="w-[20rem] md:w-[22rem] snipcss0-0-0-1">
            <div className="flex items-center justify-center flex-col h-[90%] px-[10px] mb-8 snipcss0-1-1-2">
              <div className="border border-[#27272A] w-fit p-4 rounded-md mb-3 snipcss0-2-2-3">
                <img
                  alt="user-icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://app.aiaegis.org/_next/image?url=%2Ficons%2Fuser.png&amp;w=48&amp;q=75"
                  className="snipcss0-3-3-4"
                />
              </div>
              <h1 className="font-[600] text-[24px] leading-[48px] text-[#FFFFFF] snipcss0-2-2-5">
                Welcome
              </h1>
              <p className="font-[400] text-[14px] leading-[24px] text-[#A6A6A6] snipcss0-2-2-6">
                Please enter your account details to sign in.
              </p>
            </div>
            <form className="snipcss0-1-1-7">
              <div className="space-y-2 snipcss0-2-7-8">
                <div className="space-y-2 snipcss0-3-8-9">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white snipcss0-4-9-10"
                    htmlFor="email-input"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 rounded-none bg-zinc-900 border-zinc-800 snipcss0-4-9-11"
                    placeholder="based@aiaegis.org"
                    id="email-input"
                    aria-describedby="email-input-description"
                    aria-invalid="false"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="space-y-2 snipcss0-3-8-12">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white snipcss0-4-12-13"
                    htmlFor="password-input"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="flex h-10 w-full border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 rounded-none bg-zinc-900 border-zinc-800 snipcss0-4-12-14"
                    placeholder="Enter your password"
                    id="password-input"
                    aria-describedby="password-input-description"
                    aria-invalid="false"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>

              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 w-full mt-7 snipcss0-2-7-15"
                type="button" // Change type to "button" to prevent form submission
                onClick={handleLogin} // Call handleLogin function on button click
              >
                Sign in
              </button>
            </form>
            <div className="pt-12 pb-4 mt-auto text-center text-zinc-300 snipcss0-1-1-16">
              <p className="snipcss0-2-16-17">Don't have an account?</p>
              <Link
                to="/signup"
                className="text-[#0E76FD] text-[14px] font-[400] snipcss0-2-16-18"
              >
                Sign up.
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
