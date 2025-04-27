import axios from 'axios';
import { api } from './AuthAPI';

// Config de l'api serveur en local
export const API_URL = import.meta.env.VITE_API_URL;

// Fonction pour authentification de l'utilisateur
export const login = async (username, password) => {
    try {
        const response = await api.post("/api/users/login", {
            username,
            password
        });
        
        if (response.data.user) {
            // Stockage des informations utilisateur
            localStorage.setItem('currentUser', JSON.stringify({
                id: response.data.user._id,
                username: response.data.user.username
            }));
            console.log(response.data.user._id);
            return response.data.user;
        }
    } catch (error) {
        console.error('Erreur de connexion:', error.response || error);
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
    }
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
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};

// Fonction pour l'inscription d'un nouvel utilisateur
export const register = async (username, password) => {
    try {
        const response = await api.post("/api/users/register", {
            username,
            password
        });
        
        if (response.data.user) {
            // Stockage des informations utilisateur après inscription
            localStorage.setItem('currentUser', JSON.stringify({
                id: response.data.user._id,
                username: response.data.user.username
            }));
            return response.data.user;
        }
    } catch (error) {
        console.error("Erreur d'inscription:", error.response || error);
        throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
    }
};
