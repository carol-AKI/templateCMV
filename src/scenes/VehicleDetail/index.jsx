import React from 'react';

const VehicleDetail = () => {
  const rows = [
    { id: 1, colonne1: '',
     colonne2: '',colonne3: '',
     colonne4: '',colonne5: '',
     colonne6: '',colonne7: '',
     colonne8: '',colonne9: '',
     colonne10: '',colonne11: ' ',
  }

  ];

  return (
    <div className="table-container">

<div>
      <h2 className="title">Vehicle Detail</h2>
      <style>{`
        .title {
          font-size: 32px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Colonne 1</th>
            <th>Colonne 2</th>
            <th>Colonne 3</th>
            <th>Colonne 4</th>
            <th>Colonne 5</th>
            <th>Colonne 6</th>
            <th>Colonne 7</th>
            <th>Colonne 8</th>
            <th>Colonne 9</th>
            <th>Colonne 10</th>
            <th>Colonne 11</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <div className="column-content">{row.colonne1}</div>
              </td>
              <td>
                <div className="column-content">{row.colonne2}</div>
              </td>
              <td>{row.colonne3}</td>
              <td>{row.colonne4}</td>
              <td>{row.colonne5}</td>
              <td>{row.colonne6}</td>
              <td>{row.colonne7}</td>
              <td>{row.colonne8}</td>
              <td>{row.colonne9}</td>
              <td>{row.colonne10}</td>
              <td>{row.colonne11}</td>
     
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .table-container {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 8px;
          border: 1px solid #ccc;
        }

        thead {
          background-color: #f2f2f2;
        }

        .column-content {
          max-width: 160px;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

export default VehicleDetail;