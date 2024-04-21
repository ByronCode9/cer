import React, { useEffect, useState } from "react";
import { Select, Table } from "antd";
import "./style.css";
import { getTokenList } from "../../../services/api";
import { Tooltip, message } from "antd";

import { Spin } from "antd";

import { ChartCOmp } from "./DynamicLineChart";
import { Link } from "react-router-dom";
import TicketTape from "./TicketTape";
import TrendingPageChart from "../Analytics/Charts/TrendingPageChart";
import ClipboardJS from "clipboard";

import TokenDefaultPic from "../../../assets/token-default.svg";


const Trending = () => {
  const [tokenData, setTokenData] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading status
  const [interval, setInterval] = useState(1); // State to track loading status
  const [isFetching, setIsFetching] = useState(1); // Flag to track if API call is in progress



  const { Option } = Select;
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

  const columns = [
    {
      title: "NAME",
      dataIndex: "mainToken.name",
      width: "80px",
      key: "mainToken.name",
      render: (text, record) => (
        <span style={{ width: "10px" }}>
          <Link
            to={{
              pathname: `/analytics`,
              // search: `?address=${record.address}`,
              search: `?address=${record.mainToken.address}`,
              state: { tokenData: record },
            }}
            className="text-neutral-100 break-words  text-left"
          // style={{ width: "30px" }}
          >
            <span>{record.mainToken.name}</span>
          </Link>
        </span>
      ),
    },
    {
      title: "TOKEN",
      dataIndex: "mainToken.address",
      key: "token",
      className: "text-neutral-200 col-span-3 ",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={TokenDefaultPic
            }
            alt={text}
            style={{ width: "30px", marginRight: "10px", borderRadius: "50px" }}
          />
          <div>
            <p>{record.mainToken.symbol}</p>
            <Tooltip
              title="Click to copy address"
              placement="bottom"
              overlayStyle={{ maxWidth: "200px" }} // Set max width for the tooltip
            >
              <span
                className="text-sm text-blue-400"
                onClick={() => {
                  navigator.clipboard.writeText(
                    record.mainToken.address
                  );
                  message.success("Address copied to clipboard");
                }}
                style={{ cursor: "pointer" }}
              >
                {record.mainToken.address.substring(0, 6)}...{record.mainToken.address.slice(-6)}
              </span>
            </Tooltip>
          </div>
        </div>
      ),
    },

    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      className: "text-neutral-300",
      width: "100px", // Adjust the width as needed
      render: (text) => <span style={{ display: 'inline-block', width: '100%' }}>${parseFloat(text).toFixed(4)}</span>,
    },

    // {
    //   title: "CHART",
    //   dataIndex: "chart",
    //   key: "chart",
    //   render: (text, record) => (
    //     <ChartCOmp chartDataFromParent={record?.sparkline_in_7d} />
    //   ),
    //   className: "text-neutral-200  z-[0] relative",
    // },
    {
      title: "Market Cap",
      dataIndex: "infoData.mcap",
      key: "mcap",
      className: "text-neutral-200 ",
      render: (text, record) => (
        <span>
          {parseFloat(record?.infoData?.mcap).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },

    {
      title: "Liquidity",
      dataIndex: "liveContractData.liquidity.usd",
      key: "liveContractData.liquidity.usd",
      className: "text-neutral-200 ",
      render: (text, record) => (
        <span>
          {parseFloat(record?.liveContractData?.liquidity?.usd).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },

    // {
    //   title: "LIQUIDITY",
    //   dataIndex: "liquidity",
    //   key: "liquidity",
    //   className: "text-neutral-200 col-span-1",
    //   render: (text, record, index) => {
    //     const firstRecordVolume = record.volume; // Assuming volume is a property in your data
    //     const firstRecordLiquidity = record.liquidity; // Assuming volume is a property in your data

    //     // Custom function to format numbers with commas
    //     const formatNumberWithCommas = (number) => {
    //       return parseFloat(number).toLocaleString(undefined, {
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //       });
    //     };

    //     // Format firstRecordVolume and firstRecordLiquidity
    //     const formattedVolume = formatNumberWithCommas(firstRecordVolume);
    //     const formattedLiquidity = formatNumberWithCommas(firstRecordLiquidity);

    //     return (
    //       <>
    //         <span>{formattedVolume}</span>
    //         <br></br>
    //         <span className="font-clr">{formattedLiquidity}</span>
    //       </>
    //     );
    //   },
    // },

    {
      title: "Volume",
      dataIndex: "total_volume",
      key: "total_volume",
      className: "text-red-500",
      render: (text, record) => {
        const value = parseFloat(record?.liveContractData?.volume?.[`h${interval}`]);
        const formattedValue = value.toFixed(2);
        const textColor = "white";
        return <span style={{ color: textColor }}>{formattedValue}</span>;
      },
    },
    {
      title: "Price Change",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      className: "text-red-500",
      render: (text, record) => {
        const value = parseFloat(record?.liveContractData?.priceChange?.[`h${interval}`]);
        const formattedValue = value.toFixed(2);
        const textColor = value < 0 ? "red" : "green";
        return (
          <span style={{ color: textColor }}>
            {formattedValue}
          </span>
        );
      },
    },
  ];

  const handleIntervalChange = (value) => {
    setInterval(value);
  };

  const fetchData = async (interval) => {
    setIsFetching(0);
    if (isFetching) return;
    try {
      const response = await getTokenList();
      setTokenData(response.data.ethereumTokens);
      console.log(response.data, "tokendatda");
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      setLoading(false);
      console.error("Error fetching token data:", error);
      // Handle error here
    }
  };

  useEffect(() => {
    fetchData(interval);
  }, [isFetching]);



  // useEffect(() => {
  //   const clipboard = new ClipboardJS(".copy-button");

  //   clipboard.on("success", (e) => {
  //     message.success("Address copied to clipboard");
  //     e.clearSelection();
  //   });

  //   return () => {
  //     clipboard.destroy();
  //   };
  // }, []);

  return (
    <>
      <div className="trending-container">
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <TicketTape />
            </div>
            <div class="relative flex max-md:flex-col max-md:gap-4 md:items-center justify-between mt-10 md:mb-4 snipcss-oXK4J">
              <div class="text-white">
                <div class="relative min-w-[120px]">
                  <button class="flex items-center gap-2">
                    <p class="text-neutral-200 text-[20px]">Trending</p>
                    <p class="w-[12px] h-[12px] rounded-full bg-green-400 animate-pulse"></p>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative max-md:w-1/2 ">
                  <Select
                    defaultValue="1h"
                    style={{ width: 80, backgroundColor: "black" }}
                    onChange={handleIntervalChange}
                  >
                    <Option value={1}>1h</Option>
                    <Option value={6}>6h</Option>
                    <Option value={24}>24h</Option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="table-container mt-3">
              <Table
                columns={columns}
                dataSource={tokenData}
                pagination={false}
                className="custom-table"
                scroll={{ x: true }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Trending;
