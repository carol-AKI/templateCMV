import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { Api_client } from '../../data/Api';
import { useLocation } from 'react-router-dom';

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
useEffect(() => {
const fetchVehiculeInfo = () => {
setIsLoading(true);
Api_client.get(`vehicule/allinfo/${id_vehicule}`)
.then((response) => {
setIsLoading(false);
setData([response.data]);
console.log([response.data]);
});
};
fetchVehiculeInfo();
}, [id_vehicule]);

const detailData = data.map((item) => ({
id: id_vehicule,
assurrance: item.assurrance.valid,
controleTechniques: item.controleTechniques.valid,
mouvement:  item.mouvement.destination,
verification:item.verification.lubrifiant,           
entretien: item.entretien.operation,
}));

return (
  <Box m="20px">
    <Header title="" subtitle="" />
    <Box m="40px 0 0 0">
      <table className="custom-grid" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Assurance</th>
            <th>Contrôle Technique</th>
            <th>Mouvement</th>
            <th>Vérification</th>
            <th>Entretien</th>
          </tr>
        </thead>
        <tbody>
          {detailData.map((row, index) => (
            <React.Fragment key={index}>
              <tr className="custom-row">
                <td>{row.date}</td>
                <td>{row.assurrance}</td>
                <td>{row.controleTechniques}</td>
                <td>{row.mouvement}</td>
                <td>{row.verification}</td>
                <td>{row.entretien}</td>
              </tr>
              <tr key={`separator-${index}`}>
                <td colSpan="6" style={{ borderBottom: '1px solid black', height: '1px' }}>&nbsp;</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </Box>
  </Box>
);
};

export default Detail;
