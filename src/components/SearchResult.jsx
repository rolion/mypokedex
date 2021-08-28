import React,  { useState, useEffect } from 'react';
import Pokemoncard from "./Pokemoncard";
import '../assets/styles/searchresult.css'

const SearchResult = ({searchResult}) => {

    //justify-content-center
    const getPokemonImage = pokemon =>{
        let frontDefault = pokemon.images.other['official-artwork'].front_default;
        let pokeImage = frontDefault?frontDefault:pokemon.images.front_default;
        return pokeImage
    }
    return <div className='row d-flex search-result'>

            {   searchResult &&
                searchResult.length > 0 &&
                searchResult.map(element=> <Pokemoncard name = {element.name}
                                                        img={getPokemonImage(element)}
                                                        id={element.id}>

                                            </Pokemoncard>)
            }

    </div>
}

export default SearchResult;
