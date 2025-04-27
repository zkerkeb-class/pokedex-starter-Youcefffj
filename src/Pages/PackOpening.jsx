import React, { useState } from 'react';
import { getPokemons } from "../API/ConfigAPI";
import { getCurrentUser } from "../API/usersAPI";
import { api } from "../API/AuthAPI";
import Carte from "../components/Carte";
import '../style/PackOpening.css';

function PackOpening() {
    const [openedCards, setOpenedCards] = useState([]);
    const [isOpening, setIsOpening] = useState(false);
    const [error, setError] = useState(null);
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
    const [targetNumber, setTargetNumber] = useState(null);
    const [attempts, setAttempts] = useState(3);
    const [message, setMessage] = useState('');
    const currentUser = getCurrentUser();

    const startGame = () => {
        setTargetNumber(Math.floor(Math.random() * 10) + 1);
        setAttempts(3);
        setGameState('playing');
        setMessage('Devinez le nombre entre 1 et 10 !');
    };

    const makeGuess = (guess) => {
        const number = parseInt(guess);
        
        if (isNaN(number) || number < 1 || number > 10) {
            setMessage('Veuillez entrer un nombre entre 1 et 10');
            return;
        }

        setAttempts(prev => prev - 1);

        if (number === targetNumber) {
            setGameState('won');
            setMessage('Bravo ! Vous avez gagné un pack !');
        } else {
            const hint = number < targetNumber ? 'plus grand' : 'plus petit';
            if (attempts <= 1) {
                setGameState('lost');
                setMessage(`Perdu ! Le nombre était ${targetNumber}`);
            } else {
                setMessage(`Essayez un nombre ${hint} ! Il vous reste ${attempts - 1} essais`);
            }
        }
    };

    const openPack = async () => {
        if (!currentUser?.id) return;
        
        setIsOpening(true);
        setError(null);
        
        try {
            const response = await getPokemons();
            const allPokemons = response.pokemons;
            
            const randomPokemons = [];
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * allPokemons.length);
                randomPokemons.push(allPokemons[randomIndex]);
            }
            
            await api.put(`/api/dresseurs/${currentUser.id}/pokedex`, {
                pokemonIds: randomPokemons.map(p => p.id)
            });
            
            setOpenedCards(randomPokemons);
            setGameState('waiting');
        } catch (error) {
            console.error("Erreur détaillée:", error.response?.data || error);
            setError("Une erreur est survenue lors de l'ouverture du pack");
        } finally {
            setIsOpening(false);
        }
    };

    if (!currentUser?.id) {
        return (
            <div className="pack-opening-container">
                <h1>Pack Opening</h1>
                <p>Connectez-vous pour ouvrir des packs !</p>
            </div>
        );
    }

    return (
        <div className="pack-opening-container">
            <h1>Pack Opening</h1>
            
            {gameState === 'waiting' && (
                <button 
                    onClick={startGame}
                    className="start-game-button"
                >
                    Jouer pour gagner un pack
                </button>
            )}

            {gameState === 'playing' && (
                <div className="game-container">
                    <p>{message}</p>
                    <p>Essais restants : {attempts}</p>
                    <div className="number-buttons">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <button
                                key={num}
                                onClick={() => makeGuess(num)}
                                className="number-button"
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {gameState === 'won' && (
                <div className="result-container">
                    <p>{message}</p>
                    <button 
                        onClick={openPack}
                        disabled={isOpening}
                        className="open-pack-button"
                    >
                        {isOpening ? "Ouverture..." : "Ouvrir le Pack"}
                    </button>
                </div>
            )}

            {gameState === 'lost' && (
                <div className="result-container">
                    <p>{message}</p>
                    <button 
                        onClick={startGame}
                        className="retry-button"
                    >
                        Réessayer
                    </button>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
            
            <div className="opened-cards">
                {openedCards.map(pokemon => (
                    <Carte key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default PackOpening;
