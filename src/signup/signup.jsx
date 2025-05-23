import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Select from 'react-select';
import { motion } from 'framer-motion';
import PopupConfirm from '../components/PopupConfirm';
import './signup.css';
import logo from '../assets/eduorg.logo.png';
import illustration from '../assets/Design sans titre (1).png';

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSignupData, setPendingSignupData] = useState(null);

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

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    if (!selectedRole) {
      alert("Veuillez sélectionner un poste.");
      return;
    }

    const role = selectedRole.value;
    const expectedCode = roleCodes[role];

    setPendingSignupData({
      email,
      role,
      expectedCode,
    });
    setShowConfirmation(true);
  };

  const handleCodeConfirmed = () => {
    if (pendingSignupData) {
      localStorage.setItem('userRole', pendingSignupData.role);
      localStorage.setItem('userEmail', pendingSignupData.email);
      setShowConfirmation(false);
      navigate('/modules');
    }
  };

  const handleCodeFailed = () => {
    // Optionnel : gestion en cas d'échec
  };

  return (
    <PageWrapper>
      <motion.div
        className="signup-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="signup-right">
          <img src={illustration} alt="Illustration d'inscription" className="signup-image" />
        </div>

        <div className="signup-left">
          <div className="signup-form">
            <img src={logo} alt="EduOrg Logo" className="signup-logo" />
            <h2 className="signup-title">S'inscrire</h2>

            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Adresse email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Entrer votre adresse email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Entrer votre mot de passe"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirmer votre mot de passe"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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
                <button type="submit" className="signup-button">S'inscrire</button>
                <button type="button" className="login-button" onClick={handleLoginClick}>
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {showConfirmation && pendingSignupData && (
        <PopupConfirm
          expectedCode={pendingSignupData.expectedCode}
          role={pendingSignupData.role} // ✅ Ajout pour afficher le bon titre
          onSuccess={handleCodeConfirmed}
          onFailure={handleCodeFailed}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </PageWrapper>
  );
}
