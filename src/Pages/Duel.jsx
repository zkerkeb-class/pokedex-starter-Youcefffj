import React, { useState } from "react";
import Carte from "../components/Carte";
import pokemons from "../assets/pokemons";
import "../App.css"; 

function Duel() {
  // Sélection aléatoire des Pokémon
  const getRandomPokemon = () => pokemons[Math.floor(Math.random() * pokemons.length)];
  const [pokemon1, setPokemon1] = useState(getRandomPokemon());
  const [pokemon2, setPokemon2] = useState(getRandomPokemon());
  
  const [pokemon1HP, setPokemon1HP] = useState(pokemon1.base.HP);
  const [pokemon2HP, setPokemon2HP] = useState(pokemon2.base.HP);
  const [battleLog, setBattleLog] = useState([]);
  const [isBattleOver, setIsBattleOver] = useState(false);

  const attack = (attacker, defender, defenderHP, setDefenderHP) => {
    const damage = Math.floor((attacker.base.Attack / 3) * (Math.random() * 0.4 + 0.7));
    const newHP = Math.max(0, defenderHP - damage);
    setDefenderHP(newHP);
    setBattleLog(prev => [...prev, `${attacker.name.french} attaque ! ${defender.name.french} perd ${damage} PV !`]);

    if (newHP === 0) {
      setBattleLog(prev => [...prev, `${defender.name.french} est K.O. !`]);
      setIsBattleOver(true);
    }
  };

  const simulateBattle = () => {
    if (isBattleOver) {
      // Recommencer un combat avec de nouveaux Pokémon
      const newPokemon1 = getRandomPokemon();
      const newPokemon2 = getRandomPokemon();
      setPokemon1(newPokemon1);
      setPokemon2(newPokemon2);
      setPokemon1HP(newPokemon1.base.HP);
      setPokemon2HP(newPokemon2.base.HP);
      setBattleLog([]);
      setIsBattleOver(false);
      return;
    }

    // Combat tour par tour
    attack(pokemon1, pokemon2, pokemon2HP, setPokemon2HP);
    if (pokemon2HP > 0) {
      attack(pokemon2, pokemon1, pokemon1HP, setPokemon1HP);
    }
  };

  return (
    <>
      <h1>Duel Aléatoire</h1>
      <div className="exemple">
        <div>
          <Carte pokemon={pokemon1} />
          <p>PV: {pokemon1HP}/{pokemon1.base.HP}</p>
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
    </>
  );
}

export default Duel;
