import React, { useEffect, useState } from "react";
import { Typography,Box, Button, Dialog, DialogContent, DialogTitle, Modal,IconButton, Grid, InputLabel, Menu, MenuItem, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import axios from "axios";
import { Api_client } from "../../data/Api";

const Contacts = () => {
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [id, setId] = useState();
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [numeroChassi, setNumeroChassi] = useState();
  const [typeCarburant, setTypeCarburant] = useState();
  const [licensePlate, setLicensePlate] = useState();
  const [makeu, setMakeu] = useState();
  const [modelu, setModelu] = useState();
  const [numeroChassiu, setNumeroChassiu] = useState();
  const [typeCarburantu, setTypeCarburantu] = useState();
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

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    submitForm(formData);
  };
  const handleCloseu = () => {
    setopenModalu(false);
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
      navigate(`/VehicleDetail/${selectedRowId}`);
    } else if (action === "Vehicle Status") {
      setStatusDialogOpen(true);
    } else if (action === "Rename") { // Ouvrir le modal de mise à jour du véhicule en cliquant dessus
     const vehicleData = data.find(vehicle => vehicle.id === selectedRowId);
     // Pré-remplir le formulaire de mise à jour avec les données existantes du véhicule
     setId(vehicleData.id);
     setMakeu(vehicleData.make);
     setModelu(vehicleData.model);
     setNumeroChassiu(vehicleData.numero_chassi);
     setTypeCarburantu(vehicleData.type_carburant);
     setLicensePlateu(vehicleData.license_plate);
     setopenModalu(true);
   }else {
      console.log(`Clicked on ${action} for row with id: ${selectedRowId}`);
    }
    handleMenuClose();
  };



  const submitForm = async (formData) => {
    try {
      Api_client.post("vehicule/vehicule/",
        formData
      );
    } catch (error) {
      console.error(error);
    }
  };
     //updatevehicule
  const updateVehicule = () => {
    setIsLoading(true);
    Api_client.put(`vehicule/vehicule/${id}`, {
       make: makeu,
       model: modelu,
       numero_chassi: numeroChassiu,
       license_plate: licensePlateu,
       type_carburant: typeCarburantu,
      
    })
      .then((response) => {
        setIsLoading(false);
        setopenModalu(false);
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const formData = {
    make: make,
    model: model,
    numero_chassi: numeroChassi,
    license_plate: licensePlate,
    type_carburant: typeCarburant,
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
   
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
            onClick={(event) => handleMenuClick(event, params.id)}
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
        <Grid item xs={5}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px" }}>Make</Typography>
            <input onChange={(e) => setMake(e.target.value)}
            type="text" placeholder="Vehicle make" style={{ width: "90%", height: "40%" }} />
          
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px", marginLeft:"20px"}}>Fuel</Typography>
            <input type="text" placeholder="Fuel type" style={{ width: "90%", height: "40%",marginLeft:"20px" }} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px" }}>Model</Typography>
            <input onChange={(e) => setModel(e.target.value)}
            type="text" placeholder="Vehicle model" style={{ width: "100%", height: "40%" }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px", marginLeft:"20px" }}>License plate</Typography>
            <input onChange={(e) => setLicensePlate(e.target.value)}
            type="text" placeholder="License plate" style={{ width: "90%", height: "40%",marginLeft:"20px" }} />
          </Box>
        </Grid>
        <Grid item xs={11}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px" }}>Car chassis number</Typography>
            <input onChange={(e) => setNumeroChassi(e.target.value)}
            type="text" placeholder="Car chassis number" style={{ width: "100%", height: "40%" }} />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
        <IconButton onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={handleCloseDialog}>
          <ArrowDownwardRoundedIcon />
        </IconButton>
      </Box>
    </form>
  </DialogContent>
</Dialog>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleActionClick("View Details")}>View Details</MenuItem>
        <MenuItem onClick={() => handleActionClick("Vehicle Status")}>Vehicle Status</MenuItem>
        <MenuItem onClick={() => handleActionClick("Rename")}>Rename</MenuItem>
        <MenuItem onClick={() => handleActionClick("Delete")}>Delete</MenuItem>
      </Menu>
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
                  label='model'
                  value={modelu}
                  onChange={(e) => {
                    setModelu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='numeroChassi'
                  value={numeroChassiu}
                  onChange={(e) => {
                    setNumeroChassiu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='typeCarburant'
                  value={typeCarburantu}
                  onChange={(e) => {
                    setTypeCarburantu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='licenseplate'
                  value={licensePlateu}
                  onChange={(e) => {
                    setLicensePlateu(e.target.value);
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
              onClick={updateVehicule}>
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

export default Contacts;








