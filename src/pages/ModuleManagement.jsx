import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ModuleTable from '../components/ModuleTable';
import Pagination from '../components/Pagination';
import Popup from '../components/Popup';
import ExportPopup from '../components/ExportPopup';  // Import ExportPopup
import './ModuleManagement.css';

const ModuleManagement = () => {
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
  const [showExportPopup, setShowExportPopup] = useState(false);  // Show popup for export

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
    setSelectedModule(module);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setSelectedModule({ nom: '', specialite: '', semestre: '', enseignant: '' });
    setIsAdding(true);
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

  // 🗑️ Supprimer avec confirmation
  const handleDelete = (moduleToDelete) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le module "${moduleToDelete.nom}" ?`
    );

    if (confirmDelete) {
      const updated = modules.filter((mod) => mod.nom !== moduleToDelete.nom);
      setModules(updated);
    }
  };

  // Trigger Export Popup
  const handleExportClick = () => {
    setShowExportPopup(true);
  };

  // Handle export based on user choice
  const handleExport = (fileType) => {
    console.log(`Exporting to ${fileType} format`);
    // Here you can implement the actual export logic using libraries like exceljs for Excel and jsPDF for PDF
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
            <button className="button-blue" onClick={handleAdd}>
              AJOUTER UN MODULE
            </button>
            <button className="button-outline" onClick={handleExportClick}>
              EXPORTER LA LISTE
            </button>
          </div>
        </div>

        <ModuleTable
          modules={paginatedModules}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
          />
        )}

        {showExportPopup && (
          <ExportPopup
            onClose={() => setShowExportPopup(false)}
            onExport={handleExport}
          />
        )}
      </main>
    </div>
  );
};

export default ModuleManagement;
