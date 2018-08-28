import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchMove, fetchTeam, selectTeam } from "../actions";
import { Button, Table, Grid, Row, Col } from "react-bootstrap";
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUser();
    //this.props.fetchTeam(["Charmander", "Squirtle"]);
  }
  componentDidUpdate(prevProps) {
    const { auth, fetchMove, team } = this.props;
    if (auth !== prevProps.auth && auth.team) {
      var moveArray = [];
      for (var i = 0; i < auth.team.length; i++) {
        moveArray.push([auth.team[i].moves]);
      }
      moveArray = moveArray.join().split(",");
      this.props.fetchMove(moveArray);
    }
  }
  renderLogin() {
    return <h4>Go sign in with Google above to get started!</h4>;
  }

  renderGoToSelect() {
    return (
      <div>
        <h3>Welcome to Pokemon!</h3>
        <p>
          To play, go to the selection menu and get a pokemon and then proceed
          to battle!
        </p>
      </div>
    );
  }
  renderTeamList() {
    if (this.props.auth.team) {
      return _.map(this.props.auth.team, pokemon => {
        return this.renderYourPokemon(pokemon);
      });
    } else {
      return <div>No Team</div>;
    }
  }
  renderTeam() {
    return (
      <div>
        <h5>Your Squad</h5>
        {this.renderTeamList()}
      </div>
    );
  }
  renderYourPokemon(pokemon) {
    var hpDisplay = (pokemon.currentHP / pokemon.originalHP) * 100;
    return (
      <div>
        <div>
          <Grid>
            <Row>
              <Col xs={6} md={6}>
                <h6>{pokemon.name ? pokemon.name : ""}</h6>
                <div className="healthpoints">
                  <p>{pokemon.currentHP && pokemon.currentHP}</p>
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
                      width: `${hpDisplay}%`,
                      backgroundColor: `${
                        hpDisplay > 30 ? "#1fb800" : "#cf1919"
                      }`
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
            <Row>
              <Table>
                <tbody>{this.renderMovesTable(pokemon.moves)}</tbody>
              </Table>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
  renderMovesTable(moves) {
    if (this.props.move) {
      return _.map(moves, item => {
        var foundMove = this.props.move.find(function(element) {
          return element.name == item;
        });
        if (foundMove) {
          return (
            <tr>
              <td>
                <Button className="btn">{foundMove.name}</Button>
              </td>
              <td>{foundMove.type}</td>
              <td>{foundMove.attackPoints}</td>
            </tr>
          );
        }
      });
    }
  }
  render() {
    const { auth } = this.props;
    return (
      <div>
        {auth
          ? auth.team.length > 0
            ? this.renderTeam()
            : this.renderGoToSelect()
          : this.renderLogin()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return { auth: state.auth, move: state.move, team: state.team };
}
export default connect(
  mapStateToProps,
  { fetchUser, fetchMove, fetchTeam, selectTeam }
)(Dashboard);
