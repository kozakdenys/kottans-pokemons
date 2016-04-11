import dispatcher from "../dispatcher";
import axios from "axios";

export function loadPokemons(offset = 0, limit = 12) {
  dispatcher.dispatch({type: "FETCH_POKEMONS"});
  axios("http://pokeapi.co/api/v1/pokemon", {
    params: {
      limit,
      offset
    }
  }).then((data) => {
    dispatcher.dispatch({type: "LOADED_POKEMONS", data});
  })
}

export function loadPokemon(id) {
  axios("http://pokeapi.co/api/v1/pokemon/".concat(id)).then((data) => {
    dispatcher.dispatch({type: "LOADED_POKEMON", data});
  })
}

export function loadTypes() {
  const limit = 999;
  axios("http://pokeapi.co/api/v1/type", {
    params: {
      limit
    }
  }).then((data) => {
    dispatcher.dispatch({type: "LOADED_TYPES", data});
  })
}

