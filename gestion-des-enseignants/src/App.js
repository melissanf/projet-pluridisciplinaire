import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import TeacherTable from './components/TeacherManagement/TeacherTable';

function App() {
  const role = 'chef-departement'; // ou 'enseignant'

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role={role} />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <TeacherTable role={role} />
      </div>
    </div>
  );
}

export default App;
