import '../style/Carte.css';
import { useState, useEffect } from 'react';
import { getPokemonTypes, API_URL } from '../API/ConfigAPI';
import FavoriteHeart from "./FavoriteHeart";
import { getCurrentUser } from "../API/usersAPI";
import { api } from "../API/AuthAPI";

const Carte = ({ pokemon }) => {
    const backgroundPath = `src/assets/background/${pokemon.type[0]}/${pokemon.type[0]}1.webp`;
    const [isShiny, setIsShiny] = useState(false); 
    const [types, setTypes] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const currentUser = getCurrentUser();

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typeData = await getPokemonTypes();
                console.log("dat dzekl API:", typeData); 
                const typeMap = {};
                const typesArray = typeData.types || typeData;
                typesArray.forEach(type => {
                    const imageUrl = type.image.replace('${process.env.API_URL}', API_URL);
                    typeMap[type.type] = imageUrl;
                });
                console.log("Type Map ezfkjzf:", typeMap); 
                setTypes(typeMap);
            } catch (error) {
                console.error("Erreur lors du chargement des types:", error);
            }
        };
        fetchTypes();
    }, []);

    // Vérifier si le pokémon est dans les favoris au chargement
    useEffect(() => {
        const checkFavorite = async () => {
            if (currentUser?.id) {
                try {
                    const response = await api.get(`/api/dresseurs/${currentUser.id}`);
                    setIsFavorite(response.data.dresseur.favoris.includes(pokemon.id));
                } catch (error) {
                    console.error("Erreur lors de la vérification des favoris:", error);
                }
            }
        };
        checkFavorite();
    }, [currentUser, pokemon.id]);

    const toggleFavorite = async (e) => {
        e.stopPropagation();
        if (!currentUser?.id) return;

        try {
            await api.put(`/api/dresseurs/${currentUser.id}/favoris`, {
                pokemonId: pokemon.id
            });
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des favoris:", error);
        }
    };

    //console.log(pokemon.type[0]);
    //console.log(pokemon);
    return (
        <div className="carte" data-type={pokemon.type[0]}>
            {currentUser?.id && (
                <FavoriteHeart 
                    isFavorite={isFavorite} 
                    onClick={toggleFavorite}
                />
            )}
            <h2>{pokemon.name.french}</h2>
            <div className="pokemon-container" style={{ backgroundImage: `url(${backgroundPath})` }}>
                <img 
                    src={isShiny ? pokemon.imageShiny : pokemon.image} 
                    alt={pokemon.name.french} 
                    className="pokemon-image" 
                />
                <button 
                    className="shiny-button" 
                    onClick={() => setIsShiny(!isShiny)}
                    title={isShiny ? "Version normale" : "Version chromatique"}
                >
                    ✨
                </button>
            </div>
            <div className="types">
                {pokemon.type.map((type, index) => (
                    <div key={index} className="type">
                        {types[type] ? (
                                <img
                                    src={types[type]}
                                    className="type-icon"  
                                />
                        ) : (
                            <span className="type-name">{type}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="stats">
                <p>❤️ {pokemon.base.HP}</p>
                <p>⚔️ {pokemon.base.Attack}</p>
                <p>🛡️ {pokemon.base.Defense}</p>
                <p>💥 {pokemon.base["Sp. Attack"]}</p>
                <p>🧿 {pokemon.base["Sp. Defense"]}</p>
                <p>👟 {pokemon.base.Speed}</p>
            </div>
        </div>
    );
};

export default Carte;
