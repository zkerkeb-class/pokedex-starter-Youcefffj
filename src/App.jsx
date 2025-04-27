import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Pokedex from "./Pages/Pokedex";
import Duel from "./Pages/Duel";
import Account from "./Pages/Account";
import Inscription from "./Pages/Inscription";
import Description from "./components/Description";
import Favoris from "./Pages/Favoris";
import MonPokedex from "./Pages/MonPokedex";
import { login } from "./API/AuthAPI";
import { useEffect, useState } from "react";
import PackOpening from "./Pages/PackOpening";
import { isAuthenticated } from "./API/usersAPI";

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
  const userLoggedIn = isAuthenticated();
  
  if (!userLoggedIn) {
    return <Navigate to="/Account" />;
  }
  
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      // Vérifier si l'utilisateur est connecté
      const loggedIn = isAuthenticated();
      setUserLoggedIn(loggedIn);
      
      // Si pas d'utilisateur connecté, initialiser l'API
      if (!loggedIn) {
        try {
          await login();
        } catch (error) {
          console.error("Erreur d'initialisation de l'API:", error);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar isLoggedIn={userLoggedIn} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route path="/duel" element={<Duel />} />
          <Route path="/Account" element={<Account setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/Account/Inscription" element={<Inscription />} />
          <Route path="/Pokedex/:id" element={<Description />} />
          <Route path="/favoris" element={
            <ProtectedRoute>
              <Favoris />
            </ProtectedRoute>
          } />
          <Route path="/MonPokedex" element={
            <ProtectedRoute>
              <MonPokedex />
            </ProtectedRoute>
          } />
          <Route path="/PackOpening" element={
            <ProtectedRoute>
              <PackOpening />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
