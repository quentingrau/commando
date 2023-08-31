import { useParams } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { Pokemon } from "../interfaces/Pokemon";
import {Alert, CircularProgress, Snackbar} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PokemonContext } from "../App";
import useFavoritePokemon from "../hooks/useFavoritePokemon";

export const PokemonDetailed = () => {
    const pokemonId = parseInt(useParams().pokemonId || '');
    const { pokemons } = useContext(PokemonContext);
    const [isFavoritePokemon, toggleFavoritePokemon] = useFavoritePokemon();

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleFavoriteClick = (isSettingAsFavorite: boolean, pokemon: Pokemon) => {
        toggleFavoritePokemon(pokemon.id)
        setAlertMessage(isSettingAsFavorite ? `Vous avez mis ${pokemon?.name} en favori` : `Vous avez retiré ${pokemon?.name} de vos favoris`);
        setOpen(true);
    }

    useEffect(() => {
        const retrievedPokemon = pokemons.find((p) => p.id === pokemonId);
        if (retrievedPokemon) {
            setPokemon(retrievedPokemon);
        }
    }, [pokemonId, pokemons])

    return (
        <div className="PokemonContainer">
            {pokemon
                ? <div className="PokemonDetailed">
                    <div className="PokemonDetailed-title">
                        <img className="Pokemon-image" src={pokemon.image} alt={pokemon.name}/>
                        <p>{pokemon.name}</p>
                    </div>
                    <div className="PokemonDetailed-icon">
                        {isFavoritePokemon(pokemon.id) ?
                            <FavoriteIcon onClick={() => handleFavoriteClick(false, pokemon)} fontSize="large"/> : <FavoriteBorderIcon onClick={() => handleFavoriteClick(true, pokemon)} fontSize="large"/>
                        }
                    </div>
                    <div className="PokemonDetailed-stats">
                        <p>HP: {pokemon.stats.HP}</p>
                        <p>Attack: {pokemon.stats.attack}</p>
                        <p>Defense: {pokemon.stats.defense}</p>
                        <p>Special Attack: {pokemon.stats.special_attack}</p>
                        <p>Special Defense: {pokemon.stats.special_defense}</p>
                        <p>Speed: {pokemon.stats.speed}</p>
                    </div>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </div>
                : <CircularProgress color="inherit" size={100}/>}
        </div>
    );
}