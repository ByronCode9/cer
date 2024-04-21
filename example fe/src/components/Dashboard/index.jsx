import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./style.css";

import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../Header";
import Trending from "../SidebarMenus/Trending";
import CodePage from "../SidebarMenus/Code";
import TokenPage from "../SidebarMenus/Token";
import DashboardIcon from "../../assets/dashboard.svg";
import AnalyticsIcon from "../../assets/analytics.svg";
import CodeIcon from "../../assets/code.svg";
import TokenIcon from "../../assets/token.svg";
import ReportsIcon from "../../assets/reports.svg";
import WatchIcon from "../../assets/watchdog.svg";
import AttacksIcon from "../../assets/attacks.svg";
import BountyIcon from "../../assets/bounty.svg";
import Reports from "../SidebarMenus/Reports";
import { useAuth } from "../../services/authService";
import Analytics from "../SidebarMenus/Analytics/Analytics";
import { getGasData } from "../../services/api";
import MobileMenus from "../SidebarMenus/MobileMenus";  
import { useMobileMenus } from "../../context/MobileMenuContext";


const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <img src={DashboardIcon} />),
  getItem("Analytics", "2", <img src={AnalyticsIcon} />),
  getItem("Code", "3-1", <img src={CodeIcon} />),
  getItem("Token", "3-2", <img src={TokenIcon} />),
  // getItem("Reports", "3-3", <img src={ReportsIcon} />),

  // getItem("Watch", "4", <img src={WatchIcon} />),
  // getItem("Attacks", "4-1", <img src={AttacksIcon} />),
  // getItem("Bounty", "4-2", <img src={BountyIcon} />),

  getItem("Logout", "5"),
];

const Dashboard = () => {
  const { isMobileMenusOpen } = useMobileMenus();

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gasData, setGasData] = useState({});
  const [fetchedData, setFetchedData] = useState(false);

  const getDataAPI = async () => {
    // Await the result of getWalletsData
    setFetchedData(true);
    try {
      if (!fetchedData) {
        const gasResponse = await getGasData();
        if (gasResponse?.data.status === "1") {
          setGasData(gasResponse?.data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  useEffect(() => {
    // Set "1" as the default selected item when the component mounts
    setSelectedItem("1");
  }, []);

  const handleMenuClick = (item) => {
    if (item.key === "5") {
      logout();
    } else {
      setSelectedItem(item.key);
    }
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{
          background: "black",
          borderRight: "1px solid grey",
          textAlign: "-webkit-center",
          position: "fixed",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <div className="demo-logo-vertical" style={{ fontSize: "3rem" }}>
          Logo
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedItem]}
          defaultOpenKeys={["3", "4"]}
          mode="inline"
          onClick={handleMenuClick}
          style={{
            background: "black",
            color: "white",
            borderRight: "none",
            width: "65%",
            height: "auto",
            gap: "10",
          }}
          className="mt-5 "
        >
          {items?.map((item) =>
            item.children ? (
              <Menu.SubMenu
                style={{ backgroundColor: "black" }}
                theme="dark"
                key={item.key}
                icon={item.icon}
                title={item.label}
              >
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                style={{ backgroundColor: "black" }}
                className="menu-class"
                key={item.key}
                icon={item.icon}
              >
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout theme="dark" style={{ backgroundColor: "black" }}>
        <AppHeader gasData={gasData} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            style={{
              minHeight: 360,
              background: "black",
              borderRadius: borderRadiusLG,
              color: "white",
            }}
          >
            {/* Show content based on the selected item */}
            {selectedItem === "1" && (
              <div>
                <Trending />
              </div>
            )}
            {selectedItem === "2" && (
              <div>
                <Analytics />
              </div>
            )}
            {selectedItem === "3-1" && (
              <div>
                <CodePage />
              </div>
            )}
            {selectedItem === "3-2" && (
              <div>
                <TokenPage />
              </div>
            )}

            {isMobileMenusOpen && (
              <div className="w-[100vw] flex flex-col justify-between h-full p-8 snipcss-dfmio">
                <MobileMenus />
              </div>
            )}
            {/* {selectedItem === "3-3" && (
              <div>
                <Reports />
              </div>
            )}
            {selectedItem === "4-1" && <div>Attacks Content</div>}
            {selectedItem === "4-2" && <div>Bounty Content</div>} */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
