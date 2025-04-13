import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import de useNavigate
import PageWrapper from '../components/PageWrapper'; // Pour l'animation
import { Bell, User, BookOpen, LayoutDashboard, LogOut } from 'lucide-react';
import logo from '../assets/eduorg.logo.png';
import './alerts.css';

export default function Alerts() {
  const navigate = useNavigate(); // ✅ Initialisation de useNavigate

  // Fonction pour gérer la déconnexion et rediriger vers la page login
  const handleLogout = () => {
    navigate('/login'); // Redirection vers la page de connexion
  };

  return (
    <PageWrapper>
      <div className="alerts-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <img src={logo} alt="EduOrg Logo" className="logo" />
          <nav className="menu">
            <div className="menu-item">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <div className="menu-item">
              <User size={18} />
              <span>Profil</span>
            </div>
            <div className="menu-item">
              <BookOpen size={18} />
              <span>Modules</span>
            </div>
            <div className="menu-item active">
              <Bell size={18} />
              <span>Alertes</span>
              <span className="red-dot" />
            </div>
          </nav>
          <div className="logout" onClick={handleLogout}> {/* ✅ Ajout du gestionnaire de clic */}
            <LogOut size={18} />
            <span>Déconnexion</span>
          </div>
        </aside>

        {/* Main content */}
        <main className="alert-main">
          <h2 className="title">Alertes et Notifications</h2>

          <div className="alert-card red">
            <p>Dépassement des heures - Module Analyse 1</p>
            <div className="meta">
              <span>⏱ 26 heures</span>
              <span>15 janv.</span>
            </div>
          </div>

          <div className="alert-card yellow">
            <p>Proche de la limite - Module Analyse 2</p>
            <div className="meta">
              <span>⏱ 22 heures</span>
              <span>14 janv.</span>
            </div>
          </div>

          <div className="alert-card blue">
            <p>Nouveau module assigné - Algèbre</p>
            <div className="meta">
              <span></span>
              <span>13 janv.</span>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
