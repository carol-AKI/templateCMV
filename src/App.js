import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar"; 
import Personal from "./scenes/personal";
import Verification from "./scenes/Verification"
import VehicleDetail from "./scenes/VehicleDetail"
import Fuel from "./scenes/Fuel"
import Insurance from "./scenes/insurance";
import TechnicalControl from "./scenes/TechnicalControl";
import Maintenance from "./scenes/Maintenance";
import Vehicles from "./scenes/vehicles";
import Login from "./scenes/login";
import AuthCheck from "./AuthCheck";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const [isSidebar, setIsSidebar] = useState(true);
  const isOnLoginPage = location.pathname === "/";
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    setIsSidebarVisible(!isOnLoginPage);
  }, [isOnLoginPage]);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {<Route path="/" element={<Login />} />}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<AuthCheck><Dashboard /></AuthCheck>} />
              <Route path="/team" element={<AuthCheck><Team /></AuthCheck>} />
              <Route path="/vehicles" element={<AuthCheck><Vehicles /></AuthCheck>} />
              <Route path="/invoices" element={<AuthCheck><Invoices /></AuthCheck>} />
              <Route path="/form" element={<AuthCheck><Form /></AuthCheck>} />
              <Route path="/bar" element={<AuthCheck><Bar /></AuthCheck>} />
              <Route path="/pie" element={<AuthCheck><Pie /></AuthCheck>} />
              <Route path="/line" element={<AuthCheck><Line /></AuthCheck>} />
              <Route path="/faq" element={<AuthCheck><FAQ /></AuthCheck>} />
              <Route path="/calendar" element={<AuthCheck><Calendar /></AuthCheck>} />
              <Route path="/geography" element={<AuthCheck><Geography /></AuthCheck>} />
              <Route path="/Personal" element={<AuthCheck><Personal/></AuthCheck>} />
              <Route path="/Verification" element={<AuthCheck><Verification/></AuthCheck>} />
              <Route path="/VehicleDetail" element={<AuthCheck><VehicleDetail/></AuthCheck>} />
              <Route path="/Fuel" element={<AuthCheck><Fuel/></AuthCheck>} />
              <Route path="/Insurance" element={<AuthCheck><Insurance/></AuthCheck>} />
              <Route path="/Technical Control" element={<AuthCheck><TechnicalControl/></AuthCheck>} />
              <Route path="/Maintenance" element={<AuthCheck><Maintenance/></AuthCheck>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
