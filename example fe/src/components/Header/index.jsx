import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Space, Modal } from "antd";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../../routes/AppRoutes";
import { CloseOutlined } from "@ant-design/icons";
import { useMobileMenus } from "../../context/MobileMenuContext";
import MobileMenus from "../SidebarMenus/MobileMenus";

const AppHeader = ({ gasData }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [matchedItems, setMatchedItems] = useState(navItems);
  const [showMenus, setShowMenus] = useState(false);

  const { toggleMobileMenus } = useMobileMenus();

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchQuery(searchQuery);

    // Filter items matching the search query
    const filteredItems = navItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    setMatchedItems(filteredItems);
  };

  const handleOptionClick = (url) => {
    navigate(url);
    setModalVisible(false);
    setSearchQuery("");
  };

  const handleSetModalFalse = () => {
    setModalVisible(false);
    setSearchQuery("");
    setMatchedItems(navItems);
  };

  const items = [
    { type: "divider" },
    {
      label: "Profile",
      key: "0",
    },
    {
      label: "History",
      key: "1",
    },
    {
      label: "Payments",
      key: "3",
    },
  ];

  const handleMenuClick = ({ key }) => {
    // Implement routing logic based on the key
    if (key === "0") {
      // Route to the profile component
      navigate("/profile");
    }
  };

  const handleToolsClick = () => {
    setShowMenus(!showMenus);
  };
  return (
    <>
      <header className="flex py-3 px-4 md:px-10 items-center justify-between border-b border-zinc-800 snipcss-Mahm1">
        <div className="flex items-center gap-3">
          <Link to="/">
            <button className="">
              <img
                alt="logo"
                loading="lazy"
                width="40"
                height="40"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="https://app.aiaegis.org/_next/image?url=%2Flogo.png&amp;w=96&amp;q=75"
              />
            </button>
          </Link>
          {/* search bar sm */}
          <div className="search-sm flex bg-zinc-900 border border-zinc-800 py-2 max-md:px-2 md:pl-2 md:pr-4 gap-2 md:min-w-[400px]">
            <img
              alt="token"
              loading="lazy"
              width="28"
              height="28"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src="https://app.aiaegis.org/icons/search.svg"
              onClick={() => setModalVisible(true)}
            />
          </div>

          {/* search bar lg */}
          <div className="search-lg flex bg-zinc-900 border border-zinc-800 py-2 max-md:px-2 md:pl-2 md:pr-4 gap-2 md:min-w-[400px] w-fit">
            <img
              alt="token"
              loading="lazy"
              width="28"
              height="28"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src="https://app.aiaegis.org/icons/search.svg"
            />
            <input
              type="text"
              autoComplete="off"
              placeholder="Search or type a command"
              className="w-[80%] max-md:hidden text-[14px] text-white placeholder:text-neutral-600 border-none outline-none bg-transparent"
              onClick={() => setModalVisible(true)}
            />
            <div className="flex gap-1 px-2 max-md:hidden py-1 bg-black rounded-md">
              <p className="text-white">⌘</p>
              <p className="text-white">K</p>
            </div>
          </div>

          {/* gas box */}
          <div className="flex items-center gap-2">
            <img
              alt="fuel-icon"
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src="https://app.aiaegis.org/icons/fuel.svg"
            />
            <button data-state="closed">
              <p className="text-orange-400 text-[16px] leading-[24px] font-[400]">
                {gasData?.result?.SafeGasPrice}
              </p>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bell-btn  bell-sm relative bg-zinc-800 rounded-[4px] flex items-center">
            <img
              alt="bell"
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src="https://app.aiaegis.org/icons/bell.svg"
            />
          </button>
          <button
            className="tools-btn d-lg-none bg-zinc-800 rounded-[4px] gap-2 flex items-center md:hidden"
            onClick={handleToolsClick}
          >
            {showMenus ? (
              <>
                <CloseOutlined />
                <p className="text-white text-[16px] font-normal">Close</p>
              </>
            ) : (
              <>
                <img
                  alt="user"
                  loading="lazy"
                  width="24"
                  height="24"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://app.aiaegis.org/icons/nav/burger.svg"
                />
                <p className="text-white text-[16px] font-normal">Tools</p>
              </>
            )}
          </button>

          <Dropdown
            overlay={
              <Menu onClick={handleMenuClick}>
                {items.map((item) => (
                  <Menu.Item key={item.key}>{item.label}</Menu.Item>
                ))}
              </Menu>
            }
            trigger={["click"]}
          >
            <span onClick={(e) => e.preventDefault()}>
              <Space>
                <button
                  className="bg-zinc-800 profile-btn  rounded-[4px] flex items-center max-md:hidden"
                  type="button"
                  id="radix-:Reff6hla:"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                  style={{ backgroundColor: "#27272A" }}
                >
                  <img
                    alt="user"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: "transparent" }}
                    src="https://app.aiaegis.org/_next/image?url=%2Ficons%2Fuser.png&amp;w=48&amp;q=75"
                  />
                </button>
              </Space>
            </span>
          </Dropdown>
        </div>
        <Modal
          visible={modalVisible}
          onCancel={handleSetModalFalse}
          footer={null}
          centered
          className="search-modal"
        >
          <div className="search-container">
            <img
              alt="token"
              loading="lazy"
              width="20"
              height="20"
              decoding="async"
              data-nimg="1"
              style={{ color: "transparent" }}
              src="https://app.aiaegis.org/icons/search.svg"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Type a command or search..."
              className="search-input"
            />
            <CloseOutlined onClick={handleSetModalFalse} />
          </div>
          <div className="divider"></div>
          <ul className="search-results">
            {matchedItems.length > 0 ? (
              matchedItems.map(
                (item) =>
                  item?.image && (
                    <li
                      key={item.key}
                      onClick={() => handleOptionClick(item.url)}
                      className="nav-item"
                    >
                      {item.image}
                      <span className="nav-item-name">{item.name}</span>
                    </li>
                  )
              )
            ) : (
              <li className="no-results">No results found</li>
            )}
          </ul>
        </Modal>
      </header>

      {showMenus && <MobileMenus />}
    </>
  );
};

export default AppHeader;
