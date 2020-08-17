import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { getUserInfo } from '../actions/userActions';
import { updateCoverImg, updateSound, uploadSound } from '../actions/soundActions';
import styles from '../styles/UploadSound.module.css';

import LabelButton from "./utils/LabelButton";

const Upload = ({ authToken, currentUserId, userImgUrl, newCoverUrl, newWaveUrl, newSoundUrl, getUserInfo, updateCoverImg, updateSound, uploadSound }) => {
    const { register, handleSubmit, errors } = useForm();
    const [loadingDisplay, setLoadingDisplay] = useState('none')

    useEffect(() => {
        getUserInfo(currentUserId);

    }, [getUserInfo, currentUserId])

    useEffect(() => {
        setLoadingDisplay('none')
    }, [newWaveUrl])

    const updateFile = cb => e => cb(e.target.files[0]);
    const handleUpdateSound = e => {
        setLoadingDisplay('grid')
        updateSound(e.target.files[0])
    }

    const formSubmitter = data => {
        const coverUrl = newCoverUrl ? newCoverUrl : userImgUrl;
        uploadSound(currentUserId, newSoundUrl, newWaveUrl, coverUrl, data.description, data.title, authToken)
    }

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit(formSubmitter)}>
                    <h1 className={styles.title}>Upload Sound</h1>
                    <div className={styles.preview}>
                        <img className={styles.imagePreview} src={newCoverUrl ? newCoverUrl : userImgUrl} alt='sound cover preview' />
                        <img id={'wave-preview'} className={styles.soundPreview} src={newWaveUrl} alt='sound wave preview' />
                        <img className={styles.loading} style={{ display: loadingDisplay }} src={'https://res.cloudinary.com/dgzcv1mcs/image/upload/v1589582588/Soundzone/loading_hcwl8f.gif'} alt='loading' />
                    </div>
                    <div className={styles.uploadButtons}>
                        <LabelButton labelfor='file-upload' innerhtml='Select a Cover Image' />
                        <LabelButton labelfor='sound-upload' innerhtml='Select Audio to Upload' />
                    </div>
                    <input
                        className={styles.textInput}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="title"
                        ref={register({ required: true })}
                    />
                    {errors.title && <div className={styles.error}>title required</div>}
                    <textarea
                        className={styles.textAreaInput}
                        id="description"
                        name="description"
                        placeholder="description"
                        ref={register({ required: true })}
                    />
                    {errors.description && <div className={styles.error}>description required</div>}
                    <LabelButton labelfor='submit-sound' innerhtml='Upload' />
                    <input
                        className={styles.soundInput}
                        type="file"
                        id="sound-upload"
                        onChange={handleUpdateSound}
                    />
                    <input
                        className={styles.imageInput}
                        type="file"
                        id="file-upload"
                        onChange={updateFile(updateCoverImg)}
                    />
                    <input
                        className={styles.submitInput}
                        type="submit"
                        id='submit-sound'
                        value="Upload"
                    />
                </form>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        authToken: state.auth.authToken,
        currentUserId: state.auth.currentUserId,
        userImgUrl: state.user.userImgUrl,
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
