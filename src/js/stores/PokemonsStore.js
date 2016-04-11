import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PokemonsStore extends EventEmitter {
  constructor() {
    super()
    this.list = [];
    this.types = [];
    this.filter = false;
  }

  getList() {
    return this.list.filter(function (item, index) {
      if (!this.filter) {
        return true;
      } else {
        return item.types.findIndex(function (type) {
            return type.name == this.filter;
        }.bind(this)) != -1;
      }
    }.bind(this));
  }
  getItem() {
    return this.item;
  }
  getTypes() {
    return this.types;
  }
  getLastId() {
    const list = this.list;
    return list.length && list[list.length - 1].national_id;
  }
  setFilter(name) {
    this.filter = name;
    this.emit("filtered");
  }
  handleActions(action) {
    switch(action.type) {
      case "LOADED_POKEMONS": {
        this.list.push.apply(this.list, action.data.data.objects);
        this.emit("loaded_pokemons");
        break;
      }
      case "LOADED_POKEMON": {
        this.item = action.data.data;
        this.emit("loaded_pokemon");
        break;
      }
      case "LOADED_TYPES": {
        this.types = action.data.data.objects;
        this.emit("loaded_types");
        break;
      }
    }
  }
}

const pokemonsStore = new PokemonsStore;
dispatcher.register(pokemonsStore.handleActions.bind(pokemonsStore));

export default pokemonsStore;
