import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getUserInfo } from '../actions/userActions';
import { updateSoundImg } from '../actions/soundActions';
import styles from '../styles/UploadSound.module.css';

import LabelButton from "./utils/LabelButton";

const Upload = ({ authToken, currentUserId, currentUserImgUrl, soundImgPreview, getUserInfo, updateSoundImg }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getUserInfo(currentUserId);

    }, [getUserInfo, currentUserId])

    const handleNewImage = e => {
        const newImg = e.target.files[0];
        updateSoundImg(newImg);
    }

    const handleNewSound = e => {
        const newSound = e.target.files[0];
        console.log(newSound)
        // updateSound(newSound);
    }

    const updateValue = cb => e => cb(e.target.value);

    const handlesubmit = e => {
        e.preventDefault();
        console.log('call upload function here')
    }

    return (
        <div className={styles.formContainer}>
            <h1>Upload Sound</h1>
            <form className={styles.form} onSubmit={handlesubmit}>
                <div className={styles.soundUpload}>
                    <img className={styles.soundPreview} src={null} alt='sound waveform preview' />
                    <LabelButton labelfor='file-upload' innerhtml='Select Audio to Upload'/>
                    <input
                        className={styles.soundInput}
                        type="file"
                        id="sound-upload"
                        onChange={handleNewSound}
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
                    <img className={styles.imagePreview} src={soundImgPreview ? soundImgPreview : currentUserImgUrl} alt='sound cover preview' />
                    <LabelButton labelfor='file-upload' innerhtml='Select a Cover Image'/>
                        <input
                            className={styles.imageInput}
                            type="file"
                            id="file-upload"
                            onChange={handleNewImage}
                        />
                </div>
                <LabelButton labelfor='submit-sound' innerhtml='Submit'/>
                <input className={styles.submitInput} type="submit" id='submit-sound'value="Upload" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.authToken,
        currentUserId: state.auth.currentUserId,
        currentUsername: state.user.currentUsername,
        currentUserBio: state.user.currentUserBio,
        currentUserImgUrl: state.user.currentUserImgUrl,
        soundImgPreview: state.sound.soundImgPreview,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => dispatch(getUserInfo(id)),
        updateSoundImg: (img) => dispatch(updateSoundImg(img)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Upload);
