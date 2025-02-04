import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Carte from './components/Carte'
import pokemons from "./assets/pokemons";

function App() {
  const [count, setCount] = useState(0)
  const nom = "Youcef"
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
