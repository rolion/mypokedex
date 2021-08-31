import React from 'react';
import  pokeballSpinner from '../assets/img/pokeball-rolling.gif';
const Spinner = (props) => {

    return <>
        <div className="d-flex justify-content-center">
            {/*<div className="spinner-border" role="status">*/}
            {/*    <span className="sr-only">Loading...</span>*/}
            {/*</div>*/}
            <img src={pokeballSpinner}/>
        </div>
    </>
}

export default Spinner;
