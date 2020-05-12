import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import styles from '../../styles/RegisterForm.module.css';

const RegistrationForm = ({ register }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const updateValue = cb => e => cb(e.target.value);

    const handlesubmit = e => {
        e.preventDefault();
        console.log([username, password])
        register(username, email, password, bio)
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
                <input type="submit" value="Sign Up"/>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, email, password, bio) => dispatch(register(username, email, password, bio)),
    };
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
