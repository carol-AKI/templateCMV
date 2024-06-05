import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from '../../components/Header';
import { Api_client } from '../../data/Api';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StatBox from "../../components/StatBox";
import { tokens } from '../../theme';


const useStyles = makeStyles((theme) => ({
  
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)', 
    gap: '20px',
    overflowY: 'auto', 
    maxHeight: 'calc(85vh - 100px)', 
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'calc(100vh - 150px)',
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: 'calc(100vh - 100px)',
      gridTemplateColumns: 'repeat(3, 1fr)', 
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    padding: '20px',
  },
  statBoxContainer: {
    backgroundColor:'#1f2a40',
    borderRadius: '10px',
    padding: '20px',
    height:'120px'
  },
  datepicker:{
  position: 'absolute',
  top: '90px',
  right: '40px',
  backgroundColor: '#fff',
  padding: '10px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  vehicule:{
fontSize:'30px',
marginBottom:'30px',
marginLeft:'600px',
color:'#4cceac',
  }
}));

const Detail = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const classes = useStyles();
const location = useLocation();
const id_vehicule = location.state;
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [vehiculeData, setVehiculeData] = useState(null);
const [selectedDate, setSelectedDate] = useState(new Date());

const handleDateChange = (date) => {
setSelectedDate(date);
const formattedDate = date.toISOString().split("T")[0];
Api_client.get(`vehicule/allinfo/${id_vehicule}?date_create=${formattedDate}`)
.then((response) => {
setData(response.data);
console.log(response.data);
})
.catch((error) => {
console.error(error);
});
};

useEffect(() => {
const fetchVehiculeInfo = () => {
setIsLoading(true);
Api_client.get(`vehicule/allinfo/${id_vehicule}`)
.then((response) => {
setIsLoading(false);
setData([response.data]);
setVehiculeData(response.data);
console.log([response.data], "ttttttttttttttttttttttt");
});
};
fetchVehiculeInfo();
}, [id_vehicule]);

const detailData = data.flatMap((item) =>
item.mouvements.map((mouvement) => ({
  vehicle: item.vehicule.make, 
  date: mouvement.date_create,
  conducteur: mouvement.conducteur,
  demandeur: mouvement.demandeur,
  destination: mouvement.destination,
  objet: mouvement.objet,
  heure_depart: mouvement.heure_depart,
  heure_retour: mouvement.heure_retour,
  assurance: mouvement.assurance.remaining || 0,
  controleTechnique: mouvement.controleTechnique,
  mouvement: mouvement.mouvement,
  verification: {
    eau: mouvement.verification.eau,
    lubrifiant: mouvement.verification.lubrifiant,
    freins: mouvement.verification.freins,
  },
  entretien: mouvement.entretien,
  carburant:mouvement.carburant,
}))
);

return (
<Box m="20px">
<Header 
title="Vehicule Detail" 
/>

<Box className={classes.vehicule}>
{vehiculeData ? `${vehiculeData.vehicule.make} / ${vehiculeData.vehicule.license_plate}` : ''}
</Box>
<Box className={classes.datepicker}>
<DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
</Box>

<Box className={classes.gridContainer}>
{detailData.map((row, index) => (
    <React.Fragment key={index}>
                <Box
        className={classes.item}
        style={{
          gridColumn: '1 / 2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">{row.date}</Typography>
      </Box>

      <Box className={classes.statBoxContainer}>
                <StatBox
                  title="COURSES"
                  subtitle={
                    <Box>
                      Destination: {row.destination} <br />
                      Objet: {row.objet} <br />
                    </Box>
                  }
                />
                </Box>

               <Box className={classes.statBoxContainer}>
                <StatBox
                  title="CONTROLE"
                  subtitle={
                    <>
                      Assurance: {row.assurance.remaining} <br />
                      C.Technique: {row.controleTechnique.description} <br />
                    </>
                  }
                />
</Box>
                 <Box className={classes.statBoxContainer}>
                <StatBox
                  title="VERFICATION"
                  subtitle={
                    <Box>
                      Eau: {row.verification.eau} <br />
                      Lubrifiant: {row.verification.lubrifiant} <br />
                      Frein: {row.verification.freins} <br />
                    </Box>
                  }
                />
                </Box>
               <Box className={classes.statBoxContainer}>
                <StatBox
                  title="MAINTENANCE"
                  subtitle={
                    <>
                      Operation: {row.entretien.operation}<br />
                      Cout: {row.entretien.total}<br />
                    </>
                  }
                 
                />
              </Box>
              <Box className={classes.statBoxContainer}>
                <StatBox
                  title="CARBURANT"
                  subtitle={row.controleTechnique && (
                    <>
                      Quantite: {row.carburant.litre} <br />
                      Station: {row.carburant.station} <br />
                    </>
                  )}
                />
             </Box>
            </React.Fragment>
          ))}
</Box>
</Box>
);
};

export default Detail;
