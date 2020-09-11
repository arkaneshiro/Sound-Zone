import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getUserInfo, followUser, unFollowUser, getAllUsers, getFollowedUsers } from '../actions/userActions';
import { fetchUserSounds } from '../actions/soundActions';
import styles from '../styles/Profile.module.css';

import Sound from "./Sound";

const Profile = ({ authToken, currentUserId, userName, userBio, userImgUrl, followedArray = [], userSoundsArray = [], getUserInfo, followUser, unFollowUser, getAllUsers, getFollowedUsers, fetchUserSounds, ...props }) => {

    useEffect(() => {
        // const searchForm = document.querySelector(".searchForm");
        // searchForm.reset()
        fetchUserSounds(props.match.params.userId);
        getUserInfo(props.match.params.userId);
        getAllUsers(authToken);
        getFollowedUsers(authToken);
        props.searchControl.setSearchSelected([])
    }, [fetchUserSounds, getUserInfo, getAllUsers, getFollowedUsers, props.match.params.userId, authToken])

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
                currentUserId={currentUserId}
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

    const follow = () => {
        followUser(authToken, currentUserId, props.match.params.userId);
    }

    const unfollow = () => {
        unFollowUser(authToken, currentUserId, props.match.params.userId);
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.titleContainer}>
                <img className={styles.profileAvi} src={userImgUrl} alt='' />
                <div>
                    <div className={styles.nameHeader}>{userName}</div>
                    {(parseInt(props.match.params.userId, 10) !== parseInt(currentUserId, 10)) ?
                        <>
                            {(followedArray.includes(parseInt(props.match.params.userId, 10))) ?
                            <>
                                <label className={styles.follow} htmlFor="unfollow" >unfollow</label>
                                <button onClick={unfollow} className={styles.hidden} id="unfollow"></button>
                                </>
                            :
                            <>
                                <label className={styles.follow} htmlFor="follow" >follow</label>
                                <button onClick={follow} className={styles.hidden} id="follow"></button>
                            </>
                            }
                        </>
                        :
                        ''
                    }
                </div>
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
        authToken: state.auth.authToken,
        userName: state.user.userName,
        userBio: state.user.userBio,
        userImgUrl: state.user.userImgUrl,
        followedArray: state.user.followedArray,
        userSoundsArray: state.sound.userSoundsArray,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        followUser: (token, followerId, followedId) => dispatch(followUser(token, followerId, followedId)),
        unFollowUser: (token, followerId, followedId) => dispatch(unFollowUser(token, followerId, followedId)),
        getAllUsers: (token) => dispatch(getAllUsers(token)),
        getFollowedUsers: (token) => dispatch(getFollowedUsers(token)),
        fetchUserSounds: (id) => dispatch(fetchUserSounds(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
