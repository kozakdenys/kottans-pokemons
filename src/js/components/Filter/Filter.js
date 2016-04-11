import $ from "jquery";
import React from "react";

import { loadTypes } from "../../actions/PokemonsActions";
import PokemonsStore from "../../stores/PokemonsStore";

export default class Filter extends React.Component {
  constructor() {
    super();
    this.uploadState = this.uploadState.bind(this);
    loadTypes();
    this.state = {
      types: PokemonsStore.getTypes(),
    };
  }

  componentWillMount() {
    PokemonsStore.on("loaded_types", this.uploadState);
  }
  componentDidMount() {
    $(".dropdown-menu").on("click", "li", function(e) {
      PokemonsStore.setFilter(e.currentTarget.innerText.toLowerCase());
    }.bind(this));
  }

  componentWillUnmount() {
    PokemonsStore.removeListener("loaded_types", this.uploadState);
  }

  uploadState() {
    this.setState({
      types: PokemonsStore.getTypes(),
    });
  }

  render() {
    const { types } = this.state;
    const TypesComponents = types.map((item) => {
        return <li key={item.id}><a>{item.name}</a></li>;
    });

    return (
      <div class="thumbnail">
        <div class="caption">
        <h3>Filter</h3>
        <div class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
            Type <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            {TypesComponents}
          </ul>
        </div>
        </div>
      </div>
    );
  }
}