import React from 'react';
import Banner from "../components/Banner";
import {
    useLocation
} from "react-router-dom";
import SearchBar from "../components/SearchBar";
const Home = (props)=>{
    return (<>

        <div className='container'>
            <SearchBar/>
        </div>

    </>)
}



export default Home;
