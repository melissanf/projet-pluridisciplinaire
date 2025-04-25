import React from 'react';

const TeacherTable = ({ teachers, onEdit, onDelete, role }) => {
  // Fonction pour gérer la suppression avec confirmation
  const handleDelete = (teacher) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'enseignant "${teacher.nom}" ?`
    );

    if (confirmDelete) {
      onDelete(teacher);
    }
  };

  // Fonction qui va être déclenchée lorsqu'on clique sur la ligne
  const handleRowClick = (teacher) => {
    handleDelete(teacher); // On déclenche la suppression de la ligne avec confirmation
  };

  return (
    <table className="module-table">
      <thead>
        <tr>
          <th>Enseignant</th>
          <th>Spécialité concernée</th>
          <th>Semestre</th>
          <th>Module</th>
          {role === 'chef departement' && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher, index) => (
          <tr
            key={index}
            onClick={() => handleRowClick(teacher)} // Cliquer sur la ligne déclenche la suppression
            style={{ cursor: 'pointer' }} // Indicateur que la ligne est cliquable
          >
            <td>{teacher.nom}</td>
            <td>{teacher.specialite}</td>
            <td>{teacher.semestre}</td>
            <td>{teacher.module}</td>
            {role === 'chef departement' && (
              <td>
                <button
                  className="exchange-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche le déclenchement de la suppression
                    onEdit(teacher);
                  }}
                >
                  Échanger
                </button>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche le déclenchement de la suppression
                    handleDelete(teacher); // La suppression est appelée ici aussi
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
  );
};

export default TeacherTable;
