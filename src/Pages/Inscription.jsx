import { Link } from "react-router-dom";
import "../style/Inscription.css";

function Inscription() {
  return (
    <div className="inscription-container">
      <h1>Inscription</h1>
      <form className="inscription-form">
        <input type="text" placeholder="Email" className="inscription-input" />
        <input type="password" placeholder="Password" className="inscription-input" />
        <button type="submit" className="inscription-button">Inscription</button>
        <p className="inscription-link">
          Déjà un compte ? <Link to="/Account">Connexion</Link>
        </p>
      </form>
    </div>
  );
}

export default Inscription;


/**mongooz */