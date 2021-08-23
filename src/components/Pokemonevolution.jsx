import React,  { useState, useEffect } from 'react';
import '../assets/styles/Pokemonevolution.css';
import Pokemoncard from "./Pokemoncard";
const Pokemonevolution = ({evolutions}) => {

    console.log('evolution component', evolutions);
    function printEvoltion(evolution){
        if(evolution && evolution.length>0){
            return <>
                <div className='d-flex flex-column'>
                {evolution.map(item=>{
                        return <div className=''>
                            <Pokemoncard name={item.species.name} img={item.species.img} ></Pokemoncard>
                        </div>
                })}
                </div>
                {evolution.map(item =>{
                    return printEvoltion(item.evolves_to)
                })}

            </>

        }
    }
    return <div className='row container-evolution d-flex justify-content-center pokemon-info'>
        <h2>Evolution</h2>
        <div className='d-flex flex-row'>
            <div className='d-flex flex-column'>
                <div className=''>
                    <Pokemoncard name={evolutions.species.name} img={evolutions.species.img}>

                    </Pokemoncard>
                </div>
            </div>
            {printEvoltion(evolutions.evolves_to)}
        </div>
    </div>
}

export default Pokemonevolution;
