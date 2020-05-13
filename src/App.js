import React from "react";
import { Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ProtectedRoute, AuthRoute } from "./Routes";
import { logout } from './actions/authActions';

import RegistrationForm from "./components/session/RegistrationForm.js";
import LoginForm from "./components/session/LoginForm.js";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";

function App({ currentUserId, logout }) {

    const navBar = currentUserId ? (
        <>
            <NavLink className="navBar-navLink" to={`/upload`}>Upload Sound</NavLink>
            <NavLink className="navBar-navLink" to={`/dashboard`}>Dashboard</NavLink>
            <NavLink className="navBar-navLink" to={`/users/${currentUserId}`}>Profile</NavLink>
            <span className="navBar-navLink" onClick={logout} >Log Out</span>
        </>
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
                <AuthRoute
                    path="/"
                    component={Home}
                    currentUserId={currentUserId}
                    exact
                />
                <ProtectedRoute
                    path="/users/:userId"
                    component={Profile}
                    currentUserId={currentUserId}
                    exact
                />
                <ProtectedRoute
                    path="/dashboard"
                    component={Dashboard}
                    currentUserId={currentUserId}
                />
                <ProtectedRoute
                    path="/upload"
                    component={Upload}
                    currentUserId={currentUserId}
                />
            </Switch>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.currentUserId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
