import React, { useState, useContext  } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";


  const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')

  if(token){
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        bgcolor={colors.blueAccent[700]}
      >
   <img src="/assets/logo.jpeg" alt="Logo" 
  style={{ 
          height: '60px', 
          width: '280px', 
          position: 'absolute', 
          top: '3px', 
          left: '8%', 
          transform: 'translateX(-50%)'
}} 
/>
      <ProSidebar  bgcolor={colors.blueAccent[700]}   style={{marginTop:'53px'}}>
  
        <Menu iconShape="square" active={selectedMenu}>
          <MenuItem
            icon={<HomeOutlinedIcon />}
            onClick={() => handleMenuClick('dashboard')}
          >
            Dashboard
            <Link to="/dashboard" />
          </MenuItem>
          <MenuItem 
    icon={<DriveEtaOutlinedIcon />}
    active={selectedMenu === 'Vehicle'}
    onClick={() => {
      handleMenuClick('Vehicle');
      navigate('/vehicles');
    }}>Vehicle</MenuItem>
  
          <SubMenu
            title="Running"
            icon={<AssignmentOutlinedIcon />}
            active={selectedMenu === 'Running'}
            onClick={() => handleMenuClick('Running')}
          >
            <MenuItem>
              Movement
              <Link to="/form"/>
            </MenuItem>
            <MenuItem>
              Verification
              <Link to="/verification" />
            </MenuItem>
            <MenuItem>
             Fuel
              <Link to="/Fuel" />
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Control"
            icon={<TuneOutlinedIcon />}
            active={selectedMenu === 'Control'}
            onClick={() => handleMenuClick('control')}
          >
            <MenuItem>
              Insurance
              <Link to="/Insurance" />
            </MenuItem>
            <MenuItem>
             Technical Control
              <Link to="/Technical Control"/>
            </MenuItem>
          </SubMenu>
   <MenuItem 
    icon={<BuildOutlinedIcon />}
    active={selectedMenu === 'Maintenance'}
    onClick={() => {
      handleMenuClick('Maintenance');
      navigate('/Maintenance');
    }}>Maintenance</MenuItem>
          <SubMenu
            title="Setting"
            icon={<SettingsOutlinedIcon />}
            active={selectedMenu === 'Setting'}
            onClick={() => handleMenuClick('Setting')}
          >
            <MenuItem>
           Personal
              <Link to="/Personal"/>
            </MenuItem>
            <MenuItem>
             Systeme variable
              <Link to="/Systeme variable"/>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },

          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}></Box>
    );
  }
};

export default Sidebar;