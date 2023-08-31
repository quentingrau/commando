import './App.css';
import { PokemonsList } from "./components/PokemonsList";
import {PokedexHeader} from "./components/PokedexHeader";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import {PokemonDetailed} from "./components/PokemonDetailed";
import axios, {AxiosResponse} from "axios";
import {Pokemon} from "./interfaces/Pokemon";
import {CircularProgress} from "@mui/material";

interface PokemonContextProps {
    pokemons: Pokemon[],
    persistPokemons: (pokemons: Pokemon[]) => void
}
export const PokemonContext = createContext<PokemonContextProps>({ pokemons: [], persistPokemons: () => {}});

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const persistPokemons = (pokemons: Pokemon[]) => {
        setPokemons(pokemons);
        localStorage.setItem("pokemons", JSON.stringify(pokemons));
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchPokemons = async () => {
            const pokemonsResponse: AxiosResponse<Pokemon[]> = await axios.get('https://pokebuildapi.fr/api/v1/pokemon/limit/100');
            const consolidatedPokemons = pokemonsResponse.data.map((p) => ({
                id: p.id,
                image: p.image,
                name: p.name,
                stats: p.stats,
                favorite: false
            }));
            persistPokemons(consolidatedPokemons);
            setIsLoading(false);
        };

        const localPokemons = localStorage.getItem("pokemons");
        if (localPokemons) {
            setPokemons(JSON.parse(localPokemons));
            setIsLoading(false);
        } else {
            fetchPokemons();
        }
    }, [])
    return (
        <div className="App">
            <PokemonContext.Provider value={{pokemons, persistPokemons}}>
                <PokedexHeader />
                {isLoading && <CircularProgress color="inherit" size={100} />}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PokemonsList />} />
                        <Route path="/:pokemonId" element={<PokemonDetailed />} />
                    </Routes>
                </BrowserRouter>
            </PokemonContext.Provider>
        </div>
    );
}

export default App;
