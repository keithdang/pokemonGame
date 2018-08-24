import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemon, selectPokemon } from "../actions";
class Landing extends Component {
  componentDidMount() {
    this.props.fetchPokemon();
  }
  renderSelect() {
    return (
      <button
        className="btn"
        onClick={() => this.props.selectPokemon("Bulbasaur")}
      >
        Select Pokemon
      </button>
    );
  }
  renderPokemon() {
    return _.map(this.props.pokemon, pokemon => {
      return <li key={pokemon.name}>{pokemon.name}</li>;
    });
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Pokemon List</h1>
        {this.renderSelect()}
        <ul>{this.props.pokemon && this.renderPokemon()}</ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return { pokemon: state.pokemon };
}
export default connect(
  mapStateToProps,
  { fetchPokemon, selectPokemon }
)(Landing);
