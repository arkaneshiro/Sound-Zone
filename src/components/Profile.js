import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getUserInfo } from '../actions/userActions';
import { fetchUserSounds } from '../actions/soundActions';
import styles from '../styles/Profile.module.css';

import Sound from "./Sound";

const Profile = ({currentUserId, userName, userBio, userImgUrl, userSoundsArray = [], getUserInfo, fetchUserSounds, ...props }) => {

    useEffect(() => {
        fetchUserSounds(props.match.params.userId);
        getUserInfo(props.match.params.userId);
    }, [])

    const userSounds = userSoundsArray.map((userSound) => {
        const uploadDate = new Date(userSound.createdAt)
        const timeSincePost = Date.now() - uploadDate
        let uploadText = `${uploadDate.getMonth() + 1}/${uploadDate.getDate()}/${uploadDate.getFullYear()}`;
        //let uploadText = `~ ${timeSincePost} milliseconds ago`
        let isCrntUserSound = false;
        if (timeSincePost < 86400000) {
            uploadText = 'today';
        } else if (timeSincePost < 172800000) {
            uploadText = 'yesterday';
        }
        // check if current user is the owner of the sound to determine wether or not to display delete button
        if (parseInt(currentUserId, 10) === userSound.userId) {
            isCrntUserSound = true;
        }
        return (
            // all 'sound' component data is passed thru props, not through redux
            <Sound
                key={userSound.id}
                hasDeleteButton={isCrntUserSound}
                soundId={userSound.id}
                soundImgUrl={userSound.imageUrl}
                soundUserId={userSound.userId}
                soundUsername={userSound.User.username}
                soundUploadTime={uploadText}
                soundName={userSound.name}
                soundWaveUrl={userSound.waveUrl}
                soundAudioUrl={userSound.soundUrl}
                navControls={props.navControls}
            />
        )
    })

    // console.log(userSounds)

    return (
        <div className={styles.profileContainer}>
            <div className={styles.titleContainer}>
                <img className={styles.profileAvi} src={userImgUrl} alt='' />
                <div className={styles.nameHeader}>{userName}</div>
            </div>
            <div className={styles.soundsAndDetailsContainer}>
                <div className={styles.soundsContainer}>
                    {userSounds}
                </div>
                <div className={styles.detailsContainer}>
                    <div className={styles.details}>{userBio}</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userName: state.user.userName,
        userBio: state.user.userBio,
        userImgUrl: state.user.userImgUrl,
        userSoundsArray: state.sound.userSoundsArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        fetchUserSounds: (id) => dispatch(fetchUserSounds(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
