import axios from 'axios';

// Config de l'api serveur en local
export const API_URL = import.meta.env.VITE_API_URL;

//axios instance
export const api = axios.create({
    baseURL: API_URL,
});
//fonction pour récupérer les pokemons
export const getPokemons = async () => {
    const response = await api.get("/api/pokemons");
    return response.data;
};

export const getPokemonById = async (id) => {
    const response = await api.get(`/api/pokemons/${id}`);
    return response.data;
};

export const createPokemon = async (pokemonData) => {
    const response = await api.post("/api/pokemons/create", pokemonData);
    return response.data;
};

export const updatePokemon = async (id, pokemonData) => {
    const response = await api.put(`/api/pokemons/${id}`, pokemonData);
    return response.data;
};

export const deletePokemon = async (id) => {
    const response = await api.delete(`/api/pokemons/${id}`);
    return response.data;
};

export const getPokemonTypes = async () => {
    const response = await api.get("/api/types");
    return response.data;
};



