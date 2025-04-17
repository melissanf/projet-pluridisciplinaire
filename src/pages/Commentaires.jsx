import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import './Commentaires.css';

const Commentaires = () => {
  const [commentaires, setCommentaires] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('commentaires')) || [];
    setCommentaires(savedComments);

    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole || 'chef departement');
  }, []);

  const handleDelete = (indexToDelete) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      const updatedComments = commentaires.filter((_, index) => index !== indexToDelete);
      setCommentaires(updatedComments);
      localStorage.setItem('commentaires', JSON.stringify(updatedComments));
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Commentaires reçus</h2>

          {commentaires.length === 0 ? (
            <p>Aucun commentaire pour le moment.</p>
          ) : (
            <ul className="comment-list">
              {commentaires.map((comment, index) => (
                <li key={comment.id} className="comment-item">
                  <p className="comment-text">{comment.text}</p>

                  <div className="comment-footer">
                    <span className="comment-date">{comment.date}</span>
                    <span className="comment-author"> — {comment.auteur}</span>

                    {role === 'chef departement' && (
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                      >
                        🗑️ Supprimer
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Commentaires;
