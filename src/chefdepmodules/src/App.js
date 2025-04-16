import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ModuleManagement from './pages/ModuleManagement';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/modules" replace />} />
        <Route path="/modules" element={<ModuleManagement />} />
        {/* other routes */}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return <AnimatedRoutes />;
};

export default App;
