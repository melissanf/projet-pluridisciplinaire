import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Signup from './signup/signup';
import Login from './login/login';
import Alerts from './AlertPage/alerts'; // ✅ importe la page Alertes

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirection par défaut vers /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Page d'inscription */}
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Page Alertes */}
        
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
