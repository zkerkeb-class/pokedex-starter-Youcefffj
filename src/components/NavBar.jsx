import { Link } from "react-router-dom";
import "../style/Navbar.css"; // Importation du CSS

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/Pokedex">Pokedex</Link></li>
        <li><Link to="/duel">Duel Aléatoire</Link></li>
        <li><Link to="/Account">Account</Link></li>
        <li><Link to="/favoris">Favoris</Link></li>
        <li><Link to="/MonPokedex">Mon Pokedex</Link></li>
        <li><Link to="/PackOpening">Pack Opening</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
