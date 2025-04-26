import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import OrganigrammeTable from '../components/OrganigrammeTable';
import PopupCommentaire from '../components/PopupCommentaire'; // Import PopupCommentaire
import organigrammeS1 from '../data/OrganigrammeS1.json';
import organigrammeS2 from '../data/OrganigrammeS2.json';

import './OrganigrammePage.css';

const OrganigrammePage = () => {
  const [active, setActive] = useState('S1');
  const [role, setRole] = useState(''); // Role is stored in state
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') || 'chef departement';
    setRole(storedRole); // Set role from local storage or default to 'chef departement'
  }, []);

  const handleCommentClick = () => {
    setShowCommentPopup(true); // Show comment popup when the button is clicked
  };

  return (
    <div style={{ display: 'flex' }}>
        
      <Sidebar /> {/* Sidebar component */}
      <div style={{ padding: '10px', flex: 1 }}>
        <h1>Organigramme</h1>

        {role === 'chef departement' ? (
          <>
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
            {/* Pass correct data (organigrammeS1 or organigrammeS2) based on active state */}
            <OrganigrammeTable data={active === 'S1' ? organigrammeS1 : organigrammeS2} />
          </>
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              <button className="button-comment" onClick={handleCommentClick}>
                💬 COMMENTER L'ORGANIGRAMME
              </button>
            </div>
          </>
        )}

        {/* Popup pour commentaire */}
        {showCommentPopup && (
          <PopupCommentaire
            isOpen={showCommentPopup}
            setIsOpen={setShowCommentPopup}
            commentText={commentText}
            setCommentText={setCommentText}
            onSubmit={() => {
              console.log('Commentaire ajouté pour Organigramme:', commentText);
              setShowCommentPopup(false); // Close the popup after submission
              setCommentText(''); // Clear the comment text
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OrganigrammePage;
