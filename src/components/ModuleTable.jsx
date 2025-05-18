import React from 'react';

const ModuleTable = ({ modules, onEdit, onDelete, role }) => {
  // Fonction pour gérer la suppression avec confirmation
  const handleDelete = (module) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le module "${module.nom}" ?`
    );

    if (confirmDelete) {
      onDelete(module);
    }
  };

  // Fonction qui va être déclenchée lorsqu'on clique sur la ligne
  const handleRowClick = (module) => {
    handleDelete(module); // On déclenche la suppression de la ligne avec confirmation
  };

  return (
    <table className="module-table">
      <thead>
        <tr>
          <th>Module</th>
          <th>Spécialité concernée</th>
          <th>Semestre</th>
          <th>Enseignant responsable</th>
          {role === 'chef departement' && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {modules.map((mod, index) => (
          <tr
            key={index}
            style={{ cursor: 'pointer' }} // Indicateur que la ligne est cliquable
          >
            <td>{mod.nom}</td>
            <td>{mod.specialite}</td>
            <td>{mod.semestre}</td>
            <td>{mod.enseignant}</td>
            {role === 'chef departement' && (
              <td>
                <button
                  className="exchange-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche le déclenchement de la suppression
                    onEdit(mod);
                  }}
                >
                  Échanger
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche le déclenchement de la suppression
                    handleDelete(mod); // Suppression avec confirmation
                  }}
                >❌
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModuleTable;
