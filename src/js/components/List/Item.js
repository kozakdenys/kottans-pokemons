import React from "react";
import { loadPokemon } from "../../actions/PokemonsActions";

export default class Item extends React.Component {
  setItem() {
    loadPokemon(this.props.national_id);
  }

  render() {
    const { national_id, name, types } = this.props;
    const ListTypes = types.map((item, index) => {
        return <span key={index} ><span class="label label-info">{item.name}</span> </span>;
    });

    return (
      <div onClick={this.setItem.bind(this)} class="col-xs-12 col-sm-6 col-md-4 list-item">
        <div class="thumbnail">
          <img src={"http://pokeapi.co/media/img/".concat(national_id, ".png")} />
          <div class="caption">
            <h3>{name}</h3>
            {ListTypes}
          </div>
        </div>
      </div>
    );
  }
}