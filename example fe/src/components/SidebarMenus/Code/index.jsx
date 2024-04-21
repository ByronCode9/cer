import React, { useState } from "react";
import { Button, Spin, message } from "antd"; // Import Spin and message components from Ant Design

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-nord_dark.js";
import "./style.css";

import {
  getCodeAuditData,
  getCodeAuditDataByCode,
} from "../../../services/api";

// Remove the script import

const CodePage = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [contractCodePayload, setContractCodePayload] = useState("");
  const [auditFindings, setAuditFindings] = useState("");
  const [loading, setLoading] = useState(false); // State for loader
  const [error, setError] = useState(null); // State for error
  const [activeComponent, setActiveComponent] = useState("editor");
  const [codeinEditor, setCodeInAudit] = useState();

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleGetCode = async () => {
    setLoading(true); // Set loading to true when submitting form
    setContractCodePayload("");
    setAuditFindings(""); // Clear previous findings

    try {
      let response;
      response = await getCodeAuditData(contractAddress);
      setContractCodePayload(response?.data);
      setLoading(false); // Set loading to true when submitting form
    } catch (error) {
      setError(error.message);
      message.error("Error fetching data"); // Show error message using Ant Design message component
    } finally {
      setLoading(false); // Set loading back to false whether successful or not
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contractCodePayload) {
      setLoading(true); // Set loading to true when submitting form
      setAuditFindings(""); // Clear previous findings
      try {
        let response;
        response = await getCodeAuditDataByCode({
          codeContent: contractCodePayload,
        });
        setAuditFindings(response.data);
      } catch (error) {
        setError(error.message);
        message.error("Error fetching data"); // Show error message using Ant Design message component
      } finally {
        setLoading(false); // Set loading back to false whether successful or not
      }
    }
  };

  return (
    <>
      <div>
        <div class="items-center justify-content-between w-full space-y-8 text-center flex-cols md:flex md:justify-between snipcss-Excn8">
          <div class="space-y-3 text-start">
            <h1 class="text-2xl text-white text-semibold">Code Audit</h1>
            <h1 class="text-md text-neutral-300">
              Paste token contract code below to audit code.
            </h1>
          </div>
        </div>

        {/* Get Contact code by address */}
        <div className="audit-contract d-flex justify-content-between mt-5 w-1/2">
          <div className="d-flex forsmall-screen">
            <div
              className="txt-audit-contract"
              style={{ alignSelf: "center", width: "40%" }}
            >
              <h1
                style={{
                  textAlign: "start",
                  alignSelf: "center",
                  width: "100%",
                }}
                className="font-bold text-md mr-5"
              >
                Enter Contract Address to Analyze:
              </h1>
            </div>
            <div
              style={{ width: "inherit", marginRight: "20px" }}
              className="input-audit-contract mt-2"
            >
              <input
                placeholder="  Enter contract address"
                type="text"
                style={{
                  placeholderColor: "white",
                  fontSize: "14px",
                  color: "white",
                  backgroundColor: "rgb(24 24 27/var(--tw-bg-opacity)",
                  borderColor: "rgb(39 39 42/var(--tw-border-opacity)",
                  padding: "10px 12px",
                  outline: "none",
                  borderRadius: "4px",
                  width: "100%",
                  maxWidth: "340px",
                }}
                value={contractAddress}
                onChange={(event) => {
                  setContractAddress(event.target.value);
                }}
              />
            </div>
            <div>
              <button
                onClick={handleGetCode}
                class="forsmall-scrn-btn inline-flex items-center justify-center rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10  bg-[#0E76FD] [text-white text-sm md:px-28  md:space-y-4 gap-2 style-G4ptC"
                type="button"
                id="style-G4ptC"
                style={{
                  width: "10.5vw",
                  textAlign: "center",
                  backgroundColor: "#27272A",
                }}
              >
                <div
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:R16uuuunf6hla:"
                  data-state="closed"
                  className=""
                >
                  <span
                    style={{ fontWeight: "bold" }}
                    // class="w-100 d-flex text-[16px] w-100 font-[500] text-zinc-50"
                  >
                    Get code
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              class="audit-btn-css inline-flex items-center justify-center rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10  bg-[#0E76FD] [text-white text-sm md:px-28  md:space-y-4 gap-2 style-G4ptC"
              type="button"
              id="style-G4ptC"
              style={{ width: "23.5vw" }}
            >
              <div
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:R16uuuunf6hla:"
                data-state="closed"
                className=""
              >
                <p
                  style={{ fontWeight: "bold" }}
                  class="text-[16px] font-[500] text-zinc-50"
                >
                  Audit your code
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="desktop-screen-txt d-flex mt-5">
          <div style={{ width: "70%" }}>
            <h1 style={{ textAlign: "start" }} class="font-bold text-md">
              Contract code
            </h1>
          </div>
          <div style={{ width: "30%" }}>
            <div class="text-sm text-white snipcss-xrEdE">
              <h1 class="font-bold text-md">
                Findings
                <span class=" animate-pulse">🟢</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* mob screen editor */}
      <div className="mt-3 d-flex mob-screen-txt justify-content-center">
        <div>
          <button
            className={`p-3 ${activeComponent === "editor" ? "active" : ""}`}
            onClick={() => handleButtonClick("editor")}
          >
            Contract
          </button>
        </div>
        <div>
          <button
            className={`p-3 ${activeComponent === "findings" ? "active" : ""}`}
            onClick={() => handleButtonClick("findings")}
          >
            Findings
          </button>
        </div>
      </div>

      <div className="d-flex mob-screen-txt">
        <div>
          <div>
            <div
              style={{ width: "100%" }}
              className="d-flex w-full justify-content-between "
            >
              {activeComponent === "editor" && (
                <div className="">
                  <div className="mt-3">
                    <AceEditor
                      mode="javascript"
                      theme="nord_dark"
                      name="my-editor"
                      editorProps={{ $blockScrolling: true }}
                      className="ace_editor"
                      value={contractCodePayload}
                      onChange={(newValue) => {
                        setContractCodePayload(newValue);
                      }}
                    />
                  </div>
                </div>
              )}
              {activeComponent === "findings" && (
                <div className="mt-3">
                  <div
                    style={{
                      width: "23.5vw",
                      height: "500px",
                      padding: "20px",
                      border: "2px solid #ccc",
                      borderRadius: "10px",
                    }}
                    class="findings-class-mob flex flex-col items-center justify-center bg-zinc-800"
                  >
                    {/* Render loader if loading */}
                    {loading ? (
                      <Spin size="large" />
                    ) : (
                      <div
                        style={{
                          overflowY: "auto",
                          height: "100%",
                          padding: "10px",
                          textAlign: "center",
                        }}
                      >
                        {auditFindings && auditFindings.trim() !== "" ? null : (
                          <img
                            alt="No findings"
                            loading="lazy"
                            width="120"
                            height="120"
                            decoding="async"
                            data-nimg="1"
                            style={{ color: "transparent" }}
                            src="https://app.aiaegis.org/icons/findings-empty.svg"
                          />
                        )}
                        <h1
                          class="text-sm text-white"
                          style={{
                            overflowY: "auto",
                            whiteSpace: "pre-wrap",
                            marginTop: "10px",
                          }}
                        >
                          {auditFindings
                            ? auditFindings
                            : "No findings available"}
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view editor */}
      <div
        style={{ width: "100%" }}
        className="show-in-desktop d-flex w-full justify-content-between "
      >
        <div className="">
          <div className="mt-3">
            <AceEditor
              mode="javascript"
              theme="nord_dark"
              name="my-editor"
              editorProps={{ $blockScrolling: true }}
              className="ace_editor"
              value={contractCodePayload}
              onChange={(newValue) => {
                setContractCodePayload(newValue);
              }}
            />
          </div>
        </div>

        <div className="mt-3">
          <div
            style={{
              width: "23.5vw",
              height: "500px",
              padding: "20px",
              border: "2px solid #ccc",
              borderRadius: "10px",
            }}
            class="findings-class flex flex-col items-center justify-center bg-zinc-800"
          >
            {/* Render loader if loading */}
            {loading ? (
              <Spin size="large" />
            ) : (
              <div
                style={{
                  overflowY: "auto",
                  height: "100%",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {auditFindings && auditFindings.trim() !== "" ? null : (
                  <img
                    alt="No findings"
                    loading="lazy"
                    width="120"
                    height="120"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: "transparent" }}
                    src="https://app.aiaegis.org/icons/findings-empty.svg"
                  />
                )}
                <h1
                  class="text-sm text-white"
                  style={{
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                    marginTop: "10px",
                  }}
                >
                  {auditFindings ? auditFindings : "No findings available"}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodePage;
