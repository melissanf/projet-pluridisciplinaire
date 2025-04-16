import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h2>Gestion des Modules</h2>
      <div className="header-actions">
        <input
          type="text"
          placeholder="🔍 Search"
          className="search-input"
        />
        <button className="button-blue">AJOUTER UN MODULE</button>
        <button className="button-outline">EXPORTER LA LISTE</button>
      </div>
    </header>
  );
};

export default Header;
