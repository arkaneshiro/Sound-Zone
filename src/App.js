import React, { useState } from 'react';
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
import SoundDetail from "./components/SoundDetail";
import SoundBar from "./components/SoundBar";

function App({ currentUserId, logout }) {
    const [currentAudio, setCurrentAudio] = useState('')
    const [currentRef, setCurrentRef] = useState('Current');
    const [intervalKiller, setIntervalKiller] = useState('');
    const [navDuration, setNavDuration] = useState(0);
    const [navTime, setNavTime] = useState(0);
    const [navProgress, setNavProgress] = useState(0);
    const [navPlaying, setNavPlaying] = useState(false)
    const [currentSoundInfo, setCurrentSoundInfo] = useState('');

    const playNav = (newTimeStart) => {
        const navEle = document.querySelector(".soundCurrent");
        navEle.currentTime = newTimeStart;
        navEle.play();
        setNavDuration(navEle.duration)
        setIntervalKiller(setInterval(updateNavJuice, 10))
        setNavPlaying(true);
    }

    const pauseNav = () => {
        const navEle = document.querySelector(".soundCurrent");
        navEle.pause();
        clearInterval(intervalKiller);
        setNavPlaying(false);
    }

    const updateNavRef = (ele, audioLink, soundInfo) => {
        const currentEle = document.querySelector(`.sound${currentRef}`);
        // const currentButton = document.getElementById(`icon${currentRef}`);
        if (currentEle && (currentRef !== "Current")) {
            currentEle.pause()
            // currentButton.innerHTML = '&#9654;'
        }
        setCurrentRef(ele);
        setCurrentAudio(audioLink);
        setCurrentSoundInfo(soundInfo);

    }

    const updateNavJuice = () => {
        const navEle = document.querySelector(`.soundCurrent`);
        const time = (navEle.currentTime / navEle.duration) * 100;
        setNavProgress(time + '%');
        setNavTime(navEle.currentTime);
    }

    const navReset = () => {
        const navEle = document.querySelector(`.soundCurrent`);
        clearInterval(intervalKiller);
        setIntervalKiller('');
        setNavProgress('0%');
        navEle.pause();
        setNavPlaying(false);
        navEle.currentTime = 0;
    }

    const navControls = {playNav, pauseNav, updateNavRef, currentRef, setCurrentRef, navDuration, navTime, navProgress, navPlaying}

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
        <div className="outermost-container">
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
                    navControls={navControls}
                    exact
                />
                <ProtectedRoute
                    path="/sounds/:soundId"
                    component={SoundDetail}
                    currentUserId={currentUserId}
                    navControls={navControls}
                />
                <ProtectedRoute
                    path="/dashboard"
                    component={Dashboard}
                    currentUserId={currentUserId}
                    navControls={navControls}
                />
                <ProtectedRoute
                    path="/upload"
                    component={Upload}
                    currentUserId={currentUserId}
                    navControls={navControls}
                />
            </Switch>
            {/* <div className="soundBar">
                <audio className="soundCurrent" onEnded={navReset} src={currentAudio} />
            </div> */}
            <SoundBar navReset={navReset} setNavPlaying={setNavPlaying} navProgress={navProgress} navPlaying={navPlaying} currentAudio={currentAudio} currentSoundInfo={currentSoundInfo}/>
        </div>
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
