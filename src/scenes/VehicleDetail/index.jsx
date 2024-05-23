import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { Api_client } from '../../data/Api';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Detail = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const location = useLocation();
const id_vehicule = location.state;
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const customGridStyle = {
display: 'grid',
gridTemplateColumns: 'repeat(6, 1fr)',
gap: '10px',
};
const [selectedDate, setSelectedDate] = useState(new Date());

const handleDateChange = (date) => {
  setSelectedDate(date);
  const datee = new Date(date);
 
  const formattedDate = datee.toISOString().split("T")[0];;
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
console.log([response.data],"ttttttttttttttttttttttt");
});
};
fetchVehiculeInfo();
}, [id_vehicule]);
 

const detailData = Array.isArray(data) ? data.map((item) => ({
date: item.mouvements[0].date_create,
conducteur:item.mouvements[0].conducteur,
demandeur:item.mouvements[0].demandeur,
destination:item.mouvements[0].destination,
objet:item.mouvements[0].objet,
heure_depart:item.mouvements[0].heure_depart,
heure_retour:item.mouvements[0].heure_retour,
assurance: item.mouvements[0].assurance || 0 ,
controleTechnique: item.mouvements[0].controleTechnique,
mouvement: item.mouvements[0].mouvement,
verification: item.mouvements[0].verification,
entretien: item.mouvements[0].entretien,
})): [];
return (
<Box m="20px">
<Header title="Vehicule Detail" subtitle="" />

<DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd"/>

<Box m="40px 0 0 0">
<table className="custom-grid" style={{ width: '100%', borderCollapse: 'collapse',marginBottom:'20px' }}>
<thead>

<tr> 
  <th style={{ 
               border: '1px solid black', 
               textAlign: 'center', 
               backgroundColor: '#3e4396', 
               color: 'white', 
               fontSize: 'larger', 
               height:"50px", }}>Date</th>
 <th style={{ border: '1px solid black', 
 textAlign: 'center', 
 backgroundColor: '#3e4396', 
 color: 'white', 
 fontSize: 'larger' }}>Assurance</th> 
 <th style={{ 
  border: '1px solid black', 
  textAlign: 'center', 
  backgroundColor: '#3e4396', 
  color: 'white', 
  fontSize: 'larger' }}>Contrôle Technique</th> 
  <th style={{ 
    border: '1px solid black', 
    textAlign: 'center', 
    backgroundColor: '#3e4396', 
    color: 'white', 
    fontSize: 'larger' }}>Mouvement</th>
     <th style={{ 
      border: '1px solid black', 
      textAlign: 'center', 
      backgroundColor: '#3e4396', 
      color: 'white', fontSize: 'larger' }}>Vérification</th> 
      <th style={{ 
        border: '1px solid black', 
        textAlign: 'center', 
        backgroundColor: '#3e4396', 
        color: 'white', 
        fontSize: 'larger' }}>Entretien</th> 
        </tr> 
        </thead>
         <tbody> 
             {detailData.map((row, index) => ( 
                            <React.Fragment key={index}> 
                            <tr className="custom-row">
                               <td style={{ 
                                border: '1px solid black', 
                                textAlign: 'center' }}>{row.date}</td> 
                                <td style={{ 
                                  border: '1px solid black', 
                                  textAlign: 'center' }}>{row.assurance.remaining}</td>
                                  <td style={{ 
                                    border: '1px solid black', 
                                    textAlign: 'center' }}> { row.controleTechnique && ( <> Description: 
                                    {row.controleTechnique.description} <br /> Cout:
                                     {row.controleTechnique.cout} <br /> </> )}


</td>
      <td style={{ border: '1px solid black', textAlign: 'center' }}>
      Conducteur:{row.conducteur} <br />
      Demandeur: {row.demandeur} <br />
      Destination: {row.destination} <br />
      Objet: {row.objet} <br />
      Heure: {row.heure_depart} - {row.heure_retour}

      </td>
      <td style={{ border: '1px solid black', textAlign: 'center' }}>
{ row.verification && (
  <>
  Eau: {row.verification.eau} <br />
  Lubrifiant: {row.verification.lubrifiant} <br />
  Frein: {row.verification.frein}
  </>
)

}
      </td>
      <td style={{ border: '1px solid black', textAlign: 'center' }}>
        {row.entretien && (
          <>
            panne: {row.entretien.panne}: {row.entretien.main_oeuvre}fr<br />
            piece de rechange: {row.entretien.piece_rechange}<br />
            cout piece: {row.entretien.cout_piece} <br />
            total: {row.entretien.total} fr<br />
          </>
        )}
      </td>
    </tr>
  </React.Fragment>
))}

</tbody> </table> </Box> </Box> ); };

export default Detail;


