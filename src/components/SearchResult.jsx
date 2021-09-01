import React,  { useState, useEffect } from 'react';
import Pokemoncard from "./Pokemoncard";
import '../assets/styles/searchresult.css'
import {forEach} from "react-bootstrap/ElementChildren";

const SearchResult = ({searchResult}) => {

    const [totalItemToDisplay, setTotalItemToDisplay] = useState({to:10, from:0});
    const [pokemonList, setPokemonList] = useState(searchResult.slice(0, 10));
    const getPokemonImage = pokemon =>{
        let frontDefault = pokemon.images.other['official-artwork'].front_default;
        let pokeImage = frontDefault?frontDefault:pokemon.images.front_default;
        return pokeImage
    }

    const loadResult = ()=>{
        let limit = 10;
        if (searchResult.length < totalItemToDisplay ){
            setPokemonList(searchResult);
        }else{
            let {from, to} = totalItemToDisplay;
            let list = searchResult.slice(from+10, to+10);
            setPokemonList([...pokemonList, ...list]);
            setTotalItemToDisplay({from: from+10, to: to+10 });
        }
    }

    return <div className='search-result'>
        <p className='text-center'>showing {pokemonList.length} of {searchResult.length}</p>
        <div className='row d-flex'>

            {   searchResult &&
            pokemonList.length > 0 &&
            pokemonList.map(element=> <Pokemoncard key = {element.name}
                                                   name = {element.name}
                                                   img={getPokemonImage(element)}
                                                   id={element.id}>
            </Pokemoncard>)
            }

        </div>
        <p className='text-center'>showing {pokemonList.length} of {searchResult.length}</p>
        <div className='row justify-content-center'>
            <button className={searchResult.length< totalItemToDisplay.to?'d-none':'btn btn-primary'}
                    onClick={e => loadResult()}
            > Load More Result</button>
        </div>

    </div>
}

export default SearchResult;
