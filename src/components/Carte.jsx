import '../style/Carte.css';

const Carte = ({ pokemon }) => {
    const backgroundPath = `src/assets/background/${pokemon.type[0]}/${pokemon.type[0]}1.webp`;
    console.log(pokemon.type[0]);
    console.log(pokemon);
    return (
        <div className="carte" data-type={pokemon.type[0]}>
            <h2>{pokemon.name.french}</h2>
            <div className="pokemon-container" style={{ backgroundImage: `url(${backgroundPath})` }}>
                <img src={pokemon.image} alt={pokemon.name.french} className="pokemon-image" />
            </div>
            <div className="types">
                {pokemon.type.map((type) => (
                    <img
                        key={type}
                        src={`src/assets/types/${type}.png`}
                        alt={type}
                        className="type-icon"
                    />
                ))}
            </div>

            <div className="stats">
                <p>❤️ {pokemon.base.HP}</p>
                <p>⚔️ {pokemon.base.Attack}</p>
                <p>🛡️ {pokemon.base.Defense}</p>
                <p>💥 {pokemon.base["Sp. Attack"]}</p>
                <p>🧿 {pokemon.base["Sp. Defense"]}</p>
                <p>👟 {pokemon.base.Speed}</p>
            </div>
        </div>
    );
};

export default Carte;
