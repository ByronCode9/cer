import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
// import "../Dashboard/style.css";
import "./style.css";

import { useNavigate } from "react-router-dom";
import AppHeader from "../Header";
import { useAuth } from "../../services/authService";
// import Analytics from "../SidebarMenus/Analytics/Analytics";
import { getGasData } from "../../services/api";
import { navItems } from "../../routes/AppRoutes";

const { Content, Sider } = Layout;

const AppWrapper = ({ Children, page }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gasData, setGasData] = useState({});
  const [fetchedData, setFetchedData] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Listen to window resize event
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getDataAPI = async () => {
    if (!fetchedData) {
      setFetchedData(true);
      try {
        const gasResponse = await getGasData();
        if (gasResponse?.data.status === "1") {
          setGasData(gasResponse?.data);
        }
      } catch (error) {
        console.error("Error fetching gas data:", error);
      }
    }
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  const handleMenuClick = (item) => {
    if (item.name === "Logout") {
      logout();
    } else {
      setSelectedItem(item.name);
      navigate(item.url);
    }
  };

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      className="layout-appwrapper"
      style={{ marginLeft: collapsed ? 80 : 250 }}
    >
      {!isSmallScreen && (
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={250}
          className="sidebar-appwrapper"
          style={{
            background: "black",
            borderRight: "1px solid grey",
            textAlign: "-webkit-center",
            position: "fixed",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 1,
            display: isSmallScreen ? "none" : "block", // Hide on small screens
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
            {navItems?.map((item) =>
              item.children ? (
                <Menu.SubMenu
                  style={{ backgroundColor: "black" }}
                  theme="dark"
                  key={item.name}
                  icon={item.image}
                  title={item.name}
                >
                  {item.children.map((subItem) => (
                    <Menu.Item key={subItem.name}>{subItem.name}</Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  style={{ backgroundColor: "black" }}
                  className="menu-class"
                  key={item.name}
                  icon={item.image}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.name}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
      )}
      <Layout theme="dark" style={{ backgroundColor: "black" }}>
        <AppHeader gasData={gasData} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            style={{
              padding: 10,
              minHeight: 360,
              background: "black",
              borderRadius: borderRadiusLG,
              color: "white",
            }}
          >
            <div>
              <Children />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppWrapper;
