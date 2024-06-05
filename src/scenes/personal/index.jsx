import React, { useState, useEffect } from "react";
import {
Box,
Button,
Dialog,
DialogContent,
IconButton,
Typography,
Grid,
Select,
FormControl,
InputLabel,
MenuItem,
TextField,
Modal,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Api_client } from "../../data/Api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Personal = () => {
const group_name = sessionStorage.getItem("group_name");
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const [open, setOpen] = useState(false);
const [nom, setNom] = useState('');
const [prenom, setPrenom] = useState('');
const [adresse, setAdresse] = useState('');
const [telephone, setTelephone] = useState('');
const [email, setEmail] = useState('');
const [intitule, setIntitule] = useState('');

const [openModalu, setopenModalu] = useState(false);
const [nomu, setNomu] = useState('');
const [prenomu, setPrenomu] = useState('');
const [adresseu, setAdresseu] = useState('');
const [telephoneu, setTelephoneu] = useState('');
const [emailu, setEmailu] = useState('');
const [intituleu, setIntituleu] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [id, setId] = useState();
const fetchData = () => {
      setIsLoading(true);
                   Api_client.get("parametrage/personnelle/").then((response) => {
      setIsLoading(false);
      setData(response.data);
      setIntitule(response.data);
    
});
};

      useEffect(() => {
      fetchData();
}, []);

const handleOpenDialog = () => {
      setOpen(true);
};
const handleCloseu = () => {
  setopenModalu(false);
};

const handleSetDialog = () => {
      setOpen(false);
      submitForm(formData);
};

const handleCloseDialog = () => {
      setOpen(false);
};


const submitForm = async (formData) => {
  try {
  const response = await Api_client.post("parametrage/personnelle/", formData);
  if (response.status !== 200) {
  throw new Error("Une erreur est survenue lors de la soumission du formulaire.");
  }
  } catch (error) {
  console.error(error);
  alert("L'erreur est survenue, Veuillez vérifier vos champs que ce sont correctement complétés");
  }
  };

const formData = {
      nom: nom,
      prenom: prenom,
      adresse: adresse,
      telephone: telephone,
      email: email,
      intitule: intitule,
};


 // CREATE

 const createPersonnelle= () => {
  setIsLoading(true);
  Api_client.post("parametrage/personnelle/", {
    nom: nom,
    prenom: prenom,
    adresse: adresse,
    telephone: telephone,
    email: email,
    intitule: intitule,
  })
    .then((response) => {
      setIsLoading(false);
      fetchData();
      console.log(response.data);
      handleCloseDialog(); 
    })
    .catch((error) => {
      setIsLoading(false);
    });
};

// UPDATE

const updatePersonnelle = () => {
  setIsLoading(true);
  Api_client.put(`parametrage/personnelle/${id}/`, {
  nom: nomu,
  prenom: prenomu,
  adresse: adresseu,
  telephone: telephoneu,
  email: emailu,
  intitule: intituleu,
  })
  .then((response) => {
  setIsLoading(false);
  setopenModalu(false);
  fetchData();
  console.log(response.data);
  })
  .catch((error) => {
  setIsLoading(false);
  console.error(error);
  });
  };

  // DELETE

  const deletePersonnelle = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };


const columns = [
            {
     field: "nom",
     headerName: "Nom",
     flex: 1,
             },
   {
    field: "prenom",
    headerName: "Prenom",
    flex: 1,
  },
{
    field: "email",
    headerName: "Email",
    flex: 1,
  },
{
    field: "adresse",
    headerName: "Addresse",
    flex: 1,
},
{
    field: "telephone",
    headerName: "Numero de telephone",
    flex: 1,
},
{
    field: "intitule",
    headerName: "Intitule",
    flex: 1,
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
          setId(params.row.id);
          setNomu(params.row.nom);
          setPrenomu(params.row.prenom);
          setTelephoneu(params.row.telephone);
          setAdresseu(params.row.adresse);
          setEmailu(params.row.email);
          setIntituleu(params.row.intitule);
  }}>
  <EditIcon />
  </IconButton>
  
  <IconButton
  onClick={() => {
  deletePersonnelle(params.row.id);
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
      style={{ marginRight: "10px", height: "25px" }}
      onClick={''}
    >
      Restore
    </Button>);
  }
  },
  },
  ];
