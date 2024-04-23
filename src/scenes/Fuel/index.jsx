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
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Api_client } from "../../data/Api";

const Carburant = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [id, setid] = useState();
  const [vehicle, setVehicle] = useState([]);
  const [selectVehicle, setSelectVehicle] = useState("");
  const [litre, setLitre] = useState();
  const [prix_unitaire, setPrixunitaire] = useState();
  const [cout, setCout] = useState([]);
  const [station, setStation] = useState([]);
  const [vehicleu, setVehicleu] = useState();
  const [selectVehicleu, setSelectVehicleu] = useState();
  const [litreu, setLitreu] = useState();
  const [prix_unitaireu, setPrixunitaireu] = useState();
  const [coutu, setCoutu] = useState();
  const [stationu, setStationu] = useState();
  const [data, setData] = useState([])
  
  // fetch list of Societe Partenaire
  const fetchData = () => {
    setisLoading(true);
    Api_client.get("course/carburant")
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

  const carburantData = data.map(item =>

    ({
      id:item.id,
      vehicle:item.vehicule_info.vehicule,
      litre:item.litre,
      prix_unitaire: item.prix_unitaire,
      cout: item.cout,
      station:item.station,
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

  // CREATE

  const createCarburant = () => {
    setisLoading(true);
    Api_client.post("course/carburant/", {
      vehicle: selectVehicle,
      litre: litre,
      prix_unitaire: prix_unitaire,
      cout: cout,
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

  const updateCarburant = () => {
    setisLoading(true);
    Api_client.put(`course/carburant/${id}/`, {
      vehicle: selectVehicleu,
      litre: litreu,
      prix_unitaire: prix_unitaireu,
      cout: coutu,
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

  const deleteCarburant = (id) => {
    setisLoading(true);
    Api_client.delete(`course/carburant/${id}/`)
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
      headerName: "Vehicule",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "litre",
      headerName: "litre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "prix_unitaire",
      headerName: "prix_unitaire",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cout",
      headerName: "cout",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "station",
      headerName: "station",
      flex: 1,
      cellClassName: "name-column--cell",
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
              setVehicleu(params.row.vehicle);
              setLitreu(params.row.litre);
              setPrixunitaireu(params.row.prix_unitaire);
              setCoutu(params.row.cout);
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
          backgroundColor: colors.blueAccent[700],
          padding: 2,
          alignItems: "center",
          borderRadius: 5,
        }}>
        <Header title='info sur la consommation carburant' subtitle='liste des enregistrements' />
        <Button
          color='secondary'
          variant='contained'
          sx={{
            width: 70,
            height: 50,
            marginLeft: 1,
            fontSize: 15,
            borderRadius: 5,
            paddingX: 8,
          }}
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
        <DataGrid rows={carburantData} columns={columns} />
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
            borderRadius: 20,
          }}>
          <Typography variant='h3'sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>carburant</Typography>
          <Box margin={2}>  
            <Grid container spacing={2} item xs={12} alignItems='center'>
              <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='vehicle'>Vehicule Id</InputLabel>
                  <Select
                    label='Vehicle'
                    value={selectVehicle}
                    onChange={(e) => {
                      setSelectVehicle(e.target.value);
                    }}>
                    {vehicle.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.make}{item.model}-{item.license_plate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item xs={6}>
                <TextField
                  label='litre'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setLitre(e.target.value);
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
                    setPrixunitaire(e.target.value);
                  }}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  label='cout'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setCout(e.target.value);
                  }}
                />
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
            <Button
              color='primary'
              variant='contained'
              sx={{ marginRight: 3 }}
              onClick={createCarburant}>
              {isLoading ? <Typography>wait....</Typography> : <ArrowDownwardRoundedIcon />}
            </Button>
            <Button
              color='error'
              variant='contained'
              onClick={() => handleClose()}>
              <CloseIcon />
            </Button>
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
          <Typography variant='h3'>Etat Carburant</Typography>
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>
              <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='vehicle'>Vehicule Id</InputLabel>
                  <Select
                    label='Vehicle'
                    value={selectVehicleu}
                    onChange={(e) => {
                      setSelectVehicleu(e.target.value);
                    }}>
                    {vehicle.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.make}{item.model} - {item.license_plate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
        
              <Grid item xs={6}>
                <TextField
                  label='litre'
                  value={litreu}
                  onChange={(e) => {
                    setLitreu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='prix_unitaire'
                  value={prix_unitaireu}
                  onChange={(e) => {
                    setPrixunitaireu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='cout'
                  value={coutu}
                  onChange={(e) => {
                    setCoutu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='station'
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
            <Button
              color='secondary'
              variant='contained'
              sx={{ marginRight: 3 }}
              onClick={updateCarburant}>
              {isLoading ? <Typography>wait....</Typography> : <ArrowDownwardRoundedIcon />}
            </Button>
            <Button
              color='error'
              variant='contained'
              onClick={() => handleCloseu()}>
              <CloseIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Carburant;