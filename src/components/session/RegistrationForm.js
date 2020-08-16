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
                {/* <label className={styles.label} htmlFor="username" >Username: */}
                    <input
                        className={styles.textInput}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        ref={register({ required: true })}
                    />
                {/* </label> */}
                {errors.username && <div className={styles.error}>username required</div>}
                {/* <label className={styles.label} htmlFor="email" >Email: */}
                    <input
                        className={styles.textInput}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        ref={register({ required: true })}
                    />
                {/* </label> */}
                {errors.email && <div className={styles.error}>email required</div>}
                {/* <label className={styles.label} htmlFor="password" >Password: */}
                    <input
                        className={styles.textInput}
                        type="text"
                        id="password"
                        name="password"
                        placeholder="password"
                        ref={register({ required: true })}
                    />
                {/* </label> */}
                {errors.password && <div className={styles.error}>password required</div>}
                {/* <label className={styles.label} htmlFor="bio" >Bio: */}
                    <textarea
                        className={styles.textAreaInput}
                        id="bio"
                        name="bio"
                        placeholder="bio"
                        ref={register({ required: true })}
                    />
                {/* </label> */}
                {errors.bio && <div className={styles.error}>bio required</div>}
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
