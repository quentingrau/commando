import {Pokemon} from "../interfaces/Pokemon";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {PokemonContext} from "../App";
import {Alert, Skeleton, Snackbar} from "@mui/material";
import useFavoritePokemon from "../hooks/useFavoritePokemon";

interface PokemonItemProps {
    pokemonId: number;
}

export const PokemonItem = ({pokemonId}: PokemonItemProps) => {
    const navigate = useNavigate();
    const {pokemons} = useContext(PokemonContext);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isFavoritePokemon, toggleFavoritePokemon] = useFavoritePokemon();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const retrievedPokemon = pokemons.find((p) => p.id === pokemonId);
        if (retrievedPokemon) {
            setPokemon(retrievedPokemon);
        }
    }, [pokemonId, pokemons]);

    const handlePokemonClick = () => {
        navigate(`/${pokemonId}`);
    }

    const handleFavoriteClick = (isSettingAsFavorite: boolean, pokemon: Pokemon) => {
        toggleFavoritePokemon(pokemon.id);
        setAlertMessage(isSettingAsFavorite ? `Vous avez mis ${pokemon?.name} en favori` : `Vous avez retiré ${pokemon?.name} de vos favoris`);
        setOpen(true);
    }

    return (
        pokemon ?
        <div className="Pokemon">
                    <div className="Pokemon-title">
                        <img className="Pokemon-image" src={pokemon.image} alt={pokemon.name}/>
                        <p className="Pokemon-name" onClick={handlePokemonClick}>{pokemon.name}</p>
                    </div>
                    <div className="Pokemon-icon">
                        {isFavoritePokemon(pokemon.id)
                            ? <FavoriteIcon fontSize="large" onClick={() => handleFavoriteClick(false, pokemon)}/>
                            : <FavoriteBorderIcon fontSize="large" onClick={() => handleFavoriteClick(true, pokemon)}/>
                        }
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                {alertMessage}
                            </Alert>
                        </Snackbar>
                    </div>
        </div> : <Skeleton width="100%" height="250px" />
    )
}