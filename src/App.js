import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Signup from './signup/signup';
import LoginPage from './login/login';
import Alerts from './pages/alerts';
import ModuleManagement from './pages/ModuleManagement';
import Commentaires from './pages/Commentaires';
import WishList from './pages/WishList';  // Ensure this file is correctly named
import Profil from './pages/Profil';
import TeacherTableManagment from './pages/TeacherTableManagment';  // Make sure this matches your file name

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
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'chef departement';
    setRole(storedRole);
  }, []);

  const handleRoleChange = (newRole) => {
    localStorage.setItem('userRole', newRole);
    setRole(newRole);
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <PageWrapper>
              <LoginPage />
            </PageWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <Signup />
            </PageWrapper>
          }
        />

        {/* Pages */}
        <Route
          path="/alerts"
          element={
            <PageWrapper>
              <Alerts />
            </PageWrapper>
          }
        />
        <Route
          path="/modules"
          element={
            <PageWrapper>
              <ModuleManagement role={role} onRoleChange={handleRoleChange} />
            </PageWrapper>
          }
        />
        <Route
          path="/commentaires"
          element={
            role === 'chef departement' ? (
              <PageWrapper>
                <Commentaires />
              </PageWrapper>
            ) : (
              <Navigate to="/modules" replace />
            )
          }
        />

        {/* ✅ Nouvelle route : WishList */}
        <Route
          path="/wishlist"
          element={
            <PageWrapper>
              <WishList />
            </PageWrapper>
          }
        />

        {/* ✅ Nouvelle route : Profil */}
        <Route
          path="/profil"
          element={
            <PageWrapper>
              <Profil />
            </PageWrapper>
          }
        />

        {/* ✅ Nouvelle route : Gestion des enseignants */}
        <Route
          path="/enseignants"
          element={
            <PageWrapper>
              <TeacherTableManagment role={role} />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
