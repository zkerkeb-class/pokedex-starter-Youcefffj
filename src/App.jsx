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

  const handleReset = () => {
    setReset(true);
  };

  return (
    <>

      <h1>Une carte aléatoire</h1>
      <div className="exemple">
        <Carte pokemon={pokemon} />
      </div>
      
      //bar de recherche avec filtre par type
      <div className="search-bar">
        <input type="text" placeholder="Rechercher un pokemon" />
        <select name="type" id="type">
          <option value="all">Tous</option>
          <option value="Bug">Normal</option>
          <option value="Dark">Feu</option>
          <option value="Dragon">Eau</option>
          <option value="Electric">Electrique</option>
          <option value="Fairy">Plante</option>
          <option value="Fighting">Glace</option>
          <option value="Fire">Combat</option>
          <option value="Flying">Poison</option>
          <option value="Ghost">Sol</option>
          <option value="Grass">Vol</option>
          <option value="Ground">Psy</option>
          <option value="Ice">Insecte</option>
          <option value="Normal">Roche</option>
          <option value="Poison">Spectre</option>
          <option value="Psychic">Dragon</option>
          <option value="Rock">Ténèbres</option>
          <option value="Steel">Métal</option>
          <option value="Water">Fée</option>         
        </select>
        <button>Rechercher</button>
        <button>Réinitialiser</button>
        <button>Trier par nom</button>
        <button>Trier par type</button>
      </div>

      <h1>Pokedex</h1>
      <div className="gallery">
      {pokemons.map((pokemon, index) => (
        <Carte key={pokemon.id || index} pokemon={pokemon} />
      ))}
    </div>

    </>
  )
}

export default App
