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

const Maintenance = () => {
  const group_name = sessionStorage.getItem("group_name");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [panne, setPanne] = useState([]);
  const [operation, setOperation] = useState([]);
  const [main_oeuvre, setMainOeuvre] = useState();
  const [piece_rechange, setPieceRechange] = useState();
  const [cout_piece, setCoutPiece] = useState();
  const [total, setTotal] = useState();
  const [garage, setGarage] = useState();
  const [vehicule, setVehicule] = useState([]);
  const [selectedVehicule, setSelectedVehicule] = useState([]); 

  const [id, setid] = useState();
  const [vehiculeu, setVehiculeu] = useState();
  const [operationu, setOperationu] = useState();
  const [main_oeuvreu, setMainOeuvreu] = useState();
  const [cout_pieceu, setCoutPieceu] = useState();
  const [panneu, setPanneu] = useState();
  const [totalu, setTotalu] = useState();
  const [piece_rechangeu, setPieceRechangeu] = useState();
  const [garageu, setGarageu] = useState();
  
  const [data, setdata] = useState([]);

  const fetchData = () => {
    setisLoading(true);
    Api_client.get("entretien/entretien/")
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

  
  useEffect(() => {
    fetchData();
    fetchVehicule();
  }, []);

  const handleCloseDialog = () => {
    setopenModal(false);
  };

  const maintenanceData = data.map((item) => ({
    id:item.id,
    vehicle:item.vehicule_info.vehicule,
    vehicule_id: item.vehicle,
    garage_name: item.garage_name,
    panne: item.panne,
    operation: item.operation,
    main_oeuvre: item.main_oeuvre,
    piece_rechange: item.piece_rechange,
    cout_piece: item.cout_piece,
    total: item.total,
  }));
  // CREATE

  
const createMaintenance = () => {
  setisLoading(true);
  Api_client.post("entretien/entretien/", {
  vehicle: selectedVehicule,
  garage_name: garage,
  panne: panne,
  operation: operation,
  main_oeuvre: main_oeuvre,
  piece_rechange: piece_rechange,
  cout_piece: cout_piece,
  total: total,
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

  const updateMaintenance= () => {
    setisLoading(true);
    Api_client.put(`entretien/entretien/${id}`, {
      vehicle: vehiculeu,
      panne: panneu,
      operation: operationu,
      main_oeuvre: main_oeuvreu,
      piece_rechange: piece_rechangeu,
      cout_piece: cout_pieceu,
      garage_name: garageu,
      total: totalu,
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

  const deleteMaintenance= (id) => {
    setisLoading(true);
    Api_client.delete(`entretien/entretien/${id}`)
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
      field: "garage_name",
      headerName: "garage",
      flex: 1,
      cellClassName: "garage-column--cell",
    },
    {
      field: "panne",
      headerName: "panne",
      flex: 1,
      cellClassName: "panne-column--cell",
    },
    {
      field: "operation",
      headerName: "operation",
      flex: 1,
      cellClassName: "operation-column--cell",
    },
    {
      field: "main_oeuvre",
      headerName: "main_oeuvre",
      flex: 1,
      cellClassName: "main_oeuvre-column--cell",
    },
    {
      field: "piece_rechange",
      headerName: "piece_rechange",
      flex: 1,
      cellClassName: "piece_rechange-column--cell",
    },
    {
      field: "cout_piece",
      headerName: "cout_piece",
      flex: 1,
      cellClassName: "cout_piece-column--cell",
    },
    {
      field: "total",
      headerName: "total",
      flex: 1,
      cellClassName: "total-column--cell",
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
        setOperationu(params.row.operation);
        setPanneu(params.row.panne);
        setMainOeuvreu(params.row.main_oeuvre);
        setPieceRechangeu(params.row.piece_rechange);
        setCoutPieceu(params.row.cout_piece);
        setGarageu(params.row.garage_name);
        setTotalu(params.row.total);
      }}>
      <EditIcon />
      </IconButton>
      
      <IconButton
      onClick={() => {
      deleteMaintenance(params.row.id);
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
        <Header title='ENTRETIEN' subtitle='liste des Operation' />
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
        <DataGrid  rows={maintenanceData} columns={columns} />
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
       Creation Maintenance
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
                  label='panne'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setPanne(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='operation'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setOperation(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='main_oeuvre'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setMainOeuvre(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='piece_rechange'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setPieceRechange(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='cout_piece'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setCoutPiece(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='garage'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setGarage(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='total'
                  fullWidth
                  color='secondary'
                  size='small'
                  onChange={(e) => {
                    setTotal(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
    <Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
      <IconButton
        onClick={createMaintenance}
         sx={{
               '&:hover': {
         backgroundColor: '#4cceac',
      },
    }}
  >
    <CheckIcon />
  </IconButton>

  <IconButton
    onClick={() => handleCloseDialog()}
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
       Editer Maintenance
      </Typography>
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
                  label='panne'
                  fullWidth
                  value={panneu}
                  onChange={(e) => {
                    setPanneu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Operation'
                  fullWidth
                  value={operationu}
                  onChange={(e) => {
                    setOperationu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Main_oeuvre'
                  fullWidth
                  value={main_oeuvreu}
                  onChange={(e) => {
                    setMainOeuvreu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Piece_rechange'
                  fullWidth
                  value={piece_rechangeu}
                  onChange={(e) => {
                    setPieceRechangeu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Cout_piece'
                  fullWidth
                  value={cout_pieceu}
                  onChange={(e) => {
                    setCoutPieceu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='garage'
                  fullWidth
                  value={garageu}
                  onChange={(e) => {
                    setGarageu(e.target.value);
                  }}
                  color='secondary'
                  size='small'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='Total'
                  fullWidth
                  value={totalu}
                  onChange={(e) => {
                    setTotalu(e.target.value);
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
     onClick={updateMaintenance}
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

export default Maintenance;