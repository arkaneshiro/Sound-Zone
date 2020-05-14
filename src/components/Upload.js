import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getUserInfo } from '../actions/userActions';
import { updateCoverImg, updateSound, uploadSound } from '../actions/soundActions';
import styles from '../styles/UploadSound.module.css';

import LabelButton from "./utils/LabelButton";

const Upload = ({ authToken, currentUserId, currentUserImgUrl, newCoverUrl, newWaveUrl, newSoundUrl, getUserInfo, updateCoverImg, updateSound, uploadSound }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getUserInfo(currentUserId);

    }, [getUserInfo, currentUserId])

    const updateFile = cb => e => cb(e.target.files[0]);
    const updateValue = cb => e => cb(e.target.value);

    const handlesubmit = e => {
        e.preventDefault();
        const coverUrl = newCoverUrl ? newCoverUrl : currentUserImgUrl;
        uploadSound(currentUserId, newSoundUrl, newWaveUrl, coverUrl, description, name, authToken)
        // add form error handling and redirection;
        // window.location.href= '/';
    }

    return (
        <div className={styles.formContainer}>
            <h1>Upload Sound</h1>
            <form className={styles.form} onSubmit={handlesubmit}>
                <div className={styles.soundUpload}>
                <img className={styles.soundPreview} src={newWaveUrl} alt='sound wave preview' />
                    <LabelButton labelfor='sound-upload' innerhtml='Select Audio to Upload'/>
                    <input
                        className={styles.soundInput}
                        type="file"
                        id="sound-upload"
                        onChange={updateFile(updateSound)}
                    />
                </div>
                <label className={styles.label} htmlFor="name" >Name:
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={updateValue(setName)}
                    />
                </label>
                <label className={styles.label} htmlFor="description" >Description:
                    <textarea
                        id="description"
                        value={description}
                        onChange={updateValue(setDescription)}
                    />
                </label>
                <div className={styles.imageUpload}>
                    <img className={styles.imagePreview} src={newCoverUrl ? newCoverUrl : currentUserImgUrl} alt='sound cover preview' />
                    <LabelButton labelfor='file-upload' innerhtml='Select a Cover Image'/>
                        <input
                            className={styles.imageInput}
                            type="file"
                            id="file-upload"
                            onChange={updateFile(updateCoverImg)}
                        />
                </div>
                <LabelButton labelfor='submit-sound' innerhtml='Upload'/>
                <input className={styles.submitInput} type="submit" id='submit-sound'value="Upload" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.authToken,
        currentUserId: state.auth.currentUserId,
        currentUserImgUrl: state.user.currentUserImgUrl,
        newCoverUrl: state.sound.newCoverUrl,
        newWaveUrl: state.sound.newWaveUrl,
        newSoundUrl: state.sound.newSoundUrl,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        updateCoverImg: (img) => dispatch(updateCoverImg(img)),
        updateSound: (sound) => dispatch(updateSound(sound)),
        uploadSound: (userId, soundUrl, waveUrl, imageUrl, description, name, token) => dispatch(uploadSound(userId, soundUrl, waveUrl, imageUrl, description, name, token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Upload);
