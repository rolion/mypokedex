import React,  { useState, useEffect } from 'react';
import '../assets/styles/Pokemonevolution.css';
import Pokemoncard from "./Pokemoncard";
const Pokemonevolution = ({evolutions}) => {
    function printEvolution(evolution){
        if(evolution && evolution.length>0){
            return <>
                {evolution.map(item=>{
                        return <>
                           <Pokemoncard name={item.species.name} img={item.species.img} ></Pokemoncard>
                        </>
                })}
                {evolution.map(item =>{
                    return printEvolution(item.evolves_to)
                })}

            </>

        }
    }
    console.log('evolution', evolutions);
    return <>
                <div className='col-12 text-center title'>
                    <h2>Evolution</h2>
                </div>
                <Pokemoncard name={evolutions.species.name} img={evolutions.species.img}>
                </Pokemoncard>
                {printEvolution(evolutions.evolves_to)}
            </>
}

export default Pokemonevolution;
