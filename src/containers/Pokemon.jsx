import React, {useState, useEffect, useCallback} from 'react';
import '../assets/styles/pokemon.css';
import   {getPokemonList, searchPokemonByName, getPokemonInfo} from  '../assets/libs/http';

import { useParams, useHistory} from "react-router-dom";
import Pokemondata from "../components/Pokemondata";
import PokemonEvolution from "../components/Pokemonevolution";
import Spinner from "../components/Spinner";
import Error404 from "../components/Error404";



const Pokemon = ( props ) => {
    let history = useHistory();
    let urlName = useParams().name;
    const [name, setName] = useState('');
    useEffect( () => {
            setName(urlName);
            document.title = `Pokedex | ${name}`;
    });
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(async ()=>{
        try{
            if(pokemonInfo == null || pokemonInfo.name !=urlName){
                console.log('use effect urlname', urlName )
                let info = await getPokemonInfo(urlName);
                setPokemonInfo(info);
                window.scrollTo(0, 0)
            }
        }catch (e) {
            console.log(e);
            setError(true);
        }
        setIsLoading(false);
    }, [urlName]);

    const handleClick = (e) => {
        history.push("/pokedex");
    }

    if(error){
        return <>
            <div className='container'>
                <Error404></Error404>
            </div>
        </>
    }

    if (isLoading == true ){
        return <>
            <div className='container'>
                    <Spinner></Spinner>
            </div>
        </>;
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
                        <Pokemondata
                                     key = {pokemonInfo.id}
                                     name={pokemonInfo.name}
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
            <div className="row d-flex justify-content-center pokemon-bottom">
                <button className="btn btn-primary" onClick={handleClick}> go back to pokedex</button>
            </div>
        </div>
    }
}

export default Pokemon;
