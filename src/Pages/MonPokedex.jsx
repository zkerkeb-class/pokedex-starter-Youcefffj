import React, { useState, useEffect } from "react";
import Carte from "../components/Carte";
import SearchBar from "../components/SearchBar";
import { getCurrentUser } from "../API/usersAPI";
import { api } from "../API/AuthAPI";
import { getPokemons } from "../API/ConfigAPI";
import "../style/MonPokedex.css";

function MonPokedex() {
  const [myPokemons, setMyPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("name");
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchMyPokemons = async () => {
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

      try {
        // Récupérer la liste des pokémons du dresseur
        const dresseurResponse = await api.get(`/api/dresseurs/${currentUser.id}`);
        const pokedexIds = dresseurResponse.data.dresseur.pokedex;

        // Récupérer tous les pokémons
        const pokemonsResponse = await getPokemons();
        const allPokemons = pokemonsResponse.pokemons;

        // Filtrer pour ne garder que les pokémons du dresseur
        const collectedPokemons = allPokemons.filter(pokemon => 
          pokedexIds.includes(pokemon.id)
        );

        setMyPokemons(collectedPokemons);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement du pokedex:", error);
        setLoading(false);
      }
    };

    fetchMyPokemons();
  }, [currentUser]);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleType = (e) => setType(e.target.value);
  const handleSort = (e) => setSort(e.target.value);
  const handleReset = () => {
    setSearch("");
    setType("all");
    setSort("name");
  };

  // Filtrer et trier les pokémons
  const filteredPokemons = myPokemons
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

  if (!currentUser?.id) {
    return (
      <div className="mon-pokedex-container">
        <h1>Mon Pokédex</h1>
        <p>Connectez-vous pour voir votre collection de pokémons.</p>
      </div>
    );
  }

  return (
    <div className="mon-pokedex-container">
      <h1>Mon Pokédex</h1>
      <SearchBar
        search={search}
        handleSearch={handleSearch}
        type={type}
        handleType={handleType}
        sort={sort}
        handleSort={handleSort}
        handleReset={handleReset}
      />
      {loading ? (
        <p>Chargement...</p>
      ) : filteredPokemons.length > 0 ? (
        <div className="gallery">
          {filteredPokemons.map(pokemon => (
            <Carte key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <p>Vous n'avez pas encore de pokémons dans votre collection.</p>
      )}
    </div>
  );
}

export default MonPokedex;
