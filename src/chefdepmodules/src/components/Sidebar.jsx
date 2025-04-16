// Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import logo from './assets/eduorg.logo.png';  // Ensure the path is correct for your logo
import { FiLayout, FiUser, FiBookOpen, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';  // Correct import for icons

const Sidebar = () => {
  const handleLogout = () => {
    // Logic for logout
    console.log('Déconnexion...');
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="EDUORG" />
        <h1>Chef departement</h1>
      </div>
      <nav className="menu">
        <div className="menu-item">
          <FiLayout size={18} />
          <span>Tableau de bord</span>
        </div>
        <div className="menu-item">
          <FiUser size={18} />
          <span>Enseignants</span>
        </div>
        <div className="menu-item active">
          <FiBookOpen size={18} />
          <span>Modules</span>
        </div>
        <div className="menu-item">
          <FiUsers size={18} />
          <span>Organigramme</span>
        </div>
        <div className="menu-item">
          <FiSettings size={18} />
          <span>Paramètre</span>
        </div>
      </nav>
      <div className="logout" onClick={handleLogout}>
        <FiLogOut size={18} />
        <span>Déconnexion</span>
      </div>
    </aside>
  );
};

export default Sidebar;
