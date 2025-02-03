
//ou {prenom} au lieu de props
// const Header = ({prenom, autre}) => {
//avec valeur par defaut pour prenom : const Header = ({prenom="default", autre}) => {

import pokemons from "../../assets/pokemons";

const Header = (props) => {
    console.log("Header props : ",props);
    console.log("pokemons : ",pokemons[0]);
    const bulbi = pokemons[0];
    console.log("bulbi : ",bulbi.name.french);
    return (
        <header>
            <h1>Salut {props.prenom}</h1>
            <h2>Je suis {bulbi.name.french}</h2>
        </header>
    );
};

export default Header;