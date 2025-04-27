import axios from 'axios';

// Config de l'api serveur en local
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

//axios instance
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

//Connexion email:password et recuperation du token pour les requêtes
export const login = async () => {
    try {      
        const email = import.meta.env.VITE_TEST_EMAIL;
        const password = import.meta.env.VITE_TEST_PASSWORD;
        const response = await api.post("/api/auth/login", {
            email,
            password
        });
        
        //console.log('Login response:', response.data);
        
        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // Add token to axios default headers
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        return response.data;
    } catch (error) {
        console.error('Login error details:', error.response || error);
        throw error;
    }
};

// Add request interceptor for debugging
api.interceptors.request.use(request => {
    //console.log('Starting Request:', request);
    return request;
});

// Execute login immediately
login().catch(console.error);