import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemondata from "./Pokemondata";

import '../assets/styles/search.css'
import   {getPokemonList, searchPokemonByName, getPokemonInfo} from  '../assets/libs/http';
import SearchResult from "./SearchResult";

const SearchBar = (props) => {
     const [pokemonName, setPokemonName] = useState('');

    const [searchResult, setSearchResult] = useState(null);


    useEffect(() => {
    });
    const handleSearch = async (name) => {
        try {
            if(name){
                let resp = await searchPokemonByName(name);
                setSearchResult(resp);
            }else{
                console.log('no pokemone Name')
            }
        }catch (e) {
            console.log(e);
        }
    }
    return <>
            <div className='row d-flex justify-content-center search '>
                <div className='col-lg-10 col-md-8 col-12'>
                    <div className="input-group mb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="name"
                               onChange={event => setPokemonName(event.target.value)}
                               onKeyDown={e => e.key === 'Enter' && handleSearch(e.target.value)}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button"  onClick={e=>handleSearch(pokemonName)} >Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12  search-result-container'>
                {searchResult && (
                    <SearchResult searchResult={searchResult}></SearchResult>
                )}
            </div>
    </>
}

export default SearchBar;
