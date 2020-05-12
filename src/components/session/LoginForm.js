import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import styles from '../../styles/LoginForm.module.css';

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const updateValue = cb => e => cb(e.target.value);

    const handlesubmit = e => {
        e.preventDefault();
        console.log([username, password])
        login(username, password)
    }

    return (
        <div className={styles.formContainer}>
            <h1>Sign In</h1>
            <form className={styles.form} onSubmit={handlesubmit}>
                <label className={styles.label} htmlFor="username" >Username:
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={updateValue(setUsername)}
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
                <input type="submit" value="Sign In"/>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password)),
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);
