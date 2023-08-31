import {useContext} from 'react';
import {PokemonItem} from "./PokemonItem";
import {PokemonContext} from "../App";

export const PokemonsList = () => {
    const { pokemons } = useContext(PokemonContext);
    const pokemonItems = pokemons.map(pokemon => <PokemonItem key={pokemon.id} pokemonId={pokemon.id} />);
    return (
        <div className="PokemonContainer">
            {pokemonItems}
        </div>
    );
}