import React, { useState } from 'react';
import './TeacherTable.css';

const TeacherTable = ({ role }) => {
  
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      nom: 'Sara Bouzid',
      specialite: 'Informatique',
      modules: 'Programmation Web, BD Avancée',
      heures: '18h'
    },
    {
      id: 2,
      nom: 'Rami Benaissa',
      specialite: 'Mathématiques',
      modules: 'Probabilités, Statistiques',
      heures: '22h'
    },
    {
      id: 3,
      nom: 'Lina Hadj-Messaoud',
      specialite: 'Informatique',
      modules: 'Algorithmique, Java',
      heures: '26h'
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleDelete = (id) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setEditingTeacher(null);
    setFormVisible(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { nom, specialite, modules, heures } = event.target.elements;

    if (editingTeacher) {
      setTeachers(prev =>
        prev.map(t =>
          t.id === editingTeacher.id
            ? { ...t, nom: nom.value, specialite: specialite.value, modules: modules.value, heures: heures.value }
            : t
        )
      );
    } else {
      const newTeacher = {
        id: Date.now(),
        nom: nom.value,
        specialite: specialite.value,
        modules: modules.value,
        heures: heures.value
      };
      setTeachers(prev => [...prev, newTeacher]);
    }

    setFormVisible(false);
    setEditingTeacher(null);
  };

  return (
    <div className="teacher-container">
      <h1 className="title">Gestion des Enseignants</h1>

      <div className="toolbar">
        <input className="search" type="text" placeholder="🔍 Search" />
        {role === 'chef-departement' ? (
          <button className="add-button" onClick={handleAdd}>AJOUTER UN ENSEIGNANT</button>
        ) : (
          <button className="add-button">AJOUTER UN COMMENTAIRE</button>
        )}
      </div>

      <table className="teacher-table">
        <thead>
          <tr>
            <th>Nom & Prénom</th>
            <th>Spécialité</th>
            <th>Modules Affectés</th>
            <th className="heures-col">Heures d’enseignement</th>
            {role === 'chef-departement' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.nom}</td>
              <td>{teacher.specialite}</td>
              <td>{teacher.modules}</td>
              <td>{teacher.heures}</td>
              {role === 'chef-departement' && (
                <td>
                  <button className="action-button" onClick={() => handleEdit(teacher)}>Échanger</button>
                  <button className="delete-button" onClick={() => handleDelete(teacher.id)}>❌</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {formVisible && (
        <form className="teacher-form" onSubmit={handleFormSubmit}>
          <h2>{editingTeacher ? 'Modifier Enseignant' : 'Ajouter Enseignant'}</h2>
          <input name="nom" defaultValue={editingTeacher?.nom} placeholder="Nom & Prénom" required />
          <input name="specialite" defaultValue={editingTeacher?.specialite} placeholder="Spécialité" required />
          <input name="modules" defaultValue={editingTeacher?.modules} placeholder="Modules Affectés" required />
          <input name="heures" defaultValue={editingTeacher?.heures} placeholder="Heures d’enseignement" required />
          <button type="submit">Valider</button>
          <button type="button" onClick={() => setFormVisible(false)}>Annuler</button>
        </form>
      )}
    </div>
  );
};

export default TeacherTable;
