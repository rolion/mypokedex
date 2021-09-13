import React,  { useState, useEffect } from 'react';

import '../assets/styles/search.css'
import {getPokemonList, searchPokemonByName, getPokemonIdFromUrl} from '../assets/libs/http';
import SearchResult from "./SearchResult";
import Spinner from "./Spinner";
import SelectSearch, {fuzzySearch} from "react-select-search";
import 'react-select-search/style.css';

const SearchBar = (props) => {

    const [pokemonName, setPokemonName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [ rawPokemonList, setRawPokemonList] = useState([]);
    useEffect(async () =>{
        try {
            let resp = await getPokemonList(1118,0);
            let list = resp.data.results;
            //setRawPokemonList(list.data);
            console.log(list);
            setRawPokemonList(list.map(pokemon =>( {name:pokemon.name, value : getPokemonIdFromUrl(pokemon.url)})));

        }catch (e) {
            console.log(e);
        }
    },[])
    // const [pokemonList, setPokemonList] = useState([]);
    // useEffect(()=>{
    //     if(pokemonName == ''){
    //         setPokemonList(rawPokemonList)
    //     }else{
    //         if(rawPokemonList){
    //             setPokemonList(rawPokemonList.filter(pokemon => (pokemon.name.includes(pokemonName))))
    //         }
    //     }
    // }, [pokemonName])

    const [ isSearching, setIsSearching] = useState(false);

    useEffect( () => {
        document.title = `Pokedex`;
    }, []);

    const handleSearch = async (name) => {
        try {
            if(name){
                setIsSearching(true);
                setSearchResult(null);
                let resp = await searchPokemonByName(name.toLowerCase());
                setSearchResult(resp);
                //loadResult();
                setIsSearching(false);
            }else{
                console.log('no pokemone Name');
            }
        }catch (e) {
            console.log(e);
            setIsSearching(false);
        }
    }
    // const filterList = name =>{
    //     setPokemonName(name);
    //
    // }
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
                {/*<div className="row">*/}
                {/*    <div className="col-12">*/}
                {/*        <SelectSearch options={rawPokemonList}*/}
                {/*                      search='true'*/}
                {/*                      filterOptions={fuzzySearch}*/}
                {/*                      placeholder="Pokemon name" />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className='col-12  search-result-container'>
                {isSearching && (<Spinner></Spinner>)}
                {isSearching==false && searchResult?.length > 0 && (
                    <SearchResult searchResult={searchResult} ></SearchResult>
                )}
            </div>
    </>
}

export default SearchBar;
