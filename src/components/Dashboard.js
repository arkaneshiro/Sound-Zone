import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchUserFeed } from '../actions/soundActions';
import styles from '../styles/Dashboard.module.css';

import Sound from "./Sound";

const Dashboard = ({currentUserId, userFeedArray = [], fetchUserFeed, ...props}) => {

    useEffect(() => {
        fetchUserFeed(currentUserId);
    }, [])

    const userFeed = userFeedArray.map((sound) => {
        const uploadDate = new Date(sound.createdAt)
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
        if (parseInt(currentUserId, 10) === sound.userId) {
            isCrntUserSound = true;
        }
        return (
            // all 'sound' component data is passed thru props, not through redux
            <Sound
                key={sound.id}
                hasDeleteButton={isCrntUserSound}
                soundId={sound.id}
                soundImgUrl={sound.imageUrl}
                soundUserId={sound.userId}
                soundUsername={sound.User.username}
                soundUploadTime={uploadText}
                soundName={sound.name}
                soundWaveUrl={sound.waveUrl}
                soundAudioUrl={sound.soundUrl}
                navControls={props.navControls}
            />
        )
    })

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.soundsAndDetailsContainer}>
                <div className={styles.soundsContainer}>
                    {userFeed}
                </div>
                <div className={styles.detailsContainer}>
                    <div className={styles.details}></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      currentUserId: state.auth.currentUserId,
      userFeedArray: state.sound.userFeedArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserFeed: (id) => dispatch(fetchUserFeed(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
