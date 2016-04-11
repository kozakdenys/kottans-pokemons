import $ from "jquery";
import React from "react";

import Header from "../components/Header";
import List from "../components/List/List";
import Filter from "../components/Filter/Filter";
import Item from "../components/Item/Item";

import PokemonsStore from "../stores/PokemonsStore";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    PokemonsStore.on("loaded_pokemon", this.uploadState.bind(this));
  }

  componentDidMount() {
    var stickyElement   = '#scroll-fixed';

    if($( stickyElement ).length){
      $( stickyElement ).each(function(){
        var fromTop = $( this ).offset().top;

        $( this ).css('width', $( this ).
          width()).css('top', 0).
          css('position', '');
        $( this ).affix({
          offset: { 
            top: fromTop,  
          }
        });

        $( window ).trigger('scroll'); 
      }); 
    }
  }

  componentWillUnmount() {
    PokemonsStore.removeListener("loaded_pokemon");
  }

  uploadState() {
    this.setState({
      item: <Item {...PokemonsStore.getItem()} />
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div class="main">
          <div class="container">
            <div class="row">
              <List />
              <div class="col-xs-7 col-sm-5 col-md-4">
                <div class="right-panel" id="scroll-fixed">
                  <Filter />
                  { this.state.item }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}