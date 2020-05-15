import React, { useState } from 'react';
import { connect } from "react-redux";
import { deleteSound } from '../actions/soundActions';
import styles from '../styles/Sound.module.css';

const Sound = ({ authToken, hasDeleteButton, soundId, soundImgUrl, soundUsername, soundUploadTime, soundName, soundWaveUrl, soundAudioUrl, deleteSound }) => {
    const [intervalKiller, setIntervalKiller] = useState('');
    const [progress, setProgress] = useState('0%')

    const playPause = () => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const soundIcon = document.getElementById(`icon${soundId}`);
        if (soundEle.paused) {
            soundEle.play();
            setIntervalKiller(setInterval(updateJuice, 10));
            soundIcon.innerHTML = '| |'
        } else {
            soundEle.pause();
            clearInterval(intervalKiller);
            soundIcon.innerHTML = '&#9654;'
        }
    }

    const updateJuice = () => {
        const soundEle = document.querySelector(`.sound${soundId}`);
        const time = (soundEle.currentTime / soundEle.duration) * 100;
        setProgress(time + '%');
    }

    const soundEndReset = () => {
        const soundIcon = document.getElementById(`icon${soundId}`);
        clearInterval(intervalKiller);
        setProgress('0%');
        soundIcon.innerHTML = '&#9654;'
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
                    <div className={styles.playPause} onClick={playPause}>
                        <div id={`icon${soundId}`} className={styles.playPauseIcon} >&#9654;</div>

                    </div>
                    <div className={styles.details}>
                        <div className={styles.nameAndUploadDate}>
                            <span>{soundUsername}</span>
                            <span>{soundUploadTime}</span>
                        </div>
                        <div className={styles.titleAndTags}>
                            <span>{soundName}</span>
                            {hasDeleteButton ? <button onClick={deleter} >Delete</button> : ''}
                        </div>
                    </div>
                </div>
                <div className={styles.waveContainer}>
                    <div id={`juice${soundId}`} className={styles.juice} style={{ width: progress }} />
                    <img className={styles.soundWave} src={soundWaveUrl} alt='' />
                </div>
            </div>

            <audio className={`sound${soundId}`} onEnded={soundEndReset} src={soundAudioUrl} alt='' />

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