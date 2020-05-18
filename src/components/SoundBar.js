import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from '../styles/SoundBar.module.css';

const SoundBar = ({ currentUserId, setNavPlaying, navReset, navProgress, navPlaying, currentAudio, currentSoundInfo }) => {

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
        <div className={styles.soundBarContainer}>
            <div className={styles.navControlContainer}>
                <label onClick={clickPlayPause} className={[styles.navControl, (navPlaying ? styles.playing : styles.paused )].join(' ')}></label>
            </div>
            <div className={styles.juiceCup}>
                <div className={styles.juiceBackground} style={{ width: '100%' }} />
                <div className={styles.juice} style={{ width: navProgress }} />
            </div>
            <div className={styles.songDetails}>
                <div className={styles.songImgContainer}>
                    <img className={styles.songImg} src={currentSoundInfo.soundImgUrl}></img>
                </div>
                <div className={styles.songTitleAndUser}>
                    <NavLink className={styles.songUser} to={`/users/${currentSoundInfo.soundUserId}`} >{currentSoundInfo.soundUsername}</NavLink>
                    <NavLink className={styles.songTitle} to={`/sounds/${currentSoundInfo.soundId}`} >{currentSoundInfo.soundName}</NavLink>
                </div>
            </div>
            <audio className="soundCurrent" onEnded={navReset} src={currentAudio} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.currentUserId,
    };
};

export default connect(mapStateToProps, null)(SoundBar);
