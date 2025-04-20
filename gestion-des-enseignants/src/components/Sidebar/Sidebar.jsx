import React from "react";
import { LayoutDashboard, User, BookOpen, Bell, LogOut } from "lucide-react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = ({ role }) => {
  const handleLogout = () => {
    console.log("Déconnexion");
  };

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="EduOrg Logo" className="logo" />
        <div className="role">{role}</div>
      </div>

      <nav className="menu">
        <div className="menu-item">
          <LayoutDashboard size={18} />
          <span>Tableau de Bord</span>
        </div>
        <div className="menu-item active">
          <User size={18} />
          <span>Enseignants</span>
        </div>
        <div className="menu-item">
          <BookOpen size={18} />
          <span>Modules</span>
        </div>
        <div className="menu-item ">
          <Bell size={18} />
          <span>Organigramme</span>
          
        </div>
      
      <div className="menu-item">
          <BookOpen size={18} />
          <span>Paramètres</span>
        </div>
        </nav>

      <div className="logout" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Déconnexion</span>
      </div>
    </aside>
  );
};

export default Sidebar;
