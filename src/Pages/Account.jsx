// Page de compte
//login et inscription
//afficher les informations du compte
import { Link } from "react-router-dom";
import "../style/Account.css";


import React from "react";

function Account() {
  return (
    <>
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form className="login-form">
                <input type="text" placeholder="Email" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button type="submit" className="login-button">Login</button>
                <p className="login-signup">Pas de compte ? <Link to="/Account/Inscription" className="login-link">Inscription</Link></p>
            </form>
        </div>
    </>
  );
}

export default Account;
