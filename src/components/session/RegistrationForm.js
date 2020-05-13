import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register, updateImg } from '../../actions/authActions';
import styles from '../../styles/RegisterForm.module.css';

const RegistrationForm = ({ register, updateImg, previewImgUrl }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const updateValue = cb => e => cb(e.target.value);

    const handleNewImage = e => {
        const newImg = e.target.files[0];
        updateImg(newImg);
    }

    const handlesubmit = e => {
        e.preventDefault();
        register(username, email, password, bio, previewImgUrl)
    }

    return (
        <div className={styles.formContainer}>
            <h1>Sign Up</h1>
            <form className={styles.form} onSubmit={handlesubmit}>
                <label className={styles.label} htmlFor="username" >Username:
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={updateValue(setUsername)}
                    />
                </label>
                <label className={styles.label} htmlFor="email" >Email:
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={updateValue(setEmail)}
                    />
                </label>
                <label className={styles.label} htmlFor="password" >Password:
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={updateValue(setPassword)}
                    />
                </label>
                <label className={styles.label} htmlFor="bio" >Bio:
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={updateValue(setBio)}
                    />
                </label>
                <div className={styles.imageUpload}>
                    <img className={styles.imagePreview} src={previewImgUrl} alt='avi preview' />
                    <label className={styles.imageInputLabel} htmlFor="file-upload" >
                        <input
                            className={styles.imageInput}
                            type="file"
                            id="file-upload"
                            onChange={handleNewImage}
                        />
                        Select an Image
                    </label>
                </div>

                <input type="submit" value="Sign Up" />
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
        register: (username, email, password, bio, newImg) => dispatch(register(username, email, password, bio, newImg)),
        updateImg: (newImg) => dispatch(updateImg(newImg)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
