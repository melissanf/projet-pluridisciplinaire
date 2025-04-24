import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, BookOpen, LayoutDashboard, LogOut } from 'lucide-react';
import logo from '../assets/eduorg.logo.png';
import './SidebarTeacher.css'; // Ensure this file exists

const SidebarTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('enseignant');
    if (role) {
      setUserRole(role.charAt(0).toUpperCase() + role.slice(1)); // Capitalize role
    } else {
      setUserRole('Enseignant'); // Default role for testing
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear storage for testing
    navigate('/login'); // Redirect to login page
  };

  const navigateTo = (path) => {
    navigate(path); // General navigation function
  };

  return (
    <aside className="sidebar">
      <img src={logo} alt="EduOrg Logo" className="logo" />

      {/* Display user role */}
      <div className="user-role">
        <strong>{userRole}</strong>
      </div>

      <nav className="menu">
        <div
          className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigateTo('/dashboard')} // Navigate to dashboard
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>
        <div
          className={`menu-item ${location.pathname === '/profil' ? 'active' : ''}`}
          onClick={() => navigateTo('/profil')} // Navigate to profil
        >
          <User size={18} />
          <span>Profil</span>
        </div>
        <div
          className={`menu-item ${location.pathname === '/modules' ? 'active' : ''}`}
          onClick={() => navigateTo('/modules')} // Navigate to modules
        >
          <BookOpen size={18} />
          <span>Modules</span>
        </div>
        <div
          className={`menu-item ${location.pathname === '/alerts' ? 'active' : ''}`}
          onClick={() => navigateTo('/alerts')} // Navigate to alerts
        >
          <Bell size={18} />
          <span>Alertes</span>
        </div>
      </nav>

      <div className="logout" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Déconnexion</span>
      </div>
    </aside>
  );
};

export default SidebarTeacher;
