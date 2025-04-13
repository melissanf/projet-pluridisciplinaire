import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import de useNavigate
import PageWrapper from '../components/PageWrapper'; // ✅ Import du wrapper animé
import { motion } from 'framer-motion'; // ✅ Animation
import './login.css';
import logo from '../assets/eduorg.logo.png';
import illustration from '../assets/Design sans titre (1).png';

export default function LoginPage() {
  const navigate = useNavigate();

  // Redirection vers la page d'inscription
  const handleSignupClick = () => {
    navigate('/signup');
  };

 

  return (
    <PageWrapper>
      <motion.div
        className="login-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >

        {/* Partie gauche : formulaire de connexion */}
        <div className="login-left">
          <form className="login-form">

            {/* Logo de l'application */}
            <img src={logo} alt="EduOrg Logo" className="login-logo" />

            {/* Titre du formulaire */}
            <h2 className="login-title">Se connecter</h2>

            {/* Champ Email */}
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

            {/* Champ Mot de passe */}
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

            {/* Checkbox "Se souvenir de moi" */}
            <div className="checkbox-container custom-checkbox">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>

            {/* Boutons : connexion & redirection inscription */}
            <div className="button-group">
              <button type="submit" className="login-button blue-button">
                Se connecter
              </button>
              <button type="button" className="signup-button" onClick={handleSignupClick}>
                S'inscrire
              </button>
            </div>
          </form>
        </div>

        {/* Partie droite : image d'illustration */}
        <div className="login-right">
          <img 
            src={illustration} 
            alt="Illustration de connexion" 
            className="login-image" 
          />
        </div>

      </motion.div>
    </PageWrapper>
  );
}
