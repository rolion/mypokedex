import React, {useState, useEffect, useCallback} from 'react';
import '../assets/styles/pokemon.css';
import   {getPokemonList, searchPokemonByName, getPokemonInfo} from  '../assets/libs/http';

import { useParams } from "react-router-dom";
import Pokemondata from "../components/Pokemondata";
import PokemonEvolution from "../components/Pokemonevolution";

const Pokemon = ( props ) => {
    let urlName = useParams().name;

    const [name, setName] = useState('');
    useEffect( () => {
            setName(urlName);
            document.title = `Pokedex | ${name}`;
    },[urlName]);

    const [pokemonInfo, setPokemonInfo] = useState(null);
    useEffect(async ()=>{
        try{
            let info = await getPokemonInfo(urlName);
            setPokemonInfo(info);
        }catch (e) {
            console.log(e);
        }
    }, [urlName]);

    if (name === '' ){
        return 'Loading';
        //d-flex justify-content-center
    }else{
        return <div className='container pokemon-container'>
            <div className='row d-flex justify-content-center pokemon-info'>
                {   pokemonInfo &&
                    pokemonInfo.id!=null &&
                    pokemonInfo.name!=null &&
                    pokemonInfo.types!=null &&
                    pokemonInfo.stats!=null &&
                    pokemonInfo.description!=null &&
                    pokemonInfo.typesInfo!=null && (
                        <Pokemondata name={pokemonInfo.name}
                                     id={pokemonInfo.id}
                                     category = {pokemonInfo.categorie}
                                     description = {pokemonInfo.description}
                                     url={pokemonInfo.images.other['official-artwork'].front_default}
                                     type={pokemonInfo.typesInfo}
                                     stats={pokemonInfo.stats}
                                     weight={pokemonInfo.weight}
                                     height={pokemonInfo.heigth}
                        >
                        </Pokemondata>
                    )}

            </div>
            <div className='row d-flex justify-content-center pokemon-evolution-container'>
                { pokemonInfo && pokemonInfo.evolutionChain !=null && <PokemonEvolution evolutions={pokemonInfo.evolutionChain}></PokemonEvolution>}
            </div>
        </div>
    }

}

export default Pokemon;
