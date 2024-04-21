import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getStatusRequest,
  getTokenAuditMeta,
  getTokenQuickAuditData,
} from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd"; // Import Spin from antd
import { Card } from "antd";
import AuditCodeQuick from "./AuditCodeQuick";
import TokenDefaultPic from "../../../assets/token-default.svg"

const TokenPage = () => {
  const navigate = useNavigate();

  const [tokenData, setTokenData] = useState({});
  const [initialPage, setInitialPage] = useState(true);
  const [codeAudited, setCodeAudited] = useState(false);
  const [quickAudit, setQuickAudit] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [submitting, setSubmitting] = useState(false); // State variable to track submission status

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true); // Start submitting, set the submitting state to true

    try {
      const metaToken = await getTokenAuditMeta(contractAddress);
      if (metaToken.data) {
        setTokenData(metaToken.data);
        setInitialPage(false);
        setCodeAudited(true);
        setQuickAudit(false);
        console.log(metaToken, "DDATTATDA"); // You can safely access metaToken here
      }
    }
    catch (error) {
      console.error("Token Auditor error:", error.message);
    } finally {
      setSubmitting(false); // Submission finished, set the submitting state to false
    }
  };

  const handleInputChange = (event) => {
    setContractAddress(event.target.value);
  };

  const handleCancelSubmitted = () => {
    setInitialPage(true);
    setCodeAudited(false);
  };

  const handleQuickSubmit = () => {
    setInitialPage(false);
    setCodeAudited(false);
    setQuickAudit(true);
  };

  return (
    <div>
      <Spin spinning={submitting}>
        {" "}
        {/* Render the Spin component when submitting */}
        {initialPage && !codeAudited && !quickAudit && (
          <div
            style={{ height: "80vh" }}
            className="token-wrapper bg-[url(/backgrounds/audit-token.png)] h-[calc(100vh-80px)] bg-cover pt-[80px] w-full flex flex-col items-center justify-center max-md:px-4 snipcss-tMq9C"
          >
            <div className="flex wrapper flex-col items-center justify-center gap-12 w-[400px] -translate-y-12 snipcss-2jiQq">
              <h1 className="text-neutral-200 text-[24px] font-[600]">
                Token Auditor
              </h1>
              <form
                className="flex flex-col items-center justify-center gap-6"
                onSubmit={handleSubmit}
              >
                <input
                  placeholder="  Enter contract address"
                  type="text"
                  className="input-class text-[14px] text-white placeholder:text-neutral-600 border-none outline-none bg-zinc-900 border border-zinc-800 py-2 pl-2 pr-4 gap-2 w-[340px] md:w-[400px]"
                  value={contractAddress}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="submit-class bg-[#121F31] text-zinc-400 text-[14px] font-[300] px-12 py-[6px] w-[340px] md:w-[400px] transition-all ease-in duration-150"
                >
                  Submit
                </button>
                <p className="text-neutral-500 text-[12px] text-center max-md:w-[90%]">
                  Submit token contract address to get a detailed analysis of
                  the token, before making your trade decision.
                </p>
              </form>
            </div>
          </div>
        )}
        {codeAudited && !initialPage && !quickAudit && (
          <div>
            <div className="mt-5">
              <div className="bg-url-backgrounds-audit-token-option.png max-md-min-h-screen md-h-calc100vh-80px bg-cover max-md-pt-80px max-md-px-4 pt-30px w-full d-flex flex-column gap-8 md-gap-72px items-center justify-center snipcss-IxKe2">
                <button
                  style={{ padding: "20px", cursor: "pointer" }}
                  onClick={handleCancelSubmitted}
                  className="canncel-btn-audit-mob text-zinc-50 text-16px bg-zinc-900 font-500 py-2 max-md-px-3   text-center"
                >
                  Cancel
                </button>
                <div className="d-flex max-md-justify-end md-items-center gap-4 max-md-w-full">
                  <h1 className="text-blue-400 text-20px font-500 px-4 py-2 max-md-hidden text-wrap">
                    {tokenData?.baseToken?.address}
                  </h1>

                  <button
                    style={{ padding: "20px", cursor: "pointer" }}
                    onClick={handleCancelSubmitted}
                    className="canncel-btn-audit text-zinc-50 text-16px bg-zinc-900 font-500 py-2 max-md-px-3   text-center"
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex flex-column items-center gap-3 md-gap-12">
                  <div className="d-flex items-center gap-4">
                    <img
                      alt="token-icon"
                      loading="lazy"
                      width="40"
                      height="40"
                      decoding="async"
                      src={TokenDefaultPic}
                      className="style-Afo18"
                      id="style-Afo18"
                    />
                    <h1
                      style={{ fontWeight: "bold", fontSize: "34px" }}
                      className=""
                    >
                      {tokenData?.baseToken?.name}
                    </h1>
                    <p style={{ fontSize: "25px" }}>{tokenData?.baseToken?.symbol}</p>
                  </div>
                  <div
                    style={{ borderRadius: "10px" }}
                    className="mt-4 d-flex flex-column items-center max-md-flex-col "
                  >
                    <div
                      style={{
                        minHeight: "380px",
                        background:
                          "linear-gradient(to bottom, #555555, #000000)",
                        color: "#ffffff",
                        border: "1px grey solid",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div className="d-flex flex-column justify-center align-items-center ">
                        <button className="mt-5 bg-0E76FD text-zinc-50 text-18px font-400  h-40px w-fit d-flex items-center justify-center text-center transition-all ease-in duration-200">
                          <button
                            onClick={handleQuickSubmit}
                            style={{ backgroundColor: "#0E76FD" }}
                            className="p-2 d-flex flex-row items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 w-5 h-5"
                            >
                              <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <p className="text-16px font-500 text-zinc-50">
                              Quick Audit
                            </p>
                          </button>
                        </button>
                      </div>
                      <div style={{ marginTop: "auto", alignSelf: "center" }}>
                        <img
                          alt="detailed-audit"
                          src="https://app.aiaegis.org/_next/image?url=%2Fbackgrounds%2Faudit-quick.png&amp;w=640&amp;q=75"
                          style={{ width: "100%", maxHeight: "200px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {quickAudit && !codeAudited && !initialPage && (
          <div>
            <AuditCodeQuick tokenData={tokenData} />
          </div>
        )}
      </Spin>
    </div>
  );
};

export default TokenPage;
