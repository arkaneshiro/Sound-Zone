import React, { useState } from 'react';
import { Switch } from "react-router-dom";
import { connect } from "react-redux";

import { ProtectedRoute, AuthRoute } from "./Routes";
import { logout } from './actions/authActions';
import { deleteSound } from './actions/soundActions';
import Home from "./components/Home";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import SoundDetail from "./components/SoundDetail";
import SoundBar from "./components/SoundBar";
import NavBar from "./components/NavBar"

function App({ searchData, currentUserId, logout }) {
    const [currentAudio, setCurrentAudio] = useState('')
    const [currentRef, setCurrentRef] = useState('Current');
    const [intervalKiller, setIntervalKiller] = useState('');
    const [navTime, setNavTime] = useState(0);
    const [navProgress, setNavProgress] = useState(0);
    const [navPlaying, setNavPlaying] = useState(false)
    const [currentSoundInfo, setCurrentSoundInfo] = useState('');
    const [searchSelected, setSearchSelected] = useState([])



    // SOUND BAR / PLAYBACK FUNCTIONS
    const playNav = (newTimeStart) => {
        const navEle = document.querySelector(".soundCurrent");
        navEle.currentTime = newTimeStart;
        navEle.play();
        clearInterval(intervalKiller);
        setIntervalKiller(setInterval(updateNavJuice, 10))
        setNavPlaying(true);
    }

    const adjustNav = (time) => {
        const navEle = document.querySelector(".soundCurrent");
        const currentEle = document.querySelector(`.sound${currentRef}`);
        navEle.currentTime = time
        currentEle.currentTime = time
    }

    const pauseNav = () => {
        const navEle = document.querySelector(".soundCurrent");
        navEle.pause();
        clearInterval(intervalKiller);
        setNavPlaying(false);
    }

    const updateNavRef = (ele, audioLink, soundInfo) => {
        const currentEle = document.querySelector(`.sound${currentRef}`);
        if (currentEle && (currentRef !== "Current")) {
            currentEle.pause()
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

    // Logs u out!
    const logouter = () => {
        const soundButton = document.getElementById(`playPause${currentSoundInfo.soundId}`)
        if (navPlaying) {
            soundButton.click();
        }
        clearInterval(intervalKiller);
        logout()
    }

    // Nav Controls contains functions and updating values to be passed into Sound components as props
    const navControls = {
        playNav,
        pauseNav,
        updateNavRef,
        currentRef,
        setCurrentRef,
        navTime,
        navProgress,
        navPlaying,
    }


    return (
        <div className="outermost-container">
            <NavBar
                searchData={searchData}
                currentSoundInfo={currentSoundInfo}
                intervalKiller={intervalKiller}
                searchSelected={searchSelected}
                setSearchSelected={setSearchSelected}
                logouter={logouter}
            />
            <Switch>
                <AuthRoute
                    path="/login"
                    component={Home}
                    currentUserId={currentUserId}
                />
                <AuthRoute
                    path="/register"
                    component={Home}
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
                    setSearchSelected={setSearchSelected}
                    navControls={navControls}
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
            <SoundBar
                navReset={navReset}
                setNavPlaying={setNavPlaying}
                adjustNav={adjustNav}
                navProgress={navProgress}
                navPlaying={navPlaying}
                currentAudio={currentAudio}
                currentSoundInfo={currentSoundInfo}
            />
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
        deleteSound: (token, soundId) => dispatch(deleteSound(token, soundId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
