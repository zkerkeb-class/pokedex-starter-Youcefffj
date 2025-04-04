import React, { useState, useEffect } from "react";
import Carte from "../components/Carte";
import { getCurrentUser } from "../API/usersAPI";
import { api } from "../API/AuthAPI";
import { getPokemons } from "../API/ConfigAPI";

function Favoris() {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

      try {
        // Récupérer la liste des favoris du dresseur
        const dresseurResponse = await api.get(`/api/dresseurs/${currentUser.id}`);
        const favorisIds = dresseurResponse.data.dresseur.favoris;

        // Récupérer tous les pokémons
        const pokemonsResponse = await getPokemons();
        const allPokemons = pokemonsResponse.pokemons;

        // Filtrer pour ne garder que les pokémons favoris
        const favorites = allPokemons.filter(pokemon => 
          favorisIds.includes(pokemon.id)
        );

        setFavoritePokemons(favorites);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris:", error);
        setLoading(false);
      }
    };

    fetchFavoritePokemons();
  }, [currentUser]);

  if (!currentUser?.id) {
    return (
      <div className="favoris-container">
        <h1>Mes Favoris</h1>
        <p>Connectez-vous pour voir vos pokémons favoris.</p>
      </div>
    );
  }

  return (
    <div className="favoris-container">
      <h1>Mes Favoris</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : favoritePokemons.length > 0 ? (
        <div className="gallery">
          {favoritePokemons.map(pokemon => (
            <Carte key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <p>Vous n'avez pas encore de pokémons favoris.</p>
      )}
    </div>
  );
}

export default Favoris;
