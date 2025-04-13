import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageWrapper({ children }) {
  const location = useLocation();

  // Vérifie le chemin pour déterminer l'animation
  const isSignup = location.pathname === '/signup';
  const isLogin = location.pathname === '/login'; // Détecte si c'est la page de login

  return (
    <motion.div
      initial={{
        x: isSignup ? 100 : isLogin ? -100 : 0, // Si signup, slide depuis la droite, si login depuis la gauche
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}  // Animation qui arrive au centre
      exit={{
        x: isSignup ? -100 : isLogin ? 100 : 0,  // Sort dans la direction opposée à celle d'entrée
        opacity: 0,
      }}
      transition={{ duration: 0.6, ease: 'easeInOut' }} // Durée de l'animation
      className="page-wrapper"
    >
      {children}
    </motion.div>
  );
}
