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

const Form = () => {
  const group_name = sessionStorage.getItem("group_name");
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
  const [conducteuru, setConducteuru] = useState();
  const [demandeuru, setDemandeuru] = useState();
  const [km_departu, setKmDepartu] = useState();
  const [km_retouru, setKmRetouru] = useState();
  const [destinationu, setDestinationu] = useState();
  const [objetu, setObjetu] = useState();
  const [observationu, setObservationu] = useState();
  const [heure_departu, setHeureDepartu] = useState();
  const [heure_retouru, setHeureRetouru] = useState();
  const [validate, setValidate] = useState();
  const [personnelle, setPersonnelle] = useState([]);
  const [data, setdata] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [showCheckIcon, setShowCheckIcon] = useState(true);

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

  

  let mouvementData;

  if (group_name === "superuser") {
    mouvementData = data.map(item => ({
      id: item.id,
      vehicle: item.vehicule_info.vehicule,
      vehicule_id: item.vehicle,
      objet: item.objet,
      heure_depart: item.heure_depart,
      heure_retour: item.heure_retour,
      observation: item.observation,
      kilometrage: item.kilometrage,
      km_depart: item.km_depart,
      km_retour: item.km_retour,
      demandeur: item.demandeur_info.demandeur,
      demandeur_id: item.demandeur,
      conducteur: item.conducteur_info.conducteur,
      conducteur_id: item.conducteur,
      destination: item.destination,
      date_delete: item.date_delete,
      date_validate: item.date_validate
    }));
  } else {
    mouvementData = data.filter(item => item.date_delete === null).map(item => ({
      id: item.id,
      vehicle: item.vehicule_info.vehicule,
      vehicule_id: item.vehicle,
      objet: item.objet,
      heure_depart: item.heure_depart,
      heure_retour: item.heure_retour,
      observation: item.observation,
      kilometrage: item.kilometrage,
      km_depart: item.km_depart,
      km_retour: item.km_retour,
      demandeur: item.demandeur_info.demandeur,
      demandeur_id: item.demandeur,
      conducteur: item.conducteur_info.conducteur,
      conducteur_id: item.conducteur,
      destination: item.destination,
      date_delete: item.date_delete,
      date_validate: item.date_validate
    }));
  }
  
  
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

  const createCourse = () => {
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
    if (response.status === 200) {
    setopenModal(false);
    fetchData();
    console.log(response.data);
    } else {
    console.error("Unexpected status code:", response.status);
    }
    fetchData();
    })
    .catch((error) => {
    setisLoading(false);
    console.error("An error occurred:", error);
    });
    };
  // UPDATE

  const updateCourse= () => {
    setisLoading(true);
    Api_client.put(`course/put/${id}`, {
      vehicle: vehiculeu,
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
        setShowButton(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };


  // validate

  const validateCourse= () => {
    setisLoading(true);
    Api_client.put(`course/mouvement/${id}`, {
      vehicle: vehiculeu,
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
        setShowCheckIcon(false);
        setShowButton(false); 
        fetchData();
        console.log(response.data);
        setShowButton(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };


    // restorer

    const restoreDeletedData = (id) => {
      setisLoading(true);
      Api_client.patch(`course/mouvement/${id}`, {
      date_delete: null 
      })
      .then((response) => {
      fetchData();
      console.log("Données restaurées avec succès :", response.data);
      })
      .catch((error) => {
      console.error("Erreur lors de la restauration des données :", error);
      })
      .finally(() => {
      setisLoading(false);
      });
      };
  
  // DELETE

  const deleteCourse = (id) => {
    setisLoading(true);
    Api_client.patch(`course/mouvement/${id}`, {
    date_delete: new Date() 
    })
    .then((response) => {
    fetchData(); 
    console.log(response.data);
    })
    .catch((error) => {
    console.error("Erreur lors de la suppression du mouvement:", error);
    })
    .finally(() => {
    setisLoading(false);
    });
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
      align: "right",
      renderCell: (params) => {
        setValidate(params.row.validate)
      if (group_name !== 'superuser') {
      return (
      <div>
      <IconButton
      onClick={() => {
        setopenModalu(true);
        setid(params.row.id);
        setVehiculeu(params.row.vehicule_id);
        setDemandeuru(params.row.demandeur_id);
        setConducteuru(params.row.conducteur_id);
        setDestinationu(params.row.destination);
        setObjetu(params.row.objet);
        setHeureDepartu(params.row.heure_depart);
        setHeureRetouru(params.row.heure_retour);
        setKmDepartu(params.row.km_depart);
        setKmRetouru(params.row.km_retour);
        setObservationu(params.row.observation)
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
      );
      } else {
        return(
        <Button
        type="submit"
        color="secondary"
        variant="contained"
        style={{ marginRight: "10px",height:"25px" }}
        onClick={restoreDeletedData}
      >
        Restore
      </Button>)
      }
      },
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
        
        {group_name !== 'superuser' && (
        <Button
         type="submit"
         color="secondary"
         variant="contained"
         style={{ marginRight: "10px", marginBottom: "-30px" }}

          onClick={() => setopenModal(true)}>
          Ajouter
        </Button>)}
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

      <Modal open={openModal} onClose={handleClose} >
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
        Creation Mouvement
      </Typography>
    </Box>

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
                    <MenuItem key={item.id} value={item.id}>{item.prenom}</MenuItem>
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
                      <MenuItem key={item.id} value={item.id}>{item.nom}</MenuItem>
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
         step: 300,
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
  <IconButton
    onClick={createCourse}
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
            borderRadius:'10px',
            boxShadow: 24,
            p: 4,
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
        Editer Mouvement
      </Typography>
    </Box>
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>

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
                <FormControl fullWidth color='secondary' size='small'>
                  <InputLabel id='demandeur'>Demandeur</InputLabel>
                  <Select
                    label='Demandeur'
                    fullWidth
                    value={demandeuru}
                    onChange={(e) => {
                      setDemandeuru(e.target.value);
                    }}>
                    {personnelle.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.prenom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
                <TextField
                  label='objet'
                  fullWidth
                  value={objetu}
                  onChange={(e) => {
                    setObjetu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Heure_depart'
                  fullWidth
                  value={heure_departu}
                  onChange={(e) => {
                    setHeureDepartu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Heure_retour'
                  fullWidth
                  value={heure_retouru}
                  onChange={(e) => {
                    setHeureRetouru(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Km_depart'
                  fullWidth
                  value={km_departu}
                  onChange={(e) => {
                    setKmDepartu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='Km_retour'
                  fullWidth
                  value={km_retouru}
                  onChange={(e) => {
                    setKmRetouru(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Destination'
                  fullWidth
                  value={destinationu}
                  onChange={(e) => {
                    setDestinationu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Observation'
                  fullWidth
                  value={observationu}
                  onChange={(e) => {
                    setObservationu(e.target.value);
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
          <div>
        {mouvementData.some(row => row.date_validate === null) && (
        <>
        <Button
        onClick={validateCourse}
        sx={{
        marginRight:"-95px",
        height: "30px",
        marginTop: "-750px",
        backgroundColor: '#4cceac',
        }}
        >
        valider
        </Button>
        
        <IconButton
        onClick={updateCourse}
        sx={{
        '&:hover': {
        backgroundColor: '#4cceac',
        },
        }}
        >
        <CheckIcon />
        </IconButton>
        </>
        )}
        
        {mouvementData.filter(row => row.date_validate !== null).map((row, index) => (
        <div
        key={index}
        style={{
        marginRight: '20px',
        borderRadius: '5px',
        marginTop: '5px',
        backgroundColor: '#4cceac',
        fontSize: '19px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '320px',
        }}
        >
        Valide le {row.date_validate}
        </div>
        ))}
        </div>
          <IconButton
            onClick={() => handleCloseu()}
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

export default Form;