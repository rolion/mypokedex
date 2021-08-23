import React,  { useState, useEffect } from 'react';
import '../assets/styles/Pokemonevolution.css';
import Pokemoncard from "./Pokemoncard";
const Pokemonevolution = ({evolutions}) => {

    console.log('evolution component', evolutions);
    function printEvolution(evolution){
        if(evolution && evolution.length>0){
            return <>
                <div className='d-flex flex-column'>
                {evolution.map(item=>{
                        return <>
                           <Pokemoncard name={item.species.name} img={item.species.img} ></Pokemoncard>
                        </>
                })}
                </div>
                {evolution.map(item =>{
                    return printEvolution(item.evolves_to)
                })}

            </>

        }
    }
    return <>
        <div className='row pokemon-info container-evolution'>
            <div className='col-12'>
                <div className='row justify-content-center '>
                    <div>
                        <h2>Evolution</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div className='d-flex flex-row justify-content-center'>
                            <div className='d-flex flex-column evolution-container'>
                                <Pokemoncard name={evolutions.species.name} img={evolutions.species.img}>

                                </Pokemoncard>
                            </div>
                            {printEvolution(evolutions.evolves_to)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
}

export default Pokemonevolution;
