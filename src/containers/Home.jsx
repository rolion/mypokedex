import React from 'react';
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
const Home = (props)=>{
    return (<>
        <Banner name="Oscar" />
        <div className='container'>
            <SearchBar/>
        </div>

    </>)
}

export default Home;
