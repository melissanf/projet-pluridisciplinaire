import React from 'react';
import './ModuleTable.css';

const modules = [
  {
    nom: 'Programmation web',
    specialite: 'Informatique',
    semestre: 'S3',
    enseignant: 'Sara Bouzid',
  },
  {
    nom: 'Probabilités',
    specialite: 'Mathématiques',
    semestre: 'S3',
    enseignant: 'Rami Benaissa',
  },
  {
    nom: 'Machine Learning',
    specialite: 'IA',
    semestre: 'S4',
    enseignant: 'Yasmine Armani',
  },
  {
    nom: 'Java Avancé',
    specialite: 'Informatique',
    semestre: 'S4',
    enseignant: 'Lina Hadj-Messaoud',
  },
  {
    nom: 'Réseaux 2',
    specialite: 'Réseaux',
    semestre: 'S3',
    enseignant: 'Karim Mansour',
  },
];

const ModuleTable = () => {
  const handleExchange = (moduleName) => {
    // Logique à définir plus tard (modal, popup, etc.)
    alert(`Échange demandé pour : ${moduleName}`);
  };

  return (
    <table className="module-table">
      <thead>
        <tr>
          <th>Module</th>
          <th>Spécialité concernée</th>
          <th>Semestre</th>
          <th>Enseignant responsable</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {modules.map((mod, index) => (
          <tr key={index}>
            <td>{mod.nom}</td>
            <td>{mod.specialite}</td>
            <td>{mod.semestre}</td>
            <td>{mod.enseignant}</td>
            <td>
              <button
                className="exchange-btn"
                onClick={() => handleExchange(mod.nom)}
              >
                Échanger
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModuleTable;
