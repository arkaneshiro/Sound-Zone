import React, { useState } from 'react';
import { Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
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

function App({ searchData, currentUserId, logout }) {
    const { register, watch } = useForm();
    const [currentAudio, setCurrentAudio] = useState('')
    const [currentRef, setCurrentRef] = useState('Current');
    const [intervalKiller, setIntervalKiller] = useState('');
    const [navDuration, setNavDuration] = useState(0);
    const [navTime, setNavTime] = useState(0);
    const [navProgress, setNavProgress] = useState(0);
    const [navPlaying, setNavPlaying] = useState(false)
    const [currentSoundInfo, setCurrentSoundInfo] = useState('');
    const [displaySearch, setDisplaySearch] = useState(false);
    const [timeoutCancel, setTimeoutCancel] = useState('')


    // SEARCH FUNCTIONS
    const closeResults = e => {
        console.log(e.target.className)
        if (e.target.className === 'searchResultsContainer' || e.target.className === 'searchBar') {
            setTimeoutCancel(window.setTimeout(setDisplaySearch, 100, false))
        }
    }

    const openResults = () => {
        setDisplaySearch(true)
    }

    const cancelMenuClose = () => {
        window.clearTimeout(timeoutCancel)
    }

    // SOUND BAR / PLAYBACK FUNCTIONS
    const playNav = (newTimeStart) => {
        const navEle = document.querySelector(".soundCurrent");
        navEle.currentTime = newTimeStart;
        navEle.play();
        setNavDuration(navEle.duration)
        clearInterval(intervalKiller);
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

    const logouter = () => {
        const soundButton = document.getElementById(`playPause${currentSoundInfo.soundId}`)
        if (soundButton) {
            soundButton.click();
        }
        clearInterval(intervalKiller);
        logout()
    }

    // Nav Controls contains functions and updating values to be passed into Sound components as props
    const navControls = {playNav, pauseNav, updateNavRef, currentRef, setCurrentRef, navDuration, navTime, navProgress, navPlaying}

    const searchResults = searchData ?
            searchData.map((user) => {
                if (watch('search')) {
                    if (user.username.toLowerCase().includes(watch('search').toLowerCase())) {
                        if (user.id !== parseInt(currentUserId)) {
                            return (
                                <div value={user.id} key={user.id}>
                                    <NavLink className="searchResult" to={`/users/${user.id}`}>
                                        <div className="searchResultText">
                                            {user.username}
                                        </div>
                                    </NavLink>
                                    <div className="divider">

                                    </div>
                                </div>
                                )
                        } else {
                            return ""
                        }
                    } else {
                        return ""
                    }
                } else {
                    return ""
                }

            })
            :
            ""

    const navBar = currentUserId ? (
        <>
            <div className="navBar-linkContainer">
                <NavLink className="navBar-navLink" to={`/dashboard`}>Dashboard</NavLink>
                <NavLink className="navBar-navLink" to={`/users/${currentUserId}`}>Profile</NavLink>
                <NavLink className="navBar-navLink" to={`/upload`}>Upload</NavLink>
                <span className="navBar-navLink" onClick={logouter} >Log Out</span>
                <form>
                    <input
                        className="searchBar"
                        type="search"
                        id="search"
                        name="search"
                        placeholder="search for a user"
                        autoComplete="off"
                        onFocus={openResults}
                        onClick={cancelMenuClose}
                        onBlur={closeResults}
                        ref={register()}
                    />
                    <div tabIndex="0" onBlur={closeResults} hidden={!displaySearch} className="searchResultsContainer">
                        {searchResults}
                    </div>
                </form>
            </div>

            <div className="navBar-externalLinkContainer">
                <a className="navBar-navLink" href="https://github.com/arkaneshiro/Sound-Zone">Github</a>
                <a className="navBar-navLink" href="https://arkaneshiro.github.io">Portfolio</a>
            </div>
        </>
    ) : (
        <>
            <div>
                <NavLink className="navBar-navLink" exact to="/">Home</NavLink>
                <NavLink className="navBar-navLink" to="/register">Sign Up</NavLink>
                <NavLink className="navBar-navLink" to="/login">Sign In</NavLink>
            </div>
            <div className="navBar-externalLinkContainer">
                <a className="navBar-navLink" href="https://github.com/arkaneshiro/Sound-Zone">Github</a>
                <a className="navBar-navLink" href="https://arkaneshiro.github.io">Portfolio</a>
            </div>
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
            <SoundBar navReset={navReset} setNavPlaying={setNavPlaying} navProgress={navProgress} navPlaying={navPlaying} currentAudio={currentAudio} currentSoundInfo={currentSoundInfo}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        searchData: state.user.searchData,
        currentUserId: state.auth.currentUserId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
