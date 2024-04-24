import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Api_client } from "../../data/Api";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation()
  const id_vehicule = location.state
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [vehicule, setVehicule] = useState([]);

console.log(id_vehicule,"ffdjndcdcdcdcnj")

  // detail voiture

  
  useEffect(()=>{
    const fetchVehiculeInfo = () => {
      setIsLoading(true);
      Api_client.get(`vehicule/allinfo/${id_vehicule}`)
      .then((response) => {
        setIsLoading(false);
        setVehicule(response.data)
      })
    } 
    fetchVehiculeInfo()
  },[])

  const detailData = data.map((item) => ({
    id: item.id,
    Date: item.Date, 
    assurance: item.assurance,
    controleTechniques: item.controleTechniques,
    mouvement: item.mouvement,
    verification: item.verification,
    entretien: item.entretien,
  }));

  const columns = [
    { field: "Date", headerName: "Date" },
    {
      field: "assurrance",
      headerName: "Assurance",
      flex: 1,
      cellClassName: "assurrance-column--cell",
    },
    {
      field: "controleTechniques",
      headerName: "Contrôle Technique",
      flex: 1,
      cellClassName: "controleTechniques-column--cell",
    },
    {
      field: "mouvement",
      headerName: "Mouvement",
      flex: 1,
      cellClassName: "mouvement-column--cell",
    },
    {
      field: "verification",
      headerName: "Vérification",
      flex: 1,
      cellClassName: "verification-column--cell",
    },
    {
      field: "entretien",
      headerName: "Entretien",
      flex: 1,
      cellClassName: "entretien-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Header title="" subtitle="" />
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={detailData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Detail;