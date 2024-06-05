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

const Assurance = () => {
  const group_name = sessionStorage.getItem("group_name");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [reference, setReference] = useState([]);
  const [expired_at, setExpiredAt] =useState ([]);
  const [cout, setCout] = useState();
  const [vehicule, setVehicule] = useState([]);
  const [selectedVehicule, setSelectedVehicule] = useState([]); 

  const [id, setid] = useState();
  const [vehiculeu, setVehiculeu] = useState();
  const [coutu, setCoutu] = useState();
  const [referenceu, setReferenceu] = useState();
  const [expired_atu, setExpiredAtu] =useState ([]);
  const [data, setdata] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [showCheckIcon, setShowCheckIcon] = useState(true);
  const [validationDate, setValidationDate] = useState(null);


  

  const fetchData = () => {
    setisLoading(true);
    Api_client.get("controle/assurances/")
      .then((response) => {
        setisLoading(false);
        setopenModal(false);
        setdata(response.data);
        console.log(data)
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
      vehicle:item.vehicule_info.vehicule,
      vehicule_id: item.vehicle,
      remaining: item.remaining,
      reference: item.reference,
      cost: item.cost,
    
    } ) 
    
    );

  useEffect(() => {
    fetchData();
    fetchVehicule();
  },[]);

  const handleCloseDialog = () => {
    setopenModal(false);
  };

  // CREATE


  const createAssurance = () => {
    setisLoading(true);
    Api_client.post("controle/assurances/", {
    vehicle: selectedVehicule,
    reference: reference,
    cost: cout,
    expired_at: expired_at,
    })
    .then((response) => {
    setisLoading(false);
    if (response.status === 200) {
    console.log(response.data);
    } else {
    console.error("Unexpected status code:", response.status);
    }
    fetchData();
    })
    .catch((error) => {
    setisLoading(false);
    alert("L'erreur est survenue, Veuillez vérifier vos champs que ce sont correctement complétés");
    });
    };
    

  // UPDATE

  const updateAssurance= () => {
    setisLoading(true);
    Api_client.put(`controle/assurances/${id}/`, {
      vehicle: vehiculeu,
      reference: referenceu,
      cost: coutu,
      expired_at: expired_atu,
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

 //VALIDATE

  const validateAssurance= () => {
    setisLoading(true);
    Api_client.put(`controle/assurances/${id}/`, {
      vehicle: vehiculeu,
      reference: referenceu,
      cost: coutu,
      expired_at: expired_atu,
    })
      .then((response) => {
        setisLoading(false);
        setShowCheckIcon(false);
        setValidationDate(new Date().toLocaleDateString());
        setShowButton(false); 
        fetchData();
        console.log(response.data);
        setShowButton(false); 
      })
      .catch((error) => {
        setisLoading(false);
      });
  };

  // DELETE

  const deleteAssurance= (id) => {
    setisLoading(true);
    Api_client.delete(`controle/assurances/${id}`)
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
    { field: "id", headerName: "ID" },
   
    {
      field: "vehicle",
      headerName: "vehicle",
      flex: 1,
      cellClassName: "Vehicle-column--cell",
    },
  
    {
      field: "reference",
      headerName: "reference",
      flex: 1,
      cellClassName: "reference-column--cell",
    },
    {
      field: "remaining",
      headerName: "remaining",
      flex: 1,
      cellClassName: "remaining-column--cell",
    },
    {
      field: "cost",
      headerName: "cost",
      flex: 1,
      cellClassName: "cout-column--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (params) => {
      if (group_name !== 'superuser') {
      return (
      <div>
      <IconButton
      onClick={() => {
      setopenModalu(true);
      setid(params.row.id);
      setVehiculeu(params.row.vehicule_id);
      setReferenceu(params.row.reference);
      setExpiredAt(params.row.expired_at);
      setCoutu(params.row.cost);
      }}>
      <EditIcon />
      </IconButton>
      
      <IconButton
      onClick={() => {
      deleteAssurance(params.row.id);
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
          style={{ marginRight: "10px", height:"25px" }}
          onClick={''}
        >
          Restore
        </Button>);
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
        <Header title='ASSURANCE' subtitle='liste des assurances faits' />
        {group_name !== 'superuser' && (
        <Button
         type="submit"
         color="secondary"
         variant="contained"
         style={{ marginRight: "10px", marginBottom: "-30px" }}

          onClick={() => setopenModal(true)}>
          Ajouter
        </Button>
        )}
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
        Creation Assurance
      </Typography>
    </Box>
         
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>
            <Grid item xs={6}>
      <FormControl fullWidth color='secondary' size='small'>
        <InputLabel id='vehicle'>Vehicule</InputLabel>
        <Select
          label='Vehicle'
          fullWidth
          value={selectedVehicule}
          onChange={(e) => setSelectedVehicule(e.target.value)}
          
        >
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
                  label='reference'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setReference(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
          <TextField
           label="expired_at"
           type="date"
           fullWidth
           color="secondary"
           size="small"
           InputLabelProps={{
           shrink: true,
}}

         onChange={(e) => {
         setExpiredAt(e.target.value);
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

            </Grid>
          </Box>
<Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
  <IconButton
    onClick={createAssurance}
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
        Editer l'assurance
      </Typography>
      <div>
    {showButton && (
      <Button
        onClick={validateAssurance}
        sx={{
          marginLeft: "200px",
          marginRight: "-250px",
          height: "30px",
          marginTop: "15px",
          backgroundColor: '#4cceac',
        }}
      >
        valider
      </Button>
    )}
  </div>
    </Box>
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>
            <Grid item xs={6}>
            <FormControl fullWidth color='secondary' size="small">
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
                  label='reference'
                  fullWidth
                  value={referenceu}
                  onChange={(e) => {
                    setReferenceu(e.target.value);
                  }}
                  color='secondary'
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
          <TextField
           label="expired_at"
           type="date"
           fullWidth
           color="secondary"
           size="small"
           InputLabelProps={{
           shrink: true,
}}
           value={expired_atu}

         onChange={(e) => {
         setExpiredAtu(e.target.value);
}}
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
                  size="small"
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
    onClick={updateAssurance}
    sx={{
      '&:hover': {
        backgroundColor: '#4cceac',
      },
    }}
  >
    <CheckIcon />
  </IconButton>

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

export default Assurance;