import React from 'react';
import Banner from "../components/Banner";
import Search from "../components/Search";
const Home = (props)=>{
    return (<>
        <Banner name="Oscar" />
        <div className='container'>
            <Search/>
        </div>

    </>)
}

export default Home;
