import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemon, selectPokemon, fetchMove } from "../actions";
import { Modal, Button, Table } from "react-bootstrap";
class Landing extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      pokemonDisplay: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(pokemon) {
    this.props.fetchMove(pokemon.moves);
    this.setState({ show: true, pokemonDisplay: pokemon });
  }

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
  selectAndCloseModal(pokemon) {
    this.props.selectPokemon(pokemon);
    this.setState({ show: false });
  }
  renderMovesTable(moves) {
    return _.map(moves, item => {
      return (
        <tr key={item}>
          <td>{item}</td>
        </tr>
      );
    });
  }
  renderPokeModal() {
    return (
      <Modal
        className="pokeModal"
        show={this.state.show}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.state.pokemonDisplay && this.state.pokemonDisplay.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            #{this.state.pokemonDisplay && this.state.pokemonDisplay.pokeId}
          </h4>
          <hr />
          <div>
            <img
              src={this.state.pokemonDisplay.image}
              alt={this.state.pokemonDisplay.name}
            />
          </div>
          <h5>
            Type:
            {this.state.pokemonDisplay.type}
          </h5>
          <h5>Moves:</h5>
          <Table>
            <tbody>
              {this.renderMovesTable(this.state.pokemonDisplay.moves)}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.selectAndCloseModal(this.state.pokemonDisplay)}
          >
            Select
          </Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  renderPokemon() {
    return _.map(this.props.pokemon, pokemon => {
      return (
        <li key={pokemon.name}>
          <button
            className="btn pokeMenu"
            onClick={() => this.handleShow(pokemon)}
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
        {this.renderPokeModal()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return { pokemon: state.pokemon, auth: state.auth, move: state.move };
}
export default connect(
  mapStateToProps,
  { fetchPokemon, selectPokemon, fetchMove }
)(Landing);
