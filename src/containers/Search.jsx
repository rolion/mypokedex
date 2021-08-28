import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import React from "react";

const Search = (props)=>{
    return (<>
        <Banner name="Oscar" />
        <div className='container'>
            <SearchBar/>
        </div>

    </>)
}

export default Search;
