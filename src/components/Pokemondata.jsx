import React,  { useState, useEffect } from 'react';
import Pokemonstat from "./Pokemonstat";
const Pokemondata = ({name, id, type, category,description, url, stats, height, weight}) => {
    let weakness = type.reduce((weaknessAcc, currenType)=>{
        return [...weaknessAcc, ...currenType.weakness];
    },[]);
    return <div className='col-md-6 col-12 '>
                <div className='row d-flex justify-content-center'>
                    <div className='pokemon-name'>{name} Nro {id}</div>
                </div>
                <div className='row d-flex'>
                   <div className='col-4'>
                       <div className='pokemon-image'>
                           <img className='img-thumbnail' src={url}/>
                       </div>
                   </div>
                    <div className='col-8'>
                        <div className='data d-flex flex-column'>
                            <div className='p-2 d-flex justify-content-start'>
                               <p>{description}</p>
                            </div>
                            <div>
                                <div className='row'>
                                    <div className='col-4'>Height</div>
                                    <div className='col-4'>Weight</div>

                                    <div className='col-4'>Category</div>
                                </div>
                                <div className='row'>
                                    <div className='col-4'>{parseFloat(height).toFixed(2)}m</div>
                                    <div className='col-4'>{parseFloat(weight).toFixed(2)}kg</div>

                                    <div className='col-4'>{category}</div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>Type</div>
                                </div>
                                <div className='row'>
                                    {type.map(item=>{
                                        return <div className='col-3'>{item.name}</div>
                                    })}
                                </div>

                                <div className='row'>
                                    <div className='col-3'>Weakness</div>
                                </div>
                                <div className='row'>
                                    {weakness.map(item=>{
                                        return <div className='col-3'>{item}</div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <Pokemonstat stats={stats}></Pokemonstat>
                    </div>

                </div>

            </div>;

}

export default Pokemondata;
