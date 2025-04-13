
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Select from 'react-select';
import { motion } from 'framer-motion'; // 🔥 Animation de transition avec Framer Motion
import './signup.css';
import logo from '../assets/eduorg.logo.png';
import illustration from '../assets/Design sans titre (1).png';

export default function Signup() {
  const navigate = useNavigate(); // Hook pour naviguer entre les routes

  // Fonction de redirection vers la page de connexion
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Options disponibles pour le champ de sélection des rôles
  const roleOptions = [
    { value: '', label: 'Sélectionner un poste' },
    { value: 'admin', label: 'Staff administrateur' },
    { value: 'enseignant', label: 'Enseignant' },
    { value: 'chef', label: 'Chef de département' },
  ];

  // Styles personnalisés pour le composant react-select
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '8px',
      borderColor: '#0056b3',
      padding: '5px',
      boxShadow: 'none',
      '&:hover': { borderColor: '#0056b3' },
      fontFamily: 'Raleway, sans-serif',
      fontSize: '0.9rem',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#0056b3' : 'white',
      color: state.isFocused ? 'white' : 'black',
      cursor: 'pointer',
      fontFamily: 'Raleway, sans-serif',
    }),
  };

  return (
    <PageWrapper>
      {/* Conteneur principal animé avec Framer Motion */}
      <motion.div
        className="signup-container"
        initial={{ opacity: 0, x: -50 }}   // Animation d’entrée : décalé à gauche et invisible
        animate={{ opacity: 1, x: 0 }}     // Animation vers visible et centré
        exit={{ opacity: 0, x: 50 }}       // Animation de sortie : décalé à droite et invisible
        transition={{ duration: 0.5 }}     // Durée de la transition
      >

        {/* Partie droite contenant une illustration */}
        <div className="signup-right">
          <img
            src={illustration}
            alt="Illustration d'inscription"
            className="signup-image"
          />
        </div>

        {/* Partie gauche contenant le formulaire */}
        <div className="signup-left">
          <div className="signup-form">

            {/* Logo en haut du formulaire */}
            <img src={logo} alt="EduOrg Logo" className="signup-logo" />
            <h2 className="signup-title">S'inscrire</h2>

            {/* Champ pour l'adresse email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input
                type="email"
                id="email"
                placeholder="Entrer votre adresse email"
                className="form-input"
                required
              />
            </div>

            {/* Champ pour le mot de passe */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="Entrer votre mot de passe"
                className="form-input"
                required
              />
            </div>

            {/* Champ pour confirmer le mot de passe */}
            <div className="form-group">
              <label htmlFor="confirm-password" className="form-label">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirmer votre mot de passe"
                className="form-input"
                required
              />
            </div>

            {/* Checkbox "Se souvenir de moi" */}
            <div className="checkbox-container custom-checkbox">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>

            {/* Sélecteur de poste avec react-select */}
            <div className="form-group">
              <label htmlFor="role" className="form-label">Sélectionner un poste</label>
              <Select
                id="role"
                options={roleOptions}
                styles={customSelectStyles}
                placeholder="Sélectionner un poste"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Boutons : inscription et lien vers la connexion */}
            <div className="button-group">
              <button className="signup-button">S'inscrire</button>
              <button className="login-button" onClick={handleLoginClick}>
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
