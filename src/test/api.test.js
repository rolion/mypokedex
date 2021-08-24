import React from "react";
import axios from "axios";
import { getPokemonList, searchPokemonByName, getPokemonInfo} from '../assets/libs/http'
// jest.mock('axios');
//
// const fakePokemonList = [
//     {
//         "name": "bulbasaur",
//         "url": "https://pokeapi.co/api/v2/pokemon/1/"
//     },
//     {
//         "name": "ivysaur",
//         "url": "https://pokeapi.co/api/v2/pokemon/2/"
//     },
//     {
//         "name": "venusaur",
//         "url": "https://pokeapi.co/api/v2/pokemon/3/"
//     },
//     {
//         "name": "charmander",
//         "url": "https://pokeapi.co/api/v2/pokemon/4/"
//     },
//     {
//         "name": "charmeleon",
//         "url": "https://pokeapi.co/api/v2/pokemon/5/"
//     },
//     {
//         "name": "charizard",
//         "url": "https://pokeapi.co/api/v2/pokemon/6/"
//     },
// ]
// it('should return the pokemon list', async function () {
//     axios.get.mockResolvedValueOnce({data:
//             {
//                 count: 60,
//                 next:null,
//                 previus:null,
//                 results: [
//                     {
//                         name:'test-pokemon',
//                         url:'https://pokeapi.co/api/v2/pokemon/1/'
//                     }
//                 ]
//             }
//     })
//     let result = await getPokemonList(10, 0).then(data => data.data.results);
//     expect(result.length).toEqual(1)
// });
// it('should get Pokemon list that have substring', async () =>{
//     axios.get.mockResolvedValueOnce({data:
//             {
//                 count: 60,
//                 next:null,
//                 previus:null,
//                 results: fakePokemonList
//             }
//     });
//     let result = await searchPokemonByName('saur');
//     //expect(result).toHaveLength(3)
//     expect(result).toStrictEqual([
//             { name: 'bulbasaur', id: '1' },
//             { name: 'ivysaur', id: '2' },
//             { name: 'venusaur', id: '3' }
//         ]
//     )
// })
// it('should get Pokemon that have exact match', async () =>{
//     axios.get.mockResolvedValueOnce({data:
//             {
//                 count: 60,
//                 next:null,
//                 previus:null,
//                 results: fakePokemonList
//             }
//     });
//     let result = await searchPokemonByName('charmander');
//     console.log(result)
//     //expect(result).toHaveLength(3)
//     expect(result).toStrictEqual([
//             { name: 'charmander', id: '4' },
//         ]
//     )
// })
it('should return pokemon info', async function () {
    let result = await getPokemonInfo(1);
    console.log(result)
});
