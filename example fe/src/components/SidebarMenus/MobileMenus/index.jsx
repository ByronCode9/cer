import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../services/authService";

const MobileMenus = () => {
  const { logout} = useAuth()

  const handleLogout = () => {
    logout()
  }
  return (
    <>
      <div class="w-[100vw] flex flex-col justify-between h-full p-8 snipcss-dfmio">
        <div>
          {/* <div class="grid grid-cols-2 gap-6 px-24">
            <button
              type="button"
              class="col-span-2 bg-zinc-800 p-3 rounded-[4px] flex justify-center gap-2 items-center text-white text-[16px] mb-3 font-[300]"
            >
              <img
                alt="user"
                loading="lazy"
                width="18"
                height="18"
                decoding="async"
                data-nimg="1"
                class="-translate-y-[1px] style-Y62iA"
                src="https://app.aiaegis.org/_next/image?url=%2Ficons%2Fuser.png&amp;w=48&amp;q=75"
                id="style-Y62iA"
              />
              Profile
            </button>
          </div> */}
          <div class="flex flex-col gap-3 w-full">
            <div class="flex flex-col gap-3">
              <div class="m-0 p-0"></div>
              <div class="flex flex-col gap-3">
                <Link to="/dashboard">
                  <span
                    class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2"
                    data-state="closed"
                  >
                    <img
                      alt="dashboard"
                      loading="lazy"
                      width="18"
                      height="18"
                      decoding="async"
                      data-nimg="1"
                      src="https://app.aiaegis.org/icons/nav/dashboard.svg"
                      id="style-YNvMD"
                      class="style-YNvMD"
                    />
                    <div class="overflow-hidden">
                      <h1
                        class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-KmN4P"
                        id="style-KmN4P"
                        style={{cursor: "pointer"}}
                      >
                        Dashboard
                      </h1>
                    </div>
                  </span>
                </Link>
                <Link to="/analytics">
                  <span
                    class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2"
                    data-state="closed"
                  >
                    <img
                      alt="live-monitoring"
                      loading="lazy"
                      width="18"
                      height="18"
                      decoding="async"
                      data-nimg="1"
                      src="https://app.aiaegis.org/icons/nav/live-monitoring.svg"
                      id="style-NSx5Z"
                      // class="style-NSx5Z"
                    />
                    <div class="overflow-hidden">
                      <h1
                        class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-KmN4P"
                        id="style-NzxNB"
                        style={{cursor: "pointer"}}
                      >
                        Analytics
                      </h1>
                    </div>
                  </span>
                </Link>
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <div class="m-0 p-0">
                <h1 class="text-zinc-200 text-[16px] font-[400] leading-[24px]">
                  Audit
                </h1>
              </div>
              <div class="flex flex-col gap-3">
                <Link to="/audit-code">
                  <span
                    class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2"
                    data-state="closed"
                  >
                    <img
                      alt="code-audit"
                      loading="lazy"
                      width="18"
                      height="18"
                      decoding="async"
                      data-nimg="1"
                      src="https://app.aiaegis.org/icons/nav/code-audit.svg"
                      id="style-etGOp"
                      class="style-etGOp"
                    />
                    <div class="overflow-hidden">
                      <h1
                        class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-IScC1"
                        id="style-IScC1"
                        style={{cursor: "pointer"}}
                      >
                        Code
                      </h1>
                    </div>
                  </span>
                </Link>
                <Link to="/audit-token">
                  <span
                    class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2"
                    data-state="closed"
                  >
                    <img
                      alt="token-audit"
                      loading="lazy"
                      width="18"
                      height="18"
                      decoding="async"
                      data-nimg="1"
                      src="https://app.aiaegis.org/icons/nav/token-audit.svg"
                      id="style-hVSHR"
                      class="style-hVSHR"
                    />
                    <div class="overflow-hidden">
                      <h1
                        class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-F76e8"
                        id="style-F76e8"
                        style={{cursor: "pointer"}}
                      >
                        Token
                      </h1>
                    </div>
                  </span>
                </Link>

              </div>
            </div>
          </div>
          <button
            type="button"
            class="w-full bg-[#0E76FD] font-[300] text-white py-3 mt-12"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenus;
