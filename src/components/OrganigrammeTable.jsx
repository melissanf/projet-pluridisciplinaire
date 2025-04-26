import React from 'react';
import './OrganigrammeTable.css';

const OrganigrammeTable = ({ data, title }) => {
  return (
    <div className="organigramme-section">
      <h2>{title}</h2>
      <table className="organigramme-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Module</th>
            <th>Cours</th>
            <th>TD1</th>
            <th>TD2</th>
            <th>TD3</th>
            <th>TD4</th>
            <th>TP1</th>
            <th>TP2</th>
            <th>TP3</th>
            <th>TP4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ligne, index) => (
            <tr key={index}>
              <td>{ligne.Section}</td>
              <td>{ligne.Module}</td>
              <td>{ligne.Cours}</td>
              <td>{ligne.TD1}</td>
              <td>{ligne.TD2}</td>
              <td>{ligne.TD3}</td>
              <td>{ligne.TD4}</td>
              <td>{ligne.TP1}</td>
              <td>{ligne.TP2}</td>
              <td>{ligne.TP3}</td>
              <td>{ligne.TP4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganigrammeTable;