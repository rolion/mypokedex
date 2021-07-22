import React from 'react';
const Pokemoncard= ({name, img}) => {

    return <>
        <h4 className='text-center'>{name}</h4>
        <img src={img} className="img-fluid border border-dark rounded-circle mx-auto d-block"></img>
    </>
}

export default Pokemoncard;
