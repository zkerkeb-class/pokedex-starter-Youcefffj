import React from 'react';
import '../style/SearchBar.css'; 

function SearchBar({ search, handleSearch, type, handleType, sort, handleSort, handleReset }) {
  return (
    <div className="search-bar">
      <h1>
        <img src="src/assets/logo.png" alt="logo" className="Pokeball" />
      </h1>
      <input 
        type="text" 
        placeholder="Rechercher un pokemon" 
        value={search}
        onChange={handleSearch}
      />
      <select 
        name="type" 
        id="type" 
        value={type}
        onChange={handleType}
      >
        <option value="all">Tous</option>
        <option value="Normal">Normal</option>
        <option value="Fire">Feu</option>
        <option value="Water">Eau</option>
        <option value="Electric">Electrique</option>
        <option value="Grass">Plante</option>
        <option value="Ice">Glace</option>
        <option value="Fighting">Combat</option>
        <option value="Poison">Poison</option>
        <option value="Ground">Sol</option>
        <option value="Flying">Vol</option>
        <option value="Psychic">Psy</option>
        <option value="Bug">Insecte</option>
        <option value="Rock">Roche</option>
        <option value="Ghost">Spectre</option>
        <option value="Dragon">Dragon</option>
        <option value="Dark">Ténèbres</option>
        <option value="Steel">Métal</option>
        <option value="Fairy">Fée</option>         
      </select>
      <select 
        name="sort" 
        id="sort" 
        value={sort}
        onChange={handleSort}
      >
        <option value="name">Trier par nom</option>
        <option value="type">Trier par type</option>
      </select>
      <button onClick={handleReset}>Réinitialiser</button>
    </div>
  );
}

export default SearchBar;
