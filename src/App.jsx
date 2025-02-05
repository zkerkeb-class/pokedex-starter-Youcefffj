import './App.css'
import Carte from './components/Carte'
import pokemons from "./assets/pokemons";

function App() {
  const pokemon = pokemons[24];
  return (
    <>
      <div>
        <Carte pokemon={pokemon}/>
      </div>
    </>
  )
}

export default App
