import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [themeMode, setThemeMode] = useState('light');


  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };
  const navigate = useNavigate();
  return (

    <ProSidebar style={{ backgroundColor: '#f2f2f2' , marginTop: '0px'}}>
      <img src="/assets/logo2.jpeg" alt="Logo" style={{ height: '100px', width: 'auto' }} />
      <Menu iconShape="square" active={selectedMenu}>
        <MenuItem
          icon={<HomeOutlinedIcon />}
          onClick={() => handleMenuClick('dashboard')}
        >
          Dashboard
          <Link to="/" />
        </MenuItem>
        <MenuItem 
  icon={<DriveEtaOutlinedIcon />}
  active={selectedMenu === 'Vehicle'}
  onClick={() => {
    handleMenuClick('Vehicle');
    navigate('/contacts');
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
        <SubMenu
          title="Maintenance"
          icon={<BuildOutlinedIcon />}
          active={selectedMenu === 'Maintenance'}
          onClick={() => handleMenuClick('Maintenance')}
        >
          <MenuItem>
            Maintenance
            <Link to="/Maintenance" />
          </MenuItem>
          <MenuItem>
            Operation
            <Link to="/operation" />
          </MenuItem>
        </SubMenu>
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
  );
};

export default Sidebar;