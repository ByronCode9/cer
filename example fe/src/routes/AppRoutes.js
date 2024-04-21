import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import DashboardPage from "../components/Dashboard/DashboardPage";
import { AuthProvider } from "../services/authService";
import AuthGuard from "../services/authGuard";
import DashboardIcon from "../assets/dashboard.svg";
import AnalyticsIcon from "../assets/analytics.svg";
import CodeIcon from "../assets/code.svg";
import TokenIcon from "../assets/token.svg";
import ReportsIcon from "../assets/reports.svg";
import WatchIcon from "../assets/watchdog.svg";
import AttacksIcon from "../assets/attacks.svg";
import BountyIcon from "../assets/bounty.svg";
import AnalyticsPage from '../components/SidebarMenus/Analytics/AnalyticsPage';
import CodePageMain from "../components/SidebarMenus/Code/CodePage";
import TokenPageMain from "../components/SidebarMenus/Token/TokenPage";
import ReportsPageMain from "../components/SidebarMenus/Reports/ReportsPage";
import WatchPageMain from "../components/SidebarMenus/Watch/WatchPage";
import AttackPageMain from "../components/SidebarMenus/Attack/AttackPage";
import BountyPageMain from "../components/SidebarMenus/Bounty/BountyPage";
import UserProfile from "../components/Profile";
import VolumesChart from "../components/SidebarMenus/Analytics/Charts/Volumes";


// import AnalyticsPage from '../components/SidebarMenus/Analytics/AnalyticsPage';


export const navItems = [
  { name: "Dashboard", image: <img src={DashboardIcon} />, url: "/dashboard" },
  { name: "Analytics", image: <img src={AnalyticsIcon} />, url: "/analytics" },
  { name: "Code", image: <img src={CodeIcon} />, url: "/audit-code" },
  { name: "Token", image: <img src={TokenIcon} />, url: "/audit-token" },
  { name: "Reports", image: <img src={ReportsIcon} />, url: "/reports" },
  { name: "Watch", image: <img src={WatchIcon} />, url: "/watch" },
  { name: "Attacks", image: <img src={AttacksIcon} />, url: "/attacks" },
  { name: "Bounty", image: <img src={BountyIcon} />, url: "/bounty" },
  { name: "Logout", url: "/logout" }
];
const AppRoutes = () => {




  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<AuthGuard><DashboardPage /></AuthGuard>} />
          <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
          <Route path="/analytics" element={<AuthGuard><AnalyticsPage /></AuthGuard>} />
          <Route path="/audit-code" element={<AuthGuard><CodePageMain /></AuthGuard>} />
          <Route path="/audit-token" element={<AuthGuard><TokenPageMain /></AuthGuard>} />
          {/* <Route path="/reports" element={<AuthGuard><ReportsPageMain /></AuthGuard>} />
          <Route path="/watch" element={<AuthGuard><WatchPageMain /></AuthGuard>} />
          <Route path="/attacks" element={<AuthGuard><AttackPageMain /></AuthGuard>} />
          <Route path="/bounty" element={<AuthGuard><BountyPageMain /></AuthGuard>} /> */}
          <Route path="/profile" element={<AuthGuard><UserProfile /></AuthGuard>} />


        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
