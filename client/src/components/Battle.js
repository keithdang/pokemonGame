import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { attack, adjustOpponentMoves } from "./attack";
import {
  fetchMove,
  fetchOpponentPokemon,
  fetchUser,
  fetchOpponentMove,
  fetchTypeEffectiveness,
  fetchTypeCollection
} from "../actions";
import { Button, Table, Grid, Row, Col } from "react-bootstrap";
class Landing extends Component {
  constructor(props, context) {
    super(props, context);
    this.commenceAttack = this.commenceAttack.bind(this);
    this.declareAttack = this.declareAttack.bind(this);
    this.processAttack = this.processAttack.bind(this);
    this.declareEffectiveness = this.declareEffectiveness.bind(this);
    this.state = {
      yourCurrentHp: 0,
      opponentCurrentHp: 0,
      battleText: "Let's Battle!",
      playerTurn: true
    };
  }
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOpponentPokemon();
    this.props.fetchTypeCollection();
  }
  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth) {
      this.props.fetchMove(this.props.auth.pokemon[0].moves);
      this.setState({ yourCurrentHp: this.props.auth.pokemon[0].currentHP });
    }
    if (this.props.pokemon !== prevProps.pokemon) {
      this.props.fetchOpponentMove(this.props.pokemon[0].moves);

      this.setState({ opponentCurrentHp: this.props.pokemon[0].currentHP });
    }
  }
  declareAttack(pokeName, moveName) {
    var sentence = `${pokeName} uses ${moveName}!`;
    if (this.state.opponentCurrentHp === 0) {
      sentence = `${pokeName} fainted!`;
    }

    this.setState({ battleText: sentence });
  }
  declareEffectiveness(ratio, user) {
    if (ratio > 1) {
      this.setState({ battleText: `It was super effective!` });
    } else if (ratio < 1) {
      this.setState({ battleText: `It was not very effective...` });
    }
  }
  processAttack(hpLeft, user) {
    if (user && this.state.yourCurrentHp !== 0) {
      this.setState({
        opponentCurrentHp: hpLeft
      });
    } else if (!user && this.state.opponentCurrentHp !== 0) {
      this.setState({
        yourCurrentHp: hpLeft
      });
    }
  }
  commenceAttack(item, user) {
    const { pokemon, auth, opponentMove, typeCollection } = this.props;
    const { opponentCurrentHp, yourCurrentHp } = this.state;
    var bestOpponentMove = adjustOpponentMoves(
      opponentMove,
      auth.pokemon[0].type,
      typeCollection
    );

    //player pokemone uses attack
    this.declareAttack(auth.pokemon[0].name, item.name);
    this.setState({ playerTurn: false });
    var playerAttack = attack(
      opponentCurrentHp,
      item,
      pokemon[0].type,
      typeCollection
    );
    var opponentAttack = attack(
      yourCurrentHp,
      bestOpponentMove,
      auth.pokemon[0].type,
      typeCollection
    );

    //calculate damage
    setTimeout(
      function() {
        this.processAttack(playerAttack.hpLeft, user);
      }.bind(this),
      1000
    );
    //announce effectiveness
    setTimeout(
      function() {
        this.declareEffectiveness(playerAttack.ratio, user);
      }.bind(this),
      2000
    );
    //opponent pokemone uses attack
    setTimeout(
      function() {
        this.declareAttack(pokemon[0].name, bestOpponentMove.name);
      }.bind(this),
      3000
    );
    //calculate damage
    setTimeout(
      function() {
        this.processAttack(opponentAttack.hpLeft, !user);
      }.bind(this),
      4000
    );
    //announce effectiveness
    setTimeout(
      function() {
        this.declareEffectiveness(opponentAttack.ratio, !user);
        this.setState({ playerTurn: true });
      }.bind(this),
      5000
    );
  }
  renderMovesTable(moves, user) {
    return _.map(moves, item => {
      return (
        <tr key={item.name}>
          <td>
            <Button
              className="btn"
              onClick={() => this.commenceAttack(item, user)}
              disabled={!user || !this.state.playerTurn}
            >
              {item.name}
            </Button>
          </td>
          <td>{item.type}</td>
          <td>{item.attackPoints}</td>
        </tr>
      );
    });
  }
  renderPokemonForBattle(pokemon, moves, user) {
    const { yourCurrentHp, opponentCurrentHp } = this.state;
    return (
      <div>
        <div>
          <Grid>
            <Row>
              <Col xs={6} md={6}>
                <h5>{user ? "You" : "Computer"}</h5>
                <h6>{pokemon.name ? pokemon.name : ""}</h6>
                <div className="healthpoints">
                  <p>{user ? yourCurrentHp : opponentCurrentHp}</p>
                  <p>/</p>
                  <p>{pokemon.originalHP && pokemon.originalHP}</p>
                </div>
              </Col>
              <Col xs={6} md={6}>
                {pokemon.name &&
                  pokemon.image && (
                    <img src={pokemon.image} alt={pokemon.name} />
                  )}
              </Col>
            </Row>
          </Grid>
          <Table>
            <tbody>{moves && this.renderMovesTable(moves, user)}</tbody>
          </Table>
        </div>
      </div>
    );
  }
  render() {
    const { auth, pokemon, move, opponentMove } = this.props;
    const { battleText } = this.state;
    return (
      <div className="battleMenu">
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              {auth &&
                auth.pokemon &&
                auth.pokemon[0] &&
                this.renderPokemonForBattle(auth.pokemon[0], move, true)}
            </Col>
            <Col xs={12} md={6}>
              {pokemon &&
                pokemon[0] &&
                this.renderPokemonForBattle(pokemon[0], opponentMove, false)}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} mdOffset={3}>
              <div className="card blue-grey darken-1 skillCard opaqElement">
                <div className="card-content white-text">
                  <span className="card-title">{battleText}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    pokemon: state.pokemon,
    auth: state.auth,
    move: state.move,
    opponentMove: state.opponentMove,
    type: state.type,
    typeCollection: state.typeCollection
  };
}
export default connect(
  mapStateToProps,
  {
    fetchMove,
    fetchOpponentPokemon,
    fetchUser,
    fetchOpponentMove,
    fetchTypeEffectiveness,
    fetchTypeCollection
  }
)(Landing);
