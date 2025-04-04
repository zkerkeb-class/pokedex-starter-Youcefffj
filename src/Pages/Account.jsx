// Page de compte
//login et inscription
//afficher les informations du compte
import { Link, useNavigate } from "react-router-dom";
import "../style/Account.css";
import React, { useState, useEffect } from "react";
import { login, isAuthenticated } from "../API/usersAPI";

function Account({ setUserLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const user = await login(username, password);
      setUserLoggedIn(true);
      navigate("/");
    } catch (error) {
      setError(error.message || "Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="login-signup">
          Pas de compte ? <Link to="/Account/Inscription" className="login-link">Inscription</Link>
        </p>
      </form>
    </div>
  );
}

export default Account;
