import './App.css';
import Carte from './components/Carte';
import SearchBar from './components/SearchBar';
import pokemons from "./assets/pokemons";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("name");

  // État pour le Pokémon sélectionné (pour la modale)
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSearch = (e) => {setSearch(e.target.value);};
  const handleType = (e) => {setType(e.target.value);};
  const handleSort = (e) => {setSort(e.target.value);};


  //Convertit le nom en chaine psk jsuis un golmon qui oublie les diff langues
  //nom match avec la recherche + recupération du type
  // renvoie le tableau filtré
  const filteredPokemons = pokemons
    .filter((pokemon) => {
      const name = String(pokemon.name.french);
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "all" || (pokemon.type && pokemon.type.includes(type));
      return matchesSearch && matchesType;
    })
    //Tri par nom ou type
    .sort((a, b) => {
      if (sort === "name") {
        return String(a.name.french).localeCompare(String(b.name.french));
      } else if (sort === "type") {
        return String(a.type[0]).localeCompare(String(b.type[0]));
      }
      return 0;
    });

  const handleReset = () => {
    setSearch("");
    setType("all");
    setSort("name");
  };

  //COMBAT 
  //a rendre dynamique
  const pokemon = pokemons[0];
  const pokemon2 = pokemons[9];

  //états pour les points de vie
  const [pokemon1HP, setPokemon1HP] = useState(pokemon.base.HP);
  const [pokemon2HP, setPokemon2HP] = useState(pokemon2.base.HP);
  const [battleLog, setBattleLog] = useState([]);
  const [isBattleOver, setIsBattleOver] = useState(false);

  // Simulation d'une attaque
  const attack = (attacker, defender, attackerHP, defenderHP, setDefenderHP) => {
    const damage = Math.floor((attacker.base.Attack / 3) * (Math.random() * 0.4 + 0.7));
    //calcul pv , 0 mini
    const newHP = Math.max(0, defenderHP - damage);
    // MAJ PV défenseur
    setDefenderHP(newHP);
    // Ajoute un message dans l'historique du combat
    setBattleLog(prev => [...prev, `${attacker.name.french} attaque ! ${defender.name.french} perd ${damage} PV !`]);
    // Vérifie si K.O.
    if (newHP === 0) {
      setBattleLog(prev => [...prev, `${defender.name.french} est K.O. !`]);
      setIsBattleOver(true);
    }
  };

  // Fonction pour simuler un tour de combat
  const simulateBattle = () => {
    if (isBattleOver) {
      // Réinitialiser le combat
      setPokemon1HP(pokemon.base.HP);
      setPokemon2HP(pokemon2.base.HP);
      setBattleLog([]);
      setIsBattleOver(false);
      return;
    }

    // Pokemon 1 attaque
    attack(pokemon, pokemon2, pokemon1HP, pokemon2HP, setPokemon2HP);
    if (pokemon2HP > 0) {
      // Pokemon 2 contre-attaque
      attack(pokemon2, pokemon, pokemon2HP, pokemon1HP, setPokemon1HP);
    }
  };

  return (
    <>
      <h1>Combat Aléatoire</h1>
      <div className="exemple">
        <div>
          <Carte pokemon={pokemon} />
          <p>PV: {pokemon1HP}/{pokemon.base.HP}</p>
        </div>
        <div>
          <Carte pokemon={pokemon2} />
          <p>PV: {pokemon2HP}/{pokemon2.base.HP}</p>
        </div>
      </div>
      <button onClick={simulateBattle}>
        {isBattleOver ? "Nouveau Combat" : "Attaquer !"}
      </button>
      <div className="battle-log">
        {battleLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>



      <SearchBar
        search={search}
        handleSearch={handleSearch}
        type={type}
        handleType={handleType}
        sort={sort}
        handleSort={handleSort}
        handleReset={handleReset}
      />
      <div className="gallery">
        {filteredPokemons.map((pokemon, index) => (
          // Si clique sur la carte, on affiche le Pokémon en grand
          <div key={pokemon.id || index} onClick={() => setSelectedPokemon(pokemon)}>
            <Carte key={pokemon.id || index} pokemon={pokemon} />
          </div>
        ))}
      </div>
      {/* affiche en grand la carte selec */}
     {selectedPokemon && (
        <div className="modal" onClick={() => setSelectedPokemon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Carte pokemon={selectedPokemon} className="big-card" />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
