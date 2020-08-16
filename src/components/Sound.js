import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteSound } from '../actions/soundActions';
import styles from '../styles/Sound.module.css';

const Sound = ({ authToken, hasDeleteButton, soundId, soundImgUrl, soundUserId, soundUsername, soundUploadTime, soundName, soundWaveUrl, soundAudioUrl, navControls, deleteSound }) => {
    const [progress, setProgress] = useState('0%')

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
        return () => {
            soundReset();
        }
    }, [])

    useEffect(() => {
        if (navControls.currentRef === soundId) {
            setProgress(navControls.navProgress);
        }
    }, [navControls.navProgress])

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

    const soundReset = () => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const soundIcon = document.getElementById(`icon${soundId}`);
        setProgress('0%');
        soundEle.pause();
        soundEle.currentTime = 0;
        soundIcon.classList.remove(styles.playing)
        soundIcon.classList.add(styles.paused)
    }

    const deleter = () => {
        deleteSound(authToken, soundId)
        window.location.reload(false)
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
                            {hasDeleteButton ? <button onClick={deleter} >Delete</button> : ''}
                        </div>
                    </div>
                </div>
                <div className={styles.waveContainer}>
                    <div id={`juice${soundId}`} className={styles.juice} style={{ width: progress }} />
                    <img className={styles.soundWave} src={soundWaveUrl} alt='' />
                </div>
            </div>

            <audio className={`sound${soundId}`} muted={true} onEnded={soundReset} src={soundAudioUrl} alt='' />

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
        deleteSound: (token, soundId) => dispatch(deleteSound(token, soundId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sound);
