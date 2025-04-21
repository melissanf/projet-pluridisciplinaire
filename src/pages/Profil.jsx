import React from "react";
import "./Profil.css";
import { LayoutDashboard, User, BookOpen, Bell, LogOut } from "lucide-react";
import logo from "../assets/eduorg.logo.png"; 

const Profil = () => {
  const handleLogout = () => {
    console.log("Déconnexion...");
 
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <img src={logo} alt="EduOrg Logo" className="logo" />
        <nav className="menu">
          <div className="menu-item">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </div>
          <div className="menu-item active">
            <User size={18} />
            <span>Profil</span>
          </div>
          <div className="menu-item">
            <BookOpen size={18} />
            <span>Modules</span>
          </div>
          <div className="menu-item">
            <Bell size={18} />
            <span>Alertes</span>
          </div>
        </nav>
        <div className="logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Déconnexion</span>
        </div>
      </aside>

      <main className="profile-form">
        <h1>Mon Profil</h1>
        <form>
          <div className="form-row">
            <input type="text" placeholder="Votre nom" />
            <input type="text" placeholder="Votre prénom" />
          </div>
          <div className="form-row">
            <input type="email" placeholder="votre.email@exemple.com" />
            <input type="tel" placeholder="+33 6 XX XX XX XX" />
          </div>
          <div className="form-row">
            <select>
              <option>Sélectionnez un département</option>
            </select>
            <select>
              <option>Sélectionnez un statut</option>
            </select>
          </div>
          <input type="text" placeholder="Votre domaine de spécialité" />
          <textarea placeholder="Formation"></textarea>
          <textarea placeholder="Expérience professionnelle"></textarea>
        </form>
      </main>
    </div>
  );
};

export default Profil;
