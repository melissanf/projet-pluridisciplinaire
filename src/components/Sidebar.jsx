import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Ajout de useLocation
import './Sidebar.css';
import logo from '../assets/eduorg.logo.png';
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
  const location = useLocation(); // Pour savoir sur quelle page on est
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
    } else {
      setUserRole('chef departement'); // Default for testing
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="EDUORG" />
      </div>

      <div className="role-display">
        <strong>{userRole}</strong>
      </div>

      <nav className="menu">
        <div className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => handleNavigate('/dashboard')}>
          <FiLayout size={18} />
          <span>Tableau de bord</span>
        </div>

        <div className={`menu-item ${location.pathname === '/enseignants' ? 'active' : ''}`} onClick={() => handleNavigate('/enseignants')}>
          <FiUser size={18} />
          <span>Enseignants</span>
        </div>

        <div className={`menu-item ${location.pathname === '/modules' ? 'active' : ''}`} onClick={() => handleNavigate('/modules')}>
          <FiBookOpen size={18} />
          <span>Modules</span>
        </div>

        <div className={`menu-item ${location.pathname === '/organigramme' ? 'active' : ''}`} onClick={() => handleNavigate('/organigramme')}>
          <FiUsers size={18} />
          <span>Organigramme</span>
        </div>

        {/* Afficher 'Commentaires' seulement pour 'chef departement' */}
        {userRole === 'chef departement' && (
          <div className={`menu-item ${location.pathname === '/commentaires' ? 'active' : ''}`} onClick={() => handleNavigate('/commentaires')}>
            <FiMessageSquare size={18} />
            <span>Commentaires</span>
          </div>
        )}

        {/* Afficher 'Paramètre' seulement pour 'chef departement' */}
        {userRole === 'chef departement' && (
          <div className={`menu-item ${location.pathname === '/parametre' ? 'active' : ''}`} onClick={() => handleNavigate('/parametre')}>
            <FiSettings size={18} />
            <span>Paramètre</span>
          </div>
        )}
      </nav>

      <div className="logout" onClick={handleLogout}>
        <FiLogOut size={18} />
        <span>Déconnexion</span>
      </div>
    </aside>
  );
};

export default Sidebar;
