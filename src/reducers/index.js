import {
    GET_POKEMON_LIST,
    SEARCH_POKEMON,
    GET_POKEMON_CARD,
    SEARCH_POKEMON_INFO,
    ADD_AXIOS_STARTED,
    ADD_AXIOS_SUCCESS,
    ADD_AXIOS_FAILURE,
    FILTER_POKEMON_LIST,
    ADD_POKEMON_NAME_TO_SEARCH,
    CLEAN_STATE
} from '../actions/types';


export const initialState ={
    loading:false,
    error:false,
    pokemonList:[],
    filterPokemonList: [],
    pokemon:null,
}
const reducer = (state =initialState, action) => {
    switch (action.type){
        case FILTER_POKEMON_LIST:
            return{
                ...state,
                filterPokemonList: action.payload
            }
        case ADD_AXIOS_STARTED:
            return {
                ...state,
                loading:true
            }
        case ADD_AXIOS_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case GET_POKEMON_LIST:
            return {
                ...state,
                pokemonList: [ ...action.payload ]
            }
        case CLEAN_STATE:
            return {
                ...state,
                filterPokemonList: null
            }

    }
}
export default reducer;
