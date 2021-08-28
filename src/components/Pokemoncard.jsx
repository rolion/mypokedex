import React from 'react';
import '../assets/styles/pokemoncard.css'
const Pokemoncard= ({name, img, id}) => {

    return <div className='col-md-3 col-12 pokemon-card'>
        <h4 className='text-center pokemon-name'>{name}</h4>
        <img src={img} className="img-fluid border border-dark rounded-circle mx-auto d-block"></img>
        <p className='text-center'>Nro {id}</p>
    </div>
}

export default Pokemoncard;
