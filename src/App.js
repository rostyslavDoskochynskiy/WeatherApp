import React, { Component } from "react";
import Spinner from "./components/spinner/Spinner";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SignUp from "./components/auth/signup/SignUp";
import SignIn from "./components/auth/signin/SignIn";
import Profile from "./containers/profile/Profile";

import "antd/dist/antd.css";
import "./styles/main.css";

import { authCheck } from "./actions";

class App extends Component {
  componentWillMount() {
    const { authCheck } = this.props;
    authCheck();
  }

  render() {
    const { authChecking, user } = this.props;

    if (user) {
      return (
        <Switch>
          <Route path="/profile" component={Profile} />
          <Redirect to="/profile" />
        </Switch>
      );
    }
    const routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/auth" render={() => <SignUp />} />
        <Redirect to="/auth" />
      </Switch>
    );

    return (
      <div className="main-container">
        {authChecking ? <Spinner /> : routes}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    isAuthenticated: auth.loggedIn,
    authChecking: auth.initialChecking
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authCheck
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
