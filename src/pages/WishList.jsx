import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishList.css';

const TeachingTypeSelector = ({ selectedTypes = [], onChange }) => {
  const types = ['Cours', 'TD', 'TP'];

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter(t => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="form-group-full">
      <label className="section-title">Type d’enseignement</label>
      <div className="toggle-buttons-row">
        {types.map((type) => (
          <button
            key={type}
            className={`toggle-button ${selectedTypes.includes(type) ? 'active' : ''}`}
            onClick={() => toggleType(type)}
            type="button"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

const WishItem = ({ index, wish, onUpdate, onDelete }) => {
  const handleModuleChange = (e) => {
    onUpdate(index, { ...wish, module: e.target.value });
  };

  const handleNiveauChange = (e) => {
    onUpdate(index, { ...wish, niveau: e.target.value });
  };

  const handleTypesChange = (types) => {
    onUpdate(index, { ...wish, teachingTypes: types });
  };

  const handleDelete = () => {
    if (window.confirm('Voulez-vous vraiment supprimer ce vœu ?')) {
      onDelete(index);
    }
  };

  return (
    <div className="form-card">
      <div className="WishList-header">
        <h3>Vœu {index + 1}</h3>
        <button className="delete-btn" onClick={handleDelete}>Supprimer</button>
      </div>

{/* Champ pour le nom du module */}
      <div className="form-row">
        <div className="form-group">
          <label>Nom du module</label>
          <input
            type="text"
            placeholder="Entrez le nom du module"
            value={wish.module}
            onChange={handleModuleChange}
          />
        </div>
      </div>
      {/* Champ pour le niveau */}
      <div className="form-row">
        <div className="form-group">
          <label>Niveau</label>
          <input
            type="text"
            placeholder="Ex : L3, M1, etc."
            value={wish.niveau || ''}
            onChange={handleNiveauChange}
          />
        </div>
      </div>

      

      {/* Sélection du type d’enseignement */}
      <TeachingTypeSelector
        selectedTypes={wish.teachingTypes}
        onChange={handleTypesChange}
      />
    </div>
  );
};

function WishList() {
  const [wishList, setWishList] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setWishList([]);
  }, []);

  const addWish = () => {
    if (wishList.length >= 3) return;
    setWishList([...wishList, {  module:'', niveau: '', teachingTypes: [] }]);
  };

  const updateWish = (index, updatedWish) => {
    const newList = [...wishList];
    newList[index] = updatedWish;
    setWishList(newList);
  };

  const deleteWish = (index) => {
    const newList = wishList.filter((_, i) => i !== index);
    setWishList(newList);
  };

  const saveWishes = () => {
    localStorage.setItem('voeux', JSON.stringify(wishList));
    setSaveMessage('✅ Vœux enregistrés avec succès !');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleBack = () => {
    navigate('/dashboardtec');
  };

  return (
    <div className="wishlist-container">
      <button className="back-button" onClick={handleBack}>← Retour</button>
      <h1 className="title">Liste de Vœux</h1>
      <p className="subtitle">Gérez vos souhaits d’enseignement pour l’année à venir</p>

      {wishList.map((wish, index) => (
        <WishItem
          key={index}
          index={index}
          wish={wish}
          onUpdate={updateWish}
          onDelete={deleteWish}
        />
      ))}

      <div className="buttons-container">
        {wishList.length < 3 && (
          <button className="add-button" onClick={addWish}>+ Nouveau vœu</button>
        )}

        {wishList.length > 0 && (
          <button className="save-button" onClick={saveWishes}>
            💾 Enregistrer les vœux
          </button>
        )}
      </div>

      {wishList.length >= 3 && (
        <p className="limit-message">
          Vous avez atteint le nombre maximum de 3 vœux.
        </p>
      )}

      {saveMessage && (
        <p className="save-message">{saveMessage}</p>
      )}
    </div>
  );
}

export default WishList;
