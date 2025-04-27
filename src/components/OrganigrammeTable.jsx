import React from 'react';
import './OrganigrammeTable.css';

const OrganigrammeTable = ({ data, title, role, onEdit, onDelete }) => {
  const handleDelete = (ligne) => {
    // Affichage du message de confirmation
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la ligne du module "${ligne.Module}" ?`
    );

    // Si l'utilisateur confirme, on appelle la fonction onDelete pour supprimer la ligne
    if (confirmDelete) {
      onDelete(ligne);
    }
  };

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
            {role === 'chef departement' && <th>Actions</th>}
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
              {role === 'chef departement' && (
                <td>
                  <button
                    className="exchange-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(ligne); // Appelle la fonction d'échange
                    }}
                  >
                    Échanger
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(ligne); // Appelle la fonction de suppression avec confirmation
                    }}
                  >
                    ❌
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganigrammeTable;
