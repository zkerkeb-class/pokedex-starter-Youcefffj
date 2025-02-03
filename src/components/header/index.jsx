
//ou {prenom} au lieu de props
// const Header = ({prenom, autre}) => {
//avec valeur par defaut pour prenom : const Header = ({prenom="default", autre}) => {

const Header = (props) => {
    console.log("Header props : ",props);
    return (
        <header>
            <h1>Salut {props.prenom}</h1>
        </header>
    );
};

export default Header;