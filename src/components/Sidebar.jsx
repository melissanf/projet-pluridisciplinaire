import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/eduorg.logo.png'; // Vérifie ce chemin selon ton projet
import {
  FiLayout,
  FiUser,
  FiBookOpen,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMessageSquare
} from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || 'chef departement');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="EDUORG" />
      </div>

      <div className="role-display">
        <strong>{userRole}</strong>
      </div>

      <nav className="menu">
        <div className={`menu-item ${isActive('/dashboardorga') ? 'active' : ''}`} onClick={() => handleNavigate('/dashboardorga')}>
          <FiLayout size={18} />
          <span>Tableau de bord</span>
        </div>

        <div className={`menu-item ${isActive('/enseignants') ? 'active' : ''}`} onClick={() => handleNavigate('/enseignants')}>
          <FiUser size={18} />
          <span>Enseignants</span>
        </div>

        <div className={`menu-item ${isActive('/modules') ? 'active' : ''}`} onClick={() => handleNavigate('/modules')}>
          <FiBookOpen size={18} />
          <span>Modules</span>
        </div>

        <div className={`menu-item ${isActive('/organigramme') ? 'active' : ''}`} onClick={() => handleNavigate('/organigramme')}>
          <FiUsers size={18} />
          <span>Organigramme</span>
        </div>

        {userRole === 'chef departement' && (
          <div className={`menu-item ${isActive('/commentaires') ? 'active' : ''}`} onClick={() => handleNavigate('/commentaires')}>
            <FiMessageSquare size={18} />
            <span>Commentaires</span>
          </div>
        )}

        <div className={`menu-item ${isActive('/parametre') ? 'active' : ''}`} onClick={() => handleNavigate('/parametre')}>
          <FiSettings size={18} />
          <span>Paramètres</span>
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
