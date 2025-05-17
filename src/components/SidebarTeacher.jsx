import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SidebarTeacher.css';
import logo from '../assets/eduorg.logo.png';
import {
  FiLayout,
  FiUser,
  FiBookOpen,
  FiBell,
  FiLogOut,
  FiMessageSquare,
  FiSettings
} from 'react-icons/fi';

const SidebarTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'enseignant';
    setUserRole(role);
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
        <img src={logo} alt="EduOrg Logo" />
      </div>

      <div className="role-display">
        <strong>{userRole}</strong>
      </div>

      <nav className="menu">
        {/* Tableau de bord (redirige selon le rôle) */}
        <div
        
        className={`menu-item ${isActive('/dashboardtec') ? 'active' : ''}`}
         onClick={() => handleNavigate('/dashboardtec')}
>
        
          <FiLayout size={18} />
          <span>Tableau de bord</span>
        </div>

        <div className={`menu-item ${isActive('/profil') ? 'active' : ''}`} onClick={() => handleNavigate('/profil')}>
          <FiUser size={18} />
          <span>Profil</span>
        </div>

        <div className={`menu-item ${isActive('/modules') ? 'active' : ''}`} onClick={() => handleNavigate('/modules')}>
          <FiBookOpen size={18} />
          <span>Modules</span>
        </div>

        <div className={`menu-item ${isActive('/alerts') ? 'active' : ''}`} onClick={() => handleNavigate('/alerts')}>
          <FiBell size={18} />
          <span>Alertes</span>
        </div>

        {userRole === 'chef departement' && (
          <>
            <div className={`menu-item ${isActive('/commentaires') ? 'active' : ''}`} onClick={() => handleNavigate('/commentaires')}>
              <FiMessageSquare size={18} />
              <span>Commentaires</span>
            </div>
            <div className={`menu-item ${isActive('/parametre') ? 'active' : ''}`} onClick={() => handleNavigate('/parametre')}>
              <FiSettings size={18} />
              <span>Paramètres</span>
            </div>
          </>
        )}
      </nav>

      <div className="logout" onClick={handleLogout}>
        <FiLogOut size={18} />
        <span>Déconnexion</span>
      </div>
    </aside>
  );
};

export default SidebarTeacher;
