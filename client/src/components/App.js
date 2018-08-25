import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "../App.less";
import Header from "./Header";
import Landing from "./Landing";
import Battle from "./Battle";
import { connect } from "react-redux";
import * as actions from "../actions";
const Dashboard = () => <h2>Dashboard</h2>;
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/battle" component={Battle} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(
  null,
  actions
)(App);
