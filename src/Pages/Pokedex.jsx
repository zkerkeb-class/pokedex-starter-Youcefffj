import React, { useState } from "react";
import Carte from "../components/Carte";
import SearchBar from "../components/SearchBar";
import pokemons from "../assets/pokemons";
import "../App.css";
import Description from '../components/Description';


function Pokedex() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("name");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleType = (e) => setType(e.target.value);
  const handleSort = (e) => setSort(e.target.value);
  const handleReset = () => {
    setSearch("");
    setType("all");
    setSort("name");
  };

  const filteredPokemons = pokemons
    .filter((pokemon) => {
      const name = String(pokemon.name.french);
      return name.toLowerCase().includes(search.toLowerCase()) &&
        (type === "all" || pokemon.type.includes(type));
    })
    .sort((a, b) => {
      return sort === "name"
        ? String(a.name.french).localeCompare(String(b.name.french))
        : String(a.type[0]).localeCompare(String(b.type[0]));
    });

  return (
    <div className="pokedex-container">
      <h1>Pokedex</h1>
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
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.id} onClick={() => setSelectedPokemon(pokemon)}>
            <Carte pokemon={pokemon} />
          </div>
        ))}
      </div>
      {selectedPokemon && (
          <div className="modal" onClick={() => {
            setSelectedPokemon(null);
            setShowDescription(false);
          }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Carte pokemon={selectedPokemon} className="big-card" />
              {showDescription ? (
                <Description pokemon={selectedPokemon} />
              ) : (
                <div className="voir-description" onClick={() => setShowDescription(true)}>
                  Voir la description
                </div>
              )}
            </div>
          </div>
      )}
    </div>
  );
}

export default Pokedex;
