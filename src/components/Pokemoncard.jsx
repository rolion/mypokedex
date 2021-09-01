import React from 'react';
import '../assets/styles/pokemoncard.css'
import {Link} from "react-router-dom";
const Pokemoncard= ({name, img, id}) => {

    return <div className='col-md-3 col-sm-6 col-12 pokemon-card'>

        <h4 className='text-center pokemon-name'>
            <Link to={{
                pathname:`/pokemon/${name}`
            }}>{name}</Link>
        </h4>
        <img src={img} className="img-fluid border border-dark rounded-circle mx-auto d-block"></img>
        {id && (
            <p className='text-center'>Nro {id}</p>
        )}
    </div>
}

export default Pokemoncard;
