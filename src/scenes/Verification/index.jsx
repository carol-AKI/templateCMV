import {
  Box,
  useTheme,
  IconButton,
} from "@mui/material";


import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Api_client } from "../../data/Api";

const Verification = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [vehicle, setVehicle] = useState([]);
  const [data, setData] = useState([])
  
  const fetchData = () => {
    setisLoading(true);
    Api_client.get("course/verification")
      .then((response) => {
        setisLoading(false);
        setopenModal(false);
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  const VerificationData = data.map(item =>

    ({
      id:item.id,
      vehicle:item.vehicule_info.vehicule,
      eau:item.eau,
      lubrifiant: item.lubrifiant,
      frein: item.frein,
      
    })
  );


  const fetchVehicule = () => {
    setisLoading(true);
    Api_client.get('vehicule/vehicule/')
      .then((response) => {
        setisLoading(false);
        setopenModal(false);
        setVehicle(response.data);
             })
        .catch((error) => {
          setisLoading(false);
        });
  };

  useEffect(() => {
    fetchData();
    fetchVehicule();
  }, []);

  // DELETE

  const deleteVerification = (id) => {

    setisLoading(true);
    Api_client.delete(`course/verification/${id}/`)
      .then((response) => {
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {});
  };

  const columns = [
    {
      field: "vehicle",
      headerName: "Vehicule",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "eau",
      headerName: "Eau",
      flex: 1,
      cellClassName: "Eau-column--cell",
      renderCell: (params) => {
        const cellValue = params.row.eau;
        const texte = cellValue === true ? "Verifiee" : cellValue === false ? "Non Verifiee": "";
        return <span>{texte}</span>
      }
    },
  
    
    {
      field: "lubrifiant",
      headerName: "Lubrifiant",
      flex: 1,

      cellClassName: "Lubrifiant-column--cell",
      renderCell: (params) => {
        const cellValue = params.row.lubrifiant;
        const texte = cellValue === true ? "Verifiee" : cellValue === false ? "Non Verifiee": "";
        return <span>{texte}</span>
      }
    },
    {
      field: "frein",
      headerName: "frein",
      flex: 1,
      cellClassName: "Frein-column--cell",
      renderCell: (params) => {
        const cellValue = params.row.frein;
        const texte = cellValue === true ? "Verifiee" : cellValue === false ? "Non Verifiee": "";
        return <span>{texte}</span>
      }
    },

    {
      field: "actions",
      headerName: "Actions",
      // width: "50%",
      align: "right",
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              deleteVerification(params.row.id);
            }}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Box m='20px'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
          alignItems: "center",
          borderRadius: 5,
        }}>

        <Header title='Etat du voiture 'subtitle='Liste des enregistrements' />
      </Box>
      <Box
        m='40px 0 0 0'
        height='75vh'
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
        }}>
        <DataGrid rows={VerificationData} columns={columns} />
      </Box>

  
    </Box>
  );
};

export default Verification;