import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../router/app';
import {searchPokemonByName} from "../assets/libs/http";
import {act} from "react-dom/test-utils";

const mockfakePokemonList = [
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/"
    }
];

const info = {
        name: "bulbasaur",
        id: 1,
        weight: 69/10,
        heigth: 6*0.1,
        specieUrl:'https://pokeapi.co/api/v2/pokemon-species/4/',
        types: [
            {
                "slot": 1,
                "type": {
                    "name": "grass",
                    "url": "https://pokeapi.co/api/v2/type/12/"
                }
            },
            {
                "slot": 2,
                "type": {
                    "name": "poison",
                    "url": "https://pokeapi.co/api/v2/type/4/"
                }
            }
        ],
        images:  {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "other": {
                "official-artwork": {
                    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                }
            }
        },
        stats: [
            {
                "base_stat": 45,
                "effort": 0,
                "stat": {
                    "name": "hp",
                    "url": "https://pokeapi.co/api/v2/stat/1/"
                }
            },
            {
                "base_stat": 49,
                "effort": 0,
                "stat": {
                    "name": "attack",
                    "url": "https://pokeapi.co/api/v2/stat/2/"
                }
            },
        ],
        is_default: true
    }


jest.mock('../assets/libs/http', ()=>{
    return {
        getAllPokemon: () => {
            return Promise.resolve({
                data: {
                    results: mockfakePokemonList
                }
            })
        },
        searchPokemonByName: ()=>{
            return Promise.resolve([info])
        }
    }
});

const mockPokemonListFn = jest.fn();
const mockAxiosPokemonListFn = jest.fn();

mockPokemonListFn.mockImplementation(()=>{
    console.log('mockPokemonListFn called')
    return Promise.resolve({mockfakePokemonList});
});
mockAxiosPokemonListFn.mockImplementation(()=>{
    console.log('mockAxiosPokemonListFn called')
    return Promise.resolve({data: {results:mockfakePokemonList}});
});


beforeAll(()=>{


});


describe('search pokemon ', ()=>{
    let app =null;
    beforeAll(async ()=>{
        await act( async () => app = mount(<App></App>) );
    })
    afterAll(()=>{
        if(app){
            app.unmount();
        }
    })

    test('should find banner', ()=>{
        let banner = app.find('.banner');
        expect(app.exists()).toBeTruthy();
    });
    test('should find serachbar', ()=>{
        let searchBar = app.find('.search');
        expect(searchBar.exists()).toBeTruthy();
    });

    test('should show search result',async ()=>{
        //jest.setTimeout(10000);
        let input = app.find('input.form-control');
        await act( async () =>  input.simulate('change', { target: { value: 'saur' } }));
        let button = app.find('button.btn-primary');
        await act( async () =>  button.simulate('click'));
        app.update();
        let searchResult = app.find('div.search-result');
        let pokemonName = app.find('h4.pokemon-name').text();
        // console.log('html', app.html());
        // console.log('search result exists', searchResult.exists());
        expect(searchResult.exists()).toBeTruthy();
        expect(pokemonName).toBe('bulbasaur');
    })
})
