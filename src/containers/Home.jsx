import React from 'react';
import Welcome from "../components/Welcome";
import Search from "../components/Search";
const Home = (props)=>{
    return (<>
        <Welcome name="Oscar" />
        <div className='container'>
            <Search/>
        </div>

    </>)
}

export default Home;
