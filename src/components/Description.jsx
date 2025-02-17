//Description du pokemon selectionné dans la Pokedex

import '../style/Description.css';
import Carte from './Carte';
function Description({ pokemon }) {
  return (
    <>
      
      <div className="description-container">
        <h2>{pokemon.name.french}</h2>
        <div className="pokemon-details">
          <p><strong>Types:</strong> {pokemon.type.join(' / ')}</p>
          <div className="details-stats">
            <h3>Statistiques de base:</h3>
            <p><strong>PV:</strong> {pokemon.base.HP}</p>
            <p><strong>Attaque:</strong> {pokemon.base.Attack}</p>
            <p><strong>Défense:</strong> {pokemon.base.Defense}</p>
            <p><strong>Attaque Spé:</strong> {pokemon.base["Sp. Attack"]}</p>
            <p><strong>Défense Spé:</strong> {pokemon.base["Sp. Defense"]}</p>
            <p><strong>Vitesse:</strong> {pokemon.base.Speed}</p>   
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;



