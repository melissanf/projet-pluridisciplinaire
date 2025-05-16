import React, { useRef, useEffect, useState } from 'react';
import './OrganigrammeTable.css';

const OrganigrammeTable = ({ data, title, role, onEdit, onDelete }) => {
  const tableRef = useRef(null);
  const tbodyRef = useRef(null);
  const [rowHeights, setRowHeights] = useState([]);
  const [tbodyHeight, setTbodyHeight] = useState('auto');

  useEffect(() => {
    if (!tableRef.current || !tbodyRef.current) return;

    const rows = tableRef.current.querySelectorAll('tbody tr');
    const heights = Array.from(rows).map(row => row.getBoundingClientRect().height);
    setRowHeights(heights);

    // Hauteur totale du tbody pour la colonne actions
    const totalHeight = tbodyRef.current.getBoundingClientRect().height;
    setTbodyHeight(totalHeight);
  }, [data]);

  const handleDelete = (ligne) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la ligne du module "${ligne.Module}" ?`
    );
    if (confirmDelete) onDelete(ligne);
  };

  return (
    <div className="organigramme-section">
      <h2>{title}</h2>
      <div className="organigramme-wrapper">
        <table className="organigramme-table" ref={tableRef}>
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
          <tbody ref={tbodyRef}>
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

        {role === 'chef departement' && (
          <div
            className="actions-column"
            style={{ height: tbodyHeight }} // même hauteur totale que tbody
          >
            <div className="actions-header">Actions</div>
            {data.map((ligne, index) => (
              <div
                key={index}
                className="actions-cell"
                style={{ height: rowHeights[index] ? `${rowHeights[index]}px` : '40px' }}
              >
                <button className="exchange-btn" onClick={() => onEdit(ligne)}>
                  Échanger
                </button>
                <button className="delete-btn" onClick={() => handleDelete(ligne)}>
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganigrammeTable;
