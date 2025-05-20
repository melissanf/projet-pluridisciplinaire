import React from "react";
import "./Profil.css";
import Sidebar from "../components/Sidebar"; // Import de la sidebar réutilisable

const Profil = () => {
  const handleLogout = () => {
    console.log("Déconnexion...");
  };

  return (
    <div className="app-container">
      {/* Utilisation de la SidebarTeacher */}
      <Sidebar />

      <main className="profile-form">
        <h1>Mon Profil</h1>
        <form>
          <div className="form-row">
            <input type="text" placeholder="Votre nom" />
            <input type="text" placeholder="Votre prénom" />
          </div>
          <div className="form-row">
            <input type="email" placeholder="votre.email@exemple.com" />
            <input type="tel" placeholder="+213 6 XX XX XX XX" />
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
          <button type="submit">Sauvegarder</button>
        </form>
      </main>
    </div>
  );
};

export default Profil;
