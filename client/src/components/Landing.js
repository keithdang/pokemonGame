import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemon, selectPokemon } from "../actions";
class Landing extends Component {
  componentDidMount() {
    this.props.fetchPokemon();
  }
  renderSelect() {
    return <h4>Select Pokemon:</h4>;
  }
  renderYourPokemon() {
    return (
      <div>
        Your Pokemon:
        {this.props.auth &&
        this.props.auth.pokemon &&
        this.props.auth.pokemon[0] &&
        this.props.auth.pokemon[0].name
          ? this.props.auth.pokemon[0].name
          : ""}
      </div>
    );
  }
  renderPokemon() {
    return _.map(this.props.pokemon, pokemon => {
      return (
        <li key={pokemon.name}>
          <button
            className="btn"
            onClick={() => this.props.selectPokemon(pokemon)}
            style={{ marginBottom: "5px" }}
          >
            {pokemon.name}
          </button>
        </li>
      );
    });
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Pokemon List</h1>
        {this.renderSelect()}
        <ul>{this.props.pokemon && this.renderPokemon()}</ul>
        {this.renderYourPokemon()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return { pokemon: state.pokemon, auth: state.auth };
}
export default connect(
  mapStateToProps,
  { fetchPokemon, selectPokemon }
)(Landing);
