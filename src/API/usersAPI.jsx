import axios from 'axios';
import { api } from './AuthAPI';

// Config de l'api serveur en local
export const API_URL = import.meta.env.VITE_API_URL;

// Fonction pour authentification de l'utilisateur
export const login = async (username, password) => {
    try {
        // D'abord récupérer tous les utilisateurs
        const response = await api.get("/api/users");
        const users = response.data.users;
        
        // Vérifier si l'utilisateur existe et si le mot de passe correspond
        const user = users.find(u => u.username === username && u.mdp === password);
        
        if (user) {
            // Stocker les informations de l'utilisateur dans le localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                id: user._id,
                username: user.username
            }));
            return user;
        } else {
            throw new Error("Nom d'utilisateur ou mot de passe incorrect");
        }
    } catch (error) {
        throw error;
    }
};

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

export const getUsers = async () => {
    try {
        const response = await api.get("/api/users");
        return response.data.users; // Ajustement pour accéder au tableau users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
    return localStorage.getItem('currentUser') !== null;
};

// Fonction pour déconnecter l'utilisateur
export const logout = () => {
    localStorage.removeItem('currentUser');
};

// Fonction pour obtenir l'utilisateur actuel
export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};
