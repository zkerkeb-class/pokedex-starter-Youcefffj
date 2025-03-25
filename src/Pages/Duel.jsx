import React, { useState, useEffect } from "react";
import Carte from "../components/Carte";
import { getPokemons } from "../API/ConfigAPI";
import "../App.css";

function Duel() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [pokemon1HP, setPokemon1HP] = useState(0);
  const [pokemon2HP, setPokemon2HP] = useState(0);
  const [battleLog, setBattleLog] = useState([]);
  const [isBattleOver, setIsBattleOver] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await getPokemons();
        if (response && response.pokemons && Array.isArray(response.pokemons)) {
          setPokemons(response.pokemons);
          const randomPokemon1 = getRandomPokemon(response.pokemons);
          const randomPokemon2 = getRandomPokemon(response.pokemons);
          setPokemon1(randomPokemon1);
          setPokemon2(randomPokemon2);
          setPokemon1HP(randomPokemon1.base.HP);
          setPokemon2HP(randomPokemon2.base.HP);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des pokémons:", error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const getRandomPokemon = (pokemonArray) => {
    return pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
  };

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
      const newPokemon1 = getRandomPokemon(pokemons);
      const newPokemon2 = getRandomPokemon(pokemons);
      setPokemon1(newPokemon1);
      setPokemon2(newPokemon2);
      setPokemon1HP(newPokemon1.base.HP);
      setPokemon2HP(newPokemon2.base.HP);
      setBattleLog([]);
      setIsBattleOver(false);
      return;
    }

    attack(pokemon1, pokemon2, pokemon2HP, setPokemon2HP);
    if (pokemon2HP > 0) {
      attack(pokemon2, pokemon1, pokemon1HP, setPokemon1HP);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="duel-container">
      <h1 className="Duel-title">Duel Aléatoire</h1>
      <div className="battle-container">
        <div className="battle-log">
          {battleLog.length > 0 && <p>{battleLog[battleLog.length - 1]}</p>}
          <button className="battle-button" onClick={simulateBattle}>
            {isBattleOver ? "Nouveau Combat" : "Attaquer !"}
          </button>
        </div>
      </div>
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
    </div>
  );
}

export default Duel;
