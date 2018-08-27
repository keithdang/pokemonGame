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
  fetchTypeCollection,
  selectPokemon,
  selectTeam,
  selectIndex
} from "../actions";
import { Button, Table, Grid, Row, Col } from "react-bootstrap";
const factor = x => Math.pow(x, -1);
class Landing extends Component {
  constructor(props, context) {
    super(props, context);
    this.commenceAttack = this.commenceAttack.bind(this);
    this.declareAttack = this.declareAttack.bind(this);
    this.processAttack = this.processAttack.bind(this);
    this.declareEffectiveness = this.declareEffectiveness.bind(this);
    this.levelUp = this.levelUp.bind(this);
    this.state = {
      yourCurrentHp: 0,
      opponentCurrentHp: 0,
      battleText: "Let's Battle!",
      playerTurn: true,
      pokemonBattling: null
    };
  }
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOpponentPokemon();
    this.props.fetchTypeCollection();
  }
  componentDidUpdate(prevProps) {
    const { auth, pokemon, fetchMove, fetchOpponentMove } = this.props;
    const { pokemonBattling } = this.state;
    if (auth.team && auth.team.length > 0) {
      if (auth !== prevProps.auth) {
        if (!pokemonBattling) {
          this.setState({ pokemonBattling: auth.team[auth.index] });
          if (auth.index) {
            fetchMove(auth.team[auth.index].moves);
            this.setState({ yourCurrentHp: auth.team[auth.index].currentHP });
          } else {
            fetchMove(auth.team[0].moves);
            this.setState({ yourCurrentHp: auth.team[0].currentHP });
          }
        } else {
          fetchMove(pokemonBattling.moves);
          this.setState({ yourCurrentHp: pokemonBattling.currentHP });
        }
      }
      if (pokemon !== prevProps.pokemon) {
        fetchOpponentMove(pokemon[0].moves);
        this.setState({ opponentCurrentHp: pokemon[0].currentHP });
      }
    }
  }
  levelUp() {
    const { pokemonBattling } = this.state;
    const { auth, selectPokemon } = this.props;
    pokemonBattling.level++;
    pokemonBattling.originalHP = Math.round(
      pokemonBattling.originalHP * (1 + factor(pokemonBattling.level) / 2)
    );
    pokemonBattling.currentHP = pokemonBattling.originalHP;
    var newTeam = [];
    var foundPokemon = auth.team.find(function(element) {
      if (element.name === pokemonBattling.name) {
        newTeam.push(pokemonBattling);
      } else {
        newTeam.push(element);
      }
      return;
    });
    this.props.selectTeam(newTeam);
    setTimeout(
      function() {
        this.resetIndex();
        this.setState({
          battleText: `${pokemonBattling.name} level up!`,
          playerTurn: false
        });
      }.bind(this),
      1000
    );
    setTimeout(function() {
      window.location.reload(true);
    }, 2000);
  }
  declareAttack(pokeName, moveName, user) {
    const { auth } = this.props;
    var sentence = `${pokeName} uses ${moveName}!`;
    if (this.state.opponentCurrentHp === 0) {
      sentence = `${pokeName} fainted!`;
      this.levelUp();
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
    const { opponentCurrentHp, yourCurrentHp, pokemonBattling } = this.state;
    var bestOpponentMove = adjustOpponentMoves(
      opponentMove,
      pokemonBattling.type,
      typeCollection
    );

    //player pokemone uses attack
    this.declareAttack(pokemonBattling.name, item.name, user);
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
      pokemonBattling.type,
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
        this.declareAttack(pokemon[0].name, bestOpponentMove.name, user);
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
        this.randomThing(pokemonBattling.name);
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
        </tr>
      );
    });
  }
  renderPokemonForBattle(pokemon, moves, user) {
    const { yourCurrentHp, opponentCurrentHp } = this.state;
    var hpLeft = 0;
    if (user) {
      hpLeft = yourCurrentHp;
    } else {
      hpLeft = opponentCurrentHp;
    }
    hpLeft = (hpLeft / pokemon.originalHP) * 100;
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
                  <p style={{ paddingLeft: "20px" }}>
                    {pokemon.level && `Lvl: ${pokemon.level}`}
                  </p>
                </div>
                <div className="progress-bar">
                  <span
                    className="progress-bar-fill"
                    style={{
                      width: `${hpLeft}%`,
                      backgroundColor: `${hpLeft > 30 ? "#1fb800" : "#cf1919"}`
                    }}
                  />
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
  resetIndex() {
    var hello = { number: 0 };
    this.props.selectIndex(hello);
    window.location.reload(true);
  }
  randomThing(pokeName) {
    const { auth } = this.props;
    if (this.state.yourCurrentHp === 0) {
      this.setState({ battleText: `${pokeName} fainted!` });
      if (auth.index < auth.team.length - 1) {
        var hello = { number: auth.index + 1 };
        this.props.selectIndex(hello);
        window.location.reload(true);
      }
    }
  }
  render() {
    const { auth, pokemon, team, move, opponentMove } = this.props;
    const { battleText, pokemonBattling } = this.state;
    return (
      <div className="battleMenu">
        {auth && auth.team && auth.team.length > 0 ? (
          <Grid>
            <Row>
              <Col xs={12} md={6}>
                {auth &&
                  auth.team &&
                  pokemonBattling &&
                  this.renderPokemonForBattle(pokemonBattling, move, true)}
                {/* <Button onClick={() => this.randomThing()}>Random</Button> */}
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
        ) : (
          <h3>Go select a team</h3>
        )}
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
    fetchTypeCollection,
    selectPokemon,
    selectTeam,
    selectIndex
  }
)(Landing);
