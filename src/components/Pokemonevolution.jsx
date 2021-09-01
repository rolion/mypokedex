import React,  { useState, useEffect } from 'react';
import '../assets/styles/Pokemonevolution.css';
import Pokemoncard from "./Pokemoncard";
const Pokemonevolution = ({evolutions}) => {
    const  printEvolution = (evolution) => {
        if(evolution && evolution.length>0){
            return <>
                {evolution.map(item=>{
                        return <>
                           <Pokemoncard key= {item.species.name} name={item.species.name} img={item.species.img} ></Pokemoncard>
                        </>
                })}
                {evolution.map(item =>{
                    return printEvolution(item.evolves_to)
                })}
            </>

        }
    }
    return <>
                <div className='col-12 text-center title'>
                    <h2>Evolution</h2>
                </div>
                <Pokemoncard key= {evolutions.species.name} name={evolutions.species.name} img={evolutions.species.img}>
                </Pokemoncard>
                {printEvolution(evolutions.evolves_to)}
            </>
}

export default Pokemonevolution;
