import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import Payments from "./Payments";
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case undefined: //tried null but doesn't work
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log In With Google</a>
          </li>
        );
      default:
        return [
          // <li key="1">
          //   <Payments />
          // </li>,
          // <li key="3" style={{ margin: "0 10px" }}>
          //   Credits:
          //   {this.props.auth.credits}
          // </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    //console.log(this.props.auth);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/" : "/"} className="left brand-logo">
            Hello World
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
      // <nav>
      //   <div className="nav-wrapper">
      //     <Link
      //       to={this.props.auth ? "/surveys" : "/"}
      //       className="left brand-logo"
      //     >
      //       Emaily
      //     </Link>
      //     <ul className="right">{this.renderContent()}</ul>
      //   </div>
      // </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
