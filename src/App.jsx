import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Pokedex from "./Pages/Pokedex";
import Duel from "./Pages/Duel";
import Account from "./Pages/Account";
import Inscription from "./Pages/Inscription";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route path="/duel" element={<Duel />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Account/Inscription" element={<Inscription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
