import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { IoMdBus,  } from "react-icons/io";
import { Api_client } from '../../data/Api';
import { useLocation } from 'react-router-dom';
import { GoArrowSwitch, GoAlertFill  } from "react-icons/go";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const id_vehicule = location.state;


const dashboardData = data.map((row) => ({
nb_utilisateurs: row.nb_utilisateurs,
nb_vehicules: row.nb_vehicules,
nb_vehicules_actifs: row.nb_vehicules_actifs,
nb_vehicules_suspendus: row.nb_vehicules_suspendus,
mouvements_today: null,
carburant_info: null,
verification_info: null,
entretient_info: null ||0,
}));
console.log(dashboardData, "datapppppppppppppppppp")


useEffect(() => {
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
    const response = await Api_client.get('vehicule/tb/');
    setData([response.data]);
  } catch (error) {
    console.error("Erreur lors de la récupération des données du tableau de bord", error);
  } finally {
    setIsLoading(false);
  }
};
  fetchDashboardData();
}, []);


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        {data.map((mouvement, index) => (
    <React.Fragment key={index}>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          
          <StatBox
            title={mouvement.nb_utilisateurs}
            subtitle="Users"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "46px", marginLeft:"-20px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={mouvement.nb_vehicules}
            subtitle="Toutes vehicules"
            icon={
              <IoMdBus style={{ fontSize: '54px',marginLeft:'10px',color: colors.greenAccent[600], marginLeft:"-15px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={mouvement.nb_vehicules_actifs}
            subtitle="vehicules actives"
            icon={
              <IoMdBus style={{ fontSize: '54px',marginLeft:'10px',color: colors.greenAccent[600], marginLeft:"-15px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={mouvement.nb_vehicules_suspendus}
            subtitle="Vehicules suspendues"
            icon={
              <IoMdBus style={{ fontSize: '54px',marginLeft:'10px',color: colors.greenAccent[600], marginLeft:"-15px" }} />
            }
              icons={
              <GoAlertFill style={{ fontSize: '24px', color: 'red', position: 'absolute', top: '47px', right: '101px', zIndex: 1 }} />
            }
          />
        </Box>

        </React.Fragment>
))}


{/* ROW 2 */}
<Box
  gridColumn="span 8"
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
>
  <Box
    mt="25px"
    p="0 30px"
    display="flex "
    justifyContent="space-between"
    alignItems="center"
  >
    
      <Typography
        variant="h5"
        fontWeight="600"
        color={colors.grey[100]}
      >
        Mouvements récents
      </Typography>
      <Box >
    </Box>
    <Box>
      <IconButton>
        <DownloadOutlinedIcon
          sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
        /> 
      </IconButton>
    </Box>
  </Box>
  <Box height="250px" m="20px 0 0 0">

  <table className="custom-grid" style={{ width: '98%', borderCollapse: 'collapse',marginBottom:'20px',marginLeft:"10px" }}>
<thead>

<tr> 
  <th style={{ 
    border: '1px solid black', 
    textAlign: 'center', 
    backgroundColor: '#3e4396', 
    color: 'white', 
    fontSize: 'larger' }}>vehicule</th>

<th style={{ 
    border: '1px solid black', 
    textAlign: 'center', 
    backgroundColor: '#3e4396', 
    color: 'white', 
    fontSize: 'larger' }}>Kilometrage</th>

  <th style={{ 
    border: '1px solid black', 
    textAlign: 'center', 
    backgroundColor: '#3e4396', 
    color: 'white', 
    fontSize: 'larger' }}>Destination</th>
  <th style={{ 
    border: '1px solid black', 
    textAlign: 'center', 
    backgroundColor: '#3e4396', 
    color: 'white', 
    fontSize: 'larger' }}>Objet</th>

</tr>
</thead>
<tbody>
  {data.map((mouvement, index) => (
    <React.Fragment key={index}>
      <tr className="custom-row">

      <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{mouvement.mouvements_today.vehicle.join('/ ')}</td>

        <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{mouvement.mouvements_today.kilometrage}</td>
  
        <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{mouvement.mouvements_today.destination}</td>
     
     <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{mouvement.mouvements_today.objet}</td>
      </tr>
  </React.Fragment>
))}

      </tbody>
   </table> 

  </Box>
</Box>



   {/* verification */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
             Verifications Recentes
            </Typography>
          </Box>
          {data.map((mouvement, index) => (
    <React.Fragment key={index}>
            <Box
              display="flex"
              justifyContent=""
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                </Typography>
                <Typography color={colors.grey[100]}>
                {}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
              {}
              </Box>
             
            </Box>
            </React.Fragment>
          ))}
        </Box>

        {/* ROW 3 */}
  
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          width="1000px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Maintenance
          </Typography>
          <Box height="250px" m="20px 0 0 0">

<table className="custom-grid" style={{ width: '100%', borderCollapse: 'collapse',marginBottom:'20px', }}>
<thead>
  
<tr> 
<th style={{ 
  border: '1px solid black', 
  textAlign: 'center', 
  backgroundColor: '#3e4396', 
  color: 'white', 
  fontSize: 'larger' }}>vehicule</th>

<th style={{ 
  border: '1px solid black', 
  textAlign: 'center', 
  backgroundColor: '#3e4396', 
  color: 'white', 
  fontSize: 'larger' }}>panne</th>
<th style={{ 
  border: '1px solid black', 
  textAlign: 'center', 
  backgroundColor: '#3e4396', 
  color: 'white', 
  fontSize: 'larger' }}>operation</th>
<th style={{ 
  border: '1px solid black', 
  textAlign: 'center', 
  backgroundColor: '#3e4396', 
  color: 'white', 
  fontSize: 'larger' }}>garage</th>
</tr>
</thead>
<tbody>
  {data.map((row, index) => (
    <React.Fragment key={index}>
      <tr className="custom-row">

      <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{row.entretient_info.vehicle.join('/ ')}</td>

        <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{row.entretient_info.panne}</td>
  
        <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{row.entretient_info.operation}</td>
     
     <td style={{ 
          border: '1px solid black', 
          textAlign: 'center' }}>{row.entretient_info.garage_name}</td>
      </tr>
  </React.Fragment>
))}

      </tbody>
 </table> 
  </Box>
        </Box>
  

 {/* Carburant*/}

 <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          marginRight="-510px"
          marginLeft="510px"
        >
          
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Carburant
            </Typography>
          </Box>
          {data.map((mouvement, index) => (
    <React.Fragment key={index}>
            <Box
              display="flex"
              justifyContent=""
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                </Typography>
                <Typography color={colors.grey[100]}>
                {}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
              {}
              </Box>
             
            </Box>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;