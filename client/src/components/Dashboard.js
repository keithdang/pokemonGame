import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchMove } from "../actions";
import { Button, Table, Grid, Row, Col } from "react-bootstrap";
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  componentDidUpdate(prevProps) {
    const { auth, fetchMove } = this.props;
    if (auth !== prevProps.auth) {
      fetchMove(auth.pokemon[0].moves);
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
  renderYourPokemon(pokemon) {
    var hpDisplay = (pokemon.currentHP / pokemon.originalHP) * 100;
    return (
      <div>
        <h2>Your Pokemon</h2>
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
                <tbody>
                  {this.props.move && this.renderMovesTable(this.props.move)}
                </tbody>
              </Table>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
  renderMovesTable(moves) {
    return _.map(moves, item => {
      return (
        <tr key={item.name}>
          <td>
            <Button className="btn">{item.name}</Button>
          </td>
          <td>{item.type}</td>
          <td>{item.attackPoints}</td>
        </tr>
      );
    });
  }
  render() {
    const { auth } = this.props;
    return (
      <div>
        {auth
          ? auth.pokemon.length > 0
            ? this.renderYourPokemon(auth.pokemon[0])
            : this.renderGoToSelect()
          : this.renderLogin()}
      </div>
    );
  }
}
function mapStateToProps(state) {
  //console.log(state);
  return { auth: state.auth, move: state.move };
}
export default connect(
  mapStateToProps,
  { fetchUser, fetchMove }
)(Dashboard);
