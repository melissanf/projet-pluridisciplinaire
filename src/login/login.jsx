import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';
import Select from 'react-select';
import './login.css';
import logo from '../assets/eduorg.logo.png';
import illustration from '../assets/Design sans titre (1).png';
import PopupConfirm from '../components/PopupConfirm';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingUserData, setPendingUserData] = useState(null);

  const fakeUsersDB = {
    'chef@example.com': { password: '1234', role: 'chef departement' },
    'staff@example.com': { password: '1234', role: 'staff administrateur' },
    'enseignant@example.com': { password: '1234', role: 'enseignant' },
  };

  const roleCodes = {
    'chef departement': '1234',
    'staff administrateur': '1111',
    'enseignant': '0000',
  };

  const roleOptions = [
    { value: 'chef departement', label: 'Chef de département' },
    { value: 'staff administrateur', label: 'Staff administrateur' },
    { value: 'enseignant', label: 'Enseignant' },
  ];

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

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedRole) {
      setErrorMessage("Veuillez sélectionner un poste.");
      return;
    }

    const user = fakeUsersDB[email];

    if (!user || user.password !== password || user.role !== selectedRole.value) {
      setErrorMessage("Email, mot de passe ou rôle invalide.");
      return;
    }

    const expectedCode = roleCodes[selectedRole.value];

    setPendingUserData({
      email,
      role: selectedRole.value,
      expectedCode,
    });

    setShowConfirmation(true);
  };

  const handleCodeConfirmed = () => {
    if (pendingUserData) {
      localStorage.setItem('userRole', pendingUserData.role);
      localStorage.setItem('userEmail', pendingUserData.email);
      setShowConfirmation(false);
      navigate('/modules');
    }
  };

  const handleCodeFailed = () => {
    setErrorMessage("Code incorrect. Veuillez réessayer.");
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
              <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                {errorMessage}
              </div>
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

            <div className="form-group">
              <label htmlFor="role" className="form-label">Sélectionner un poste</label>
              <Select
                id="role"
                options={roleOptions}
                styles={customSelectStyles}
                placeholder="Sélectionner un poste"
                value={selectedRole}
                onChange={setSelectedRole}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="button-group">
              <button type="submit" className="login-button blue-button">Se connecter</button>
              <button type="button" className="signup-button" onClick={handleSignupClick}>S'inscrire</button>
            </div>
          </form>
        </div>

        <div className="login-right">
          <img src={illustration} alt="Illustration de connexion" className="login-image" />
        </div>
      </motion.div>

      {showConfirmation && pendingUserData && (
        <PopupConfirm
          expectedCode={pendingUserData.expectedCode}
          role={pendingUserData.role}
          onSuccess={handleCodeConfirmed}
          onFailure={handleCodeFailed}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </PageWrapper>
  );
}
