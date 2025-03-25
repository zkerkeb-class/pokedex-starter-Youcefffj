import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/NavBar.css";
import { logout } from "../API/usersAPI";

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Account");
    // Rafraîchir la page pour mettre à jour l'état de l'application
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/Pokedex">Pokedex</Link>
        </li>
        <li>
          <Link to="/duel">Duel</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/favoris">Favoris</Link>
            </li>
            <li>
              <Link to="/MonPokedex">Mon Pokedex</Link>
            </li>
            <li>
              <Link to="/PackOpening">Pack Opening</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Déconnexion
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/Account">Connexion</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
