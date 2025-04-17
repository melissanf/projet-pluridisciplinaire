import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ModuleTable from '../components/ModuleTable';
import Pagination from '../components/Pagination';
import './ModuleManagement.css';

const ModuleManagement = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h2>Gestion des Modules</h2>

        {/* Barre de recherche et boutons */}
        <div className="top-bar">
          <div className="search-wrapper">
            <span className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button className="button-blue">AJOUTER UN MODULE</button>
            <button className="button-outline">EXPORTER LA LISTE</button>
          </div>
        </div>

        {/* Tableau des modules */}
        <ModuleTable />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={10} // adapte selon ton backend
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default ModuleManagement;
