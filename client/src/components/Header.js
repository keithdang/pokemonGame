import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handlePoints } from "../actions";
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null: //tried null but doesn't work
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log In With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <a>Selection</a>
          </li>,
          <li key="3">
            <a>Battle</a>
          </li>,
          // <li key="1">
          //   <button className="btn" onClick={() => this.props.handlePoints(5)}>
          //     Add points
          //   </button>
          // </li>,
          // <li key="3" style={{ margin: "0 10px" }}>
          //   Points:
          //   {this.props.auth.points ? this.props.auth.points : ""}
          // </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav className="navHeader">
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/" : "/"} className="left brand-logo">
            Pokemon Game
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(
  mapStateToProps,
  { handlePoints }
)(Header);
