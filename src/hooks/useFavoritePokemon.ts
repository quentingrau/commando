import {useContext, useState} from "react";
import {PokemonContext} from "../App";
import {Pokemon} from "../interfaces/Pokemon";

const useFavoritePokemon = (): [(pokemonId: number) => boolean, (pokemonId: number) => void] => {
    const {pokemons, persistPokemons} = useContext(PokemonContext);
    const contextFavoritePokemonIds = pokemons.filter(p => p.favorite).map(p => p.id);
    const [favoritePokemonIds, setFavoritePokemonIds] = useState<number[]>(contextFavoritePokemonIds);
    const isFavoritePokemon = (pokemonId: number): boolean => {
        return favoritePokemonIds.includes(pokemonId);
    }

    const toggleFavoritePokemon = (pokemonId: number) => {
        if (isFavoritePokemon(pokemonId)) {
            removeFromFavoritePokemon(pokemonId);
        } else {
            addToFavoritePokemon(pokemonId);
        }
        toggleFavoriteInContext(pokemonId);
    }

    const removeFromFavoritePokemon = (pokemonId: number) => {
        setFavoritePokemonIds(prev => prev.filter(p => p !== pokemonId));

    }

    const addToFavoritePokemon = (pokemonId: number) => {
        setFavoritePokemonIds(prev => [...prev, pokemonId]);
    }

    const toggleFavoriteInContext = (pokemonId: number) => {
        const copiedPokemons: Pokemon[] = JSON.parse(JSON.stringify(pokemons));
        const pokemonToUpdateIndex = copiedPokemons.findIndex(p => p.id === pokemonId);
        copiedPokemons[pokemonToUpdateIndex].favorite = !copiedPokemons[pokemonToUpdateIndex].favorite;
        persistPokemons(copiedPokemons);
    }

    return [isFavoritePokemon, toggleFavoritePokemon];
}

export default useFavoritePokemon;