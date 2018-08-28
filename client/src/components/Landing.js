import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPokemon, selectPokemon, fetchMove, selectTeam } from "../actions";
import { Modal, Button, Table, Grid, Row, Col } from "react-bootstrap";
function compare(a, b) {
  if (a.pokeId < b.pokeId) return -1;
  if (a.pokeId > b.pokeId) return 1;
  return 0;
}

class Landing extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      pokemonDisplay: "",
      team: [],
      numberOfPokemonSelected: 0
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
    return <h4>Select 2 Pokemon:</h4>;
  }
  renderYourList() {
    const { auth } = this.props;
    return _.map(auth.team, pokemon => {
      return <div>{pokemon.name}</div>;
    });
  }
  renderYourPokemon() {
    const { auth } = this.props;
    return (
      <h5>
        Your Pokemon:
        {auth && auth.team && auth.team.length > 0 && this.renderYourList()}
      </h5>
    );
  }
  selectAndCloseModal(pokemon) {
    //this.props.selectPokemon(pokemon);
    const { team, numberOfPokemonSelected } = this.state;
    const { selectTeam } = this.props;
    if (numberOfPokemonSelected < 2) {
      let newTeam = team;
      newTeam.push(pokemon);
      selectTeam(team);
      this.setState({
        team: newTeam,
        show: false,
        numberOfPokemonSelected: numberOfPokemonSelected + 1
      });
    }
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
        <Col xs={6} md={4}>
          <button
            className="btn pokeMenu"
            onClick={() => this.handleShow(pokemon)}
          >
            {pokemon.name}
            <img src={pokemon.image} alt={pokemon.name} />
          </button>
        </Col>
      );
    });
  }
  render() {
    if (this.props.pokemon) {
      this.props.pokemon.sort(compare);
    }
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Pokemon List</h1>
        {this.renderSelect()}
        <Grid>
          <Row>{this.props.pokemon && this.renderPokemon()}</Row>
        </Grid>
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
  { fetchPokemon, selectPokemon, fetchMove, selectTeam }
)(Landing);
