import {
    GET_POKEMON_LIST,
    SEARCH_POKEMON,
    GET_POKEMON_CARD,
    SEARCH_POKEMON_INFO,
    ADD_AXIOS_STARTED,
    ADD_AXIOS_SUCCESS,
    ADD_AXIOS_FAILURE,
    FILTER_POKEMON_LIST,
    CLEAN_STATE
} from './types';
export const addAxiosFailure = payload => ({
    type: ADD_AXIOS_FAILURE,
    payload
});

export const addAxiosSuccess = payload => ({
    type: ADD_AXIOS_SUCCESS,
    payload
});
export const addAxiosStarted = payload => ({
    type: ADD_AXIOS_STARTED,
    payload
});
export const getPokemonList = payload => ({
    type: GET_POKEMON_LIST,
    payload
});

export const filterPokemonList = payload => ({
    type: FILTER_POKEMON_LIST,
    payload
})


export const searchPokemonInfo = payload => ({
    type: SEARCH_POKEMON_INFO,
    payload
});

export const cleanState = payload => ({
    type: CLEAN_STATE,
    payload
})

