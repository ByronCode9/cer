import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/authService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // State variables for input fields
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle input changes
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }
    if (!email.trim()) {
      alert("Email cannot be empty");
      return;
    }
    if (!password.trim()) {
      alert("Password cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const data = { username, email, password };
    try {
      await signup(data)
        .then((res) => {
          if (res) {
            if (res) {
              message.success("Signup successfull");
              navigate("/login");
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
        className="flex items-center justify-center flex-1 snipcss0-0-0-1 snipcss-PClJX"
        style={{ flexBasis: "50%", alignSelf: "center", height: "100vh" }}
      >
        <div className="w-full max-w-xs snipcss0-1-1-2">
          <div className="col-span-1 min-h-[100%] relative max-[900px]:col-span-2 flex items-center justify-center flex-col gap-[50px]">
            <div
              style={{ width: "-webkit-fill-available" }}
              className="flex flex-col items-center justify-center "
            >
              <div className="border border-[#27272A] w-fit p-4 rounded-md">
                <img
                  alt="sign-up"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  src="https://app.aiaegis.org/_next/image?url=%2Ficons%2Fclipboard.png&amp;w=48&amp;q=75"
                  id="style-SvSMV"
                  className="style-SvSMV"
                />
              </div>
              <div className="mt-6 mx-[10px] w-full min-w-[300px]">
                <div id="style-pE3Jg" className="style-pE3Jg">
                  <div className="flex items-center justify-center flex-col h-[90%] px-[10px] mb-8">
                    <h1 className="font-[600] text-[24px] leading-[48px] text-[#FFFFFF]">
                      Sign up to Blockchain
                    </h1>
                    <p className="font-[400] text-[14px] leading-[24px] text-[#A6A6A6]">
                      Let's get you started with your account
                    </p>
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="username-input"
                      >
                        Username
                      </label>
                      <input
                        className="flex h-10 w-full border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 rounded-none bg-zinc-900 border-zinc-800 snipcss0-4-9-11"
                        placeholder="Username"
                        id="username-input"
                        aria-describedby="username-input-description"
                        aria-invalid="false"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="email-input"
                      >
                        Email
                      </label>
                      <input
                        className="flex h-10 w-full border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 rounded-none bg-zinc-900 border-zinc-800 snipcss0-4-9-11"
                        placeholder="Email"
                        id="email-input"
                        aria-describedby="email-input-description"
                        aria-invalid="false"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="password-input"
                      >
                        Password
                      </label>
                      <input
                        className="flex h-10 w-full border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 rounded-none bg-zinc-900 border-zinc-800 snipcss0-4-12-14"
                        placeholder="Password"
                        id="password-input"
                        aria-describedby="password-input-description"
                        aria-invalid="false"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="confirm-password-input"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="flex h-10 w-full border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 rounded-none bg-zinc-900 border-zinc-800 snipcss0-4-12-14"
                        placeholder="Confirm Password"
                        id="confirm-password-input"
                        aria-describedby="confirm-password-input-description"
                        aria-invalid="false"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </div>
                    <div
                      style={{ marginTop: "15px" }}
                      id="style-ztffw"
                      className="style-ztffw"
                    >
                      <button
                        style={{ backgroundColor: "#1F1F22" }}
                        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80 h-10 px-4 py-2 snipcss-My9A5"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4 mr-2"
                        >
                          <path
                            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-col items-center justify-center">
              <p className="text-[14px] font-[400] text-center text-[#d4d4d8d6]">
                Already have an account?
              </p>
              <Link
                to="/"
                className="text-[#0E76FD] text-[14px] font-[400] text-center "
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
