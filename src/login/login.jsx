import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import './login.css';
import logo from '../assets/eduorg.logo.png';
import illustration from '../assets/Design sans titre (1).png';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Redirection vers la page d'inscription
  const handleSignupClick = () => {
    navigate('/signup');
  };

  // 🔐 Simulation de login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // 💡 Remplace cette partie avec un vrai appel API
      // Simulons une réponse
      const fakeUsersDB = {
        'chef@example.com': { password: '1234', role: 'chef' },
        'staff@example.com': { password: '1234', role: 'enseignant' },
        'admin@example.com': { password: '1234', role: 'admin' },
      };

      const user = fakeUsersDB[email];

      if (!user || user.password !== password) {
        setErrorMessage("Email ou mot de passe invalide");
        return;
      }

      // ✅ Enregistrement du rôle dans localStorage
      localStorage.setItem('userRole', user.role);

      // ✅ Redirection vers la page Modules
      navigate('/modules');
    } catch (err) {
      console.error(err);
      setErrorMessage("Une erreur est survenue.");
    }
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
        <div className="login-left">
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <img src={logo} alt="EduOrg Logo" className="login-logo" />
            <h2 className="login-title">Se connecter</h2>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input
                type="email"
                id="email"
                placeholder="Entrer votre adresse email"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="Entrer votre mot de passe"
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="checkbox-container custom-checkbox">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>

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
