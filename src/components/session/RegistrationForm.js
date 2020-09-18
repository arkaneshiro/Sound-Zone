import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";

import { registerUser, updateImg, clearRegisterErrors } from '../../actions/authActions';
import styles from '../../styles/RegisterForm.module.css';
import LabelButton from "../utils/LabelButton";

const RegistrationForm = ({ registerUser, updateImg, clearRegisterErrors, previewImgUrl, registerErrors = [] }) => {
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        clearRegisterErrors()
    }, [clearRegisterErrors])

    const handleNewImage = e => {
        const newImg = e.target.files[0];
        updateImg(newImg);
    }

    const formSubmitter = data => {
        registerUser(data.username, data.email, data.password, data.bio, previewImgUrl)
    }

    return (
        <>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit(formSubmitter)}>
                    <h1 className={styles.title}>Sign Up</h1>
                    <input
                        className={styles.textInput}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        autoComplete="off"
                        ref={register({ required: true })}
                    />
                    {registerErrors['username'] !== undefined
                    ?
                        <div className={styles.error}>{`username ${registerErrors['username'].value} is already in use`}</div>
                    :
                        ""
                    }
                    {errors.username && <div className={styles.error}>username required</div>}
                    <input
                        className={styles.textInput}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        autoComplete="off"
                        ref={register({ required: true })}
                    />
                    {registerErrors['email'] !== undefined
                    ?
                        <div className={styles.error}>{`email ${registerErrors['email'].value} is already in use`}</div>
                    :
                        ""
                    }
                    {errors.email && <div className={styles.error}>email required</div>}
                    <input
                        className={styles.textInput}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        ref={register({ required: true })}
                    />
                    {errors.password && <div className={styles.error}>password required</div>}
                    <textarea
                        className={styles.textAreaInput}
                        id="bio"
                        name="bio"
                        placeholder="bio"
                        ref={register({ required: true })}
                    />
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
                    <input
                        className={styles.submitInput}
                        type="submit"
                        id='submit-sign-up'
                        value="Sign Up"
                    />
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        previewImgUrl: state.auth.previewImgUrl,
        registerErrors: state.auth.registerErrors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (username, email, password, bio, newImg) => dispatch(registerUser(username, email, password, bio, newImg)),
        updateImg: (newImg) => dispatch(updateImg(newImg)),
        clearRegisterErrors: () => dispatch(clearRegisterErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
