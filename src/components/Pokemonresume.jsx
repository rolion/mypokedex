import React,  { useState, useEffect } from 'react';
const Pokemonresume = ({name, img, evolvesTo}) => {
        const printEvolution = (nextEvolution)=>{
            if(nextEvolution && nextEvolution.evolves_to && nextEvolution.evolves_to.length>0){
                return <>
                    <h4 className='text-center'>{nextEvolution.species.name}</h4>
                    <img src={nextEvolution.species.img} className="img-fluid border border-dark rounded-circle mx-auto d-block"></img>
                    {/*{printEvolution(nextEvolution.evolves_to)}*/}
                </>
            }else{
                return <></>
            }

        }
        return <>
            {name && img && (()=>{
                return <>
                    <h4 className='text-center'>{name}</h4>
                    <img src={img} className="img-fluid border border-dark rounded-circle mx-auto d-block"></img>
                </>
            }

            )}
            {/*{printEvolution(evolvesTo)}*/}
        </>
}

export default Pokemonresume;
