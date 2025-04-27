import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import OrganigrammeTable from '../components/OrganigrammeTable';
import PopupCommentaire from '../components/PopupCommentaire';
import ExportPopup from '../components/ExportPopup';
import PopupEchange from '../components/PopupEchange'; // Ajout du popup d'échange
import organigrammeS1 from '../data/OrganigrammeS1.json';
import organigrammeS2 from '../data/OrganigrammeS2.json';
import './OrganigrammePage.css';

const OrganigrammePage = () => {
  const [active, setActive] = useState('S1');
  const [role, setRole] = useState('');
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [showEchangePopup, setShowEchangePopup] = useState(false); // état pour ouvrir popup échange
  const [commentText, setCommentText] = useState('');
  const [ligneToEdit, setLigneToEdit] = useState(null); // ligne sélectionnée pour échanger
  const [dataS1, setDataS1] = useState([]);
  const [dataS2, setDataS2] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'chef departement';
    setRole(storedRole);
    setDataS1(organigrammeS1);
    setDataS2(organigrammeS2);
  }, []);

  const handleExportClick = () => {
    setShowExportPopup(true);
  };

  const handleDelete = (ligneToDelete) => {
    if (active === 'S1') {
      setDataS1(prev => prev.filter(ligne => ligne !== ligneToDelete));
    } else {
      setDataS2(prev => prev.filter(ligne => ligne !== ligneToDelete));
    }
  };

  const handleEdit = (ligne) => {
    setLigneToEdit(ligne); // On stocke la ligne à modifier
    setShowEchangePopup(true); // On ouvre le popup
  };

  const handleEchangeSubmit = (nouvelleLigne) => {
    if (active === 'S1') {
      setDataS1(prevData => prevData.map(ligne => ligne === ligneToEdit ? nouvelleLigne : ligne));
    } else {
      setDataS2(prevData => prevData.map(ligne => ligne === ligneToEdit ? nouvelleLigne : ligne));
    }
    setShowEchangePopup(false);
    setLigneToEdit(null);
  };

  return (
    <div className="organigramme-page">
      {/* Sidebar */}
      <div className="organigramme-sidebar">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="organigramme-content">
        {/* Titre */}
        <h1 className="h1-organigramme">Organigramme</h1>

        {/* Top bar */}
        <div className="organigramme-top-bar">
          {/* Boutons S1/S2 pour chef de département */}
          {role === 'chef departement' && (
            <div className="organigramme-buttons">
              <button
                className={active === 'S1' ? 'active' : ''}
                onClick={() => setActive('S1')}
              >
                Organigramme de S1
              </button>
              <button
                className={active === 'S2' ? 'active' : ''}
                onClick={() => setActive('S2')}
              >
                Organigramme de S2
              </button>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="organigramme-tools-buttons">
            {/* Bouton Exporter pour chef departement */}
            {role === 'chef departement' && (
              <button className="btn-exporter" onClick={handleExportClick}>
                Exporter
              </button>
            )}

            {/* Bouton Commenter pour staff administrateur */}
            {role === 'staff administrateur' && (
              <button
                className="btn-commenter"
                onClick={() => setShowCommentPopup(true)}
              >
                💬 Commenter
              </button>
            )}
          </div>
        </div>

        {/* Tableau */}
        {role === 'chef departement' && (
          <OrganigrammeTable
            data={active === 'S1' ? dataS1 : dataS2}
            title={`Organigramme ${active}`}
            role={role}
            onEdit={handleEdit}  // Affiché pour chef departement uniquement
            onDelete={handleDelete}  // Affiché pour chef departement uniquement
          />
        )}
        
        {/* Popup commentaire */}
        {showCommentPopup && (
          <PopupCommentaire
            isOpen={showCommentPopup}
            setIsOpen={setShowCommentPopup}
            commentText={commentText}
            setCommentText={setCommentText}
            onSubmit={() => {
              console.log('Commentaire ajouté pour Organigramme:', commentText);
              setShowCommentPopup(false);
              setCommentText('');
            }}
          />
        )}

        {/* Popup export */}
        {showExportPopup && (
          <ExportPopup
            onClose={() => setShowExportPopup(false)}
            onExport={(type) => {
              console.log(`Export demandé en format : ${type}`);
              setShowExportPopup(false);
            }}
          />
        )}

        {/* Popup échange */}
        {showEchangePopup && ligneToEdit && role === 'chef departement' && (
          <PopupEchange
            ligne={ligneToEdit}
            onClose={() => setShowEchangePopup(false)}
            onSubmit={handleEchangeSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default OrganigrammePage;
