import React from "react";

export default class Filter extends React.Component {
  render() {
    const props = this.props;
    return (
      <div class="thumbnail">
        <img src={"http://pokeapi.co/media/img/".concat(props.national_id, ".png")} />
        <div class="caption">
          <h3>{props.name}</h3>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>{props.types[0].name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Attack</td>
              <td>{props.attack}</td>
            </tr>
            <tr>
              <td>Defense</td>
              <td>{props.defense}</td>
            </tr>
            <tr>
              <td>HP</td>
              <td>{props.hp}</td>
            </tr>
            <tr>
              <td>SP Attack</td>
              <td>{props.sp_atk}</td>
            </tr>
            <tr>
              <td>SP Defense</td>
              <td>{props.sp_def}</td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>{props.speed}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{props.weight}</td>
            </tr>
            <tr>
              <td>Total moves</td>
              <td>{props.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}