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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Api_client } from "../../data/Api";
import CheckIcon from "@mui/icons-material/Check";

const ControleTechnique = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [description, setDescription] = useState([]);
  const [cout, setCout] = useState();
  const [vehicule, setVehicule] = useState([]);
  const [SelectVehicule, setSelectVehicule] = useState("");
  const [SelectConducteur, setSelectConducteur] = useState("");

  const [id, setid] = useState([]);
  
  const [vehiculeu, setVehiculeu] = useState([]);
  const [coutu, setCoutu] = useState([]);
  const [descriptionu, setDescriptionu] = useState([]);
  const [conducteuru, setConducteuru] = useState();
  const [personnelle, setPersonnelle] = useState([]);


  const [data, setdata] = useState([]);
  

  const fetchData = () => {
    setisLoading(true);
    Api_client.get("controle/controle-techniques/")
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
    Api_client.get("vehicule/vehicule/").then((response) => {
      setisLoading(false);
      setVehicule(response.data);
    });
  };

  const controleData = data.map(item =>

    ({
      id:item.id,
      conducteur:item.conducteur_info.conducteur,
      conducteur_id: item.conducteur,
      vehicle:item.vehicule_info.vehicule,
      vehicule_id: item.vehicle,
      description: item.description,
      cost: item.cost,
    
    } ) 
    
    );

    const fetchPersonnelle = () => {
      setisLoading(true);
      Api_client.get("parametrage/personnelle/").then((response) => {
        setisLoading(false);
        setPersonnelle(response.data);
      });
    };

  useEffect(() => {
    fetchData();
    fetchVehicule();
    fetchPersonnelle();
  }, []);

  const handleCloseDialog = () => {
    setopenModal(false);
  };

  // CREATE

  const createControleTechnique= () => {
    setisLoading(true);
    Api_client.post("controle/controle-techniques/", {
      conducteur: SelectConducteur,
      vehicle: SelectVehicule,
      description: description,
      cost: cout,
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

  const updateControleTechnique= () => {
    setisLoading(true);
    Api_client.put(`controle/controle-techniques/${id}/`, {
      vehicle: vehiculeu,
      conducteur: conducteuru,
      description: descriptionu,
      cost: coutu,
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

  const deleteControleTechnique= (id) => {
    setisLoading(true);
    Api_client.delete(`controle/controle-techniques/${id}`)
      .then((response) => {
        fetchData();
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
  
    {
      field: "conducteur",
      headerName: "Conducteur",
      flex: 1,
      cellClassName: "driver_name-column--cell",
    },
  
    {
      field: "vehicle",
      headerName: "vehicule",
      flex: 1,
      cellClassName: "Vehicle-column--cell",
    },
  
    {
      field: "description",
      headerName: "description",
      flex: 1,
      cellClassName: "description-column--cell",
    },
    {
      field: "cost",
      headerName: "cout",
      flex: 1,
      cellClassName: "cout-column--cell",
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
              setConducteuru(params.row.conducteur_id);
              setVehiculeu(params.row.vehicule_id);
              setDescriptionu(params.row.description);
              setCoutu(params.row.cost);
            }}>
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              deleteControleTechnique(params.row.id);
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
        <Header title='CONTROLE TECHNIQUE' subtitle='liste des controle technique' />
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
        <DataGrid  rows={controleData} columns={columns} />
      </Box>

      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "#1f2a40",
            boxShadow: 24,
            p: 4,
            borderRadius:'10px'
          }}>

<Box
      sx={{
        backgroundColor: '#3e4396',
        width:'800px',
        marginLeft:'-33px',
        height:'60px',
        marginTop:'-35px',
        borderRadius:'10px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" component="div">
        Creation Controle Technique
      </Typography>
    </Box>
         
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>
            <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='conducteur'>Conducteur</InputLabel>
                  <Select
                    label='Conducteur'
                    value={SelectConducteur}
                    onChange={(e) => {
                      setSelectConducteur(e.target.value);
                    }}>
                    {personnelle.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.nom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='vehicle'>Vehicle</InputLabel>
                  <Select
                    label='Vehicle'
                    fullWidth
                    value={SelectVehicule}
                    onChange={(e) => {
                      setSelectVehicule(e.target.value);
                    }}>
                    {vehicule.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.make}/{item.license_plate}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='description'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='cost'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setCout(e.target.value);
                  }}
                />
              </Grid>

            </Grid>
          </Box>
 <Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
  <IconButton
    onClick={createControleTechnique}
    sx={{
      '&:hover': {
        backgroundColor: '#4cceac',
      },
    }}
  >
    <CheckIcon />
  </IconButton>

  <IconButton
    onClick={handleCloseDialog}
    sx={{
      '&:hover': {
        backgroundColor: 'red',
      },
    }}
  >
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
            bgcolor: "#1f2a40",
            boxShadow: 24,
            p: 4,
            borderRadius:'10px'
          }}>
                     <Box
      sx={{
        backgroundColor: '#3e4396',
        width:'800px',
        marginLeft:'-33px',
        height:'60px',
        marginTop:'-35px',
        borderRadius:'10px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" component="div">
       Editer Controle Technique
      </Typography>
    </Box>
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>
            <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='conducteur'>Conducteur</InputLabel>
                  <Select
                    label='Conducteur'
                    fullWidth
                    value={conducteuru}
                    onChange={(e) => {
                      setConducteuru(e.target.value);
                    }}>
                    {personnelle.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.prenom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
          
              <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='vehicle'>Vehicle</InputLabel>
                  <Select
                    label='Vehicle'
                    fullWidth
                    value={vehiculeu}
                    onChange={(e) => {
                      setVehiculeu(e.target.value);
                    }}>
                    {vehicule.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.make}/{item.license_plate}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Description'
                  fullWidth
                  value={descriptionu}
                  onChange={(e) => {
                    setDescriptionu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Cout'
                  fullWidth
                  value={coutu}
                  onChange={(e) => {
                    setCoutu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
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
    onClick={updateControleTechnique}
    sx={{
      '&:hover': {
        backgroundColor: '#4cceac',
      },
    }}
  >
    <CheckIcon />
  </IconButton>

  <IconButton
    onClick={handleCloseu}
    sx={{
      '&:hover': {
        backgroundColor: 'red',
      },
    }}
  >
    <CloseIcon />
  </IconButton>
</Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ControleTechnique;