import React, { useState, useEffect } from "react";
import "./auditcodequick.css";
import {
  getTokenAuditSecurity,
  getLiveAnalyticsData,
  getTokenScore,
} from "../../../services/api";
import { message, Spin } from "antd";
import ClipboardJS from "clipboard";
import TokenDefaultPic from "../../../assets/token-default.svg";

import SafetyOverviewChart from "../Analytics/Charts/SafetyOverviewChart";


const AuditCodeQuick = ({ tokenData }) => {
  const id = tokenData?.baseToken?.address;
  const [isLoading, setIsLoading] = useState(false);

  const [singleRecordData, setSingleRecordData] = useState({});
  const [singleRecordLive, setSingleRecordLive] = useState({});
  const [singleRecordSecurity, setSingleRecordSecurity] = useState({});
  const [tokenScore, setTokenScore] = useState({});
  const [selectedButton, setSelectedButton] = useState("24h"); // Initially select the 24h button
  const [currentNumber, setCurrentNumber] = useState(24); // Initially set current number to 24
  const [interval, setInterval] = useState("1h"); // Assuming initialInterval is defined somewhere


  const handleButtonClick = (number) => {
    setSelectedButton(`${number}h`);
    setCurrentNumber(number);
  };
  const handleIntervalChange = (value) => {
    setInterval(value);
  };

  function formatNumberAbbreviation(number, roundTo, decimals) {
    if (isNaN(number)) return "";

    // Check if the number is greater than or equal to 1000
    let newNumber = number;
    if (decimals) {
      const adjustedNumber = number / Math.pow(10, decimals);
      newNumber = adjustedNumber;
    }
    if (Math.abs(newNumber) >= 1000) {
      const abbreviations = ["", "K", "M", "B", "T", "Q", "Qn", "S"];
      let magnitude = Math.floor(Math.log10(Math.abs(newNumber)) / 3);

      // Round the number to the specified number of decimal places
      const roundedNumber = (newNumber / Math.pow(10, magnitude * 3)).toFixed(
        roundTo
      );
      return roundedNumber.replace(/\.0{1,2}$/, "") + abbreviations[magnitude];
    } else {
      // If the number is less than 1000, return it as is
      return newNumber;
    }
  }

  const fetchLiveData = async () => {
    setIsLoading(true);


    try {
      // Fetch live data
      const liveDataResponse = await getLiveAnalyticsData(id);
      debugger;
      // setSingleRecordData(liveDataResponse?.data?.ethereumTokens[0]);
      // setSingleAnalyticsAddressData(
      //   liveDataResponse?.data?.contractData?.coinsData
      //     ? liveDataResponse?.data?.contractData?.coinsData
      //     : {}
      // );
      setSingleRecordLive(
        liveDataResponse?.data
          ? liveDataResponse?.data
          : {}
      );
      // let tokenAddress = liveDataResponse?.data?.contractData?.coinsData?.contract_address ? liveDataResponse?.data?.contractData?.coinsData?.contract_address : liveDataResponse?.data?.contractData?.liveContractData?.baseToken?.address;

      // if (tokenAddress) {
      const securityData = await getTokenAuditSecurity(
        id
      );

      debugger;


      const securityDataResp = securityData?.data[id?.toLowerCase()];
      setSingleRecordSecurity(securityDataResp ? securityDataResp : {});
      // }

      const tokenScore = await getTokenScore(id);
      setTokenScore(tokenScore?.data);
      debugger;

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error("Error fetching live data:", error);
      // Handle error if necessary
    }

    // Call fetchLiveData again after 5 seconds
    // setTimeout(fetchLiveData, 15000);
  };




  useEffect(() => {
    // Fetch live data initially
    fetchLiveData();

    // Clear the timeout when the component unmounts
    return () => clearTimeout(fetchLiveData);
  }, []);

  useEffect(() => {
    const clipboard = new ClipboardJS(".copy-button");

    clipboard.on("success", (e) => {
      message.success("Address copied to clipboard");
      e.clearSelection();
    });

    return () => {
      clipboard.destroy();
    };
  }, []);
  return (
    <>
      {isLoading ? ( // Render Spin component while loading is true
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="quick-audit-main-desktop">
            <div class="flex flex-col px-4 md:px-10 mt-8 gap-6 snipcss-5q3No">
              <div class="container p-0 mx-auto">
                <div class="flex flex-wrap max-md:flex-col md:items-center justify-around gap-4">
                  <div class=" flex-1 max-md:flex max-md:flex-row max-md:justify-between max-md:items-center max-md:gap-6">
                    <div class="col-span-1 flex items-center justify-between">
                      <div class="flex gap-2 items-start md:items-center">
                        <img
                          alt="token"
                          loading="lazy"
                          width="32"
                          height="32"
                          decoding="async"
                          data-nimg="1"
                          // src="https://app.aiaegis.org/_next/image?url=%2Fapi%2Ftoken%2Fimage%3Fq%3Dhttps%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F34913%2Fsmall%2Fpork.png%3F1706606047&amp;w=64&amp;q=75"
                          // src={singleRecordLive?.info?.imageUrl}
                          src={TokenDefaultPic}
                          id="style-Ol8OD"
                          class="style-Ol8OD"
                        />
                        <div class="flex gap-2 max-md:flex-col md:items-center">
                          <h1 class="text-neutral-300 text-[24px] leading-[32px] font-600">
                            {/* PepeFork */}
                            {singleRecordLive?.baseToken?.name}
                          </h1>
                          <div class="flex gap-1 items-center">
                            <h3 class="text-neutral-500 text-[20px] leading-[24px] font-500">
                              {/* PORK */}
                              {singleRecordLive?.baseToken?.symbol}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="md:hidden">
                      <div class="flex max-md:flex-col max-md:gap-1 items-end md:items-center gap-4">
                        <h1 class="text-neutral-50 text-[28px] leading-[35px] md:leading-[40px] font-[700]">
                          {/* $0.0000005158 */}
                          {/* {singleRecordLive?.priceUsd} */}
                          {/* {formatNumberAbbreviation(singleRecordLive?.priceUsd)} */}

                          {singleRecordLive?.priceUsd?.toFixed(8)}

                        </h1>
                        {/* <div class="flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-green-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
                      </svg>
                      <h5 class="text-green-700">3.13%</h5>
                    </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 max-md:hidden">
                    <div class="flex max-md:flex-col max-md:gap-1 items-end md:items-center gap-4">
                      <h1 class="text-neutral-50 text-[28px] leading-[35px] md:leading-[40px] font-[700]">
                        {/* $0.0000005158 */}
                        {/* {singleRecordLive?.priceUsd} */}$
                        {/* {formatNumberAbbreviation(singleRecordLive?.priceUsd)} */}
                        {/* {singleRecordData?.current_price} */}
                        {singleRecordLive?.priceUsd?.toFixed(8)}
                      </h1>

                      <div className="flex items-center">
                        <svg
                          stroke="currentColor"
                          fill={
                            singleRecordLive?.priceChange?.h24 < 0
                              ? "red"
                              : "green"
                          }
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {singleRecordLive?.priceChange?.h24 < 0 ? (
                            <path d="M12 15.414l-4.293-4.293-1.414 1.414L12 17.243l5.707-5.707-1.414-1.414L12 15.414z" />
                          ) : (
                            <path d="M12 8.586l4.293 4.293 1.414-1.414L12 6.757 6.293 12.05l1.414 1.414L12 8.586z" />
                          )}
                        </svg>
                        <h5
                          style={{
                            color:
                              singleRecordLive?.priceChange?.h24 < 0
                                ? "red"
                                : "green",
                          }}
                        >
                          {singleRecordLive?.priceChange?.h24?.toFixed(2)}%
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="flex max-md:hidden flex-end">
                    <div class="flex flex-row items-center">
                      <div class="flex flex-col mr-1">
                        <p class="text-zinc-500 text-[14px] w-[70px] text-right">
                          {/* PORK: */}
                          {singleRecordLive?.baseToken?.symbol}:
                        </p>
                        <p class="text-zinc-500 text-[14px] w-[70px] text-right">
                          PAIR:
                        </p>
                      </div>
                      <div class="flex flex-col">
                        <div class="flex text-blue-400 cursor-pointer font-mono text-sm">
                          {/* 0xB9F599...9344E */}
                          {/* {singleRecordLive?.baseToken?.address} */}
                          {singleRecordLive?.baseToken?.address?.substring(
                            0,
                            6
                          )}
                          ...{singleRecordLive?.baseToken?.address?.slice(-6)}
                          <img
                            alt="copy"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            data-nimg="1"
                            class="ml-1 style-vsYpy"
                            src="https://app.aiaegis.org/icons/copy.svg"
                            id="style-vsYpy"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                singleRecordLive?.baseToken?.address
                              );
                              message.success("Address copied to clipboard");
                            }}
                          />
                        </div>
                        <div class="flex text-blue-400 cursor-pointer font-mono text-sm">
                          {/* 0x331399...6827C */}
                          {/* {singleRecordLive?.pairAddress} */}
                          {singleRecordLive?.pairAddress?.substring(0, 6)}...
                          {singleRecordLive?.pairAddress?.slice(-6)}
                          <img
                            alt="copy"
                            loading="lazy"
                            width="16"
                            height="16"
                            decoding="async"
                            data-nimg="1"
                            class="ml-1 style-rcrsb"
                            src="https://app.aiaegis.org/icons/copy.svg"
                            id="style-rcrsb"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                singleRecordLive?.pairAddress
                              );
                              message.success("Address copied to clipboard");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-row max-md:flex-wrap flex-1 gap-4 md:gap-2">
                    <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                      <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                        {/* 200.4M */}
                        {formatNumberAbbreviation(singleRecordLive?.fdv, 1)}
                      </h1>
                      <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                        MCAP
                      </p>
                    </div>
                    <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                      <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                        {/* 5.4M */}
                        {/* {singleRecordLive?.liquidity?.usd} */}
                        {formatNumberAbbreviation(
                          singleRecordLive?.liquidity?.usd,
                          1
                        )}
                      </h1>
                      <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                        LIQUIDITY
                      </p>
                    </div>
                    <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                      <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                        {/* 3.2M */}
                        {formatNumberAbbreviation(
                          singleRecordLive?.volume?.h24,
                          1
                        )}
                      </h1>
                      <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                        VOL (24H)
                      </p>
                    </div>
                    <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                      <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                        1m
                      </h1>
                      <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                        AGE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div class="col-span-4 md:col-span-1">
                  <div class="">
                    <div class="flex">
                      <div class="w-full">
                        <div class="w-full flex items-center justify-between py-1">
                          <div class="flex gap-[4px] items-center">
                            <p class="text-zinc-500 text-[12px] font-semibold">
                              Total Supply
                            </p>
                            <button data-state="closed">
                              <img
                                alt="info-icon"
                                loading="lazy"
                                width="13"
                                height="13"
                                decoding="async"
                                data-nimg="1"
                                src="https://app.aiaegis.org/icons/info.svg"
                                id="style-Yx7C5"
                                class="style-Yx7C5"
                              />
                            </button>
                          </div>
                          <p class="text-zinc-400 text-[14px]">
                            {/* {formatNumberAbbreviation(
                              singleRecordData?.contract?.totalSupply,
                              2,
                              singleRecordData?.contract?.decimals
                            )} */}
                            {singleRecordSecurity?.total_supply}
                          </p>
                        </div>
                        <div class="w-full flex items-center justify-between py-1">
                          <div class="flex gap-[4px] items-center">
                            <p class="text-zinc-500 text-[12px] font-semibold">
                              LP Holder(s)
                            </p>
                            <button data-state="closed">
                              <img
                                alt="info-icon"
                                loading="lazy"
                                width="13"
                                height="13"
                                decoding="async"
                                data-nimg="1"
                                src="https://app.aiaegis.org/icons/info.svg"
                                id="style-OJhHw"
                                class="style-OJhHw"
                              />
                            </button>
                          </div>
                          <p class="text-zinc-400 text-[14px]">
                            {singleRecordSecurity?.lp_holder_count
                              ? singleRecordSecurity?.lp_holder_count
                              : 1}
                          </p>
                        </div>
                        <div class="w-full flex items-center justify-between py-1">
                          <div class="flex gap-[4px] items-center">
                            <p class="text-zinc-500 text-[12px] font-semibold">
                              Opensource
                            </p>
                            <button data-state="closed">
                              <img
                                alt="info-icon"
                                loading="lazy"
                                width="13"
                                height="13"
                                decoding="async"
                                data-nimg="1"
                                src="https://app.aiaegis.org/icons/info.svg"
                                id="style-Az8XC"
                                class="style-Az8XC"
                              />
                            </button>
                          </div>
                          <p class="text-zinc-400 text-[14px]">
                            {singleRecordSecurity?.is_open_source === "1" ? (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-green-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                                <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                              </svg>
                            ) : (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-orange-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                                <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                              </svg>
                            )}
                          </p>
                        </div>
                        <div class="w-full flex items-center justify-between py-1">
                          <div class="flex gap-[4px] items-center">
                            <p class="text-zinc-500 text-[12px] font-semibold">
                              Anti-whale
                            </p>
                            <button data-state="closed">
                              <img
                                alt="info-icon"
                                loading="lazy"
                                width="13"
                                height="13"
                                decoding="async"
                                data-nimg="1"
                                src="https://app.aiaegis.org/icons/info.svg"
                                id="style-RPeFl"
                                class="style-RPeFl"
                              />
                            </button>
                          </div>
                          <p class="text-zinc-400 text-[14px]">
                            {singleRecordSecurity?.is_anti_whale === "1" ? (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-orange-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                                <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                              </svg>
                            ) : (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-green-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                                <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                              </svg>
                            )}
                          </p>
                        </div>
                        <div class="w-full flex items-center justify-between py-1">
                          <div class="flex gap-[4px] items-center">
                            <p class="text-zinc-500 text-[12px] font-semibold">
                              Ownership Renounced
                            </p>
                            <button data-state="closed">
                              <img
                                alt="info-icon"
                                loading="lazy"
                                width="13"
                                height="13"
                                decoding="async"
                                data-nimg="1"
                                src="https://app.aiaegis.org/icons/info.svg"
                                id="style-fYbb8"
                                class="style-fYbb8"
                              />
                            </button>
                          </div>
                          <p class="text-zinc-400 text-[14px]">
                            {singleRecordSecurity?.can_take_back_ownership ===
                              "1" ? (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-green-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                                <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                              </svg>
                            ) : (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-orange-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                                <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                              </svg>
                            )}
                          </p>
                        </div>
                        <div class="w-full flex items-center justify-between py-1">
                          <div class="flex gap-[4px] items-center">
                            <p class="text-zinc-500 text-[12px] font-semibold">
                              Mintable
                            </p>
                            <button data-state="closed">
                              <img
                                alt="info-icon"
                                loading="lazy"
                                width="13"
                                height="13"
                                decoding="async"
                                data-nimg="1"
                                src="https://app.aiaegis.org/icons/info.svg"
                                id="style-Hq7Vv"
                                class="style-Hq7Vv"
                              />
                            </button>
                          </div>
                          <p class="text-zinc-400 text-[14px]">
                            {singleRecordSecurity?.is_mintable === "1" ? (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-orange-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                                <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                              </svg>
                            ) : (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-green-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                                <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                              </svg>
                            )}
                          </p>
                        </div>
                        <div class="w-full flex items-center justify-between py-1">
                          <div class="flex gap-[4px] items-center">
                            <p class="text-zinc-500 text-[12px] font-semibold">
                              Blacklist
                            </p>
                            <button data-state="closed">
                              <img
                                alt="info-icon"
                                loading="lazy"
                                width="13"
                                height="13"
                                decoding="async"
                                data-nimg="1"
                                src="https://app.aiaegis.org/icons/info.svg"
                                id="style-c9dac"
                                class="style-c9dac"
                              />
                            </button>
                          </div>
                          <p class="text-zinc-400 text-[14px]">
                            {singleRecordSecurity?.is_blacklisted === "1" ? (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-orange-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                                <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                              </svg>
                            ) : (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                class="text-green-700"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                                <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                              </svg>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="flex bg-gradient-to-r from-[#001735] to-[#000] mt-3">
                      <div
                        class="flex flex-col gap-5 px-4 py-4 bg-[url(/backgrounds/audit-detail.png)] bg-no-repeat style-54g66"
                        id="style-54g66"
                      >
                        <p class="text-zinc-200 text-sm w-[52%]">
                          Unlock comprehensive insights on the PORK token for
                          informed investment decisions.
                        </p>
                        <a
                          class="bg-[#0E76FD] border-[#0E76FD] flex items-center justify-center text-zinc-50 text-md border font-semibold px-2 h-[40px] w-fit text-center transition-all ease-in duration-200"
                          href="/audit/token/0xb9f599ce614feb2e1bbe58f180f370d05b39344e/detailed"
                        >
                          Detailed Audit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-4 md:col-span-3 grid grid-rows gap-4">
                  <div class="row-span-1 grid grid-cols-3 gap-4">
                    <div class="col-span-3 md:col-span-2 h-full">
                      <div class="border border-zinc-900 p-3 flex flex-col items-center justify-center gap-3">
                        <div class="flex flex-row justify-between w-full">
                          <div class="flex flex-row justify-between w-full">
                            <div id="chart">
                              <div
                                options="[object Object]"
                                series="75"
                                type="radialBar"
                                height="290"
                                width="100%"
                                id="style-tDxl3"
                                class="style-tDxl3"
                              >
                                <div
                                  id="apexchartsv60oug29"
                                  class="apexcharts-canvas apexchartsv60oug29 apexcharts-theme-light style-1IVpf"
                                >
                                  {/* CHart place */}
                                  {/* <MyRadialBarChart/> */}

                                  <SafetyOverviewChart
                                    overview={
                                      tokenScore?.dextScore?.total ? tokenScore?.dextScore?.total : 0
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="card" class="bg-transparent p-0 m-0">
                            <div id="chart">
                              <div
                                options="[object Object]"
                                series="[object Object]"
                                type="radar"
                                height="250"
                                width="100%"
                                id="style-AsiGA"
                                class="style-AsiGA"
                              >
                                <div
                                  id="apexchartsi3tp2n3dl"
                                  class="apexcharts-canvas apexchartsi3tp2n3dl apexcharts-theme-light style-jPi2m"
                                >
                                  <div class="apexcharts-tooltip apexcharts-theme-dark">
                                    <div
                                      class="apexcharts-tooltip-title style-6dSG1"
                                      id="style-6dSG1"
                                    ></div>
                                    <div
                                      class="apexcharts-tooltip-series-group style-LS1zT"
                                      id="style-LS1zT"
                                    >
                                      <span
                                        class="apexcharts-tooltip-marker style-qOWf2"
                                        id="style-qOWf2"
                                      ></span>
                                      <div
                                        class="apexcharts-tooltip-text style-vjz9K"
                                        id="style-vjz9K"
                                      >
                                        <div class="apexcharts-tooltip-y-group">
                                          <span class="apexcharts-tooltip-text-y-label"></span>
                                          <span class="apexcharts-tooltip-text-y-value"></span>
                                        </div>
                                        <div class="apexcharts-tooltip-goals-group">
                                          <span class="apexcharts-tooltip-text-goals-label"></span>
                                          <span class="apexcharts-tooltip-text-goals-value"></span>
                                        </div>
                                        <div class="apexcharts-tooltip-z-group">
                                          <span class="apexcharts-tooltip-text-z-label"></span>
                                          <span class="apexcharts-tooltip-text-z-value"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-dark">
                                    <div class="apexcharts-yaxistooltip-text"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row-span-1 ">
                    <div class="w-full bg-[#0C0C0C] p-3 border border-zinc-900 transition-all duration-300 h-14">
                      <div class="flex justify-between items-center">
                        <div class="flex flex-row align-center">
                          <h1 class="text-xl font-semibold w-[120px]">
                            Up-Votes
                          </h1>
                          <div class="translate-y-1">
                            <div class="flex flex-row">
                              <div class="w-[80px] flex flex-row-reverse">
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-10 style-gQlmJ"
                                  id="style-gQlmJ"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-11 style-wDwCw"
                                  id="style-wDwCw"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-12 style-o4nCc"
                                  id="style-o4nCc"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-13 style-8FsXf"
                                  id="style-8FsXf"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-14 style-6lxpV"
                                  id="style-6lxpV"
                                ></div>
                              </div>
                              <div class="ml-2 w-[30px] font-bold text-lg text-right text-zinc-200 font-mono">
                                {/* 90% */}
                                {/* {singleRecordData?.securityScore}% */}
                                {tokenScore?.votes?.upvotes}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button class="text-zinc-400 hover:text-zinc-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="w-6 h-6"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row-span-1">
                    <div class="w-full bg-[#0C0C0C] p-3 border border-zinc-900 transition-all duration-300 h-14">
                      <div class="flex justify-between items-center">
                        <div class="flex flex-row align-center">
                          <h1 class="text-xl font-semibold w-[120px]">
                            Down-Votes
                          </h1>
                          <div class="translate-y-1">
                            <div class="flex flex-row">
                              <div class="w-[80px] flex flex-row-reverse">
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-10 style-SlGkg"
                                  id="style-SlGkg"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-11 style-iGWsB"
                                  id="style-iGWsB"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-12 style-h6U9h"
                                  id="style-h6U9h"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-13 style-1kUmd"
                                  id="style-1kUmd"
                                ></div>
                                <div
                                  class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-14 style-KDCq2"
                                  id="style-KDCq2"
                                ></div>
                              </div>
                              <div class="ml-2 w-[30px] font-bold text-lg text-right text-zinc-200 font-mono">
                                {/* 91%*/}
                                {tokenScore?.votes?.downvotes}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button class="text-zinc-400 hover:text-zinc-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="w-6 h-6"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full quick-audit-main-mob">
            <div className="flex justify-content-between">
              <div class="flex gap-2 items-start md:items-center">
                <img
                  alt="token"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  src={TokenDefaultPic}
                  id="style-Ol8OD"
                  class="style-Ol8OD"
                />
                <div class="gap-2 max-md:flex-col md:items-center">
                  <h1 class="text-neutral-300 text-[20px] leading-[32px] font-600">
                    {/* PepeFork */}
                    {singleRecordLive?.baseToken?.name}
                  </h1>
                  <div class="flex gap-1 items-center">
                    <h3 class="text-neutral-500 text-[16px] leading-[24px] font-500">
                      {/* PORK */}
                      {singleRecordLive?.baseToken?.symbol}
                    </h3>
                  </div>
                </div>
              </div>
              <div class="">
                <div class=" max-md:flex-col max-md:gap-1 items-end md:items-center gap-4">
                  <h1 class="text-neutral-50 text-[20px] leading-[35px] md:leading-[40px] font-[700]">
                    {/* ${formatNumberAbbreviation(singleRecordLive?.priceUsd)} */}
                    ${singleRecordLive?.priceUsd?.toFixed(8)}
                  </h1>

                  <div className="flex justify-content-end">
                    <svg
                      stroke="currentColor"
                      fill={
                        singleRecordLive?.priceChange?.h24 < 0 ? "red" : "green"
                      }
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {singleRecordLive?.priceChange?.h24 < 0 ? (
                        <path d="M12 15.414l-4.293-4.293-1.414 1.414L12 17.243l5.707-5.707-1.414-1.414L12 15.414z" />
                      ) : (
                        <path d="M12 8.586l4.293 4.293 1.414-1.414L12 6.757 6.293 12.05l1.414 1.414L12 8.586z" />
                      )}
                    </svg>
                    <h5
                      style={{
                        color:
                          singleRecordLive?.priceChange?.h24 < 0
                            ? "red"
                            : "green",
                      }}
                    >
                      {singleRecordLive?.priceChange?.h24?.toFixed(2)}%
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div class="flex flex-row max-md:flex-wrap flex-1 gap-2 md:gap-1">
                <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                  <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                    {/* 200.4M */}
                    {formatNumberAbbreviation(singleRecordLive?.fdv, 1)}
                  </h1>
                  <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                    MCAP
                  </p>
                </div>
                <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                  <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                    {/* 5.4M */}
                    {/* {singleRecordLive?.liquidity?.usd} */}
                    {formatNumberAbbreviation(
                      singleRecordLive?.liquidity?.usd,
                      1
                    )}
                  </h1>
                  <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                    LIQUIDITY
                  </p>
                </div>
                <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                  <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                    {/* 3.2M */}
                    {formatNumberAbbreviation(singleRecordLive?.volume?.h24, 1)}
                  </h1>
                  <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                    VOL(24H)
                  </p>
                </div>
                <div class="bg-zinc-900 px-4 py-[6px] rounded-[6px] overflow-hidden flex-1 flex flex-col items-center justify-center gap-1">
                  <h1 class="text-neutral-200 text-[16px] font-[600] text-center">
                    1m
                  </h1>
                  <p class="uppercase text-neutral-500 text-[10px] font-[400] text-center">
                    AGE
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div class="w-full">
                <div class="w-full flex items-center justify-between py-1">
                  <div class="flex gap-[4px] items-center">
                    <p class="text-zinc-500 text-[12px] font-semibold">
                      Total Supply
                    </p>
                    <button data-state="closed">
                      <img
                        alt="info-icon"
                        loading="lazy"
                        width="13"
                        height="13"
                        decoding="async"
                        data-nimg="1"
                        src="https://app.aiaegis.org/icons/info.svg"
                        id="style-Yx7C5"
                        class="style-Yx7C5"
                      />
                    </button>
                  </div>
                  <p class="text-zinc-400 text-[14px]">
                    {/* {formatNumberAbbreviation(
                      singleRecordData?.contract?.totalSupply,
                      2,
                      singleRecordData?.contract?.decimals
                    )} */}
                    {singleRecordSecurity?.total_supply}

                  </p>
                </div>
                <div class="w-full flex items-center justify-between py-1">
                  <div class="flex gap-[4px] items-center">
                    <p class="text-zinc-500 text-[12px] font-semibold">
                      LP Holder(s)
                    </p>
                    <button data-state="closed">
                      <img
                        alt="info-icon"
                        loading="lazy"
                        width="13"
                        height="13"
                        decoding="async"
                        data-nimg="1"
                        src="https://app.aiaegis.org/icons/info.svg"
                        id="style-OJhHw"
                        class="style-OJhHw"
                      />
                    </button>
                  </div>
                  <p class="text-zinc-400 text-[14px]">
                    {singleRecordSecurity?.lp_holder_count
                      ? singleRecordSecurity?.lp_holder_count
                      : 1}
                  </p>
                </div>
                <div class="w-full flex items-center justify-between py-1">
                  <div class="flex gap-[4px] items-center">
                    <p class="text-zinc-500 text-[12px] font-semibold">
                      Opensource
                    </p>
                    <button data-state="closed">
                      <img
                        alt="info-icon"
                        loading="lazy"
                        width="13"
                        height="13"
                        decoding="async"
                        data-nimg="1"
                        src="https://app.aiaegis.org/icons/info.svg"
                        id="style-Az8XC"
                        class="style-Az8XC"
                      />
                    </button>
                  </div>
                  <p class="text-zinc-400 text-[14px]">
                    {singleRecordSecurity?.is_open_source === "1" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-green-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                        <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-orange-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                        <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                      </svg>
                    )}
                  </p>
                </div>
                <div class="w-full flex items-center justify-between py-1">
                  <div class="flex gap-[4px] items-center">
                    <p class="text-zinc-500 text-[12px] font-semibold">
                      Anti-whale
                    </p>
                    <button data-state="closed">
                      <img
                        alt="info-icon"
                        loading="lazy"
                        width="13"
                        height="13"
                        decoding="async"
                        data-nimg="1"
                        src="https://app.aiaegis.org/icons/info.svg"
                        id="style-RPeFl"
                        class="style-RPeFl"
                      />
                    </button>
                  </div>
                  <p class="text-zinc-400 text-[14px]">
                    {singleRecordSecurity?.is_anti_whale === "1" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-orange-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                        <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-green-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                        <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                      </svg>
                    )}
                  </p>
                </div>
                <div class="w-full flex items-center justify-between py-1">
                  <div class="flex gap-[4px] items-center">
                    <p class="text-zinc-500 text-[12px] font-semibold">
                      Ownership Renounced
                    </p>
                    <button data-state="closed">
                      <img
                        alt="info-icon"
                        loading="lazy"
                        width="13"
                        height="13"
                        decoding="async"
                        data-nimg="1"
                        src="https://app.aiaegis.org/icons/info.svg"
                        id="style-fYbb8"
                        class="style-fYbb8"
                      />
                    </button>
                  </div>
                  <p class="text-zinc-400 text-[14px]">
                    {singleRecordSecurity?.can_take_back_ownership === "1" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-green-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                        <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-orange-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                        <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                      </svg>
                    )}
                  </p>
                </div>
                <div class="w-full flex items-center justify-between py-1">
                  <div class="flex gap-[4px] items-center">
                    <p class="text-zinc-500 text-[12px] font-semibold">
                      Mintable
                    </p>
                    <button data-state="closed">
                      <img
                        alt="info-icon"
                        loading="lazy"
                        width="13"
                        height="13"
                        decoding="async"
                        data-nimg="1"
                        src="https://app.aiaegis.org/icons/info.svg"
                        id="style-Hq7Vv"
                        class="style-Hq7Vv"
                      />
                    </button>
                  </div>
                  <p class="text-zinc-400 text-[14px]">
                    {singleRecordSecurity?.is_mintable === "1" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-orange-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                        <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-green-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                        <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                      </svg>
                    )}
                  </p>
                </div>
                <div class="w-full flex items-center justify-between py-1">
                  <div class="flex gap-[4px] items-center">
                    <p class="text-zinc-500 text-[12px] font-semibold">
                      Blacklist
                    </p>
                    <button data-state="closed">
                      <img
                        alt="info-icon"
                        loading="lazy"
                        width="13"
                        height="13"
                        decoding="async"
                        data-nimg="1"
                        src="https://app.aiaegis.org/icons/info.svg"
                        id="style-c9dac"
                        class="style-c9dac"
                      />
                    </button>
                  </div>
                  <p class="text-zinc-400 text-[14px]">
                    {singleRecordSecurity?.is_blacklisted === "1" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-orange-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
                        <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        class="text-green-700"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path>
                        <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path>
                      </svg>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div
                style={{ borderColor: "grey" }}
                class="border p-3 flex flex-col gap-3"
              >
                {/* <div class="flex justify-between bg-zinc-900 rounded-[6px]">
                  <button
                    type="button"
                    class="text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm"
                    onClick={() => handleButtonClick(1)}

                  >
                    1h
                  </button>
                  <button
                    type="button"
                    class="text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm"

                  >
                    6h
                  </button>
                  <button
                    type="button"
                    class="text-white bg-zinc-800 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm"
                  >
                    24h
                  </button>
                </div> */}
                <div className="flex justify-between bg-zinc-900 rounded-[6px]">
                  <button
                    type="button"
                    className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${selectedButton === "1h"
                      ? "bg-zinc-800 text-white"
                      : ""
                      }`}
                    onClick={() => handleButtonClick(1)}
                  >
                    1h
                  </button>
                  <button
                    type="button"
                    className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${selectedButton === "6h"
                      ? "bg-zinc-800 text-white"
                      : ""
                      }`}
                    onClick={() => handleButtonClick(6)}
                  >
                    6h
                  </button>
                  <button
                    type="button"
                    className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${selectedButton === "24h"
                      ? "bg-zinc-800 text-white"
                      : ""
                      }`}
                    onClick={() => handleButtonClick(24)}
                  >
                    24h
                  </button>
                </div>
                <div class="grid grid-cols-4 gap-3">
                  <div class="cursor-pointer col-span-1 rounded-[4px] flex flex-col items-center gap-2 transition-all ease-in duration-100">
                    <div class="flex flex-col items-center bg-zinc-900 p-2 rounded-lg w-full text-center">
                      <h1 class="text-zinc-100 text-[14px] leading-[16px]">
                        {/* 452 */}
                        {/* {formatNumberAbbreviation(
                          singleRecordLive?.txns?.h24?.buys
                        )} */}
                        {formatNumberAbbreviation(
                          singleRecordLive?.txns?.[`h${currentNumber}`]
                            ?.buys
                        )}
                      </h1>
                      <p class="text-neutral-500 text-[10px] pt-1 uppercase">
                        Buys
                      </p>
                    </div>
                  </div>
                  <div class="cursor-pointer col-span-1 rounded-[4px] flex flex-col items-center gap-2 transition-all ease-in duration-100">
                    <div class="flex flex-col items-center bg-zinc-900 p-2 rounded-lg w-full text-center">
                      <h1 class="text-zinc-100 text-[14px] leading-[16px]">
                        {/* 207 */}
                        {/* {formatNumberAbbreviation(
                          singleRecordLive?.txns?.h24?.sells
                        )} */}
                        {formatNumberAbbreviation(
                          singleRecordLive?.txns?.[`h${currentNumber}`]
                            ?.sells
                        )}
                      </h1>
                      <p class="text-neutral-500 text-[10px] pt-1 uppercase">
                        Sells
                      </p>
                    </div>
                  </div>

                  <div class="cursor-pointer col-span-1 rounded-[4px] flex flex-col items-center gap-2 transition-all ease-in duration-100">
                    <div class="flex flex-col items-center bg-zinc-900 p-2 rounded-lg w-full text-center">
                      <h1
                        // style={{
                        //   color:
                        //     singleRecordLive?.priceChange?.h24 < 0
                        //       ? "red"
                        //       : "green",
                        // }}
                        style={{
                          color:
                            singleRecordLive?.priceChange?.[
                              `h${currentNumber}`
                            ] < 0
                              ? "red"
                              : "green",
                        }}
                        class="text-[14px] leading-[16px]"
                      >
                        {/* {singleRecordLive?.priceChange?.h24} */}
                        {singleRecordLive?.priceChange?.[
                          `h${currentNumber}`
                        ]?.toFixed(2)}
                      </h1>
                      <p class="text-neutral-500 text-[10px] pt-1 uppercase">
                        Change
                      </p>
                    </div>
                  </div>

                  <div class="cursor-pointer col-span-1 rounded-[4px] flex flex-col items-center gap-2 transition-all ease-in duration-100">
                    <div class="flex flex-col items-center bg-zinc-900 p-2 rounded-lg w-full text-center">
                      <h1 class="text-zinc-100 text-[14px] leading-[16px]">
                        {/* 3.18M */}
                        {/* {formatNumberAbbreviation(
                          singleRecordLive?.volume?.h24,
                          2
                        )} */}
                        {formatNumberAbbreviation(
                          singleRecordLive?.volume?.[
                          `h${currentNumber}`
                          ],
                          2
                        )}
                      </h1>
                      <p class="text-neutral-500 text-[10px] pt-1 uppercase">
                        Volume
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart Section */}
            <div>
              <div class="border border-zinc-900 flex flex-col items-center justify-center gap-3">
                <div class="flex flex-row justify-between w-full">
                  <div id="chart">
                    <div
                      options="[object Object]"
                      series="75"
                      type="radialBar"
                      height="290"
                      width="100%"
                      id="style-tDxl3"
                      class="style-tDxl3"
                    >
                      <div
                        id="apexchartsv60oug29"
                        class="apexcharts-canvas apexchartsv60oug29 apexcharts-theme-light style-1IVpf"
                      >
                        {/* CHart place */}
                        {/* <MyRadialBarChart/> */}

                        <SafetyOverviewChart
                          overview={
                            tokenScore?.dextScore?.total ? tokenScore?.dextScore?.total : 0
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p class="text-zinc-200 text-center font-bold mb-3">
                  Neutral Risk
                </p>
                <div class="flex flex-col bg-zinc-900 rounded-md w-full p-3">
                  <div class="flex flex-row justify-between pb-1">
                    <div class="font-semibold text-lg">Up-Votes</div>
                    <div class="flex flex-row">
                      <div class="w-[80px] flex flex-row-reverse">
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-10 style-oXzWG"
                          id="style-oXzWG"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-11 style-Oi4pW"
                          id="style-Oi4pW"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-12 style-MN5rV"
                          id="style-MN5rV"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-13 style-vxX75"
                          id="style-vxX75"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-14 style-wPRRr"
                          id="style-wPRRr"
                        ></div>
                      </div>
                      <div class="ml-2 w-[30px] font-bold text-lg text-right text-zinc-200 font-mono">
                        {/* 90% */}
                        {tokenScore?.votes?.upvotes}

                      </div>
                    </div>
                  </div>
                  <div class="flex text-zinc-500 text-lg">
                    No suspicious activity
                  </div>
                </div>
                <div class="flex flex-col bg-zinc-900 rounded-md w-full p-3">
                  <div class="flex flex-row justify-between pb-1">
                    <div class="font-semibold text-lg">Down-Votes</div>
                    <div class="flex flex-row">
                      <div class="w-[80px] flex flex-row-reverse">
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-10 style-cOjV2"
                          id="style-cOjV2"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-11 style-8jnzY"
                          id="style-8jnzY"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-12 style-VDayj"
                          id="style-VDayj"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-13 style-SjTUO"
                          id="style-SjTUO"
                        ></div>
                        <div
                          class="w-6 h-6 rounded-full border border-zinc-900 border-[2px] ml-[-0.8rem] z-14 style-fqgHo"
                          id="style-fqgHo"
                        ></div>
                      </div>
                      <div class="ml-2 w-[30px] font-bold text-lg text-right text-zinc-200 font-mono">
                        {/* 91% */}
                        {tokenScore?.votes?.downvotes}

                      </div>
                    </div>
                  </div>
                  <div class="flex text-zinc-500 text-lg">
                    Sufficiently decentralized
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuditCodeQuick;
