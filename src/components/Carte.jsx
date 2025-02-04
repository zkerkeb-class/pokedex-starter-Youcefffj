import '../style/Carte.css';

const Carte = ({ pokemon }) => {
    return (
        <div className="carte" data-type={pokemon.type[0]}>
            <h2>{pokemon.name.french}</h2>
            <img src={pokemon.image} alt={pokemon.name.french} />
            <p>Type: {pokemon.type.join(", ")}</p>
            <p>HP: {pokemon.base.HP}</p>
            <p>Attack: {pokemon.base.Attack}</p>
            <p>Defense: {pokemon.base.Defense}</p>
        </div>
    );
};

export default Carte;
