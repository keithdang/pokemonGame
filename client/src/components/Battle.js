import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import attack from "./attack";
import {
  fetchMove,
  fetchOpponentPokemon,
  fetchUser,
  fetchOpponentMove
} from "../actions";
import { Button, Table, Grid, Row, Col } from "react-bootstrap";
class Landing extends Component {
  constructor(props, context) {
    super(props, context);
    this.commenceAttack = this.commenceAttack.bind(this);
    this.state = {
      yourCurrentHp: 0,
      opponentCurrentHp: 0
    };
  }
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOpponentPokemon();
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

  commenceAttack(item) {
    var opponentHpLeft = attack(
      this.state.opponentCurrentHp,
      item,
      this.props.pokemon[0].type
    );

    var yourHpLeft = attack(
      this.state.yourCurrentHp,
      this.props.opponentMove[0],
      this.props.auth.pokemon[0].type
    );
    this.setState({
      opponentCurrentHp: opponentHpLeft,
      yourCurrentHp: yourHpLeft
    });
  }
  renderMovesTable(moves, user) {
    return _.map(moves, item => {
      return (
        <tr key={item.name}>
          <td>
            <Button
              className="btn"
              onClick={() => this.commenceAttack(item)}
              disabled={!user}
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
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return {
    pokemon: state.pokemon,
    auth: state.auth,
    move: state.move,
    opponentMove: state.opponentMove
  };
}
export default connect(
  mapStateToProps,
  {
    fetchMove,
    fetchOpponentPokemon,
    fetchUser,
    fetchOpponentMove
  }
)(Landing);
