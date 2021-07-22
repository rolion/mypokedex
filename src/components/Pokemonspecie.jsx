import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemondata from "./Pokemondata";

const Pokemonspecie = ({url}) => {
    const [isBaby, setIsBaby] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState(null);
    const [isLegendary, setIsLegendary] = useState(null);
    const [isMythical, setisMythical] = useState(null);
    const [description, setDescription] = useState('');
    axios.get(url)
        .then(resp =>{
            console.log('species', resp.data);
        })
        .catch(error => console.error(error));
    return <div className='row d-flex justify-content-center'>
        <div className='col-6'>

        </div>
    </div>
}

export default Pokemonspecie;
