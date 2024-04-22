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

  const [id, setid] = useState();

  const [vehiculeu, setVehiculeu] = useState();
  const [coutu, setCoutu] = useState();
  const [descriptionu, setDescriptionu] = useState();
  const [SelectVehiculeu, setSelectVehiculeu] = useState("");

  
  const [data, setdata] = useState([]);
  const [CarburantData, setCarburantData] = useState([]);

  const fetchData = () => {
    setisLoading(true);
    Api_client.get("controle/assurances/")
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
    Api_client.get("vehicle/vehicle/").then((response) => {
      setisLoading(false);
      setVehicule(response.data);
    });
  };

  const mouvementData = CarburantData.map(item =>

    ({
      id:item.id,
      vehicule:item.vehicule_info.vehicule,
      description: item.description,
      cout: item.cout,
    
    } ) 
    
    );

  useEffect(() => {
    fetchData();
    fetchVehicule();
  }, []);

  const handleCloseDialog = () => {
    setopenModal(false);
  };

  // CREATE

  const createControleTechnique= () => {
    setisLoading(true);
    Api_client.post("controle/controle-techniques/", {
      vehicle: vehicule,
      description: description,
      cout: cout,
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
    Api_client.put(`controle/controle-techniques/${id}`, {
      vehicle: vehiculeu,
      description: descriptionu,
      cout: coutu,
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
      field: "description",
      headerName: "description",
      flex: 1,
      cellClassName: "description-column--cell",
    },
    {
      field: "cout",
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
              setVehiculeu(params.row.vehicle);
              setDescriptionu(params.row.description);
              setCoutu(params.row.cout);
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
        <DataGrid  rows={CarburantData} columns={columns} />
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
                      <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem>
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
        <IconButton onClick={createControleTechnique}>
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
          <Typography variant='h3'>Entretien</Typography>
          <Box margin={2}>
            <Grid container spacing={2} item xs={12} alignItems='center'>

            <Grid item xs={6}>
                <FormControl fullWidth color='secondary'>
                  <InputLabel id='vehicle'>Vehicle</InputLabel>
                  <Select
                    label='Vehicle'
                    onChange={(e) => {
                      setVehicule(e.target.value);
                    }}>
                    {vehicule.map((item) => (
                      <MenuItem value={item.license_plate}>{item.license_plate}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Description'
                  value={descriptionu}
                  onChange={(e) => {
                    setDescriptionu(e.target.value);
                  }}
                  color='secondary'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Cout'
                  value={coutu}
                  onChange={(e) => {
                    setCoutu(e.target.value);
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
              onClick={updateControleTechnique}>
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

export default ControleTechnique;