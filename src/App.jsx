import './App.css';
import Carte from './components/Carte';
import SearchBar from './components/SearchBar';
import pokemons from "./assets/pokemons";
import { useState } from "react";

function App() {
  const randomIndex = Math.floor(Math.random() * pokemons.length);
  const pokemon = pokemons[randomIndex];
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("name");

  // État pour le Pokémon sélectionné (pour la modale)
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSearch = (e) => {setSearch(e.target.value);};
  const handleType = (e) => {setType(e.target.value);};
  const handleSort = (e) => {setSort(e.target.value);};

  //Convertit le nom en chaine psk jsuis un golmon qui oublie les diff langues
  //nom match avec la recherche + recupération du type
  // renvoie le tableau filtré
  const filteredPokemons = pokemons
    .filter((pokemon) => {
      const name = String(pokemon.name.french);
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "all" || (pokemon.type && pokemon.type.includes(type));
      return matchesSearch && matchesType;
    })
    //Tri par nom ou type
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
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        type={type}
        handleType={handleType}
        sort={sort}
        handleSort={handleSort}
        handleReset={handleReset}
      />
      <div className="gallery">
        {filteredPokemons.map((pokemon, index) => (
          // Si clique sur la carte, on affiche le Pokémon en grand
          <div key={pokemon.id || index} onClick={() => setSelectedPokemon(pokemon)}>
            <Carte key={pokemon.id || index} pokemon={pokemon} />
          </div>
        ))}
      </div>

     {selectedPokemon && (
        <div className="modal" onClick={() => setSelectedPokemon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Carte pokemon={selectedPokemon} className="big-card" />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
