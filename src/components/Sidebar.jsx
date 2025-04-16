import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import du hook useNavigate pour redirection
import './Sidebar.css';
import logo from '../assets/eduorg.logo.png';  // Chemin correct pour le logo (ajuste selon ta structure)
import { FiLayout, FiUser, FiBookOpen, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';  // Icônes react-icons

const Sidebar = () => {
  const navigate = useNavigate();  // Hook de navigation

  // Fonction de déconnexion
  const handleLogout = () => {
    // Tu peux ajouter ici un nettoyage (localStorage, state utilisateur, etc.)
    navigate('/login');  // Redirige vers la page de connexion
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="EDUORG" />
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
