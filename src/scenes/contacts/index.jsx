import React, { useEffect, useState } from "react";
import { Typography,
         Box,
         Button,
         Dialog, 
         DialogContent, 
         DialogTitle, 
         IconButton,
         TextField,
         Modal,
         Menu, 
         MenuItem, 
         InputLabel,
         Select} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Grid } from "@mui/material";
import { Api_client } from "../../data/Api";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [numeroChassi, setNumeroChassi] = useState();
  const [typeCarburant, setTypeCarburant] = useState('ESSENCE'); 
  const [licensePlate, setLicensePlate] = useState();
  
  const [makeu, setMakeu] = useState();
  const [modelu, setModelu] = useState();
  const [numeroChassiu, setNumeroChassiu] = useState();
  const [typeCarburantu, setTypeCarburantu] = useState('ESSENCE'); 
  const [licensePlateu, setLicensePlateu] = useState();

  const [isLoading, setIsLoading] = useState(false)
  const [data, SetData] = useState([]);
  const navigate = useNavigate(); 
  
  const fetchData = () => {
    setIsLoading(true);
    Api_client.get("vehicule/vehicule/").then((response) => {
      setIsLoading(false);
      SetData(response.data)
    })
  };

  useEffect(() => {
    fetchData()
    
  }, []);
  
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };


  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const handleActionClick = (action) => {
    if (action === "View Details") {
      navigate(`/VehicleDetail`);
    } else if (action === "Vehicle Status") {
      setStatusDialogOpen(true);
    } else {
      console.log(`Clicked on ${action} for row with id: ${selectedRowId}`);
    }
    handleMenuClose();
  };


  const createVehicule= () => {
    setIsLoading(true);
    Api_client.post("vehicule/vehicule/", {
    make: make,
    model: model,
    numero_chassi: numeroChassi,
    license_plate: licensePlate,
    type_carburant: typeCarburant,
    })
      .then((response) => {
        setIsLoading(false);
        setOpen(false);
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
       setIsLoading(false);
       fetchData();
      });
  };


  const deleteVehicule= (id) => {
    setIsLoading(true);
    Api_client.delete(`vehicule/vehicule/${id}/`)
      .then((response) => {
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {});
  };


  const handleCloseu = () => {
    setopenModalu(false);
  };

  
    
  const updateVehicule= () => {
    setIsLoading(true);
    Api_client.post("vehicule/vehicule/", {
    make: makeu,
    model: modelu,
    numero_chassi: numeroChassiu,
    license_plate: licensePlateu,
    type_carburant: typeCarburantu,
    })
      .then((response) => {
        setIsLoading(false);
        setopenModal(false);
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
       setIsLoading(false);
      });
  };




  const columns = [
   
    {
      field: "make",
      headerName: "Make",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "license_plate",
      headerName: "License Plate",
      flex: 1,
    },
    {
      field: "type_carburant",
      headerName: "Fuel",
      flex: 1,
    },
    {
      field: "numero_chassi",
      headerName: "Car chassis Number",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.value}
          <IconButton
            aria-label="more"
            aria-haspopup="true"
            style={{ marginLeft: "auto" }}
            onClick={(event) => handleMenuClick(event, params.row.id)}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="VEHICLES" subtitle="Vehicle list" />
      <Box display="flex" justifyContent="flex-end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          style={{ marginRight: "10px", marginBottom: "-30px" }}
          onClick={handleOpenDialog}
        >
          Create
        </Button>
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >

<Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
  <DialogTitle>Vehicle Status</DialogTitle>
  <DialogContent>
    <FormControl>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Eau" />
        <FormControlLabel control={<Checkbox />} label="Lubrifiant" />
        <FormControlLabel control={<Checkbox />} label="Contrôle technique" />
        <FormControlLabel control={<Checkbox />} label="Freins" />
      </FormGroup>
    </FormControl>
  </DialogContent>
</Dialog>

        <DataGrid
          rows={data}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <Dialog open={open} onClose={handleCloseDialog} sx={{ "& .MuiDialog-paper": { width: "15cm", height: "10cm" } }}>
      <DialogTitle>
    <Box display="flex" justifyContent="center">
      <Typography variant="h2" component="div" fontWeight="bold">
        Create New Vehicle
      </Typography>
    </Box>
  </DialogTitle>
  <DialogContent>
    <form style={{ width: "100%", height: "80%" }}>
      <Grid container spacing={1} style={{ height: "100%", marginTop: "20px" }}>
       
        <Grid item xs={6}>
          <Box height="100%">
          <Typography 
          variant="h6" 
          style={{ marginBottom: "10px" }}>
                   Make
                        </Typography>
            <input 
            onChange={(e) => setMake(e.target.value)}
            type="text" 
            placeholder="Vehicle make" 
            style={{ width: "90%", height: "40%" }} />
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box height="100%">
           <Typography 
              variant="h6" 
              style={{ marginBottom: "10px", marginLeft:"10px" }}>
                     Model
           </Typography>
            <input 
                onChange={(e) => setModel(e.target.value)}
                type="text" 
                placeholder="Vehicle model" 
                style={{ width: "100%", height: "40%", marginLeft:"10px"  }} />
          </Box>
        </Grid>

       <Grid item xs={6}>
        <Box height="100%">
          <Typography 
            variant="h6" 
            style={{ marginBottom: "10px",}}>
                  License plate
          </Typography>
            <input onChange={(e) => setLicensePlate(e.target.value)}
            type="text" placeholder="License plate" style={{ width: "90%", height: "40%",}} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px",marginLeft:"8px"  }}>Car chassis number</Typography>
            <input onChange={(e) => setNumeroChassi(e.target.value)}
            type="text" placeholder="Car chassis number" style={{ width: "100%", height: "40%",marginLeft:"px" }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
      <FormControl fullWidth color="secondary" size="small">
        <InputLabel id="typeCarburant">Fuel Type</InputLabel>
        <Select
                    label='Intitule'
                    onChange={(e) => {
                      setTypeCarburant(e.target.value);
                    }}>
                    
                      <MenuItem value="DIESEL">Diesel</MenuItem>
                      <MenuItem value="ESSENCE">Essence</MenuItem>
                  
                  </Select>
      </FormControl>
    </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
        <IconButton onClick={createVehicule}>
          <CheckIcon />
        </IconButton>

        <IconButton onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </Box>
    </form>
  </DialogContent>
</Dialog>


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
      
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>
          
              <Grid item xs={6}>
                <TextField
                  label='make'
                  value={makeu}
                  onChange={(e) => {
                    setMakeu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField 
                  label='Model'
                  value={modelu}
                  onChange={(e) => {
                    setModelu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='NumeroChassi'
                  value={numeroChassiu}
                  onChange={(e) => {
                    setNumeroChassiu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='LicensePlate'
                  value={licensePlateu}
                  onChange={(e) => {
                    setLicensePlate(e.target.value);
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
        <IconButton onClick={updateVehicule}>
          <CheckIcon />
        </IconButton>

        <IconButton onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </Box>
          </Box>
        </Box>
      </Modal>





      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleActionClick("View Details")}>View Details</MenuItem>
        <MenuItem onClick={() => handleActionClick("Vehicle Status")}>Vehicle Status</MenuItem>
        <MenuItem onClick={() => updateVehicule("Rename")}>Rename</MenuItem>
        <MenuItem onClick={() => deleteVehicule(selectedRowId)}>Delete</MenuItem>
      </Menu>
      
    </Box>
  );
};

export default Contacts;