return (
        <Box m="20px">
        <Header title="PERSONAL" subtitle="Personal list" />
        <Box display="flex" justifyContent="flex-end" mt="10px">
        {group_name !== 'superuser' && (
<Button
      type="submit"
      color="secondary"
      variant="contained"
      style={{ marginRight: '10px', marginBottom: '-30px' }}
      onClick={handleOpenDialog}
>
                Create
</Button>)}
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
                         whiteSpace: "nowrap",
                         overflow: "hidden",
                         textOverflow: "ellipsis",
                         cursor: "pointer",
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
<DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
/>
</Box>
<Modal open={open} onClose={handleCloseDialog}>
     <Box
         sx={{
         position: "absolute",
         top: "50%",
         left: "50%",
         transform: "translate(-50%, -50%)",
         width: 700,
         bgcolor: "#1f2a40",
         boxShadow: 24,
         p: 4,
         borderRadius: '10px',
}}
>
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
        Creation Personnelle
   </Typography>
  </Box>
 <Box margin={2}>
<Grid container spacing={2} item xs={12} alignItems='center'>
<Grid item xs={6}>
<TextField
         label='nom'
         fullWidth
         color='secondary'
         size='small'
         onChange={(e) => {
         setNom(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
<TextField
         label='prenom'
         fullWidth
         color='secondary'
         size='small'
         onChange={(e) => {
         setPrenom(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
         <TextField
         label='telephone'
         fullWidth
         color='secondary'
         size='small'
         onChange={(e) => {
         setTelephone(e.target.value);
         }}
/>
</Grid>
<Grid item xs={6}>
<TextField
         label='adresse'
         fullWidth
         color='secondary'
         size='small'
         onChange={(e) => {
         setAdresse(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
<TextField
          label='mail'
          fullWidth
          color='secondary'
          size='small'
          onChange={(e) => {
          setEmail(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
<FormControl fullWidth color='secondary' size='small'>
<InputLabel id='intitule'>Intitule</InputLabel>
<Select
label='Intitule'
onChange={(e) => {
setIntitule(e.target.value);
}}
>
<MenuItem value="demandeur">demandeur</MenuItem>
<MenuItem value="conducteur">conducteur</MenuItem>
</Select>
</FormControl>
</Grid>
<Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
<IconButton
onClick={createPersonnelle}
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
  </Grid>
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
         width: 700,
         bgcolor: "#1f2a40",
         boxShadow: 24,
         p: 4,
         borderRadius: '10px',
}}
>
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
        Editer Personnelle
   </Typography>
  </Box>
 <Box margin={2}>
<Grid container spacing={2} item xs={12} alignItems='center'>
<Grid item xs={6}>
<TextField
         label='nom'
         fullWidth
         value={nomu}
         color='secondary'
         size='small'
         onChange={(e) => {
         setNomu(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
<TextField
         label='prenom'
         fullWidth
         value={prenomu}
         color='secondary'
         size='small'
         onChange={(e) => {
         setPrenomu(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
         <TextField
         label='telephone'
         fullWidth
         value={telephoneu}
         color='secondary'
         size='small'
         onChange={(e) => {
         setTelephoneu(e.target.value);
         }}
/>
</Grid>
<Grid item xs={6}>
<TextField
         label='adresse'
         fullWidth
         value={adresseu}
         color='secondary'
         size='small'
         onChange={(e) => {
         setAdresseu(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
<TextField
          label='mail'
          fullWidth
          value={emailu}
          color='secondary'
          size='small'
          onChange={(e) => {
          setEmailu(e.target.value);
}}
/>
</Grid>
<Grid item xs={6}>
<FormControl fullWidth color='secondary' size='small'>
<InputLabel id='intitule'>Intitule</InputLabel>
<Select
label='Intitule'
value={intituleu}
onChange={(e) => {
setIntituleu(e.target.value);
}}
>
<MenuItem value="demandeur">demandeur</MenuItem>
<MenuItem value="conducteur">conducteur</MenuItem>
</Select>
</FormControl>
</Grid>
<Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
<IconButton
onClick={updatePersonnelle}
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
  </Grid>
 </Box>
   </Box>
     </Modal>
        </Box>
);
};

export default Personal;
