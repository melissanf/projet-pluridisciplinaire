import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TeacherTable from '../components/TeacherTable';
import Pagination from '../components/Pagination';
import Popup from '../components/Popup';
import ExportPopup from '../components/ExportPopup';
import './TeacherTableManagment.css';
import PopupCommentaire from '../components/PopupCommentaire';

const TeacherTableManagment = () => {
  const [role, setRole] = useState(''); // état initial vide

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || '';
    setRole(storedRole);
  }, []);

  const [teachers, setTeachers] = useState([
    { nom: 'Sara Bouzid', specialite: 'Informatique', semestre: 'S3', module: 'Programmation web' },
    { nom: 'Rami Benaissa', specialite: 'Mathématiques', semestre: 'S3', module: 'Probabilités' },
    { nom: 'Yasmine Armani', specialite: 'IA', semestre: 'S4', module: 'Machine Learning' },
    { nom: 'Lina Hadj-Messaoud', specialite: 'Informatique', semestre: 'S4', module: 'Java Avancé' },
    { nom: 'Karim Mansour', specialite: 'Réseaux', semestre: 'S3', module: 'Réseaux 2' },
  ]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [commentText, setCommentText] = useState('');

  const itemsPerPage = 3;

  const filteredTeachers = teachers.filter((t) =>
    t.nom.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (teacher) => {
    if (role === 'chef departement') {
      setSelectedTeacher(teacher);
      setIsAdding(false);
    } else {
      alert("Vous n'avez pas la permission de modifier cet enseignant.");
    }
  };

  const handleAdd = () => {
    if (role === 'chef departement') {
      setSelectedTeacher({ nom: '', specialite: '', semestre: '', module: '' });
      setIsAdding(true);
    } else {
      alert("Vous n'avez pas la permission d'ajouter un enseignant.");
    }
  };

  const handleClosePopup = () => {
    setSelectedTeacher(null);
  };

  const handleSave = (teacher) => {
    if (isAdding) {
      setTeachers([...teachers, teacher]);
    } else {
      const updated = teachers.map((t) =>
        t.nom === selectedTeacher.nom ? teacher : t
      );
      setTeachers(updated);
    }
    setSelectedTeacher(null);
  };

  const handleDelete = (teacherToDelete) => {
    if (role === 'chef departement') {
      const confirmDelete = window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'enseignant "${teacherToDelete.nom}" ?`
      );

      if (confirmDelete) {
        const updated = teachers.filter((t) => t.nom !== teacherToDelete.nom);
        setTeachers(updated);
      }
    } else {
      alert("Vous n'avez pas la permission de supprimer cet enseignant.");
    }
  };

  const handleExportClick = () => {
    setShowExportPopup(true);
  };

  const handleExport = (fileType) => {
    console.log(`Exporting to ${fileType} format`);
  };

  const handleCommentClick = () => {
    setShowCommentPopup(true);
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h2>Gestion des Enseignants</h2>

        <div className="top-bar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="button-group">
            {role === 'chef departement' && (
              <button className="button-module" onClick={handleAdd}>
                AJOUTER UN ENSEIGNANT
              </button>
            )}

            <button className="button-export" onClick={handleExportClick}>
              EXPORTER LA LISTE
            </button>

            {role === 'staff administrateur' && (
              <button className="button-comment" onClick={handleCommentClick}>
                💬 COMMENTAIRES
              </button>
            )}
          </div>
        </div>

        <TeacherTable
          teachers={paginatedTeachers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          role={role}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {selectedTeacher && (
          <Popup
            module={selectedTeacher}
            onSave={handleSave}
            onClose={handleClosePopup}
            isAdding={isAdding}
          />
        )}

        {showExportPopup && (
          <ExportPopup
            onClose={() => setShowExportPopup(false)}
            onExport={handleExport}
          />
        )}

        {showCommentPopup && (
          <PopupCommentaire
            isOpen={showCommentPopup}
            setIsOpen={setShowCommentPopup}
            commentText={commentText}
            setCommentText={setCommentText}
            onSubmit={() => {
              console.log('Commentaire ajouté:', commentText);
              setShowCommentPopup(false);
              setCommentText('');
            }}
          />
        )}
      </main>
    </div>
  );
};

export default TeacherTableManagment;
