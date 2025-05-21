import React from "react";
import "./Profil.css";
import Sidebar from "../components/Sidebar"; // Import de la sidebar réutilisable

const Profil = () => {
  const handleLogout = () => {
    console.log("Déconnexion...");
  };

  return (
    <div className="app-container">
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
              <option>Département des Systèmes Informatiques (SIQ)</option>
              <option>Département de AI/ Science des Données</option>
            </select>
            <select>
              <option>Sélectionnez un statut</option>
              <option>Maître Assistant Classe B</option>
              <option>Maître Assistant Classe A</option>
              <option>Maître de Conférences Classe B</option>
              <option>Maître de Conférences Classe A</option>
              <option>
                Professeur (ou Professeur de l’Enseignement Supérieur - PES)
              </option>
            </select>
          </div>
          <input type="text" placeholder="Votre domaine de spécialité" />
          <textarea placeholder="Formation"></textarea>
          <button style={{ width: "fit-content", padding: "10px" }} type="submit">
            Sauvegarder
          </button>
        </form>
      </main>
    </div>
  );
};

export default Profil;
