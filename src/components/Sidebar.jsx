import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/eduorg.logo.png';
import { 
  FiLayout, 
  FiUser, 
  FiBookOpen, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiMessageSquare  // <-- New icon import
} from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
    } else {
      setUserRole('staff administrateur'); // Default for testing
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
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

        {/* Afficher 'Commentaires' seulement pour 'staff administrateur' */}
        {userRole === 'staff administrateur' && (
          <div className="menu-item">
            <FiMessageSquare size={18} />
            <span>Commentaires</span>
          </div>
        )}

        {/* Afficher 'Paramètre' seulement pour 'chef departement' */}
        {userRole === 'chef departement' && (
          <div className="menu-item">
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
