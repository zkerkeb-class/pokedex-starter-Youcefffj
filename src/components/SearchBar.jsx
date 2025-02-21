import React from 'react';
import '../style/SearchBar.css'; 

function SearchBar({ search, handleSearch, type, handleType, sort, handleSort, handleReset }) {
  const pokemonTypes = [{ value: "all", label: "Tous" },{ value: "Normal", label: "Normal" },{ value: "Fire", label: "Feu" },{ value: "Water", label: "Eau" },{ value: "Electric", label: "Electrique" },{ value: "Grass", label: "Plante" },{ value: "Ice", label: "Glace" },{ value: "Fighting", label: "Combat" },{ value: "Poison", label: "Poison" },{ value: "Ground", label: "Sol" },{ value: "Flying", label: "Vol" },{ value: "Psychic", label: "Psy" },{ value: "Bug", label: "Insecte" },{ value: "Rock", label: "Roche" },{ value: "Ghost", label: "Spectre" },{ value: "Dragon", label: "Dragon" },{ value: "Dark", label: "Ténèbres" },{ value: "Steel", label: "Métal" },{ value: "Fairy", label: "Fée" }];
  
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
        {pokemonTypes.map((pokemonType) => (
          <option key={pokemonType.value} value={pokemonType.value}>
            {pokemonType.label}
          </option>
        ))}
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
