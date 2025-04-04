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
            localStorage.setItem('currentUser', JSON.stringify({
                id: response.data.user._id,
                username: response.data.user.username
            }));
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
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

// Fonction pour l'inscription d'un nouvel utilisateur
export const register = async (username, password) => {
    try {
        const response = await api.post("/api/users/register", {
            username: username,
            password: password 
        });
        
        if (response.status === 201) {
            // Si l'inscription réussit, on connecte directement l'utilisateur
            localStorage.setItem('currentUser', JSON.stringify({
                id: response.data.user._id,
                username: response.data.user.username
            }));
            return response.data;
        }
    } catch (error) {
        console.error("Erreur détaillée:", error.response || error);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Erreur lors de l'inscription");
    }
};
