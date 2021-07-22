import React,  { useState, useEffect } from 'react';
import axios from 'axios';
const Pokemonmovesc = ({moves}) => {
    const [myPokemonMoves, setMyPokemonMoves] = useState(moves?moves:[]);
    useEffect(()=>{
        console.log('moves component ',myPokemonMoves);
    })
    return <div>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">name</th>
                <th scope="col">Power Point</th>
                <th scope="col">Power</th>
                <th scope="col">Type</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
            </tr>
            </thead>
            <tbody>
                {myPokemonMoves?.map(move=>{
                    //let move= m.move;
                    //console.log(move);
                    return <tr>
                        <th>{move.name}</th>
                        <th>{move.pp?move.pp:0}</th>
                        <th>{move.power?move.power:0}</th>
                        <th>{move.type?move.type.name:''}</th>
                        <th>{move.category?move.category:''}</th>
                        <th>{move.description?move.description:''}</th>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default Pokemonmovesc;
