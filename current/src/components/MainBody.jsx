import {Routes, Route} from "react-router-dom";
import Overview from "../pages/Overview/Overview";
import MarketExplorer from "../pages/MarketExplorer/MarketExplorer";
import WebsiteAuditor from "../pages/WebsiteAuditor/WebsiteAuditor";
import ContractAuditor from "../pages/BattleStation/ContractAuditor";
import CodeAuditor from "../pages/BattleStation/CodeAuditor";
import TokenAuditor from "../pages/BattleStation/TokenAuditor";
import Documentation from "../pages/Documentation/Documentation";
import Settings from "../pages/Settings/Settings";
import Support from "../pages/Support/Support";
import LogInPage from "../pages/LogIn/LogIn";
import RegisterPage from "../pages/Register/Register";

const MainBody = () => {
   return (
      <div className="min-h-[calc(100vh-70px)] bg-black text-white p-7 lg:p-10">
         <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/marketexplorer" element={<MarketExplorer />} />
            <Route path="/websiteauditor" element={<WebsiteAuditor />} />
            <Route path="/contractauditor" element={<ContractAuditor />} />
            <Route path="/codeauditor" element={<CodeAuditor />} />
            <Route path="/tokenauditor" element={<TokenAuditor />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/register" element={<RegisterPage />} />
         </Routes>
      </div>
   );
};

export default MainBody;
