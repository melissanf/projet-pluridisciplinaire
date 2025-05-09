import React, { useEffect, useState } from 'react';
import SidebarTeacher from './SidebarTeacher';
import Sidebar from './Sidebar';

const SidebarManager = () => {
  const [userRole, setUserRole] = useState(null); // null au départ pour attendre le chargement

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role.toLowerCase());
    } else {
      setUserRole('chef departement'); // valeur par défaut pour test
    }
  }, []);

  if (!userRole) {
    // Pendant le chargement
    return null;
  }

  if (userRole === 'enseignant') {
    return <SidebarTeacher />;
  }

  return <Sidebar />;
};

export default SidebarManager;
