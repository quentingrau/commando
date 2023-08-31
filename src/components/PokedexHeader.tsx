import PokedexIcon from '../pokedex.png';

export const PokedexHeader = () => {
    return (
        <header className="App-header">
            <img className="App-header-icon" src={PokedexIcon} alt="Pokedex icon" />
            <a className="App-header-title" href="/">Pokédex</a>
        </header>
    );
}