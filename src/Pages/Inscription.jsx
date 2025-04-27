import { Link, useNavigate } from "react-router-dom";
import "../style/Inscription.css";
import React, { useState } from "react";
import { register } from "../API/usersAPI";

function Inscription() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation basique
    if (!username || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      await register(username, password);
      // Redirection vers la page d'accueil après inscription réussie
      navigate("/");
      // Rafraîchir la page pour mettre à jour l'état de l'application
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="inscription-container">
      <h1>Inscription</h1>
      {error && <p className="inscription-error">{error}</p>}
      <form className="inscription-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="inscription-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="inscription-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="inscription-button">
          Inscription
        </button>
        <p className="inscription-link">
          Déjà un compte ? <Link to="/Account">Connexion</Link>
        </p>
      </form>
    </div>
  );
}

export default Inscription;


/**mongooz */