import React from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { registerUser, updateImg } from '../../actions/authActions';
import styles from '../../styles/RegisterForm.module.css';

import LabelButton from "../utils/LabelButton";

const RegistrationForm = ({ registerUser, updateImg, previewImgUrl }) => {
    const { register, handleSubmit, errors } = useForm();

    const handleNewImage = e => {
        const newImg = e.target.files[0];
        updateImg(newImg);
    }

    const formSubmitter = data => {
        registerUser(data.username, data.email, data.password, data.bio, previewImgUrl)
    }

    return (
        <div className={styles.formContainer}>
            <h1>Sign Up</h1>
            <form className={styles.form} onSubmit={handleSubmit(formSubmitter)}>
                <label className={styles.label} htmlFor="username" >Username:
                    <input
                        type="text"
                        id="username"
                        name="username"
                        ref={register({ required: true })}
                    />
                </label>
                {errors.username && <span>username required</span>}
                <label className={styles.label} htmlFor="email" >Email:
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={register({ required: true })}
                    />
                </label>
                {errors.email && <span>email required</span>}
                <label className={styles.label} htmlFor="password" >Password:
                    <input
                        type="text"
                        id="password"
                        name="password"
                        ref={register({ required: true })}
                    />
                </label>
                {errors.password && <span>password required</span>}
                <label className={styles.label} htmlFor="bio" >Bio:
                    <textarea
                        id="bio"
                        name="bio"
                        ref={register({ required: true })}
                    />
                </label>
                {errors.bio && <span>bio required</span>}
                <div className={styles.imageUpload}>
                    <img className={styles.imagePreview} src={previewImgUrl} alt='avi preview' />
                    <LabelButton labelfor='file-upload' innerhtml='Select image for avatar'/>
                        <input
                            className={styles.imageInput}
                            type="file"
                            id="file-upload"
                            onChange={handleNewImage}
                        />
                </div>
                <LabelButton labelfor='submit-sign-up' innerhtml='Sign Up'/>
                <input className={styles.submitInput} type="submit" id='submit-sign-up' value="Sign Up" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      previewImgUrl: state.auth.previewImgUrl,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (username, email, password, bio, newImg) => dispatch(registerUser(username, email, password, bio, newImg)),
        updateImg: (newImg) => dispatch(updateImg(newImg)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
