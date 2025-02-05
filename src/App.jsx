import './App.css'
import Carte from './components/Carte'
import pokemons from "./assets/pokemons";

function App() {
  const randomIndex = Math.floor(Math.random() * pokemons.length);
  const pokemon = pokemons[randomIndex];
  return (
    <>

      <h1>Une carte aléatoire</h1>
      <div className="exemple">
        <Carte pokemon={pokemon} />
      </div>
      <h1>Pokedex</h1>
      <div className="gallery">
      {pokemons.map((pokemon, index) => (
        <Carte key={pokemon.id || index} pokemon={pokemon} />
      ))}
    </div>
    </>
  )
}

export default App
