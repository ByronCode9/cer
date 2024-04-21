import React, { useState, useEffect } from "react";
import "./style.css";
import { message } from "antd";
import { CustomTradingViewWidget } from "./Charts/TradingViewWidget";
import {
  getLiveAnalyticsData,
  getTokenAuditSecurity,
  getTokenList,
  getAllDatabyToken,
} from "../../../services/api";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import ClipboardJS from "clipboard";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SafetyOverviewChart from "./Charts/SafetyOverviewChart";
import VolumeChart from "./Charts/Volumes";
import { Select, Table } from "antd";
import TopHoldersBarChart from "./Charts/TopHoldersBarChart";
import OrderBookChart from "./Charts/OrderBookCHart";
import TokenDefaultPic from "../../../assets/token-default.svg";

function CustomTabPanel({ value, index, children }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Analytics = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let id = "0x72fca22c6070b4cf68abdb719fa484d9ef10a73b";
  const newID = searchParams.get("address");

  if (newID) {
    id = newID;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [singleRecordData, setSingleRecordData] = useState({});
  const [singleRecordLive, setSingleRecordLive] = useState({});
  const [singleWalletsData, setSingleWalletsData] = useState([]);
  const [singleRecordSecurity, setSingleRecordSecurity] = useState({});
  const [singleAnalyticsData, setSingleAnalyticsData] = useState({});
  const [singleAnalyticsAddressData, setSingleAnalyticsAddressData] = useState(
    {}
  );

  const [tradesTableData, setTradesTableData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("24h"); // Initially select the 24h button
  const [currentNumber, setCurrentNumber] = useState(24); // Initially set current number to 24
  const [interval, setInterval] = useState("1h"); // Assuming initialInterval is defined somewhere
  const [volumeData, setVolumeData] = useState([]); // Initially set current number to 24
  const [searchTerm, setSearchTerm] = useState("");
  const [showTopHolders, setShowTopHolders] = useState(true);
  const [showOrderBook, setShowOrderBook] = useState(false);
  const [orderBookData, setOrderBookData] = useState([]);

  // Filtered data based on search term
  const filteredData = singleWalletsData.filter(
    (wallet) =>
      searchTerm === "" ||
      wallet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (wallet.addressLabel &&
        wallet.addressLabel.label &&
        wallet.addressLabel.label
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const { Option } = Select;

  const handleButtonClick = (number) => {
    setSelectedButton(`${number}h`);
    setCurrentNumber(number);
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

  // const fetchLiveDataContractAddress = async () => {
  //   try {
  //     const liveDataResponse = await getLiveAnalyticsData(id);
  //     setSingleRecordLive(
  //       liveDataResponse?.data
  //         ? liveDataResponse?.data
  //         : {}
  //     );

  //   } catch (error) {

  //     console.error("Error fetching live data:", error);
  //     // Handle error if necessary

  //   }
  //   setTimeout(fetchLiveDataContractAddress, 15000);

  // }

  const fetchAllDataContractAddress = async () => {
    setIsLoading(true);

    try {
      // Fetch live data
      const liveDataResponse = await getAllDatabyToken(id);
      setSingleAnalyticsData(liveDataResponse?.data);

      // setSingleAnalyticsData(liveDataResponse?.data?.ethereumTokens[0]);
      // setSingleAnalyticsAddressData(
      //   liveDataResponse?.data?.contractData?.coinsData
      //     ? liveDataResponse?.data?.contractData?.coinsData
      //     : {}
      // );
      // setSingleRecordLive(
      //   liveDataResponse?.data?.contractData?.liveContractData
      //     ? liveDataResponse?.data?.contractData?.liveContractData
      //     : {}
      // );
      // let tokenAddress = liveDataResponse?.data?.contractData?.coinsData?.contract_address ? liveDataResponse?.data?.contractData?.coinsData?.contract_address : liveDataResponse?.data?.contractData?.liveContractData?.baseToken?.address;
      // if (tokenAddress) {
      const securityData = liveDataResponse?.data?.security;
      const securityDataResp = securityData?.[id?.toLowerCase()];
      setSingleRecordSecurity(securityDataResp ? securityDataResp : {});
      setSingleWalletsData(securityDataResp ? securityDataResp?.holders : []);

      // const volumesData = await liveDataResponse?.data?.contractData?.coinsData ? liveDataResponse?.data?.contractData?.coinsData?.tickers : [];
      // const newVolumesData = volumesData && volumesData?.length > 0 && volumesData?.map(item => item?.volume)?.slice(0, 15);
      // setVolumeData(newVolumesData || [])
      // }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error("Error fetching live data:", error);
      // Handle error if necessary
    }

    // Call fetchLiveData again after 5 seconds
    // setTimeout(fetchLiveData, 15000);
  };

  const getTradesDataFunc = async (id) => {
    // Await the result of getTradesData
    if (id) {
      // const tradesData = await getTradesData(id);
      // setTradesTableData(tradesData?.data?.data);
    }
  };

  const handleIntervalChange = (value) => {
    setInterval(value);
  };
  const handleSwitchHolders = async (value) => {
    if (value === "order-book") {
      setShowOrderBook(true);
      setShowTopHolders(false);
    } else {
      setShowTopHolders(true);
      setShowOrderBook(false);
    }
  };

  useEffect(() => {
    // Fetch live data initially
    fetchAllDataContractAddress();
  }, [id]);

  // useEffect(() => {
  //   // Fetch live data initially
  //   fetchLiveDataContractAddress();

  //   // Clear the timeout when the component unmounts
  //   return () => clearTimeout(fetchLiveDataContractAddress);
  // }, []);

  useEffect(() => {
    const fetchLiveDataContractAddress = async () => {
      try {
        const liveDataResponse = await getLiveAnalyticsData(id);
        setSingleRecordLive(
          liveDataResponse?.data ? liveDataResponse?.data : {}
        );
      } catch (error) {
        console.error("Error fetching live data:", error);
        // Handle error if necessary
      }
    };

    const intervalId = setInterval(fetchLiveDataContractAddress, 15000);

    // Fetch live data initially
    fetchLiveDataContractAddress();

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

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

  function formatTime(timestamp) {
    const tradeTime = new Date(timestamp);
    const currentTime = new Date();
    const timeDifference = (currentTime - tradeTime) / 1000; // Difference in seconds

    if (timeDifference < 3600) {
      // Less than an hour
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes}m`;
    } else {
      // More than an hour
      const hours = Math.floor(timeDifference / 3600);
      return `${hours}h`;
    }
  }

  useEffect(() => {
    if (tradesTableData && tradesTableData.length > 0) {
      const filteredData = tradesTableData.map((item) => ({
        address: `${item?.attributes.tx_from_address?.substring(
          0,
          8
        )}...${item?.attributes.tx_from_address?.slice(-5)}`,
        amount: parseFloat(
          formatNumberAbbreviation(item?.attributes?.volume_in_usd, 2)
        ).toFixed(2),
        price: (
          Math.floor(
            parseFloat(
              item?.attributes?.kind === "buy"
                ? item?.attributes?.price_to_in_usd
                : item?.attributes?.price_from_in_usd
            ) * 100000
          ) / 100000
        ).toFixed(5),
        time: formatTime(item?.attributes?.block_timestamp),
        kind: item?.attributes?.kind,
      }));
      setTableData(filteredData);
    }
  }, [tradesTableData]);

  useEffect(() => {
    if (singleRecordLive?.pairAddress) {
      getTradesDataFunc(singleRecordLive?.pairAddress?.toLowerCase());
    }
  }, [singleRecordLive?.pairAddress]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabStyle = (index) => ({
    fontSize: "12px",
    fontWeight: "bold",
    padding: "10px",
    color: value === index ? "white" : "grey", // Change color based on active tab
  });

  return (
    <>
      {isLoading ? ( // Render Spin component while loading is true
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="large-screen-div">
            <div class="flex flex-col px-4 md:px-10 mt-8 gap-6 snipcss-A6LMc">
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
                          // src={singleRecordData?.logo}
                          src={TokenDefaultPic}
                          id="style-Ol8OD"
                          class="style-Ol8OD"
                        />
                        <div class="flex gap-2 max-md:flex-col md:items-center">
                          <h1 class="text-neutral-300 text-[24px] leading-[32px] font-600">
                            {/* PepeFork */}
                            {/* {singleRecordLive?.baseToken?.name} */}
                            {singleRecordLive?.baseToken?.name}
                          </h1>
                          <div class="flex gap-1 items-center">
                            <h3 class="text-neutral-500 text-[20px] leading-[24px] font-500">
                              {/* PORK */}
                              {/* {singleRecordLive?.baseToken?.symbol} */}
                              {singleRecordLive?.baseToken?.symbol}
                              {/* singleRecordLive?.baseToken?.priceUsd */}
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
                          {parseFloat(singleRecordLive?.priceUsd)?.toFixed(8)}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 max-md:hidden">
                    <div class="flex max-md:flex-col max-md:gap-1 items-end md:items-center gap-4">
                      <h1 class="text-neutral-50 text-[28px] leading-[35px] md:leading-[40px] font-[700]">
                        {/* $0.0000005158 */}
                        {/* {singleRecordLive?.priceUsd} */}$
                        {/* {formatNumberAbbreviation(singleRecordLive?.priceUsd, 8)} */}
                        {parseFloat(singleRecordLive?.priceUsd)?.toFixed(8)}
                        {/* {singleRecordLive?.priceUsd} */}
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
                          {/* {singleRecordLive?.baseToken?.symbol}: */}
                          {singleRecordLive?.baseToken?.symbol?.toUpperCase()}:
                        </p>
                        <p class="text-zinc-500 text-[14px] w-[70px] text-right">
                          PAIR:
                        </p>
                      </div>
                      <div class="flex flex-col">
                        <div
                          class="flex text-blue-400 cursor-pointer font-mono text-sm copy-button"
                          data-clipboard-text={
                            singleRecordLive?.baseToken?.address
                          }
                        >
                          {/* 0xB9F599...9344E */}
                          {/* {singleAnalyticsAddressData?.contract_address} */}

                          {
                            <>
                              {singleRecordLive?.baseToken?.address?.substring(
                                0,
                                6
                              )}
                              ...
                              {singleRecordLive?.baseToken?.address?.slice(-6)}
                            </>
                          }
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
                          />
                        </div>
                        <div
                          class="flex text-blue-400 cursor-pointer font-mono text-sm copy-button"
                          data-clipboard-text={singleRecordLive?.pairAddress}
                        >
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
                            // onClick={() => {
                            //   navigator.clipboard.writeText(
                            //     singleRecordLive?.pairAddress
                            //   );
                            //   message.success("Address copied to clipboard");
                            // }}
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
                <div class="flex md:flex flex-col col-span-4 md:col-span-1 gap-4">
                  <div class="row-span-3">
                    <div class="flex flex-col gap-6">
                      <div>
                        <p class="text-neutral-400 text-xs leading-relaxed tracking-wide"></p>

                        {/* Social icons divs */}
                        <div class="flex items-center gap-4 mt-3">
                          <a
                            target="_blank"
                            class="bg-zinc-900 p-2 rounded-[6px]"
                            // href={singleRecordLive?.info?.websites[0]?.url}
                            // href={singleAnalyticsAddressData?.links?.homepage && singleAnalyticsAddressData?.links?.homepage?.length > 0 ? singleAnalyticsAddressData?.links?.homepage[0] : ""}
                            href={
                              singleAnalyticsData?.socialData?.socialInfo
                                ?.website
                            }
                          >
                            <img
                              alt="Website Icon"
                              loading="lazy"
                              width="18"
                              height="18"
                              decoding="async"
                              data-nimg="1"
                              src="https://app.aiaegis.org/icons/social-web.svg"
                              id="style-dAjxF"
                              class="style-dAjxF"
                            />
                          </a>
                          <a
                            target="_blank"
                            class="bg-zinc-900 p-2 rounded-[6px]"
                            // href={singleRecordLive?.info?.socials[0]?.url}
                            href={
                              singleAnalyticsData?.socialData?.socialInfo
                                ?.twitter
                            }
                          >
                            <img
                              alt="Twitter Icon"
                              loading="lazy"
                              width="18"
                              height="18"
                              decoding="async"
                              data-nimg="1"
                              src="https://app.aiaegis.org/icons/social-twitter.svg"
                              id="style-sRo3w"
                              class="style-sRo3w"
                            />
                          </a>
                        </div>
                        {/* Social icons divs ended */}
                      </div>

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

                            {singleAnalyticsData?.info?.totalSupply}
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
                      {/* Div Below social icons ended */}

                      <div className="mt-2">
                        <div className="flex justify-between bg-zinc-900 rounded-[6px]">
                          <button
                            type="button"
                            className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${
                              selectedButton === "1h"
                                ? "bg-zinc-800 text-white"
                                : ""
                            }`}
                            onClick={() => handleButtonClick(1)}
                          >
                            1h
                          </button>
                          <button
                            type="button"
                            className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${
                              selectedButton === "6h"
                                ? "bg-zinc-800 text-white"
                                : ""
                            }`}
                            onClick={() => handleButtonClick(6)}
                          >
                            6h
                          </button>
                          <button
                            type="button"
                            className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${
                              selectedButton === "24h"
                                ? "bg-zinc-800 text-white"
                                : ""
                            }`}
                            onClick={() => handleButtonClick(24)}
                          >
                            24h
                          </button>
                        </div>
                        <div class="mt-3 grid grid-cols-4 gap-3">
                          <div class="cursor-pointer col-span-1 rounded-[4px] flex flex-col items-center gap-2 transition-all ease-in duration-100">
                            <div class="flex flex-col items-center bg-zinc-900 p-2 rounded-lg w-full text-center">
                              <h1 class="text-zinc-100 text-[14px] leading-[16px]">
                                {/* 452 */}
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

                      {/* Performance Chart Section */}
                      <div class="border border-zinc-900 p-3 performanceStyle flex flex-col items-center justify-center gap-3">
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

                                <SafetyOverviewChart
                                  overview={
                                    singleAnalyticsData?.score?.dextScore?.total
                                      ? singleAnalyticsData?.score?.dextScore
                                          ?.total
                                      : 0
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

                                {singleAnalyticsData?.score?.votes?.upvotes}
                              </div>
                            </div>
                          </div>
                          <div class="text-zinc-500 text-lg">
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
                                {singleAnalyticsData?.score?.votes?.downvotes}
                              </div>
                            </div>
                          </div>
                          <div class="text-zinc-500 text-lg">
                            Sufficiently decentralized
                          </div>
                        </div>
                      </div>
                      {/* Performance Chart Section Ended */}
                    </div>
                  </div>
                </div>
                <div class="col-span-4 md:col-span-3 flex flex-col gap-4">
                  <div class="flex flex-col gap-4 max-md:hidden">
                    <div id="style-XpX75" class="style-XpX75">
                      <div
                        id="tv_chart_container"
                        class="min-h-[400px] style-l18b9"
                      >
                        {singleRecordLive?.baseToken?.symbol &&
                          singleRecordLive?.quoteToken?.symbol && (
                            <CustomTradingViewWidget
                              symbol={singleRecordLive.baseToken.symbol}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                  <div class="grid  md:grid-cols-3 gap-4 max-md:hidden">
                    {/* Volumne Section start */}

                    {/* <div class="col-span-4 md:col-span-1 md:aspect-square">
                      <div class="flex flex-col gap-6 p-3 border border-zinc-900 bg-[#0C0C0C]">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                            <h1 class="text-[16px] text-neutral-100 transition-all ease-in duration-100 cursor-pointer">
                              Volume
                            </h1>
                            <h1 class="text-[16px] text-neutral-600 transition-all ease-in duration-100 cursor-pointer">
                              Holders
                            </h1>
                          </div>
                          <div class="relative z-20">
                            <div className="flex items-center gap-6">
                              <div className="relative max-md:w-1/2 ">
                                <Select
                                  defaultValue="1h"
                                  style={{
                                    width: 80,
                                    backgroundColor: "black",
                                  }}
                                  onChange={handleIntervalChange}
                                >
                                  <Option value="1m">1m</Option>
                                  <Option value="15m">15m</Option>
                                  <Option value="1h">1h</Option>
                                  <Option value="2h">2h</Option>
                                  <Option value="4h">4h</Option>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <VolumeChart volumeData={volumeData ? volumeData : []} />
                        </div>
                      </div>
                    </div> */}

                    {/* Volumne Section start */}

                    <div class="col-span-4 md:col-span-2">
                      <div class="flex flex-col p-3 border border-zinc-900 max-md:mb-3 max-md:min-h-[400px] bg-[#0C0C0C] md:h-[386px]">
                        {/* <div class="flex items-center justify-between relative">
                          <div class="flex items-center gap-4 absolute translate-y-5">
                            <button
                              type="button"
                              role="combobox"
                              aria-controls="radix-:r2c:"
                              aria-expanded="false"
                              aria-autocomplete="none"
                              dir="ltr"
                              data-state="closed"
                              class="flex h-9 w-full items-center justify-between whitespace-nowrap border border-zinc-200 text-sm shadow-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300 bg-zinc-900 rounded-[4px] outline-none p-2 py-1 text-white"
                            >
                              Top Holders
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 opacity-50"
                                aria-hidden="true"
                              >
                                <path
                                  d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div> */}
                        <div class="relative z-20">
                          <div className="flex items-center gap-6">
                            <div className="d-flex relative max-md:w-1/2 ">
                              <Select
                                defaultValue="Top Holders"
                                style={{
                                  width: 150,
                                  backgroundColor: "black",
                                }}
                                onChange={handleSwitchHolders}
                              >
                                <Option value="top-holder">Top Holders</Option>
                                <Option value="order-book">Order Book</Option>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {showTopHolders && (
                          <div class="flex flex-col gap-4 max-md:pb-4 max-md:gap-6 md:flex-row md:overflow-hidden">
                            <div class="flex flex-col w-full mb-6 md:w-[50%]">
                              <div class="w-full h-[320px] translate-y-10">
                                <TopHoldersBarChart
                                  holdersData={singleWalletsData}
                                />
                              </div>
                            </div>
                            {/* Main wallets wrapper */}
                            <div
                              style={{ width: "100%" }}
                              className="flex flex-col max-md:mb-3   "
                            >
                              <div className="bg-zinc-900 p-2">
                                <div className="flex bg-zinc-800 p-2 gap-2 w-full mb-3">
                                  <img
                                    alt="token"
                                    loading="lazy"
                                    width="28"
                                    height="28"
                                    decoding="async"
                                    data-nimg="1"
                                    src="https://app.aiaegis.org/icons/search.svg"
                                    id="style-HgOj5"
                                    className="style-HgOj5"
                                  />
                                  <input
                                    autoComplete="off"
                                    placeholder="Search wallets"
                                    className="w-[80%] max-md:hidden text-[14px] text-white placeholder:text-neutral-600 border-none outline-none bg-transparent"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex flex-row text-xs font-medium uppercase bg-[#0B0B0B] border-b border-zinc-500 mb-3 ">
                                  <div
                                    style={{ justifyContent: "end" }}
                                    className="flex p-2 w-[50%]"
                                  >
                                    Wallets
                                  </div>
                                  <div
                                    style={{ justifyContent: "end" }}
                                    className="flex p-2 w-[50%]"
                                  >
                                    Amount
                                  </div>
                                </div>
                                <div className="w-full overflow-x-auto">
                                  <div
                                    style={{
                                      maxHeight: "300px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <table className="w-full text-white">
                                      <tbody>
                                        {filteredData?.map((wallet, index) => (
                                          <tr
                                            key={index}
                                            className="items-center text-xs bg-transparent"
                                          >
                                            <td className="p-2 text-zinc-500 font-semibold">
                                              #{index + 1}
                                            </td>
                                            <td
                                              style={{ alignItems: "start" }}
                                              className="text-blue-300 font-bold"
                                            >
                                              <a
                                                target="_blank"
                                                href={`https://etherscan.io/address/${wallet.address}`}
                                              >
                                                {wallet?.addressLabel?.label ||
                                                  wallet.address.substring(
                                                    0,
                                                    5
                                                  )}
                                                ...{wallet.address.slice(-4)}
                                              </a>
                                            </td>
                                            <td>
                                              {formatNumberAbbreviation(
                                                wallet.balance
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {showOrderBook && (
                          <div class="pt-3 flex flex-col gap-4 max-md:pb-4 max-md:gap-6 md:flex-row md:overflow-hidden">
                            <OrderBookChart />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile screen code started */}
          <div className="small-screen-div">
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", padding: "0px" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  style={{ padding: "0px" }}
                >
                  <Tab
                    style={tabStyle(0)}
                    label="Token info"
                    {...a11yProps(0)}
                  />
                  <Tab
                    style={tabStyle(1)}
                    label="Chart+Txns"
                    {...a11yProps(1)}
                  />
                  <Tab
                    style={tabStyle(2)}
                    label="Volume+Wallets"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className=" w-full">
                  <div className="flex justify-content-between">
                    <div class="flex gap-2 items-start md:items-center">
                      <img
                        alt="token"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        // src={singleRecordData?.logo}
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
                          $
                          {/* {formatNumberAbbreviation(singleRecordLive?.priceUsd)} */}
                          {parseFloat(singleRecordLive?.priceUsd)?.toFixed(8)}
                        </h1>

                        <div className="flex justify-content-end">
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
                          {formatNumberAbbreviation(
                            singleRecordLive?.volume?.h24,
                            1
                          )}
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
                          {singleAnalyticsData?.info?.totalSupply}
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

                  <div className="mt-2">
                    <div className="flex justify-between bg-zinc-900 rounded-[6px]">
                      <button
                        type="button"
                        className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${
                          selectedButton === "1h"
                            ? "bg-zinc-800 text-white"
                            : ""
                        }`}
                        onClick={() => handleButtonClick(1)}
                      >
                        1h
                      </button>
                      <button
                        type="button"
                        className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${
                          selectedButton === "6h"
                            ? "bg-zinc-800 text-white"
                            : ""
                        }`}
                        onClick={() => handleButtonClick(6)}
                      >
                        6h
                      </button>
                      <button
                        type="button"
                        className={`text-neutral-500 hover:text-white transition-all ease-in duration-150 p-1 px-2 w-full text-sm ${
                          selectedButton === "24h"
                            ? "bg-zinc-800 text-white"
                            : ""
                        }`}
                        onClick={() => handleButtonClick(24)}
                      >
                        24h
                      </button>
                    </div>
                    <div class="mt-3 grid grid-cols-4 gap-3">
                      <div class="cursor-pointer col-span-1 rounded-[4px] flex flex-col items-center gap-2 transition-all ease-in duration-100">
                        <div class="flex flex-col items-center bg-zinc-900 p-2 rounded-lg w-full text-center">
                          <h1 class="text-zinc-100 text-[14px] leading-[16px]">
                            {/* 452 */}
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
                            {formatNumberAbbreviation(
                              singleRecordLive?.volume?.[`h${currentNumber}`],
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
                  <div class="mt-5 border border-zinc-900 flex flex-col items-center justify-center gap-3">
                    <div class="flex flex-row justify-between w-full">
                      <div id="chart">
                        <div
                          options="[object Object]"
                          series="75"
                          type="radialBar"
                          height="290"
                          width="100%"
                          id="style-tDxl3"
                          class="style-tDxl3 d-flex"
                        >
                          <div
                            id="apexchartsv60oug29"
                            class=""
                            style={{ alignSelf: "cen" }}
                          >
                            {/* CHart place */}
                            <SafetyOverviewChart
                              overview={
                                singleAnalyticsData?.score?.dextScore?.total
                                  ? singleAnalyticsData?.score?.dextScore?.total
                                  : 0
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
                            {singleAnalyticsData?.score?.votes?.upvotes}
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
                            {singleAnalyticsData?.score?.votes?.downvotes}
                          </div>
                        </div>
                      </div>
                      <div class="flex text-zinc-500 text-lg">
                        Sufficiently decentralized
                      </div>
                    </div>
                  </div>
                </div>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <div>
                  {/* Panel headers */}
                  <div className="flex justify-content-between">
                    <div class="flex gap-2 items-start md:items-center">
                      <img
                        alt="token"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        // src={singleRecordData?.logo}
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
                          $
                          {/* {formatNumberAbbreviation(singleRecordLive?.priceUsd)} */}
                          {parseFloat(singleRecordLive?.priceUsd)?.toFixed(8)}
                          {}
                        </h1>

                        <div className="flex justify-content-end">
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
                          {formatNumberAbbreviation(
                            singleRecordLive?.volume?.h24,
                            1
                          )}
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

                  {/* Trading Widget */}
                  <div class="flex flex-col gap-4 max-md:hidden">
                    <div id="style-XpX75" class="style-XpX75">
                      <div
                        id="tv_chart_container"
                        class="min-h-[600px] style-l18b9"
                      >
                        {singleRecordLive?.baseToken?.symbol &&
                          singleRecordLive?.quoteToken?.symbol && (
                            <CustomTradingViewWidget
                              symbol={singleRecordLive.baseToken.symbol}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={2}>
                <div>
                  {/* Panel headers */}
                  <div className="flex justify-content-between">
                    <div class="flex gap-2 items-start md:items-center">
                      <img
                        alt="token"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        // src={singleRecordData?.logo}
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
                          $
                          {/* {formatNumberAbbreviation(singleRecordLive?.priceUsd)} */}
                          {parseFloat(singleRecordLive?.priceUsd)?.toFixed(8)}
                          {}
                        </h1>

                        <div className="flex justify-content-end">
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
                          {formatNumberAbbreviation(
                            singleRecordLive?.volume?.h24,
                            1
                          )}
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

                  <div class="mt-5 grid grid-cols-4 md:grid-cols-3 gap-4 max-md:hidden ">
                    {/* Volumne Section start */}

                    {/* <div class="col-span-4 md:col-span-1 md:aspect-square">
                      <div class="flex flex-col gap-6 p-3 border border-zinc-900 bg-[#0C0C0C]">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-4">
                            <h1 class="text-[16px] text-neutral-100 transition-all ease-in duration-100 cursor-pointer">
                              Volume
                            </h1>
                            <h1 class="text-[16px] text-neutral-600 transition-all ease-in duration-100 cursor-pointer">
                              Holders
                            </h1>
                          </div>
                          <div class="relative z-20">
                            <div className="flex items-center gap-6">
                              <div className="relative max-md:w-1/2 ">
                                <Select
                                  defaultValue="1h"
                                  style={{
                                    width: 80,
                                    backgroundColor: "black",
                                  }}
                                  onChange={handleIntervalChange}
                                >
                                  <Option value="1m">1m</Option>
                                  <Option value="15m">15m</Option>
                                  <Option value="1h">1h</Option>
                                  <Option value="2h">2h</Option>
                                  <Option value="4h">4h</Option>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <VolumeChart data={volumeData} />
                        </div>
                      </div>
                    </div> */}

                    {/* Volumne Section end */}
                    <div class="col-span-4 md:col-span-2">
                      <div class="flex flex-col p-3 border border-zinc-900 max-md:mb-3 max-md:min-h-[400px] bg-[#0C0C0C] md:h-[386px]">
                        <div class="relative z-20">
                          <div className="flex items-center gap-6">
                            <div className="d-flex relative max-md:w-1/2 ">
                              <Select
                                defaultValue="Top Holders"
                                style={{
                                  width: 150,
                                  backgroundColor: "black",
                                }}
                                onChange={handleSwitchHolders}
                              >
                                <Option value="top-holder">Top Holders</Option>
                                <Option value="order-book">Order Book</Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                        {showTopHolders && (
                          <div class="flex flex-col gap-4 max-md:pb-4 max-md:gap-6 md:flex-row md:overflow-hidden">
                            <div class="flex flex-col w-full mb-6 md:w-[50%]">
                              <div class="w-full h-[320px] translate-y-10">
                                <TopHoldersBarChart
                                  holdersData={singleWalletsData}
                                />
                              </div>
                            </div>
                            {/* Main wallets wrapper */}
                            <div
                              style={{ width: "100%" }}
                              className="flex flex-col max-md:mb-3   "
                            >
                              <div className="bg-zinc-900 p-2">
                                <div className="flex bg-zinc-800 p-2 gap-2 w-full mb-3">
                                  <img
                                    alt="token"
                                    loading="lazy"
                                    width="28"
                                    height="28"
                                    decoding="async"
                                    data-nimg="1"
                                    src="https://app.aiaegis.org/icons/search.svg"
                                    id="style-HgOj5"
                                    className="style-HgOj5"
                                  />
                                  <input
                                    autoComplete="off"
                                    placeholder="Search wallets"
                                    className="w-[80%] max-md:hidden text-[14px] text-white placeholder:text-neutral-600 border-none outline-none bg-transparent"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex flex-row text-xs font-medium uppercase bg-[#0B0B0B] border-b border-zinc-500 mb-3 ">
                                  <div
                                    style={{ justifyContent: "end" }}
                                    className="flex p-2 w-[50%]"
                                  >
                                    Wallets
                                  </div>
                                  <div
                                    style={{ justifyContent: "end" }}
                                    className="flex p-2 w-[50%]"
                                  >
                                    Amount
                                  </div>
                                </div>
                                <div className="w-full overflow-x-auto">
                                  <div
                                    style={{
                                      maxHeight: "300px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <table className="w-full text-white">
                                      <tbody>
                                        {filteredData?.map((wallet, index) => (
                                          <tr
                                            key={index}
                                            className="items-center text-xs bg-transparent"
                                          >
                                            <td className="p-2 text-zinc-500 font-semibold">
                                              #{index + 1}
                                            </td>
                                            <td
                                              style={{ alignItems: "start" }}
                                              className="text-blue-300 font-bold"
                                            >
                                              <a
                                                target="_blank"
                                                href={`https://etherscan.io/address/${wallet.address}`}
                                              >
                                                {wallet?.addressLabel?.label ||
                                                  wallet.address.substring(
                                                    0,
                                                    5
                                                  )}
                                                ...{wallet.address.slice(-4)}
                                              </a>
                                            </td>
                                            <td>
                                              {formatNumberAbbreviation(
                                                wallet.balance
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {showOrderBook && (
                          <div class="pt-3 flex flex-col gap-4 max-md:pb-4 max-md:gap-6 md:flex-row md:overflow-hidden">
                            <OrderBookChart />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CustomTabPanel>
            </Box>
          </div>
        </>
      )}
      {/* <div style={{ height: "1200px" }}></div> */}
    </>
  );
};

export default Analytics;
