import React,  { useState, useEffect } from 'react';

import '../assets/styles/search.css';
import {getPokemonList, filterPokemonList, addAxiosStarted, addAxiosSuccess, cleanState} from '../actions/index';
import {getPokemonList as axiosGetPokemonList, searchPokemonByName, getPokemonIdFromUrl} from '../assets/libs/http';
import SearchResult from "./SearchResult";
import Spinner from "./Spinner";
import { connect } from 'react-redux';
import {useHistory, useLocation} from "react-router-dom"

const SearchBar = (props) => {

    let {loading, pokemonList, filterPokemonList} = props ;
    console.log('props', props);
    const q = useQuery();
    const params = new URLSearchParams();
    const history = useHistory();
    const [query, setQuery] = useState("");
    const [isReload, setReload] = useState(q.get('search')==null?true:false);
    useEffect(()=>{
        if(q.get('search')==null){
            props.cleanSearch();
            setQuery('');
            console.log('search result cleaned')
        }
        if(pokemonList == undefined ){
            props.getList();
            console.log('list loaded');
        }
    },[q.get('search')==null?true:false]);
    console.log('search value',q.get('search'))
    const handleSearch = async () => {
        if(query){
            props.searchPokemon(query, pokemonList);
            params.append("search", query);
            history.push({search: params.toString()});
            console.log('param added',params.get('search'));
        }

    }
    return <>
            <div className='row d-flex justify-content-center search '>
                <div className='col-lg-10 col-md-8 col-12'>
                    <div className="input-group mb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="name"
                               value={query}
                               onChange={event => setQuery(event.target.value)}
                               onKeyDown={e => e.key === 'Enter' && handleSearch()}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button"  onClick={e=>handleSearch()} >Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12  search-result-container'>
                {loading && (<Spinner></Spinner>)}
                {loading==false && filterPokemonList?.length > 0 && (
                    <SearchResult searchResult={filterPokemonList} ></SearchResult>
                )}
            </div>
    </>
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const getRawList = ()=>{
    return function (dispatch){
        return axiosGetPokemonList(1118, 0).then(
            (resp)=> dispatch(getPokemonList(resp.data.results)),
            (error)=>dispatch(console.log(error))
        )
    }
}
const searchPokemon = (name, pokemonList) =>{
    return function (dispatch){
        dispatch(addAxiosStarted(true));
        return searchPokemonByName(name, pokemonList).then(
            (resp) => {
                console.log('searchResult', resp);
                dispatch(filterPokemonList(resp))

                return dispatch(addAxiosSuccess(true));
            },
            (error) => dispatch(console.log(error))
        )

    }
}
const mapDispatchToProps = (dispatch) => {
  return {
        getList : ()=> dispatch(getRawList()),
        searchPokemon: (name, pokemonList)=>dispatch(searchPokemon(name, pokemonList)),
        cleanSearch: ()=>dispatch(cleanState())
  }
}
const mapStateToProps = (state) =>{
    console.log('state', state);
    return {
        ...state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
