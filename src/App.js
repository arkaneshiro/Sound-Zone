import React from "react";
import { Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ProtectedRoute, AuthRoute } from "./Routes";

import RegistrationForm from "./components/session/RegistrationForm.js";
import LoginForm from "./components/session/LoginForm.js";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

function App({ authToken, currentUserId }) {
  const navBar = currentUserId ? (
    <NavLink className="navBar-navLink" to={`/users/${currentUserId}`}>Profile</NavLink>
  ) : (
      <>
        <NavLink className="navBar-navLink" to="/register">Sign Up</NavLink>
        <NavLink className="navBar-navLink" to="/login">Sign In</NavLink>
        <NavLink className="navBar-navLink" exact to="/">Home</NavLink>
      </>
    );

  return (
    <>
      <div className="navBar">{navBar}</div>
      <Switch>
        <AuthRoute
          path="/register"
          component={RegistrationForm}
          currentUserId={currentUserId}
        />
        <AuthRoute
          path="/login"
          component={LoginForm}
          currentUserId={currentUserId}
        />
        <ProtectedRoute
          path="/users/:userId"
          component={Profile}
          currentUserId={currentUserId}
        />
        <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          currentUserId={currentUserId}
        />
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.authToken,
    currentUserId: state.auth.currentUserId,
  };
};

export default connect(mapStateToProps, null)(App);
