import './App.css'
import Carte from './components/Carte'
import pokemons from "./assets/pokemons";
import { useState } from "react";

function App() {
  const randomIndex = Math.floor(Math.random() * pokemons.length);
  const pokemon = pokemons[randomIndex];
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("name");
  const [reset, setReset] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const filteredPokemons = pokemons
  .filter((pokemon) => {
    const name = String(pokemon.name.french); // Conversion en chaîne
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || (pokemon.type && pokemon.type.includes(type));
    return matchesSearch && matchesType;
  })
  .sort((a, b) => {
    if (sort === "name") {
      return String(a.name.french).localeCompare(String(b.name.french));
    } else if (sort === "type") {
      return String(a.type[0]).localeCompare(String(b.type[0]));
    }
    return 0;
  });


  const handleReset = () => {
    setSearch("");
    setType("all");
    setSort("name");
  };


  return (
    <>
      <h1>Carte aléatoire</h1>
      <div className="exemple">
        <Carte pokemon={pokemon} />
      </div>
      
      <div className="search-bar">
      <h1>Pokedex</h1>
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

      
      <div className="gallery">
      {filteredPokemons.map((pokemon, index) => (
        <Carte key={pokemon.id || index} pokemon={pokemon} />
      ))}
    </div>

    </>
  )
}

export default App
