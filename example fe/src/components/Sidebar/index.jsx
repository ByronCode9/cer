import React from 'react'
import './style.css'

const SideBar = () => {
    return (
        <div>
            <div class="w-[230px] px-6 h-screen flex flex-col justify-between items-center overflow-y-scroll border-r border-zinc-800 py-4 sticky top-0 left-0 snipcss-6kLla style-xismm" id="style-xismm">
                <div>
                    <div class=" flex gap-2">
                        <img alt="logo" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" style={{color:"transparent"}} src="https://app.aiaegis.org/_next/image?url=%2Flogo.png&amp;w=64&amp;q=75" />
                        <h1 class="text-[#D4D4D8] text-[18px] leading-[28px] font-[600]">
                            Aegis Ai
                        </h1>
                    </div>
                    <div class="flex flex-col gap-3 mt-12">
                        <div class="flex flex-col gap-3 mt-3">
                            <div class="m-0 p-0">
                            </div>
                            <div class="flex flex-col gap-3">
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2" data-state="closed" href="/dashboard">
                                    <img alt="dashboard" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" src="https://app.aiaegis.org/icons/nav/dashboard.svg" id="style-D4CTT" class="style-D4CTT" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-FtbRx" id="style-FtbRx">
                                            Dashboard
                                        </h1>
                                    </div>
                                </a>
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2" data-state="closed" href="/analytics/0x55a8f6c6b3aa58ad6d1f26f6afeded78f32e19f4">
                                    <img alt="live-monitoring" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" src="https://app.aiaegis.org/icons/nav/live-monitoring.svg" id="style-7p8JI" class="style-7p8JI" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-X7s1B" id="style-X7s1B">
                                            Analytics
                                        </h1>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 mt-3">
                            <div class="m-0 p-0">
                                <h1 class="text-zinc-200 text-[16px] font-[400] leading-[24px]">
                                    Audit
                                </h1>
                            </div>
                            <div class="flex flex-col gap-3">
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2" data-state="closed" href="/audit/code">
                                    <img alt="code-audit" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" style={{color:"transparent"}} src="https://app.aiaegis.org/icons/nav/code-audit.svg" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-oevnE" id="style-oevnE">
                                            Code
                                        </h1>
                                    </div>
                                </a>
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3  border-l-[2px] border-blue-600 bg-zinc-900 px-2" data-state="closed" href="/audit/token">
                                    <img alt="token-audit" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" src="https://app.aiaegis.org/icons/nav/token-audit.svg" id="style-ZWVWx" class="style-ZWVWx" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-white text-[16px] leading-[24px] cursor-pointer font-300 style-YkyWt" id="style-YkyWt">
                                            Token
                                        </h1>
                                    </div>
                                </a>
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2" data-state="closed" href="/audit/reports">
                                    <img alt="reports" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" src="https://app.aiaegis.org/icons/nav/reports.svg" id="style-WtsQ1" class="style-WtsQ1" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-T9RU2" id="style-T9RU2">
                                            Reports
                                        </h1>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3 mt-3">
                            <div class="m-0 p-0">
                                <h1 class="text-zinc-200 text-[16px] font-[400] leading-[24px]">
                                    Watch
                                </h1>
                            </div>
                            <div class="flex flex-col gap-3">
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2" data-state="closed" href="/watchdog">
                                    <img alt="scanner" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" style={{color:"transparent"}} src="https://app.aiaegis.org/icons/nav/scanner.svg" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-pMDAX" id="style-pMDAX">
                                            Watchdog
                                        </h1>
                                    </div>
                                </a>
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2" data-state="closed" href="/attacks">
                                    <img alt="attacks" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" style={{color:"transparent"}} src="https://app.aiaegis.org/icons/nav/attacks.svg" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-Sfr6l" id="style-Sfr6l">
                                            Attacks
                                        </h1>
                                    </div>
                                </a>
                                <a class="hover:border-l-[2px] border-l-[2px] pl-3 border-transparent hover:bg-zinc-900 hover:border-blue-600 transition-all ease-in duration-250 flex items-center gap-2 py-3   px-2" data-state="closed" href="/bounty">
                                    <img alt="bounty" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" style={{color:"transparent"}} src="https://app.aiaegis.org/icons/nav/bounty.svg" />
                                    <div class="overflow-hidden">
                                        <h1 class="text-zinc-500 text-[16px] leading-[24px] cursor-pointer font-300 style-cWCPU" id="style-cWCPU">
                                            Bounty
                                        </h1>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center my-6">
                    <button>
                        <img alt="logo" loading="lazy" width="32" height="32" decoding="async" data-nimg="1" class="brightness-50 hover:brightness-[20]" style={{color:"transparent"}} src="https://app.aiaegis.org/icons/close.svg" />
                    </button>
                </div>
                <div class="flex items-center justify-center gap-2">
                    <p class="text-zinc-400 text-[16px] leading-[24px]">
                        Aegis AI
                    </p>
                    <p class="text-zinc-600 text-[12px] leading-[24px]">
                        v1.3
                    </p>
                </div>
            </div>

        </div>
    )
}

export default SideBar