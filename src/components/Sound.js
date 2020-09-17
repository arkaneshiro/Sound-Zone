import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { deleteSound } from '../actions/soundActions';
import styles from '../styles/Sound.module.css';

const Sound = ({
    authToken,
    currentUserId,
    hasDeleteButton,
    soundId,
    soundImgUrl,
    soundUserId,
    soundUsername,
    soundUploadTime,
    soundName,
    soundWaveUrl,
    soundAudioUrl,
    navControls,
    deleteSound }) => {

    const [progress, setProgress] = useState('0%')

    // this useEffect hook updates the visualization of the sound when it loads if it is the sound currently playing
    useEffect(() => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const soundIcon = document.getElementById(`icon${soundId}`);
        if (navControls.currentRef === soundId) {
            soundEle.currentTime = navControls.navTime;
            if (navControls.navPlaying) {
                soundEle.play();
                soundIcon.classList.add(styles.playing)
                soundIcon.classList.remove(styles.paused)
            }
        }
    }, [])

    // this useEffect hook is what updates the 'juice' width on the sound component to visualize playback
    useEffect(() => {
        if (navControls.currentRef === soundId) {
            setProgress(navControls.navProgress);
        }
    }, [navControls.navProgress])


    // playPause contains the logic to play and pause a sound and ensure that only one sound plays at a time
    const playPause = () => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const soundIcon = document.getElementById(`icon${navControls.currentRef}`);
        const currentButton = document.getElementById(`icon${navControls.currentRef}`);
        const soundInfo = { soundImgUrl, soundName, soundUsername, soundUserId, soundId }
        if (soundEle.paused) {
            if (navControls.currentRef !== soundId) {
                navControls.updateNavRef(soundId, soundAudioUrl, soundInfo);
                setTimeout(playSound, 0)
                if ((navControls.currentRef !== 'Current') && currentButton) {
                    soundIcon.classList.add(styles.paused)
                    soundIcon.classList.remove(styles.playing)
                }
            } else {
                playSound()
            }
        } else {
           pauseSound()
        }
    }


    // playSound and pauseSound are helper functions for the playPause function
    const playSound = () => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const soundIcon = document.getElementById(`icon${soundId}`);
        soundEle.play();
        navControls.playNav(soundEle.currentTime);
        soundIcon.classList.add(styles.playing)
        soundIcon.classList.remove(styles.paused)
    }

    const pauseSound = () => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const soundIcon = document.getElementById(`icon${soundId}`);
        soundEle.pause();
        navControls.pauseNav();
        soundIcon.classList.add(styles.paused)
        soundIcon.classList.remove(styles.playing)
    }


    // soundReset resets the song when the song ends
    const soundReset = () => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const soundIcon = document.getElementById(`icon${soundId}`);
        setProgress('0%');
        soundEle.pause();
        soundEle.currentTime = 0;
        soundIcon.classList.remove(styles.playing)
        soundIcon.classList.add(styles.paused)
    }


    // deleter calls the delete action
    const deleter = () => {
        deleteSound(authToken, soundId, currentUserId)
    }

    return (
        <div className={styles.sound}>
            <img className={styles.soundImg} src={soundImgUrl} alt='' />
            <div className={styles.soundPlayer}>
                <div className={styles.controlAndDetails}>
                    <div id={`playPause${soundId}`} className={styles.playPause} onClick={playPause}>
                        <div id={`icon${soundId}`} className={[styles.playPauseIcon, styles.paused].join(' ')} ></div>

                    </div>
                    <div className={styles.details}>
                        <div className={styles.nameAndUploadDate}>
                            <NavLink className={styles.soundProfileLink} to={`/users/${soundUserId}`}>{soundUsername}</NavLink>
                            <span>{soundUploadTime}</span>
                        </div>
                        <div className={styles.titleAndTags}>
                            <NavLink className={styles.soundLink} to={`/sounds/${soundId}`}>{soundName}</NavLink>
                            {hasDeleteButton ?
                                <>
                                    <label className={styles.delete} htmlFor="delete" >delete</label>
                                    <button onClick={deleter} className={styles.hidden} id="delete"></button>
                                </>
                                :
                                ''
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.waveContainer}>
                    <div className={styles.juice} style={{ width: progress }} />
                    <img className={styles.soundWave} src={soundWaveUrl} alt='' />
                </div>
            </div>

            <audio className={`sound${soundId}`} muted={true} onEnded={soundReset} src={soundAudioUrl} preload="auto" alt='' />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.authToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSound: (token, soundId, userId) => dispatch(deleteSound(token, soundId, userId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sound));
