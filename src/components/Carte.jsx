import '../style/Carte.css';

const Carte = ({ pokemon }) => {
    return (
        <div className="carte" data-type={pokemon.type[0]}>
            <h2>{pokemon.name.french}</h2>
            <img src={pokemon.image} alt={pokemon.name.french} className="pokemon-image" />

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
            </div>
        </div>
    );
};

export default Carte;
