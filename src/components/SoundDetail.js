import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchSound } from '../actions/soundActions';
import styles from '../styles/SoundDetail.module.css';

import Sound from "./Sound";

const SoundDetail = ({ soundDetails, currentUserId, fetchSound, ...props }) => {

    useEffect(() => {
        fetchSound(props.match.params.soundId);
    }, [])

    useEffect(() => {
        if (soundDetails) {
            console.log(soundDetails)
        }
    }, [soundDetails])

    if (soundDetails) {
        return (
            <div className={styles.soundPageContainer}>
                <div className={styles.topPageContainer}>
                    <div className={styles.soundContainer}>
                        <Sound
                            hasDeleteButton={false}
                            soundId={soundDetails.id}
                            soundImgUrl={soundDetails.imageUrl}
                            soundUserId={soundDetails.userId}
                            soundUsername={soundDetails.User.username}
                            soundName={soundDetails.name}
                            soundWaveUrl={soundDetails.waveUrl}
                            soundAudioUrl={soundDetails.soundUrl}
                            navControls={props.navControls}
                        />
                    </div>
                </div>
                <div className={styles.bottomPageContainer}>
                    <div className={styles.detailContainer}>
                        <div className={styles.userCard}>
                            <img className={styles.userImg} src={soundDetails.User.imgUrl} />
                            <a className={styles.userLink} href={`/users/${soundDetails.User.id}`}>{soundDetails.User.username}</a>
                        </div>
                        <div className={styles.descriptionAndComments}>
                            <div className={styles.description}>{soundDetails.description}</div>
                        </div>
                    </div>
                    <div className={styles.sidebarContainer}>
                        <div className={styles.sidebar}></div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <h1></h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        soundDetails: state.sound.soundDetails,
        currentUserId: state.auth.currentUserId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSound: (id) => dispatch(fetchSound(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundDetail);
