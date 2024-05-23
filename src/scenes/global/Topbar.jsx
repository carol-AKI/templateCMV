import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import axios from "axios";



const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
    };

    const currentDate = formatDate();
  
    const handleLogout = async () => {
      try {
        const getToken = sessionStorage.getItem("token");
  
        if (!getToken) {
          console.error("No token found in localStorage");
          navigate("/login");
        }
        
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/logout/",
          null,
          {
            headers: {
              Authorization: `Token ${getToken}`,
            },
          }
        );
        if (response.status === 200) {
          sessionStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
  
    if(token){
      return (
        
        <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          p={2}
          bgcolor={colors.blueAccent[700]}
        >
          <Box
            display="flex"
            alignItems="center"
            borderRadius="3px"
            p={1}
            mr={2}
          >
          </Box>
          <Typography variant="body1" color="textSecondary">
              {currentDate}
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
              <IconButton>
                <NotificationsOutlinedIcon />
              </IconButton>
              <IconButton>
                <SettingsOutlinedIcon />
              </IconButton>
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      );
    }else{
      return (
        <Box display='flex' justifyContent='space-between' p={2}>
          <Box display='flex'>
            <IconButton onClick={colorMode.toggleColorMode} >
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      );
    }
};

export default Topbar;