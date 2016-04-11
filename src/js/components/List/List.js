import React from "react";
import Item from "./Item";
import { loadPokemons } from "../../actions/PokemonsActions";
import PokemonsStore from "../../stores/PokemonsStore";

export default class List extends React.Component {
  constructor() {
    super();
    this.uploadState = this.uploadState.bind(this);
    loadPokemons();
    this.state = {
      list: PokemonsStore.getList(),
    };
  }

  componentWillMount() {
    PokemonsStore.on("loaded_pokemons", this.uploadState);
    PokemonsStore.on("filtered", this.uploadState);
  }

  componentWillUnmount() {
    PokemonsStore.removeListener("loaded_pokemons", this.uploadState);
    PokemonsStore.removeListener("filtered", this.uploadState);
  }

  uploadState() {
    this.setState({
      list: PokemonsStore.getList(),
    });
  }

  loadMore() {
    loadPokemons(PokemonsStore.getLastId());
  }

  render() {
    const { list } = this.state;
    const ListComponents = list.map((item) => {
        return <Item key={item.national_id} {...item}/>;
    });

    return (
      <div class="col-xs-5 col-sm-7 col-md-8">
        <div class="row">
          {ListComponents}
        </div>
        <button class="btn btn-default load-more" type="button" onClick={this.loadMore.bind(this)}>Load More</button>
      </div>
    );
  }
}