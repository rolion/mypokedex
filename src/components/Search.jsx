import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemondata from "./Pokemondata";
import Pokemonmovesc from "./Pokemonmoves";
import PokemonEvolution from './Pokemonevolution';
import {forEach} from "react-bootstrap/ElementChildren";

const Search = (props) => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonId, setPokemonId] = useState(null);
    const [pokemonType, setPokemonType] = useState(null);
    const [pokemonWeight, setPokemonWeight] = useState(null);
    const [pokemonHeight, setPokemonHeight] = useState(null);
    const [pokemonSpecie, setPokemonSpecie] = useState(null);
    const [pokemonCategory, setPokemonCategory ] = useState(null);
    const [pokemonImgUrl, setPokemonImgUrl] = useState(null);
    const [pokemonStats, setPokemonStats] = useState(null);
    const [pokemonMoves, setPokemonMoves] = useState(null);
    const [pokemonDescription, setPokemonDescription] = useState(null);
    const [ pokemonEvolution, setPokemonEvolution ] = useState(null);

    useEffect(() => {
    });
    async function _getEvolutionPic(evolves_to){
        if(evolves_to && evolves_to.length>0){
                for(let i=0; i<evolves_to.length; i++){
                    let species=evolves_to[i].species;
                    species.img=await getPokemonImage(species.name);
                    evolves_to[i].evolves_to = await _getEvolutionPic(evolves_to[i].evolves_to);
                }
        }
        return evolves_to;
    }
    async function getPokemonEvolution(url){
        if(url){
            try{
                let resp = await axios.get(url);
                let chain = resp.data.chain;
                let evolvesTo = chain.evolves_to;
                let imageUrl = await getPokemonImage(chain.species.name);
                chain.species.img =imageUrl;
                for(let i = 0; i<evolvesTo.length; i++){
                    let elem = evolvesTo[i];
                    elem.species.img =  await getPokemonImage(elem.species.name);
                    elem.evolves_to = await _getEvolutionPic(elem.evolves_to);
                }
                console.log('cadena evolucion', chain);
                setPokemonEvolution(chain);
            }catch (e) {
                console.log(`error ->`, e);
            }
        }
    }
    async function formatPokemonEvolution(url){
        if(url){
            try{
                let resp = await axios.get(url);
                let chain = resp.data.chain;
                let evolvesTo = chain.evolves_to;
                let imageUrl = await getPokemonImage(chain.species.name);
                chain.species.img =imageUrl;
                for(let i = 0; i<evolvesTo.length; i++){
                    let elem = evolvesTo[i];
                    elem.species.img =  await getPokemonImage(elem.species.name);
                    elem.evolves_to = await _getEvolutionPic(elem.evolves_to);
                }
                console.log('cadena evolucion', chain);
                setPokemonEvolution(chain);
            }catch (e) {
                console.log(`error ->`, e);
            }
        }
    }
    async function getPokemonImage(name){
        try{
            let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            let data = resp.data;
            let frontDefault = data.sprites.other['official-artwork'].front_default;
            let pokeImage = frontDefault?frontDefault:data.sprites.front_default;
            return pokeImage;
        }catch (e) {
            console.log(e);
        }
    }
    async function handleSearch(){
        try {
            setPokemonMoves(null);
            setPokemonEvolution(null);
            let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (resp.status == 200) {
                let data = resp.data;
                await getPokemonSpecie(data.species.url);
                await getStrengthWeakness(data.types);
                setPokemonId(data.id);
                setPokemonWeight(data.weight/10);
                setPokemonHeight(data.height*0.1);
                setPokemonId(data.id);
                let frontDefault = data.sprites.other['official-artwork'].front_default;
                let pokeImage = frontDefault?frontDefault:data.sprites.front_default;
                setPokemonImgUrl(pokeImage);
                setPokemonSpecie(data.species)
                setPokemonStats(data.stats);
            }else{
                console.log('error', resp.statusText);
            }
        }catch (e) {
            console.log(e);
        }
    }
    async function getPokemonSpecie(url){
        if(url){
            let resp = await axios.get(url);
            let data = await resp.data;
            getPokemonEvolution(data.evolution_chain.url);
            let descripcionElement =data.flavor_text_entries[9];
            setPokemonDescription(descripcionElement?descripcionElement.flavor_text:'');
            let categorie = data.genera.find(el => el.language.name == 'en');
            setPokemonCategory(categorie!=null?categorie.genus:'');
        }
    }
    async function getStrengthWeakness(types){
        if(types && types.length >0){
            let promisesStrengthWeakness=[];
            types.forEach( el=>{
                let typeUrl = el.type.url;
                let promiseType = axios.get(typeUrl).then((resp) =>{
                    let data = resp.data;
                    let damageRelation = data.damage_relations;
                    let strength= [];
                    let weakness= []
                    if (damageRelation && damageRelation.double_damage_from && damageRelation.double_damage_from.length>0){
                        weakness = damageRelation.double_damage_from.map(item=>item.name);
                    }
                    if (damageRelation && damageRelation.no_damage_from && damageRelation.no_damage_from.length>0){
                        strength = damageRelation.no_damage_from.map(item=>item.name);
                    }
                    return {name:data.name,weakness, strength};
                });
                promisesStrengthWeakness.push(promiseType);
            });
            await Promise.all(promisesStrengthWeakness).then(result =>{
                setPokemonType(result);
                })
        }else{

        }
    }
    async function getMoves(moves){
        let movesData = [];
        if(moves && moves.length>0){
           for(let i=0; i<moves.length; i++){
               let move= moves[i].move;

               let resp = await axios.get(move.url);
               let data = await resp.data;
               console.log(data);
               let description = data.flavor_text_entries.find(el => el.language.name=='en');
               movesData.push({name:move.name,
                   pp:data.pp,
                   power:data.power,
                   type: data.type,
                   category: data.meta.category.name,
                   description:description.flavor_text})
           }
        }
        console.log(movesData)
        return movesData;
    }

        return <>
                <div className='row d-flex justify-content-center'>
                    <div className='col-5'>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="name" onChange={event => setPokemonName(event.target.value)}/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button"  onClick={handleSearch} >Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row d-flex justify-content-center'>
                    {
                        pokemonId!=null &&
                        pokemonName!=null &&
                        pokemonType!=null &&
                        pokemonStats!=null &&
                        pokemonDescription!=null &&
                        pokemonCategory!=null && (
                        <Pokemondata name={pokemonName}
                                     id={pokemonId}
                                     category = {pokemonCategory}
                                     description = {pokemonDescription}
                                     url={pokemonImgUrl}
                                     type={pokemonType}
                                     stats={pokemonStats}
                                     weight={pokemonWeight}
                                     height={pokemonHeight}
                        >
                        </Pokemondata>
                    )}



                </div>
            { pokemonMoves!=null && ( <Pokemonmovesc moves={pokemonMoves}></Pokemonmovesc>  )}

            { pokemonEvolution !=null && <PokemonEvolution evolutions={pokemonEvolution}></PokemonEvolution>}
        </>;
};

export default Search;
