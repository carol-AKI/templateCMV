import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  useTheme,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Api_client } from "../../data/Api";
import { MenuItem } from "react-pro-sidebar";
import CheckIcon from "@mui/icons-material/Check";

const Carburant = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [quantite, setQuantite] = useState([]);
  const [station, setStation] = useState([]);
  const [prix_unitaire, setPrixUnitaire] = useState();
  const [prix_total, setPrixTotal] = useState();
  const [vehicule, setVehicule] = useState([]);
  const [SelectVehicule, SetSelectVehicule] = useState([]);

  const [id, setid] = useState();

  const [vehiculeu, setVehiculeu] = useState();
  const [quantiteu, setQuantiteu] = useState();
  const [stationu, setStationu] = useState();
  const [prix_unitaireu, setPrixUnitaireu] = useState();
  const [prix_totalu, setPrixTotalu] = useState();

  
  const [data, setdata] = useState([]);

  const fetchData = () => {
    setisLoading(true);
    Api_client.get("carburant/carburant/")
      .then((response) => {
        setisLoading(false);
        setopenModal(false);
        setdata(response.data);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  const fetchVehicule = () => {
    setisLoading(true);
    Api_client.get("carburant/carburant/").then((response) => {
      setisLoading(false);
      setVehicule(response.data);
    });
  };

  

  
  useEffect(() => {
    fetchData();
    fetchVehicule();
  }, []);

  const handleCloseDialog = () => {
    setopenModal(false);
  };

  // CREATE

  const createCarburant= () => {
    setisLoading(true);
    Api_client.post("carburant/carburant/", {
      vehicle: vehicule,
      quantite: quantite,
      prix_unitaire: prix_unitaire,
      prix_total: prix_total,
      station: station,
    })
      .then((response) => {
        setisLoading(false);
        setopenModal(false);
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  // UPDATE

  const updateCarburant= () => {
    setisLoading(true);
    Api_client.put(`carburant/carburant/${id}`, {
      vehicle: vehiculeu,
      quantite: quantiteu,
      prix_unitaire: prix_unitaireu,
      prix_total: prix_totalu,
      station: stationu,
    })
      .then((response) => {
        setisLoading(false);
        setopenModalu(false);
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  // DELETE

  const deleteCarburant= (id) => {
    setisLoading(true);
    Api_client.delete(`carburant/carburant/${id}`)
      .then((response) => {
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {});
  };

  const handleClose = () => {
    setopenModal(false);
  };
  const handleCloseu = () => {
    setopenModalu(false);
  };
  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "vehicle",
      headerName: "vehicle",
      flex: 1,
      cellClassName: "Vehicle-column--cell",
    },
  
    {
      field: "quantite",
      headerName: "quantite",
      flex: 1,
      cellClassName: "quantite-column--cell",
    },
    {
      field: "prix_unitaire",
      headerName: "prix_unitaire",
      flex: 1,
      cellClassName: "prix_unitaire-column--cell",
    },
    {
      field: "prix_total",
      headerName: "prix_total",
      flex: 1,
      cellClassName: "prix_total-column--cell",
    },
    {
      field: "station",
      headerName: "station",
      flex: 1,
      cellClassName: "station-column--cell",
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
              setopenModalu(true);
              setid(params.row.id);
              setVehiculeu(params.row.vehicle);
              setQuantiteu(params.row.quantite);
              setPrixUnitaireu(params.row.prix_unitaire);
              setPrixTotalu(params.row.prix);
              setStationu(params.row.station);
             
            }}>
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              deleteCarburant(params.row.id);
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
        <Header title='CARBURANT' subtitle='Consomation des vehicules' />
        <Button
         type="submit"
         color="secondary"
         variant="contained"
         style={{ marginRight: "10px", marginBottom: "-30px" }}

          onClick={() => setopenModal(true)}>
          Ajouter
        </Button>
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
        <DataGrid  rows={data} columns={columns} />
      </Box>

      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
         
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>
            <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='vehicle'>Vehicle</InputLabel>
                  <Select
                    label='Vehicle'
                    value={vehicule}
                    onChange={(e) => {
                      setVehicule(e.target.value);
                    }}>
                    {vehicule.map((item) => (
                      <MenuItem key={item.make} value={item.make}>{item.make}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='station'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setStation(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='quantite'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setQuantite(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='prix_unitaire'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setPrixUnitaire(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='prix_total'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setPrixTotal(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
        <IconButton onClick={createCarburant}>
          <CheckIcon />
        </IconButton>

        <IconButton onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </Box>

        </Box>
      </Modal>
      <Modal open={openModalu} onClose={handleCloseu}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant='h3'>Carburant</Typography>
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>

            <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='vehicle'>Vehicle</InputLabel>
                  <Select
                    label='Vehicle'
                    value={SelectVehicule}
                    onChange={(e) => {
                      SetSelectVehicule(e.target.value);
                    }}>
                    {vehicule.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='quantite'
                  value={quantiteu}
                  onChange={(e) => {
                    setQuantiteu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Prix_unitaire'
                  value={prix_unitaireu}
                  onChange={(e) => {
                    setPrixUnitaireu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='Prix_total'
                  value={prix_totalu}
                  onChange={(e) => {
                    setPrixTotalu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='Station'
                  value={stationu}
                  onChange={(e) => {
                    setStationu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>

            </Grid>
          </Box>

          <Box
            margin={2}
            marginTop={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}>
           
<Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
        <IconButton
              onClick={updateCarburant}>
              <CheckIcon />
        </IconButton>
            <IconButton
              
              onClick={() => handleCloseu()}>
<CloseIcon />
        </IconButton>
      </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Carburant;