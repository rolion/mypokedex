import { compose } from 'redux'
const  axios = require('axios');


const basicUrl = 'https://pokeapi.co/api/v2/';

const getPokemonList = (limit = 60, offset = 0 ) => axios.get(`${basicUrl}pokemon?limit=${limit}&offset=${offset}`);
const getPokemonIdFromUrl = url => url.split('/')[6]

const searchPokemonByName =  async (name, pokemonList) => {
    //let pokemonList = await getPokemonList(1118, 0).then(resp => resp.data.results);
    let filteredPokemonList = pokemonList.filter(pokemon => (pokemon.name.includes(name)) );
    let pokemonListMapped = filteredPokemonList.map(pokemon =>( {name:pokemon.name, id : getPokemonIdFromUrl(pokemon.url)}));
    let searchResult = [];
    for(let position = 0; position < pokemonListMapped.length; position++){
        let pokemon = pokemonListMapped[position];
        let baseInfo = await getPokemoBaseInfo(pokemon.id);
        if(baseInfo.is_default){
            searchResult.push(baseInfo);
        }
    }
    return searchResult;
}

const getPokemoBaseInfo = async id => {
    let result = await getPokemonById(id);
    return {
        name: result.name,
        id: result.id,
        weight: result.weight/10,
        heigth: result.height*0.1,
        specieUrl: result.species.url,
        types: result.types,
        images: result.sprites,
        stats: result.stats,
        is_default: result.is_default
    }
}
const getPokemonSpecie =  pokemonBaseInfo => axios.get(pokemonBaseInfo.specieUrl).then(resp =>{
    let data = resp.data;
    let descripcionElement = '';
    let englishTextEntrie =data.flavor_text_entries.filter(e => e.language.name == 'en');
    descripcionElement= englishTextEntrie?englishTextEntrie[0]:data.flavor_text_entries[0];
    //console.log('description', descripcionElement)
    let categorie = data.genera.find(el => el.language.name == 'en');
    return {
        description:descripcionElement.flavor_text.replace("\f",' '),
        categorie: categorie?categorie.genus:'',
        evolutionChainUrl: data.evolution_chain.url
    }
}).catch(err => console.log(err))

const getStrengthWeakness = async pokemonBaseInfo =>{
    let types = pokemonBaseInfo.types;
    if (types  && types.length > 0){
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
        return await Promise.all(promisesStrengthWeakness).then(result =>{
            return { typesInfo: result}
        })
    }
}

const getPokemonEvolution = async pokemoBaseInfo =>{
    let data = await axios.get(pokemoBaseInfo.evolutionChainUrl).then(resp => resp.data);
    let chain = data.chain;
    let evolvesTo = chain.evolves_to;
    let imageUrl = '';
    try{
        imageUrl = await getPokemonImage(chain.species.name);
    }catch (e) {
        let url= chain.species.url.split('/')
        imageUrl = await getPokemonImage(url[6]);
    }

    chain.species.img =imageUrl;
    for(let i = 0; i<evolvesTo.length; i++){
        let elem = evolvesTo[i];
        elem.species.img =  await getPokemonImage(elem.species.name);
        elem.evolves_to = await getEvolutionPic(elem.evolves_to);
    }
    return chain;
}

const getPokemonImage = async name =>{
    let pokemon = await getPokemonByName(name);
    let frontDefault = pokemon.sprites.other['official-artwork'].front_default;
    let pokeImage = frontDefault?frontDefault:pokemon.sprites.front_default;
    return pokeImage

}
// it is mutating the object
const getEvolutionPic = async evolves_to =>{
    if(evolves_to && evolves_to.length>0){
        for(let i=0; i<evolves_to.length; i++){
            let species=evolves_to[i].species;
            species.img=await getPokemonImage(species.name);
            evolves_to[i].evolves_to = await getEvolutionPic(evolves_to[i].evolves_to);
        }
    }
    return evolves_to;
}
const getPokemonById = id => axios.get(`${basicUrl}pokemon/${id}`).then(resp => {
    console.log('getPokemonById', id);
    return resp.data
});
const getPokemonByName = name => axios.get(`${basicUrl}pokemon/${name}`).then(resp => resp.data);

const getPokemonInfo = async id =>{
    //console.log('getPokemonInfo name', id);
    let basePokemonInfo = await getPokemoBaseInfo(id);
    //console.log('basePokemonInfo', basePokemonInfo);
    let pokemonSpecie = await getPokemonSpecie(basePokemonInfo);
    //console.log('pokemonSpecie', pokemonSpecie);
    let pokemonStrengthWeakness = await getStrengthWeakness(basePokemonInfo);
    //console.log('pokemonStrengthWeakness', pokemonStrengthWeakness);
    let pokemonEvolutionChain = await  getPokemonEvolution(pokemonSpecie);
    //console.log('pokemonEvolutionChain', pokemonEvolutionChain);
    return {...basePokemonInfo, ...pokemonSpecie, ...pokemonStrengthWeakness, evolutionChain:{...pokemonEvolutionChain}}
}
export {
    getPokemonList,
    searchPokemonByName,
    getPokemonInfo,
    getPokemonIdFromUrl
}
