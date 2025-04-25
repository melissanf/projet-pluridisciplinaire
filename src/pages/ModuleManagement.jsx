import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ModuleTable from '../components/ModuleTable';
import Pagination from '../components/Pagination';
import Popup from '../components/Popup';
import ExportPopup from '../components/ExportPopup';
import './ModuleManagement.css';
import PopupCommentaire from '../components/PopupCommentaire'; // Import your PopupCommentaire component

const ModuleManagement = () => {
  const [role, setRole] = useState('chef departement'); // Change this for testing roles

  const [modules, setModules] = useState([
    { nom: 'Programmation web', specialite: 'Informatique', semestre: 'S3', enseignant: 'Sara Bouzid' },
    { nom: 'Probabilités', specialite: 'Mathématiques', semestre: 'S3', enseignant: 'Rami Benaissa' },
    { nom: 'Machine Learning', specialite: 'IA', semestre: 'S4', enseignant: 'Yasmine Armani' },
    { nom: 'Java Avancé', specialite: 'Informatique', semestre: 'S4', enseignant: 'Lina Hadj-Messaoud' },
    { nom: 'Réseaux 2', specialite: 'Réseaux', semestre: 'S3', enseignant: 'Karim Mansour' },
  ]);

  const [selectedModule, setSelectedModule] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false); // State to control the popup visibility
  const [commentText, setCommentText] = useState(''); // State to store the comment

  const itemsPerPage = 3;

  const filteredModules = modules.filter((mod) =>
    mod.nom.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);
  const paginatedModules = filteredModules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (module) => {
    if (role === 'chef departement') {
      setSelectedModule(module);
      setIsAdding(false);
    } else {
      alert("Vous n'avez pas la permission de modifier ce module.");
    }
  };

  const handleAdd = () => {
    if (role === 'chef departement') {
      setSelectedModule({ nom: '', specialite: '', semestre: '', enseignant: '' });
      setIsAdding(true);
    } else {
      alert("Vous n'avez pas la permission d'ajouter un module.");
    }
  };

  const handleClosePopup = () => {
    setSelectedModule(null);
  };

  const handleSave = (module) => {
    if (isAdding) {
      setModules([...modules, module]);
    } else {
      const updated = modules.map((mod) =>
        mod.nom === selectedModule.nom ? module : mod
      );
      setModules(updated);
    }
    setSelectedModule(null);
  };

  const handleDelete = (moduleToDelete) => {
    if (role === 'chef departement') {
      const confirmDelete = window.confirm(
        `Êtes-vous sûr de vouloir supprimer le module "${moduleToDelete.nom}" ?`
      );

      if (confirmDelete) {
        const updated = modules.filter((mod) => mod.nom !== moduleToDelete.nom);
        setModules(updated);
      }
    } else {
      alert("Vous n'avez pas la permission de supprimer ce module.");
    }
  };

  const handleExportClick = () => {
    setShowExportPopup(true);
  };
   // export liste
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
        <h2>Gestion des Modules</h2>

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
                AJOUTER UN MODULE
              </button>
            )}

            <button className="button-export" onClick={handleExportClick}>
              EXPORTER LA LISTE
            </button>

            {/* Bouton Commentaire pour staff admin */}
            {role === 'staff administrateur' && (
              <button
                className="button-comment"
                onClick={handleCommentClick} // Show the comment popup
              >
                💬 COMMENTAIRES
              </button>
            )}
          </div>
        </div>

        <ModuleTable
          modules={paginatedModules}
          onEdit={handleEdit}
          onDelete={handleDelete}
          
          role={role}
        />
        

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {selectedModule && (
          <Popup
            module={selectedModule}
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

        {/* Popup pour commentaire */}
        {showCommentPopup && (
          <PopupCommentaire
            isOpen={showCommentPopup}
            setIsOpen={setShowCommentPopup}
            commentText={commentText}
            setCommentText={setCommentText}
            onSubmit={() => {
              console.log('Commentaire ajouté:', commentText);
              setShowCommentPopup(false); // Close popup after submitting
              setCommentText(''); // Clear the comment
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ModuleManagement;
