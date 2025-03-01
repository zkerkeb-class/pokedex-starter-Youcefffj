import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Pokedex from "./Pages/Pokedex";
import Duel from "./Pages/Duel";
import Account from "./Pages/Account";
import Inscription from "./Pages/Inscription";
import Description from "./components/Description";
import { login } from "./API/AuthAPI";
import { useEffect, useState } from "react";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      login()
        .then(() => setIsAuthenticated(true))
        .catch(console.error);
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route path="/duel" element={<Duel />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Account/Inscription" element={<Inscription />} />
          <Route path="/Pokedex/:id" element={<Description />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
