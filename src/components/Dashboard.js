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
        if (timeSincePost < 86400000) {
            uploadText = 'today';
        } else if (timeSincePost < 172800000) {
            uploadText = 'yesterday';
        }
        return (
            <Sound
                key={sound.id}
                hasDeleteButton={false}
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
