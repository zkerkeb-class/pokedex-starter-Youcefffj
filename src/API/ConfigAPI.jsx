import axios from 'axios';
import { api } from './AuthAPI';

// Config de l'api serveur en local
export const API_URL = import.meta.env.VITE_API_URL;

// Fonction pour récupérer les pokemons avec authentification
export const getPokemons = async () => {
    try {
        const response = await api.get("/api/pokemons");
        return response.data;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw error;
    }
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



