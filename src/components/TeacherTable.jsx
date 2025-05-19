import React, { useState } from 'react';
import WishlistPopup from '../components/WishlistPopup';

const TeacherTable = ({ teachers, onEdit, onDelete, role }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedVoeux, setSelectedVoeux] = useState([]);

  const handleDelete = (teacher) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'enseignant "${teacher.nom}" ?`
    );
    if (confirmDelete) {
      onDelete(teacher);
    }
  };

  // Ouvrir popup avec voeux de l'enseignant uniquement si role = 'chef departement'
  const handleNomClick = (teacherNom) => {
    if (role !== 'chef departement') return;  // Si pas chef departement, on n'ouvre pas la popup

    // Récupérer tous les voeux stockés localement
    const allVoeux = JSON.parse(localStorage.getItem('voeux')) || [];

    // Filtrer les voeux de cet enseignant
    const voeuxEnseignant = allVoeux.filter(voeu => voeu.enseignantNom === teacherNom);

    setSelectedVoeux(voeuxEnseignant);
    setPopupOpen(true);
  };

  return (
    <>
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
            <tr key={index} style={{ cursor: 'default' }}>
              <td
                onClick={() => handleNomClick(teacher.nom)}
                style={ role === 'chef departement'
                  ? { cursor: 'pointer', color: 'blue', textDecoration: 'underline' }
                  : {} }
                title={ role === 'chef departement'
                  ? "Voir la liste des vœux de cet enseignant"
                  : undefined }
              >
                {teacher.nom}
              </td>
              <td>{teacher.specialite}</td>
              <td>{teacher.semestre}</td>
              <td>{teacher.module}</td>
              {role === 'chef departement' && (
                <td>
                  <button
                    className="exchange-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(teacher);
                    }}
                  >
                    Échanger
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(teacher);
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

      {/* Afficher la popup uniquement si role = chef departement */}
      {role === 'chef departement' && (
        <WishlistPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          voeux={selectedVoeux}
        />
      )}
    </>
  );
};

export default TeacherTable;
