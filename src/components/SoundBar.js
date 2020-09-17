import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styles from '../styles/SoundBar.module.css';

const SoundBar = ({ currentUserId, setNavPlaying, navReset, navProgress, navPlaying, currentAudio, currentSoundInfo, adjustNav}) => {
    const [displayOverlay, setDisplayOverlay] = useState(false);
    const [hoverWidth, setHoverWidth] = useState(0);


    const startHovering = () => {
        setDisplayOverlay(true)
    }

    const stopHovering = () => {
        setDisplayOverlay(false)
        setHoverWidth(0)
    }

    const startMoving = e => {
        if ((displayOverlay === true && navPlaying) && (e.target.className === styles.juiceCup || e.target.className === styles.juiceBackground)) {
            setHoverWidth(Math.floor(10000*(e.clientX - e.target.getBoundingClientRect().left)/e.target.clientWidth)/100);
        }
    }

    const moveSong = e => {
        const navEle = document.querySelector(`.soundCurrent`);
        if (displayOverlay === true && navPlaying) {
            // console.log((hoverWidth/100) * navEle.duration);
            adjustNav((hoverWidth/100) * navEle.duration)
        }
    }

    const clickPlayPause = () => {
        const soundButton = document.getElementById(`playPause${currentSoundInfo.soundId}`)
        const navEle = document.querySelector(`.soundCurrent`);
        if (soundButton) {
            soundButton.click();
        } else if (navEle.paused) {
            navEle.play();
            setNavPlaying(true)
        } else {
            navEle.pause();
            setNavPlaying(false)
        }
    }

    return (
        currentUserId ? (
            <div className={styles.soundBarContainer}>
                <div className={styles.navControlContainer}>
                    {currentSoundInfo ? (
                        <label onClick={clickPlayPause} className={[styles.navControl, (navPlaying ? styles.playing : styles.paused )].join(' ')}></label>
                    ):(
                        <span></span>
                    )}
                </div>
                <div className={styles.juiceCup} onClick={moveSong} onMouseOver={startHovering} onMouseLeave={stopHovering} onMouseMove={startMoving} >
                    <div className={styles.juiceBackground} style={{ width: '100%' }} />
                    <div className={styles.juice} style={{ width: navProgress }} />
                    <div className={styles.juice2} style={{ width: `${hoverWidth}%` }} />
                </div>
                <div className={styles.songDetails}>
                    <div className={styles.songImgContainer}>
                        {currentSoundInfo ? (
                            <img className={styles.songImg} src={currentSoundInfo.soundImgUrl} alt="now playing cover"></img>
                        ):(
                            <span></span>
                        )}
                    </div>
                    <div className={styles.songTitleAndUser}>
                        <NavLink className={styles.songUser} to={`/users/${currentSoundInfo.soundUserId}`} >{currentSoundInfo.soundUsername}</NavLink>
                        <NavLink className={styles.songTitle} to={`/sounds/${currentSoundInfo.soundId}`} >{currentSoundInfo.soundName}</NavLink>
                    </div>
                </div>
                <audio className="soundCurrent" onEnded={navReset} src={currentAudio} />
            </div>
        ):(
            <span></span>
        )

    )
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.currentUserId,
    };
};

export default connect(mapStateToProps, null)(SoundBar);
