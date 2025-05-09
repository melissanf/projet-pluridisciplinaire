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

  // Fetch the role from localStorage and set it
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || 'enseignant'); // Fallback to 'enseignant' if no role is found
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole'); // Clear user role on logout
    navigate('/login'); // Redirect to login page
  };

  const handleNavigate = (path) => {
    navigate(path); // General navigation function
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="EduOrg Logo" />
      </div>

      <div className="role-display">
        <strong>{userRole}</strong> {/* Display user's role */}
      </div>

      <nav className="menu">
        {/* For enseignants, show 'Tableau de bord' as 'Dashboardtec' */}
        {userRole === 'enseignant' && (
          <div className={`menu-item ${location.pathname === '/dashboardtec' ? 'active' : ''}`} onClick={() => handleNavigate('/dashboardtec')}>
            <FiLayout size={18} />
            <span>Tableau de bord </span>
          </div>
        )}

        {/* For chef departement or other roles, show 'Tableau de bord' as 'Dashboard' */}
        {userRole !== 'enseignant' && (
          <div className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => handleNavigate('/dashboard')}>
            <FiLayout size={18} />
            <span>Tableau de bord</span>
          </div>
        )}

        <div className={`menu-item ${location.pathname === '/profil' ? 'active' : ''}`} onClick={() => handleNavigate('/profil')}>
          <FiUser size={18} />
          <span>Profil</span>
        </div>

        <div className={`menu-item ${location.pathname === '/modules' ? 'active' : ''}`} onClick={() => handleNavigate('/modules')}>
          <FiBookOpen size={18} />
          <span>Modules</span>
        </div>

        <div className={`menu-item ${location.pathname === '/alerts' ? 'active' : ''}`} onClick={() => handleNavigate('/alerts')}>
          <FiBell size={18} />
          <span>Alertes</span>
        </div>

        {/* Display 'Commentaires' and 'Paramètres' only for 'chef departement' */}
        {userRole === 'chef departement' && (
          <>
            <div className={`menu-item ${location.pathname === '/commentaires' ? 'active' : ''}`} onClick={() => handleNavigate('/commentaires')}>
              <FiMessageSquare size={18} />
              <span>Commentaires</span>
            </div>
            <div className={`menu-item ${location.pathname === '/parametre' ? 'active' : ''}`} onClick={() => handleNavigate('/parametre')}>
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
