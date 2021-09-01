import React,  { useState, useEffect } from 'react';
import Pokemonstat from "./Pokemonstat";
import '../assets/styles/pokemondata.css'
const Pokemondata = ({name, id, type, category,description, url, stats, height, weight}) => {
    let weakness = type.reduce((weaknessAcc, currenType)=>{
        return [...weaknessAcc, ...currenType.weakness];
    },[]);
//    let weakness = [];
    return <>
        <div className='col-12 pokemon-data'>
            <div className='row d-flex justify-content-center'>
                <div className='pokemon-name'><h3>{name} Nro {id}</h3></div>
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-4 col-12'>
                    <div className='pokemon-image'>
                        <img className='img-thumbnail' src={url}/>
                    </div>
                </div>
                <div className='col-md-8 col-12'>
                    <div className='data d-flex flex-column'>
                        <div className='p-2 d-flex justify-content-start'>
                            <p>{description}</p>
                        </div>
                        <div>
                            <div className='row'>
                                <div className='col-4 title'>Height</div>
                                <div className='col-4 title'>Weight</div>
                                <div className='col-4 title'>Category</div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>{parseFloat(height).toFixed(2)}m</div>
                                <div className='col-4'>{parseFloat(weight).toFixed(2)}kg</div>
                                <div className='col-4'>{category}</div>
                            </div>
                            <div className='row'>
                                <div className='col-12 title'>Type</div>

                            </div>
                            <div className='row'>
                                {type.map(item=>{
                                    return <div key={item.name} className='col-4'>{item.name}</div>
                                })}

                            </div>
                            <div className='row'>
                                <div className='col-12 title'>Weakness</div>
                            </div>
                            <div className="row">
                                {weakness.map(item=>{
                                    return <div key={item} className='col-4'>{item}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <Pokemonstat stats={stats}></Pokemonstat>
                </div>

            </div>
        </div>
    </>

}

export default Pokemondata;
