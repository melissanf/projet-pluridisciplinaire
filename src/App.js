import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Signup from './signup/signup';
import Login from './login/login';
import Alerts from './AlertPage/alerts';
import ModuleManagement from './pages/ModuleManagement';

// 🎬 Wrapper pour animer les transitions de page
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirection par défaut vers /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Page de connexion */}
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        {/* Page d'inscription */}
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <Signup />
            </PageWrapper>
          }
        />

        {/* Page des alertes */}
        <Route
          path="/alerts"
          element={
            <PageWrapper>
              <Alerts />
            </PageWrapper>
          }
        />

        {/* Page de gestion des modules */}
        <Route
          path="/modules"
          element={
            <PageWrapper>
              <ModuleManagement />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
