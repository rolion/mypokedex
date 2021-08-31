import React,  { useState, useEffect } from 'react';

import '../assets/styles/search.css'
import   { searchPokemonByName} from  '../assets/libs/http';
import SearchResult from "./SearchResult";
import Spinner from "./Spinner";

const SearchBar = (props) => {
     const [pokemonName, setPokemonName] = useState('');

    const [searchResult, setSearchResult] = useState(null);

    const [ isSearching, setIsSearching] = useState(false);


    const handleSearch = async (name) => {
        try {
            if(name){
                setIsSearching(true);
                let resp = await searchPokemonByName(name);
                setSearchResult(resp);
                setIsSearching(false);
            }else{
                console.log('no pokemone Name')
            }
        }catch (e) {
            console.log(e);
            setIsSearching(false);
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
                {isSearching && (<Spinner></Spinner>)}
                {isSearching==false && searchResult && (
                    <SearchResult searchResult={searchResult}></SearchResult>
                )}
            </div>
    </>
}

export default SearchBar;
