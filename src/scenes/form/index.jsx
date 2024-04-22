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
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Api_client } from "../../data/Api";
import CheckIcon from "@mui/icons-material/Check";
import moment from 'moment';

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [vehicule, setVehicule] = useState([]);
  const [conducteur, setConducteur] = useState([]);
  const [demandeur, setDemandeur] = useState([]);
  const [SelectVehicule, setSelectVehicule] = useState("");
  const [SelectConducteur, setSelectConducteur] = useState("");
  const [SelectDemandeur, setSelectDemandeur] = useState("");
  const [km_depart, setKmDepart] = useState();
  const [km_retour, setKmRetour] = useState();
  const [destination, setDestination] = useState();
  const [objet, setObjet] = useState();
  const [heure_depart, setHeureDepart] = useState();
  const [heure_retour, setHeureRetour] = useState();
  const [observation, setObservation] = useState();
  const [id, setid] = useState();

  const [vehiculeu, setVehiculeu] = useState();
  const [selectVehiculeu, setselectVehiculeu] = useState();
  const [conducteuru, setConducteuru] = useState();
  const [demandeuru, setDemandeuru] = useState();
  const [km_departu, setKmDepartu] = useState();
  const [km_retouru, setKmRetouru] = useState();
  const [destinationu, setDestinationu] = useState();
  const [objetu, setObjetu] = useState();
  const [observationu, setObservationu] = useState();
  const [heure_departu, setHeureDepartu] = useState();
  const [heure_retouru, setHeureRetouru] = useState();
  const [personnelle, setPersonnelle] = useState([]);
  const [data, setdata] = useState([]);

  const fetchData = () => {
    setisLoading(true);
    Api_client.get("course/mouvement/")
      .then((response) => {
        setisLoading(false);
        setopenModal(false);
        setdata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

const mouvementData = data.map(item =>

({
  id:item.id,
  vehicle:item.vehicule_info.vehicule,
  objet:item.objet,
  heure_depart:item.heure_depart,
  heure_retour:item.heure_retour,
  observation:item.observation,
  kilometrage:item.kilometrage,
  demandeur:item.demandeur_info.demandeur,
  conducteur:item.conducteur_info.conducteur,
  destination:item.destination,

} ) 

);
  
  const fetchVehicule = () => {
    setisLoading(true);
    Api_client.get("vehicule/vehicule/").then((response) => {
      setisLoading(false);
      setVehicule(response.data);
    });
  };

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

  const createCourse= () => {
    setisLoading(true);
    Api_client.post("course/mouvement/", {
      vehicle: SelectVehicule,
      demandeur: SelectDemandeur,
      conducteur: SelectConducteur,
      objet: objet,
      destination: destination,
      km_depart: km_depart,
      km_retour: km_retour,
      heure_depart: heure_depart,
      heure_retour: heure_retour,
      observation: observation,
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

  const updateCourse= () => {
    setisLoading(true);
    Api_client.put(`course/mouvement/${id}`, {
      vehicule: selectVehiculeu,
      demandeur: demandeuru,
      conducteur: conducteuru,
      objet: objetu,
      destination: destinationu,
      km_depart: km_departu,
      km_retour: km_retouru,
      heure_depart: heure_departu,
      heure_retour: heure_retouru,
      observation: observationu,
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

  const deleteCourse= (id) => {
    setisLoading(true);
    Api_client.delete(`course/mouvement/${id}`)
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
      field: "demandeur",
      headerName: "demandeur",
      flex: 1,
      cellClassName: "demandeur-column--cell",
    },
    {
      field: "conducteur",
      headerName: "conducteur",
      flex: 1,
      cellClassName: "conducteur-column--cell",
    },
    {
      field: "objet",
      headerName: "objet",
      flex: 1,
      cellClassName: "objet-column--cell",
    },
    {
      field: "destination",
      headerName: "destination",
      flex: 1,
      cellClassName: "destination-column--cell",
    },
    {
      field: "kilometrage",
      headerName: "kilometrage",
      flex: 1,
      cellClassName: "kilometrage-column--cell",
    },
    {
      field: "heure_depart",
      headerName: "heure_depart",
      flex: 1,
      cellClassName: "heure_depart-column--cell",
    },
    {
      field: "heure_retour",
      headerName: "heure_retour",
      flex: 1,
      cellClassName: "heure_retour-column--cell",
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
              setDemandeuru(params.row.demandeur);
              setConducteuru(params.row.conducteur);
              setDestinationu(params.row.destination);
              setObjetu(params.row.objet);
              setHeureDepartu(params.row.heure_depart);
              setHeureRetouru(params.row.heure_retour);
              setKmDepartu(params.row.km_depart);
              setKmRetouru(params.row.km_retour);
              setObservationu(params.row.observation);
             
            }}>
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              deleteCourse(params.row.id);
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
        <Header title='MOUVEMENT' subtitle='liste des courses' />
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
        <DataGrid  rows={mouvementData} columns={columns} />
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
                    value={SelectVehicule}
                    onChange={(e) => {
                      setSelectVehicule(e.target.value);
                    }}>
                    {vehicule.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.license_plate}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='demandeur'>Demandeur</InputLabel>
                  <Select
                    label='demandeur'
                    value={SelectDemandeur}
                    onChange={(e) => {
                      setSelectDemandeur(e.target.value);
                    }}>
                    {personnelle.map((item) => (
                    <MenuItem value={item.id}>{item.prenom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
                      <MenuItem value={item.id}>{item.nom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              

              <Grid item xs={6}>
                <TextField
                  label='objet'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setObjet(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='km_depart'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setKmDepart(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='km_retour'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setKmRetour(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
          <TextField
          label="Heure de départ"
type="time"
fullWidth
color="secondary"
size="small"
InputLabelProps={{
shrink: true,
}}
inputProps={{
step: 300, // 5 minutes
}}
onChange={(e) => {
setHeureDepart(e.target.value);
         }}
/>
</Grid>
<Grid item xs={6}>
<TextField
label="Heure de retour"
type="time"
fullWidth
color="secondary"
size="small"
InputLabelProps={{
shrink: true,
}}
inputProps={{
step: 300, // 5 minutes
}}
onChange={(e) => {
setHeureRetour(e.target.value);
}}
/>
</Grid>

              <Grid item xs={6}>
                <TextField
                  label='destination'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='observation'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setObservation(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
        <IconButton onClick={createCourse}>
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
          <Typography variant='h3'>COURSES</Typography>
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>

            <Grid item xs={6}>
                <FormControl fullWidth color='secondary'>
                  <InputLabel id='vehicle'>Vehicle</InputLabel>
                  <Select
                    label='Vehicle'
                    value={selectVehiculeu}
                    onChange={(e) => {
                      setselectVehiculeu(e.target.value);
                    }}>
                    {vehicule.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.license_plate}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth color='secondary'>
                  <InputLabel id='demandeur'>Demandeur</InputLabel>
                  <Select
                    label='Demandeur'
                    value={SelectDemandeur}
                    onChange={(e) => {
                      setSelectDemandeur(e.target.value);
                    }}>
                    {personnelle.map((item) => (
                      <MenuItem value={item.nom}>{item.prenom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth color='secondary'>
                  <InputLabel id='conducteur'>Conducteur</InputLabel>
                  <Select
                    label='Conducteur'
                    value={SelectConducteur}
                    onChange={(e) => {
                      setSelectConducteur(e.target.value);
                    }}>
                    {personnelle.map((item) => (
                      <MenuItem value={item.nom}>{item.prenom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
          
              <Grid item xs={6}>
                <TextField
                  label='objet'
                  value={objetu}
                  onChange={(e) => {
                    setObjetu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Destination'
                  value={destinationu}
                  onChange={(e) => {
                    setDestinationu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Heure_depart'
                  value={heure_departu}
                  onChange={(e) => {
                    setHeureDepartu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Heure_retour'
                  value={heure_retouru}
                  onChange={(e) => {
                    setHeureRetouru(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Km_depart'
                  value={km_departu}
                  onChange={(e) => {
                    setKmDepartu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='Km_retour'
                  value={km_retouru}
                  onChange={(e) => {
                    setKmRetouru(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='Observation'
                  value={observationu}
                  onChange={(e) => {
                    setObservationu(e.target.value);
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
              onClick={updateCourse}>
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

export default Form;